export default {
	namespaced: true,
	state: {
		address: uni.getStorageSync('address') || []
	},
	mutations: {
		ADD_ADDRESS(state, data) {
			if (data && Object.keys(data).length) {
				state.address.push(data)
			} else if (Array.isArray(data) && data.length) {
				state.address = [...state.address, ...data]
			}
			console.log(state.address);
			uni.setStorageSync('address', state.address)
		}
	},
	actions: {}
}