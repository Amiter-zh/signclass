'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let {user} = event;
	return await db.collection('users').add({user})
};
