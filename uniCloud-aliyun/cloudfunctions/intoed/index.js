'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	let {id} = event;
	return await db.collection('article').doc(id).get()
};
