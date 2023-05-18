'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let {
		id,
		detail
	} = event;
	return await db.collection('scen_detail').doc(id).update({
		title: detail.title,
		author: detail.author,
		content: detail.content,
	})

};
