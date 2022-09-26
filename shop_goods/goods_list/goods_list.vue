<template>
	<view :style="{height: wHeight + 'px', width: '100%'}">
		<!-- 商品列表单项 -->
		<view class="shopitems" v-for="k in shoplist" :key="k.goods_id" @click="toGoodsDetail(k.goods_id)">
			<!-- 图片展示 -->
			<image v-if="k.goods_big_logo" :src="k.goods_big_logo" class="img" />
			<text v-else class="img imgerror">图片丢失</text>
			<!-- 文字展示 -->
			<view class="txt">
				<text class="title">{{k.goods_name}}</text>
				<text class="price">{{k.goods_price.toFixed(2)}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				page: {
					pagenum: 1,
					pagesize: 10
				},
				shoplist: [],
				total: 0,
				wHeight: uni.getSystemInfoSync().windowHeight,
				flag: false
			};
		},
		async onLoad(options) {
			if (options.query) this.page.query = options.query
			if (options.cid) this.page.cid = options.cid
			this.getShopData()
		},
		async onReachBottom() {
			if (this.flag) return
			if (this.shoplist.length >= this.total) return uni.$msg({title: '所有商品展示完毕!'})
			this.flag = true
			this.page.pagenum +=  1
			this.getShopData()
			this.flag = false
		},
		async onPullDownRefresh() {
			this.page.pagenum = 1
			this.shoplist = []
			this.getShopData(() => uni.stopPullDownRefresh())
		},
		methods: {
			async getShopData(callback) {
				const {
					data: res
				} = await uni.$http.get('/goods/search', this.page)
				if (res.meta.status !== 200) return
				this.shoplist = [...this.shoplist, ...res.message.goods]
				this.total = res.message.total
				callback && callback()
				uni.$msg({
					title: '数据刷新成功'
				})
			},
			toGoodsDetail(id) {
				uni.navigateTo({
					url: '/shop_goods/goods_detail/goods_detail?goods_id=' + id
				})
			}
		}
	}
</script>

<style lang="scss">
	.shopitems {
		background-color: #fff;
		height: 240rpx;
		width: 100%;
		border-bottom: 2rpx solid #f5f5f5;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 25rpx;
		box-sizing: border-box;

		.img {
			width: 210rpx;
			height: 100%;
			margin-right: 20rpx;
		}

		.txt {
			height: 100%;
			flex: 1;
			display: flex;
			flex-direction: column;
			justify-content: space-between;

			.title {
				font-size: 25rpx;
			}

			.price {
				font-size: 30rpx;
				color: #c32358;

				&:before {
					content: '￥';
					color: #c32358;
					font-size: 27rpx;
				}
			}
		}
	}

	.imgerror {
		text-align: center;
		line-height: 200rpx;
		color: #ccc;
		border: 1rpx dotted #ccc;
	}
</style>
