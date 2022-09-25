<template>
	<block>
		<search />
		<view class="cateitemBox">
			<!-- 左侧分类侧边栏 -->
			<van-sidebar class="cate">
				<van-sidebar-item :title="k.cat_name" v-for="k in catelistData" :key="k.cat_id"
					@click="tapCatelist(k.children)">
				</van-sidebar-item>
			</van-sidebar>
			<!-- 右侧分类详情 -->
			<scroll-view scroll-y="true" :scroll-top="scrollTop" class="shops" :style="{height: scrollH + 'px'}">
				<view class="shopitem" v-for="k in cateitemList" :key="k.cat_id">
					<!-- 种类标题 -->
					<view class="title">{{k.cat_name}}</view>
					<!-- 种类子板块品牌 -->
					<view class="shopitemview">
						<view class="shopBox" v-for="item in k.children" :key="item.cat_id" @click="tapCateshop(item)">
							<!-- 品牌图片 -->
							<view class="imgBox">
								<image :src="item.cat_icon" class="img"></image>
							</view>
							<!-- 品牌介绍 -->
							<view class="txt">{{item.cat_name}}</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</block>
</template>

<script>
	export default {
		data() {
			return {
				scrollH: 0,
				catelistData: [], // 分类侧边栏导航
				cateitemList: [], // 激活的右侧商品分类项
				scrollTop: 0 // 右侧板块滚动条位置
			};
		},
		onLoad() {
			this.scrollH = uni.getSystemInfoSync().windowHeight + 180
			this.getCatelistData()
		},
		methods: {
			async getCatelistData() {
				const {
					data: res
				} = await uni.$http.get('/categories')
				console.log('categories', res)
				if (res.meta.status !== 200) return uni.$msg()
				this.catelistData = res.message
				this.cateitemList = res.message[0].children
				uni.$msg({
					title: '数据加载成功'
				})
			},
			tapCatelist(e) {
				this.cateitemList = [...e]
				this.scrollTop = this.scrollTop ? 0 : 1
			},
			tapCateshop(data) {
				uni.navigateTo({
					url: '/shop_goods/goods_list/goods_list?cid=' + data.cat_id
				})
			}
		}
	}
</script>

<style lang="scss">
	.cateitemBox {
		background-color: #fff;
		display: flex;
		height: 100%;

		.cate {
			height: 100%;
			position: fixed;
			width: 180rpx;
			overflow-y: scroll;
		}

		.shops {
			margin-left: 180rpx;
			display: block;
			display: flex;
			flex-direction: column;

			.shopitem {
				width: 100%;

				.title {
					width: 100%;
					height: 100rpx;
					text-align: center;
					font-weight: 700;
					line-height: 80rpx;
				}

				.shopitemview {
					display: grid;
					grid-template-columns: repeat(3, 1fr);
					grid-template-rows: auto;

					.shopBox {
						height: 150rpx;
						width: 100%;
						display: flex;
						flex-direction: column;

						.imgBox {
							height: 100%;
							width: 100%;
							padding: 5rpx 40rpx;
							box-sizing: border-box;

							.img {
								height: 100%;
								width: 100%;
							}
						}

						.txt {
							flex: 1;
							font-size: 20rpx;
							text-align: center;
						}
					}
				}
			}
		}
	}
</style>
