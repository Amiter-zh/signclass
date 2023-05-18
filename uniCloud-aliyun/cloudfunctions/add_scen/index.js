'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
	let {
		detail,
		swiper
	} = event;


	let res = await db.collection("scen_detail").add({
		posttime: Date.now(),
		swiper,
		count:0,
		...detail
	});
	return res;
};
