<template>
	<view>
		<!-- 用户图片 -->
		<view class="userImg">
			<image src="/static/app.png" class="user_image"></image>
			<text class="user_name">Long</text>
		</view>

		<!-- 个人资料卡片 -->
		<view class="user_info">
			<!-- 收藏栏 -->
			<uni-card note="Tips">
				<view class="user_collection">
					<view class="collection_item">
						<text>8</text>
						<text>收藏的店铺</text>
					</view>
					<view class="collection_item">
						<text>14</text>
						<text>收藏的商品</text>
					</view>
					<view class="collection_item">
						<text>18</text>
						<text>关注的商品</text>
					</view>
					<view class="collection_item">
						<text>84</text>
						<text>足迹</text>
					</view>
				</view>
			</uni-card>

			<!-- 订单栏 -->
			<uni-card note="Tips">
				<view class="order_card">
					<view class="order_title">
						我的订单
					</view>
					<view class="order_btn">
						<view class="order_item">
							<image src="/static/my-icons/icon1.png" class="order_image"></image>
							<text class="order_txt">待付款</text>
						</view>
						<view class="order_item">
							<image src="/static/my-icons/icon2.png" class="order_image"></image>
							<text class="order_txt">待收货</text>
						</view>
						<view class="order_item">
							<image src="/static/my-icons/icon3.png" class="order_image"></image>
							<text class="order_txt">退款/退货</text>
						</view>
						<view class="order_item">
							<image src="/static/my-icons/icon4.png" class="order_image"></image>
							<text class="order_txt">全部订单</text>
						</view>
					</view>
				</view>
			</uni-card>

			<!-- 辅助功能栏 -->
			<uni-card note="Tips">
				<view class="subsidiary">
					<view class="subsidiary_item">
						<text class="subsidiary_txt">收货地址</text>
						<uni-icons type="forward" size="15"></uni-icons>
					</view>
					<view class="subsidiary_item">
						<text class="subsidiary_txt">练习客服</text>
						<uni-icons type="forward" size="15"></uni-icons>
					</view>
					<view class="subsidiary_item">
						<text class="subsidiary_txt">退出登陆</text>
						<uni-icons type="forward" size="15"></uni-icons>
					</view>
				</view>
			</uni-card>

		</view>
	</view>
</template>

<script>
	export default {
		name: "my-userInfo",
		data() {
			return {

			};
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #f4f4f4;
	}

	.userImg {
		width: 100%;
		height: 40vh;
		background-color: #d81e06;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;

		.user_image {
			width: 200rpx;
			height: 200rpx;
			border-radius: 50%;
			border: 2px solid white;
			box-shadow: 10rpx 10rpx 10rpx rgba(0, 0, 0, .4);
		}

		.user_name {
			color: white;
			font-weight: 700;
			margin-top: 20rpx;
		}
	}

	.user_info {
		margin-top: -60rpx;
	}

	.user_collection {
		display: flex;
		align-items: center;
		justify-content: space-between;

		.collection_item {
			color: black;
			display: flex;
			font-size: 27rpx;
			align-items: center;
			flex-direction: column;
			justify-content: space-between;
		}
	}

	.order_card {

		.order_title {
			color: black;
			font-size: 30rpx;
			border-bottom: 1px solid #f1f1f1;
			padding-bottom: 20rpx;
		}

		.order_btn {
			display: flex;
			align-items: center;
			margin-top: 15rpx;
			justify-content: space-between;

			.order_item {
				display: flex;
				align-items: center;
				flex-direction: column;
				justify-content: space-between;

				.order_image {
					width: 70rpx;
					height: 70rpx;
				}

				.order_txt {
					color: black;
					font-size: 25rpx;
				}
			}
		}
	}


	.subsidiary {
		display: flex;
		height: 180rpx;
		flex-direction: column;
		justify-content: space-between;
		
		.subsidiary_item {
			display: flex;
			align-items: center;
			justify-content: space-between;

			.subsidiary_txt {
				color: black;
			}
		}
	}
</style>
