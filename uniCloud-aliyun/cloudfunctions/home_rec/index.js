'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//推荐时间 后期改为访问数量
	return await db.collection('article').limit(3).orderBy('count', 'desc').get();
};
