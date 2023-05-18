'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let {type} = event;
	return await db.collection('scen_detail').where({
		type
	}).limit(200).get();
};
