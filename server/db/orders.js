const client = require('./client');

const LIMIT = 20

async function createOrder({ userId }) {
	try {
	  const {
		rows: [order],
	  } = await client.query(
		`
		INSERT INTO orders("userid") 
		VALUES ($1)
		RETURNING *;
	  `,
		[userId]
	  )
	  
	  return order
	} catch (error) {
	  throw error
	}
};

async function getOrderHistoryStatus(id) {
	try {
		const { rows } = await client.query(
			`
        SELECT * FROM orders
        WHERE (status = 'processing' OR status = 'shipped' OR status = 'cancelled') 
		AND userId = $1;
        `,
			[id],
		);

		return rows;
	} catch (error) {
		throw error;
	}
}

async function getOrderHistoryStatusAdmin() {
	try {
		const { rows } = await client.query(
			`
          SELECT * FROM orders
          WHERE status = 'processing' OR status = 'shipped' OR status = 'cancelled';
          `,
		);
		return rows;
	} catch (error) {
		throw error;
	}
}

async function getProcessingOrders(pageNumber = 1) {
	try {
		const OFFSET = LIMIT * (pageNumber - 1);

		const { rowCount } = await client.query(
			`
          SELECT * FROM orders
          WHERE status = 'processing';
          `,
		);

		const { rows: orders } = await client.query(
			`
          SELECT * FROM orders
          WHERE status = 'processing'
          LIMIT $1 OFFSET $2;
          `,
			[LIMIT, OFFSET],
		);

		await Promise.mapSeries(orders, async function (order, index) {
			order.total = parseFloat(order.total);
			const items = await getProductsOrderForAOrderId(order.id);
			order.items = items;
			const user = await getUserById(order.userId);
			order.user = user;
			order.index = index;
		});

		const pageCount = Math.ceil(rowCount / LIMIT);
		return [pageCount, orders];
	} catch (error) {
		throw error;
	}
}

async function getUserById(id) {
	try {
		const {
			rows: [user],
		} = await client.query(
			`
		SELECT * FROM users
        WHERE id = $1;
        `,
			[id],
		);
		if (user) {
			return user;
		} else {
			return { message: 'no user by that id' };
		}
	} catch (error) {
		throw error;
	}
}

async function getActiveOrder(userId) {
	try {
		const activeOrder = await getActiveOrderAlone(userId);

		const items = await getProductsOrderForAOrderId(await activeOrder.id);

		activeOrder.total = parseFloat(activeOrder.total);
		activeOrder.items = items;

		if (activeOrder !== undefined) {
			return activeOrder;
		}
	} catch (error) {
		throw error;
	}
}

async function getActiveOrderAlone(userId) {
	try {
		const {
			rows: [activeOrder],
		} = await client.query(
			`
          SELECT * FROM orders 
          WHERE status = 'active' AND userId = $1;
          `,
			[userId],
		);

		if (activeOrder !== undefined) {
			return activeOrder;
		}
	} catch (error) {
		throw error;
	}
}

async function addProductToOrder({ productId, orderId, quantity, unitPrice }) {
	try {
	  const {
		rows: [order],
	  } = await client.query(
		`
		INSERT INTO products_orders( productId, orderId, quantity, unitPrice) 
		VALUES ($1, $2, $3, $4)
		RETURNING *;
	  `,
		[productId, orderId, quantity, unitPrice]
	  )
	  	order.unitprice = parseFloat(order.unitprice);

	  return order
	} catch (error) {
	  throw error
	}
  };


async function getProductsOrderForAOrderId(id) {
	try {
		const { rows: items } = await client.query(
			`
      SELECT *
      FROM products_orders
      JOIN products
      ON products_orders.productId = products.id
      WHERE products_orders.orderId=$1;
    `,
			[id],
		);
		if (items) {
			items.forEach((item) => {
				item.unitPrice = parseFloat(item.unitPrice);
				item.itemTotal = parseFloat(item.itemTotal);
			});
			return items;
		} else {
			return [];
		}
	} catch (error) {
		throw error;
	}
}

async function getAllProductsorder() {
	try {
		const { rows } = await client.query(`
            SELECT * FROM products_orders
            `);
		rows.forEach((item) => {
			item.unitPrice = parseFloat(item.unitPrice);
			item.itemTotal = parseFloat(item.itemTotal);
		});
		return rows;
	} catch (error) {
		throw error;
	}
}

async function removeProductFromOrder({ userId, orderId, products_ordersId }) {
	try {
		const deleted = await client.query(
			`
            DELETE FROM products_orders
            WHERE jointId=$1;
        `,
			[products_ordersId],
		);

		const order = await getActiveOrder(userId);

		let total = 0;
		let orderQuantity = 0;
		order.items.forEach((item) => {
			total = total + item.itemTotal;
			orderQuantity = orderQuantity + item.quantity;
		});

		const { rows: newUpdatedCart } = await client.query(
			`
            UPDATE orders
            SET total=$1,
            orderQuantity=$2
            WHERE id=$3
            RETURNING *;
        `,
			[total, orderQuantity, orderId],
		);

		await lastUpdated(orderId);

		const newOrder = await getActiveOrder(userId);

		if (newOrder) {
			return newOrder;
		} else {
			return {};
		}
	} catch (error) {
		throw error;
	}
}

