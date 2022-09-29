<template>
	<view class="settlt_box">
		<label class="radio" @click="checkAll">
			<radio :checked="chooseAll" color="#c00000" /><text>全选</text>
		</label>
		<view class="settlt_cost">
			<text>合计:</text>
			<text class="settlt_price">{{cost.toFixed(2)}}</text>
		</view>
		<view class="settle_btn" @click="paypal">
			<text>结算(<text>{{total}}</text>)</text>
		</view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex'
	export default {
		name: "my-settle",
		computed: {
			...mapGetters(['cart', 'myAddress', 'token']),
		},
		watch: {
			cart: {
				deep: true,
				immediate: true,
				handler() {
					this.chooseAll = this.cart.every(item => item.goods_state)
					this.cost = this.cart.filter(item => item.goods_state).reduce((prev, next) => prev += (next.goods_count * next.goods_price), 0)
					this.total = this.cart.filter(item => item.goods_state).reduce((prev, next) => prev += next.goods_count, 0)
				}
			}
		},
		data() {
			return {
				chooseAll: false,
				cost: 0,
				total: 0
			};
		},
		methods: {
			checkAll() {
				this.chooseAll = !this.chooseAll
				this.$emit('checkAll', this.chooseAll)
			},
			paypal() {
				if (!this.total) return uni.$msg({title: '请选择商品', icon: 'error'})
				if (!this.myAddress.length) return uni.$msg({title: '请选择收货地址', icon: 'error'})
				if (!this.token) return uni.$msg({title: '请先登陆', icon: 'error'})
				this.$emit('paypal')
			}
		}
	}
</script>

<style lang="scss">
	.settlt_box {
		left: 0;
		bottom: 0;
		width: 100%;
		height: 80rpx;
		position: fixed;
		font-size: 30rpx;
		padding-left: 15rpx;
		background-color: #fff;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.settlt_cost {
		padding-bottom: 10rpx;

		.settlt_price {
			color: #c00000;

			&:before {
				content: '￥';
			}
		}
	}

	.settle_btn {
		color: white;
		height: 100%;
		width: 200rpx;
		text-align: center;
		padding-left: 10rpx;
		line-height: 80rpx;
		background-color: #c00000;
		
		&:active {
			background-color: #d00000;
		}
	}
</style>
