export default {
	namespaced: true,
	state: {
		token: false,
		redirect: null
	},
	mutations: {
		ADD_TOKEN(state) {
			state.token = true
		},
		ADD_DEDIRECT(state, data) {
			state.redirect = data
		}
	},
	actions: {}
}