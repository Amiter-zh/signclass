'use strict';
const db = uniCloud.database()
const dbCmd = db.command;
exports.main = async (event, context) => {
	let {id} = event;
	return await db.collection('scen_detail').doc(id.scen_id).remove()
	// console.log(res);
};
