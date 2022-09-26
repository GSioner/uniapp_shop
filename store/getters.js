export default {
	cart: state => state.cart.cart,
	cartNumb: state => {
		let num = 0
		state.cart.cart.forEach(item => num += item.goods_count)
		uni.setStorageSync('cartNum', num)
		return num
	}
}