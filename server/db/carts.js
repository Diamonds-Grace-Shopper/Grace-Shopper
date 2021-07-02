const client = require('./client');

const LIMIT = 20

async function createCarts({ status, cartQuantity, date, time, total, userId }) {
	try {
	  const {
		rows: [cart],
	  } = await client.query(
		`
		INSERT INTO carts(status, cartQuantity, date, time, total, userId) 
		VALUES ($1, $2, $3, $4, $5, $6)
		RETURNING *;
	  `,
		[status, cartQuantity, date, time, total, userId]
	  )
	  return cart
	} catch (error) {
	  throw error
	}
  };

async function addCart({ status, total, userId }) {
	
	try {
		const {
			rows: [newCart],
		} = await client.query(
			`
        INSERT INTO carts (status, date, time, total, userId)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `,
			[status, getDate().date, getDate().time, total, userId],
		);
		newCart.total = parseFloat(newCart.total);

		newCart.items = [];
		
		return newCart;
	} catch (error) {}
}

async function getCartHistoryStatus(id) {
	try {
		const { rows } = await client.query(
			`
        SELECT * FROM carts
        WHERE (status = 'processing' OR status = 'shipped' OR status = 'cancelled') AND userId = $1;
        `,
			[id],
		);

		return rows;
	} catch (error) {
		throw error;
	}
}

async function getCartHistoryStatusAdmin() {
	try {
		const { rows } = await client.query(
			`
          SELECT * FROM carts
          WHERE status = 'processing' OR status = 'shipped' OR status = 'cancelled';
          `,
		);
		return rows;
	} catch (error) {
		throw error;
	}
}

async function getProcessingCarts(pageNumber = 1) {
	try {
		const OFFSET = LIMIT * (pageNumber - 1);

		const { rowCount } = await client.query(
			`
          SELECT * FROM carts
          WHERE status = 'processing';
          `,
		);

		const { rows: carts } = await client.query(
			`
          SELECT * FROM carts
          WHERE status = 'processing'
          LIMIT $1 OFFSET $2;
          `,
			[LIMIT, OFFSET],
		);

		await Promise.mapSeries(carts, async function (cart, index, length) {
			cart.total = parseFloat(cart.total);
			const items = await getProductsCartForACartId(cart.id);
			cart.items = items;
			const user = await getUserById(cart.userId);
			cart.user = user;
			cart.index = index;
		});

		const pageCount = Math.ceil(rowCount / LIMIT);
		return [pageCount, carts];
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

async function getActiveCart(userId) {
	try {
		const activeCart = await getActiveCartAlone(userId);

		const items = await getProductsCartForACartId(await activeCart.id);

		activeCart.total = parseFloat(activeCart.total);
		activeCart.items = items;

		if (activeCart !== undefined) {
			return activeCart;
		}
	} catch (error) {
		throw error;
	}
}

async function getActiveCartAlone(userId) {
	try {
		const {
			rows: [activeCart],
		} = await client.query(
			`
          SELECT * FROM carts 
          WHERE status = 'active' AND userId = $1;
          `,
			[userId],
		);

		if (activeCart !== undefined) {
			return activeCart;
		}
	} catch (error) {
		throw error;
	}
}

async function addProductToCart({ userId, productId, cartId, quantity, unitPrice }) {
	
	try {
		const itemTotal = quantity * unitPrice;
		await client.query(
			`
              INSERT INTO products_carts ("productId", "cartId", quantity, "unitPrice", "itemTotal")
              VALUES ($1, $2, $3, $4, $5)
              RETURNING *;
          `,
			[productId, cartId, quantity, unitPrice, itemTotal],
		);
		const cart = await getActiveCart(userId);
		
		let total = 0;
		let cartQuantity = 0;
		cart.items.map((item) => {
			total = total + item.itemTotal;
			cartQuantity = cartQuantity + item.quantity;
		});

		await client.query(
			`
            UPDATE carts
            SET total=$1,
            cartQuantity=$2
            WHERE id=$3
            RETURNING *;
        `,
			[total, cartQuantity, cartId],
		);

		await lastUpdated(cartId);

		const newCart = await getActiveCart(userId);

		return newCart;
	} catch (error) {
		throw error;
	}
}

module.exports = {
	createCarts,
    addCart,
    getCartHistoryStatus,
	getCartHistoryStatusAdmin,
	getProcessingCarts,
    getUserById,
	getActiveCart,
	getActiveCartAlone,
	addProductToCart
	
}