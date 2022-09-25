<template>
	<view class="searchBox" @click="toSearch">
		<view class="searchTitle">
			<vantIcon name="search" />
			<text style="margin-left: 10rpx;font-size: 30rpx;">搜索</text>
		</view>
	</view>
</template>

<script>
	import vantIcon from '../../static/vant/icon/index'
	export default {
		name: "search",
		components: {
			vantIcon
		},
		data() {
			return {

			};
		},
		methods: {
			toSearch() {
				this.$emit('click')
				uni.navigateTo({
					url: '/shop_goods/my_search/my_search'
				})
			}
		}
	}
</script>

<style lang="scss">
	.searchBox {
		height: 90rpx;
		width: 100%;
		background-color: #d81e06;
		position: sticky;
		z-index: 999;
		padding: 15rpx 20rpx;
		box-sizing: border-box;
		top: 0;

		.searchTitle {
			background-color: #fff;
			width: 100%;
			height: 100%;
			border-radius: 40rpx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
</style>
