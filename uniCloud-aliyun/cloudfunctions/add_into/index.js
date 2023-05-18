'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {
		detail
	} = event;


	let res = await db.collection("article").add({
		posttime: Date.now(),
		count:0,
		...detail
	});
	return res;
};

