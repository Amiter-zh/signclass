export default {
	namespaced: true,

	state: () => ({
		token: uni.getStorageSync('token') || '',
		userInfo: uni.getStorageSync('userInfo') || ''
	}),

	mutations: {
		updateToken(state, token) {
			state.token = token
			this.commit('m_user/saveTokenToStorage')
		},
		saveTokenToStorage(state) {
			uni.setStorageSync('token', state.token)
		},
		updateUserInfo(state, userInfo) {
			state.userInfo = userInfo
			this.commit('m_user/saveUserInfoToStorage')
		},
		saveUserInfoToStorage(state) {
			uni.setStorageSync('userInfo', state.userInfo);
		},

	},
	getters: {
		getuserInfo:state=>{
			return state.userInfo
		}
	}

}
