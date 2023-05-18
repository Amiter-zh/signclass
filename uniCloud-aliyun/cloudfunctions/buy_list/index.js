'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
	//推荐时间 后期改为访问数量
	return await db.collection('buy').orderBy('_id', 'desc').get();
};

