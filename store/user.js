export default {
	namespaced: true,
	state: {
		token: false
	},
	mutations: {
		ADD_TOKEN(state) {
			state.token = true
		}
	},
	actions: {}
}