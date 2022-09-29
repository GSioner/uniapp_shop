import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart.js'
import getters from './getters.js'
import address from './address.js'
import user from './user.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		cart,
		address,
		user
	},
	getters
})

export default store