<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" style="height: 750rpx;">
			<swiper-item v-for="(k, i) in goodsData.pics" :key="k.pics_id" @click="previewImage(i)">
				<image :src="k.pics_sma" class="swiper-item" style="width: 100%;height: 100%;" />
			</swiper-item>
		</swiper>
		<!-- 价格+标题 -->
		<view class="title" v-if="goodsData.goods_name">
			<!-- 价格 -->
			<view class="price">
				{{goodsData.goods_price}}
			</view>
			<view class="txt">
				<!-- 商品介绍 -->
				<text class="msg">{{goodsData.goods_name}}</text>
				<!-- 收藏开关 -->
				<view class="collection" @click="activeCollecte">
					<vanIcon v-if="activeBtn" name="star-o" class="icon" />
					<vanIcon v-else name="star" class="icon red" />
					<text :class="{red: !activeBtn}">收藏</text>
				</view>
			</view>
			<!-- 快递福利 -->
			<view class="express">
				<text>快递：</text>
				<text>免邮费</text>
			</view>
		</view>

		<!-- 商品详情 -->
		<mp-html :content="goodsData.goods_introduce" class="richTxt" />

		<!-- 加入购物车底部按钮 -->
		<view class="uni-container">
			<uni-goods-nav :fill="true" :options="options" :button-group="customButtonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import vanIcon from '../../static/vant/icon/index'
	export default {
		components: {
			vanIcon
		},
		data() {
			return {
				goodsData: {},
				wHeight: uni.getSystemInfoSync().windowHeight,
				activeBtn: true,
				preivewImgList: [],
				options: [{
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#ff0000',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				customButtonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			};
		},
		onLoad(options) {
			this.getGoodsData(options.goods_id)
		},
		watch: {
			goodsData() {
				this.preivewImgList = this.goodsData.pics.map(item => item.pics_big)
			}
		},
		methods: {
			async getGoodsData(str) {
				const {
					data: res
				} = await uni.$http.get('/goods/detail', {
					goods_id: str
				})
				console.log(res)
				if (res.meta.status !== 200) return
				res.message.goods_introduce = res.message.goods_introduce.replace(/webp/g, 'jpg')
				this.goodsData = res.message
			},
			activeCollecte() {
				this.activeBtn = !this.activeBtn
				if (!this.activeBtn) return uni.$msg({
					title: '收藏成功!'
				})
			},
			previewImage(i) {
				wx.previewImage({
					current: this.preivewImgList[i],
					urls: this.preivewImgList
				})
			},
			onClick(e) {
				if (e.index) uni.switchTab({
					url: '/pages/cart/cart'
				})
			},
			buttonClick(e) {
				console.log(e.index)
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.title {
		padding: 20rpx;

		.price {
			color: #ca3e40;
			font-size: 45rpx;
			margin-bottom: 25rpx;

			&:before {
				content: '￥';
				font-size: 40rpx;
			}
		}

		.txt {
			display: flex;
			justify-content: space-between;
			align-items: center;

			.msg {
				font-size: 30rpx;
			}

			.collection {
				height: 100%;
				width: 200rpx;
				padding-left: 20rpx;
				display: flex;
				flex-direction: column;
				color: #c8c8c8;
				font-size: 30rpx;
				text-align: center;
				border-left: 1rpx solid #f0f0f0;
				gap: 2rpx;
			}
		}

		.express {
			font-size: 28rpx;
			color: #9e9e9e;
			margin-top: 20rpx;
		}
	}

	.red {
		color: #ca3e40;
	}

	.bigImg {
		background-color: #000;
		position: fixed;
		z-index: 9999;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.richTxt {
		padding-bottom: 50px;

		image {
			display: inherit;
		}
	}

	.uni-container {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>
