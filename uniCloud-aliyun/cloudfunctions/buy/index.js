'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {
		scen_id,
		scen_ticket,
		scen_title,
		scen_small_logo
	} = event;


	let res = await db.collection("buy").add({
		post: Date.now(),
		scen_id,
		scen_ticket,
		scen_title,
		scen_small_logo
	});
	return res;
};