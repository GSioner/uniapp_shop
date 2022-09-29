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
		},
		ADD_CART_COUNT(state, id) {
			const i = state.cart.findIndex(item => item.goods_id === id)
			state.cart[i].goods_count++
			uni.setStorageSync('cart', state.cart)
		},
		REDUCE_CART_COUNT(state, id) {
			const i = state.cart.findIndex(item => item.goods_id === id)
			if (state.cart[i].goods_count <= 1) return
			state.cart[i].goods_count--
			uni.setStorageSync('cart', state.cart)
		},
		CHOICE_CART_GOODS(state, id) {
			const i = state.cart.findIndex(item => item.goods_id === id)
			state.cart[i].goods_state = !state.cart[i].goods_state
			uni.setStorageSync('cart', state.cart)
		},
		DELETE_CART_GOODS(state, id) {
			const i = state.cart.findIndex(item => item.goods_id === id)
			state.cart.splice(i, 1)
			uni.$msg({title: '商品已删除'})
			uni.setStorageSync('cart', state.cart)
		},
		CHOOSE_ALL_GOODS(state, bool) {
			state.cart.forEach(item => item.goods_state = bool)
			uni.setStorageSync('cart', state.cart)
		}
	},
	actions: {},
	getters: {}
}
