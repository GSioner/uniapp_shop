<template>
	<view>
		<view v-if="cart.length">
			<!-- 收获地区 -->
			<my-address @click="addAddress"></my-address>

			<!-- 购物车标题 -->
			<view class="cart_title">
				<uni-icons type="shop" size="20" />
				<text class="title_txt">购物车</text>
			</view>

			<!-- 购物车商品项 -->
			<view class="shopItem">
				<uni-swipe-action>
					<uni-swipe-action-item :right-options="option" @click="deleteGoods(k.goods_id)"
						v-for="(k, i) in cart" :key="i">
						<view class="items">
							<!-- 商品选中项 -->
							<view class="items_choice" @click="tapChoice(k.goods_id)">
								<radio :checked="k.goods_state" color="#c00000" />
							</view>
							<!-- 商品图片 -->
							<view class="items_img">
								<image :src="k.goods_small_logo" />
							</view>
							<!-- 商品信息+价格 -->
							<view class="items_text">
								<view>
									{{k.goods_name}}
								</view>
								<view class="text_price">
									{{k.goods_price.toFixed(2)}}
								</view>
								<!-- 步进器 -->
								<view class="stepper">
									<text class="step_btn" :disabled="k.goods_count <= 1"
										:class="{disabled: k.goods_count <= 1}" @click="rdsCount(k.goods_id)">-</text>
									<text class="step_goodscount">{{k.goods_count}}</text>
									<text class="step_btn" @click="addCount(k.goods_id)">+</text>
								</view>

							</view>
						</view>
					</uni-swipe-action-item>
				</uni-swipe-action>
			</view>

			<!-- 价格总计+支付按钮 -->
			<my-settle @checkAll="checkAll"></my-settle>
		</view>

		<!-- 空购物车 -->
		<view class="empty" v-else>
			<image src="../../static/cart_empty@2x.png" class="empty_img"></image>
			<text class="empty_txt">空空如也~</text>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				value: 1,
				option: [{
					text: '删除',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		onLoad() {
			this.getCartNum()
		},
		computed: {
			...mapGetters(['cart'])
		},
		methods: {
			...mapMutations('cart', ['ADD_CART_COUNT', 'REDUCE_CART_COUNT', 'CHOICE_CART_GOODS', 'DELETE_CART_GOODS',
				'CHOOSE_ALL_GOODS'
			]),
			onChange(value) {
				console.log(value);
			},
			tapChoice(id) {
				this.CHOICE_CART_GOODS(id)
				this.getCartNum()
			},
			rdsCount(id) {
				this.REDUCE_CART_COUNT(id)
				this.getCartNum()
			},
			addCount(id) {
				this.ADD_CART_COUNT(id)
				this.getCartNum()
			},
			getCartNum() {
				const num = this.cart.filter(item => item.goods_state).reduce((prev, next) => prev + next.goods_count, 0)
				uni.setStorageSync('cartNum', num)
				uni.setTabBarBadge({
					index: 2,
					text: uni.getStorageSync('cartNum') + ''
				})
			},
			deleteGoods(id) {
				this.DELETE_CART_GOODS(id)
				this.getCartNum()
			},
			checkAll(e) {
				this.CHOOSE_ALL_GOODS(e)
				this.getCartNum()
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.shopItem {
		padding-bottom: 80rpx;
	}

	.cart_title {
		width: 100%;
		height: 70rpx;
		display: flex;
		padding: 0 10rpx;
		font-size: 26rpx;
		align-items: center;
		border-bottom: 1px solid #e5e5e5;

		.title_txt {
			margin-left: 10rpx;
		}
	}

	.items {
		width: 100%;
		height: 220rpx;
		box-sizing: border-box;
		padding: 10rpx 20rpx 10rpx 10rpx;
		border-bottom: 1px solid #e5e5e5;
		display: flex;
		justify-content: space-between;

		.items_choice {
			width: 0;
			height: 100%;
			display: flex;
			align-items: center;
			margin-right: 10rpx;
		}

		.items_img {
			margin-left: 50rpx;
			margin-right: 10rpx;

			image {
				height: 100%;
				width: 200rpx;
			}
		}

		.items_text {
			color: #4b4b4b;
			font-size: 24rpx;
			position: relative;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.text_price {
				color: #cb1804;
				font-size: 28rpx;

				&:before {
					content: '￥';
				}
			}
		}
	}

	.stepper {
		right: 2%;
		bottom: 0%;
		height: 60rpx;
		width: 200rpx;
		position: absolute;
		align-items: center;
		border: 1px solid #eaeaea;
		display: flex;
		justify-content: space-between;

		.step_btn {
			border: 0;
			outline: 0;
			width: 60rpx;
			height: 100%;
			font-size: 28rpx;
			line-height: 60rpx;
			text-align: center;
			background-color: #fafafa;
		}

		.step_goodscount {
			flex: 1;
			text-align: center;
			line-height: 60rpx;
		}
	}

	.disabled {
		color: #ccc;
	}
	
	.empty {
		height: 80vh;
		width: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		
		.empty_img{
			width: 200rpx;
			height: 200rpx;
		}
		
		.empty_txt{
			margin-top: 20rpx;
			color: #ccc;
		}
	}
</style>
