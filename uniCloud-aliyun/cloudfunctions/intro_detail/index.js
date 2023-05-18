'use strict';
const db = uniCloud.database();
const dbCmd = db.command;
exports.main = async (event, context) => {
	let {id} = event;
	db.collection('article').doc(id.rec_id).update({
		count:dbCmd.inc(2)
	})
	return await db.collection('article').doc(id.rec_id).get()
	// console.log(res);
};
