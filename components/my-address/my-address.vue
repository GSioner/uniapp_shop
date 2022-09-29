<template>
	<view>
		<!-- 添加地址 -->
		<view class="add_address" v-if="!Object.keys(myAddress).length">
			<view class="addBtn" @click="addAddress">
				请选择收货地址 +
			</view>
		</view>
		<!-- 地址展示 -->
		<view class="address" v-else @click="addAddress">
			<view class="up">
				<text class="username">收货人: 张三</text>
				<view class="phone">
					<text> 电话: 202-81167888</text>
					<uni-icons type="forward" />
				</view>
			</view>
			<view class="down">
				收获地址: 广东省广州市
			</view>
		</view>
		<!-- 分割线 -->
		<image src="/static/cart_border@2x.png" class="address_img"></image>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		name: "my-address",
		data() {
			return {}
		},
		computed: {
			...mapGetters(['myAddress'])
		},
		methods: {
			...mapMutations('address', ['ADD_ADDRESS']),
			async addAddress() {
				const [err, success] = await uni.chooseAddress().catch(err => err)
				if (err === null && success && success.errMsg === 'chooseAddress:ok') {
					this.ADD_ADDRESS(success)
				}
			}
		}
	}
</script>

<style lang="scss">
	.address_img {
		width: 100%;
		height: 12rpx;
	}

	.add_address {
		width: 100%;
		height: 150rpx;
		display: flex;
		align-items: center;
		justify-content: center;

		.addBtn {
			color: white;
			width: 300rpx;
			height: 60rpx;
			font-size: 30rpx;
			text-align: center;
			line-height: 60rpx;
			border-radius: 10rpx;
			background-color: #1aad19;

			&:active {
				background-color: #1cb91a;
			}
		}
	}

	.address {
		height: 90rpx;
		display: flex;
		font-size: 25rpx;
		margin-top: 40rpx;
		padding-left: 20rpx;
		padding-right: 15rpx;
		margin-bottom: 20rpx;
		flex-direction: column;
		justify-content: space-between;

		.up {
			height: 40rpx;
			display: flex;
			align-items: center;
			justify-content: space-between;

			.phone {
				display: flex;
				align-items: center;
				justify-content: space-between;

				text {
					margin-right: 10rpx;
				}
			}
		}
	}
</style>
