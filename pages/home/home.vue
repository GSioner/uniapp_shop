<template>
	<view>
		<search />
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="k in swiperList" :key="k['goods_id']">
				<navigator :url="`../../shop_goods/goods_detail/goods_detail?id=${k.goods_id}`"
					style="height: 330rpx;">
					<image :src="k['image_src']" style="width: 100%; height: 100%;" />
				</navigator>
			</swiper-item>
		</swiper>

		<!-- 分类导航 -->
		<view class="home_catitems">
			<navigator v-for="k in catitemsList" :key="k.name" class="cateitems" @click="navigateToPage(k.name)">
				<image :src="k.image_src" style="height: 100%; width: 100rpx;" />
			</navigator>
		</view>

		<!-- 楼层分类 -->
		<view class="floor" v-for="(k, i) in floorList" :key="i">
			<view class="floor_title">
				<image :src="k.floor_title.image_src" mode="widthFix" />
			</view>
			<view class="floor_items">
				<view class="floor_box" v-for="(item, index) in k['product_list']" :key="k.product_list.name">
					<image :src="item.image_src" @click="translateTo(k['product_list'][index])" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				swiperList: [], // 轮播图数据
				catitemsList: [], // 分类导航数据
				floorList: [] // 楼层数据
			};
		},
		methods: {
			// 获取轮播图
			async getSwiperData() {
				const {
					data: res
				} = await uni.$http.get('/home/swiperdata')
				console.log('swiper', res)
				if (res.meta.status !== 200) return uni.$msg()
				this.swiperList = res.message
				uni.$msg({
					title: '数据加载成功'
				})
			},
			// 获取分类导航
			async getCatitemsData() {
				const {
					data: res
				} = await uni.$http.get('/home/catitems')
				console.log('catitems', res)
				if (res.meta.status !== 200) return uni.$msg()
				this.catitemsList = res.message
				uni.$msg({
					title: '数据加载成功'
				})
			},
			// 分类导航跳转
			navigateToPage(str) {
				if (str === '分类') {
					uni.switchTab({
						url: '/pages/cate/cate'
					})
				}
			},
			// 获取楼层数据
			async getFloorData() {
				const {
					data: res
				} = await uni.$http.get('/home/floordata')
				console.log('floor', res)
				if (res.meta.status !== 200) return uni.$msg()
				this.floorList = res.message
				uni.$msg({
					title: '数据加载成功'
				})
			},
			// 楼梯图片跳转商品详情
			translateTo(data) {
				const res = data.navigator_url.replace(/[\s|\w|\d|\/]*\?/, '')
				console.log(res);
			}
		},
		onLoad() {
			this.getSwiperData()
			this.getCatitemsData()
			this.getFloorData()
		}
	}
</script>

<style lang="scss">
	.home_catitems {
		height: 110rpx;
		display: flex;
		justify-content: space-evenly;
		padding: 10rpx;

		.cateitems {
			height: 110rpx;
			flex: 1;
			display: flex;
			justify-content: center;
		}
	}

	.floor {
		width: 100%;
		height: 450rpx;
		margin-top: 20rpx;
		display: flex;
		flex-direction: column;
		box-sizing: border-box;
		padding: 0 10rpx;

		.floor_title {
			height: 60rpx;
			width: 100%;
		}

		.floor_items {
			flex: 1;
			height: 100%;
			width: 100%;
			display: grid;
			grid-template-rows: repeat(2, 1fr);
			grid-template-columns: repeat(3, minmax(auto, 33.33%)); // 允许列缩小以适合父容器并且不会导致溢出
			// grid-template-columns: repeat(3, 1fr); // Grid仅剩空间的百分比，1fr = 100%, .25fr = 25%
			grid-gap: 12rpx;

			.floor_box {
				&:nth-child(1) {
					grid-row-start: 1;
					grid-row-end: 3;
				}

				image { 
					height: 100%;
					width: 100%;
				}
			}
		}
	}
</style>
