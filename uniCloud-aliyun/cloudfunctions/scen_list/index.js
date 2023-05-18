'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let {
		skip=0
	} = event;
	//推荐时间 后期改为访问数量
	return await db.collection('scen_detail').limit(7).skip(skip).orderBy('count', 'desc').get();
};
