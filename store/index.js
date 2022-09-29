import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart.js'
import getters from './getters.js'
import address from './address.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		cart,
		address
	},
	getters
})

export default store