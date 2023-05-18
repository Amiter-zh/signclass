'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	let {title} = event;
	return await db.collection('article').where(dbCmd.or({
		title:new RegExp(title)
	})).get();
};
