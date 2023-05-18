'use strict';
//首页轮播图获取
const db = uniCloud.database()
exports.main = async (event, context) => {
	// 此处id后期换成点击数推荐排序
	return db.collection('scen_detail').orderBy("count","desc").limit(3).get()
};
