'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	let {
		skip=0
	} = event;
	//推荐时间 后期改为访问数量
	return await db.collection('article').limit(7).skip(skip).orderBy('posttime', 'desc').get();
};