async function updateProductQuantity({ userId, jointId, quantity, unitPrice }) {
	const itemTotal = unitPrice * quantity;

	try {
		await client.query(
			`
            UPDATE products_orders
            SET quantity=$1, 
            unitPrice=$2, 
            itemTotal=$3
            WHERE "jointId"=$4;
        `,
			[quantity, unitPrice, itemTotal, jointId],
		);

		const order = await getActiveOrder(userId);

		let total = 0;
		let orderQuantity = 0;
		order.items.map((item) => {
			total = total + item.itemTotal;
			orderQuantity = orderQuantity + item.quantity;
		});

		await client.query(
			`
            UPDATE orders
            SET total=$1,
            orderQuantity=$2
            WHERE id=$3
            RETURNING *;
        `,
			[total, orderQuantity, order.id],
		);

		await lastUpdated(order.id);

		const newOrder = await getActiveOrder(userId);

		return newOrder;
	} catch (error) {
		throw error;
	}
}

async function deactivateOrder({ userId, orderId }) {
	try {
		await client.query(
			`
            UPDATE orders
            SET status='processing'
            WHERE id=$1;
        `,
			[orderId],
		);

		await lastUpdated(orderId);

		const newOrder = addOrder({ status: 'active', total: 0, userId });

		return newOrder;
	} catch (error) {
		throw error;
	}
}

async function completeOrder(orderId) {
	try {
		const {
			rows: [completedOrder],
		} = await client.query(
			`
            UPDATE orders 
            SET status='complete'
            WHERE id=$1
            RETURNING *;
        `,
			[orderId],
		);

		await lastUpdated(orderId);

		return completedOrder;
	} catch (error) {
		throw error;
	}
}

async function getUserOrderHistory(userId, pageNumber = 1) {
	try {
		const OFFSET = LIMIT * (pageNumber - 1);

		const { rowCount } = await client.query(
			`
          SELECT * FROM orders
          WHERE userId=$1;
          `,
			[userId],
		);

		const { rows: orders } = await client.query(
			`
          SELECT * FROM orders
          WHERE userId=$1
          LIMIT $2 OFFSET $3;
          `,
			[userId, LIMIT, OFFSET],
		);

		await Promise.mapSeries(orders, async function (order, index) {
			order.total = parseFloat(order.total);
			const items = await getProductsOrderForAOrderId(order.id);
			order.items = items;
			const user = await getUserById(order.userId);
			order.user = user;
			order.index = index;
		});

		const pageCount = Math.ceil(rowCount / LIMIT);
		return [pageCount, orders];
	} catch (error) {
		throw error;
	}
}

async function getOrderHistory(pageNumber = 1) {
	try {
		const OFFSET = LIMIT * (pageNumber - 1);

		const { rowCount } = await client.query(
			`
          SELECT * FROM orders;
          `,
		);

		const { rows: orders } = await client.query(
			`
          SELECT * FROM orders
          LIMIT $1 OFFSET $2;
          `,
			[LIMIT, OFFSET],
		);

		await Promise.mapSeries(orders, async function (order, index) {
			order.total = parseFloat(order.total);
			const items = await getProductsOrderForAOrderId(order.id);
			order.items = items;
			const user = await getUserById(order.userId);
			order.user = user;
			order.index = index;
		});

		const pageCount = Math.ceil(rowCount / LIMIT);
		return [pageCount, orders];
	} catch (error) {
		throw error;
	}
}

async function lastUpdated(orderId) {
	try {
		await client.query(
			`
            UPDATE orders
			SET date=$1, time=$2
            WHERE id=$3;
        `,
			[getDate().date, getDate().time, orderId],
		);
	} catch (error) {
		throw error;
	}
}

function getDate() {
	const newDate = new Date();
	let date = newDate.getFullYear() + '-' + (newDate.getMonth() + 1) + '-' + newDate.getDate();
	const time =
		(newDate.getHours() < 10 ? '0' + newDate.getHours() : newDate.getHours()) +
		':' +
		(newDate.getMinutes() < 10 ? '0' + newDate.getMinutes() : newDate.getMinutes()) +
		':' +
		(newDate.getSeconds() < 10 ? '0' + newDate.getSeconds() : newDate.getSeconds());

	return { date, time };
}

async function getSalesReport() {
	try {
		const { rows } = await client.query(`
			SELECT date,
			sum(orderQuantity) AS orderQuantity, 
			sum(total) AS total
			FROM orders
			WHERE date LIKE '2021%'
			AND status = 'processing' 
			OR status = 'complete'
			GROUP BY date;
		`);
		
		return rows;
	} catch (error) {
		throw error;
	}
}

async function getOrderByUserId({userId}) {
	try {
		const { rows } = await client.query(`
			SELECT *
			FROM orders
			WHERE "userid" = ${userId};
		`, [userId])

		return rows
	} catch (error) {
		console.error('could not get order by id')
	}
}

module.exports = {
	createOrder,
    getOrderHistoryStatus,
	getOrderHistoryStatusAdmin,
	getProcessingOrders,
    getUserById,
	getActiveOrder,
	getActiveOrderAlone,
	addProductToOrder,
	getAllProductsorder,
	getProductsOrderForAOrderId,
	removeProductFromOrder,
	deactivateOrder,
	updateProductQuantity,
	completeOrder,
	getUserOrderHistory,
	getOrderHistory,
	getSalesReport,
	getOrderByUserId	
}