'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	let {e} = event;
	return await db.collection('buy').where({
		_id: e
	}).remove();
};
