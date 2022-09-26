export default {
	namespaced: true,
	state: () => ({
		cart: uni.getStorageSync('cart') || []
	}),
	mutations: {
		ADD_CART(state, data) {
			const sameOne = state.cart.find(item => item.goods_id === data.goods_id)
			sameOne ? sameOne.goods_count++ : state.cart.push(data)
			uni.setStorageSync('cart', state.cart)
		}
	},
	actions: {},
	getters: {}
}
