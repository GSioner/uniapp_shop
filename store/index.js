import Vue from 'vue'
import Vuex from 'vuex'
import cart from './cart.js'
import getters from './getters.js'

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		cart
	},
	getters
})

export default store