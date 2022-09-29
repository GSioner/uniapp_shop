<template>
	<view>
		<my-login v-if="!token" @login="login"></my-login>
		<my-userInfo v-else></my-userInfo>
	</view>
</template>

<script>
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {}
		},
		methods: {
			login() {
				this.$store.commit('user/ADD_TOKEN')
			}
		},
		computed: {
			...mapState('user', ['token'])
		}
	}
</script>

<style>

</style>
