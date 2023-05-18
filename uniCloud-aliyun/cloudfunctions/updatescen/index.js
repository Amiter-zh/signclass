'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let {id,detail} = event;
	return await db.collection('scen_detail').doc(id).update({
		title:detail.title,
		time:detail.time,
		type:detail.type,
		desc:detail.desc,
		address:detail.address,
		traffic:detail.traffic,
		other:detail.other,
		ticket: detail.ticket,
		ticketinfo: detail.ticketinfo,
	})
	
};
