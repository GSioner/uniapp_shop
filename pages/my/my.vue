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
			async login() {
				if (this.redirect) {
					uni.showLoading()
					return setTimeout(() => {
						uni[this.redirect.openType]({
							url: this.redirect.url,
							complete: () => {
								this.$store.commit('user/ADD_DEDIRECT', null)
								console.log(this.redirect);
							},
							success: () => {
								uni.hideLoading()
								this.$store.commit('user/ADD_TOKEN')
							}
						})
					}, 500)
				}
				this.$store.commit('user/ADD_TOKEN')
			}
		},
		computed: {
			...mapState('user', ['token', 'redirect'])
		}
	}
</script>

<style>

</style>
