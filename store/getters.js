export default {
	cart: state => state.cart.cart,
	cartNumb: state => {
		const num = state.cart.cart.filter(item => item.goods_state).reduce((prev, next) => prev + next.goods_count, 0)
		uni.setStorageSync('cartNum', num)
		return num
	},
	myAddress: state => state.address.address,
	token: state => state.user.token
}
