const { client } = require('../db/client');

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

module.exports = {
    addCart,
    getCartHistoryStatus,
    getUserById
}