const { client } = require('./client');

const LIMIT = 20

async function createCarts({ status, cartQuatity, date, time, total, userId }) {
	try {
	  const {
		rows: [cart],
	  } = await client.query(
		`
		INSERT INTO carts(status, cartQuatity, date, time, total, userId) VALUES ($1, $2. $3, $4, $5, $6)
		ON CONFLICT (satus) DO NOTHING 
		RETURNING *
	  `,
		[status, cartQuatity, date, time, total, userId]
	  )
	  return cart
	} catch (error) {
	  throw error
	}
  }

async function addCart({ status, total, userId }) {
	
	try {
		const {
			rows: [newCart],
		} = await client.query(
			`
        INSERT INTO carts (status, date, time, total, "userId")
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
        WHERE (status = 'processing' OR status = 'shipped' OR status = 'cancelled') AND "userId" = $1;
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
          WHERE status = 'active' AND "userId" = $1;
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

module.exports = {
	createCarts,
    addCart,
    getCartHistoryStatus,
	getCartHistoryStatusAdmin,
	getProcessingCarts,
    getUserById,
	getActiveCart,
	getActiveCartAlone
}