export default {
	namespaced: true,

	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') || '[]')
	}),

	mutations: {
		removeGoodsById(state, scen_id) {
			state.cart = state.cart.filter(x => x.scen_id !== scen_id)
			this.commit("m_cart/saveToStorage")
		},
		addTocart(state, scens) {

			const findResult = state.cart.find((x) => x.scen_id === scens.scen_id)
			if (!findResult) {
				state.cart.push(scens)
			}
			this.commit('m_cart/saveToStorage')

		},
		saveToStorage(state) {
			uni.setStorageSync('cart', JSON.stringify(state.cart))
		},
		updateAllGoodsState(state, newState) {
			state.cart.forEach(x => x.scen_state = newState)
			this.commit('m_cart/saveToStorage')
		}
	},

	getters: {

	},
}
