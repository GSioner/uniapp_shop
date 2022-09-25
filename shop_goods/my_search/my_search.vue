<template>
	<view>
		<!-- 搜索输入框 -->
		<vanSearch :value="value" @change="onInput" @search="onChange" @clear="onClear" shape="round"
			background="#d81e06" placeholder="请输入搜索关键词" class="searchBox" />
		<!-- 中心内容 -->
		<view class="mainContent">
			<!-- 搜索历史模块 -->
			<view v-if="showHistory">
				<view class="search_history">
					<text style="font-size: 28rpx;">搜索历史</text>
					<vanIcon name="delete-o" @click="deleteIcon = !deleteIcon" />
				</view>
				<view class="history">
					<text v-for="(k, i) in historyData" :key="i" @click="tapHistoryKey(k,i)"
						:class="{delete: deleteIcon}">{{k}}</text>
				</view>
			</view>
			<!-- 联想建议列表模块 -->
			<view v-else>
				<view class="list" v-for="k in suggestionData" :key="k.goods_id" @click="toShoplistPage(k)">
					<text class="txt">{{k.goods_name}}</text>
					<van-icon name="arrow" />
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import vanSearch from '../../static/vant/search/index'
	import vanIcon from '../../static/vant/icon/index'
	export default {
		components: {
			vanSearch,
			vanIcon
		},
		data() {
			return {
				value: '',
				historyData: uni.getStorageSync('history') || '',
				showHistory: true,
				suggestionData: [],
				deleteIcon: false
			};
		},
		methods: {
			async onInput(e) {
				if (e) this.value = e
				const {
					data: res
				} = await uni.$http.get('/goods/qsearch', {
					query: this.value
				})
				console.log('qsearch', res)
				if (res.meta.status !== 200) return
				if (!res.message.length) {
					this.suggestionData = []
					return uni.$msg({
						title: '暂未搜索到内容'
					})
				}
				this.suggestionData = res.message
				this.showHistory = false
				uni.$msg({
					title: '数据加载成功'
				})
			},
			onChange(e) {
				if (this.historyData.length) {
					this.updateHistoryList(e)
					uni.setStorageSync('history', this.historyData)
				} else {
					uni.setStorageSync('history', [e])
				}
				this.value = e
				this.onInput()
			},
			onClear() {
				this.historyData = uni.getStorageSync('history')
				this.value = ''
				this.showHistory = true
			},
			async tapHistoryKey(k, i) {
				if (this.deleteIcon) {
					this.historyData.splice(i, 1)
					uni.setStorageSync('history', this.historyData)
				} else {
					uni.navigateTo({
						url: '/shop_goods/goods_list/goods_list?query=' + k
					})
				}
			},
			toShoplistPage(data) {
				uni.navigateTo({
					url: '/shop_goods/goods_list/goods_list?goods_id=' + data.goods_id
				})
			},
			updateHistoryList(k) {
				const set = new Set(this.historyData)
				set.delete(k)
				set.add(k)
				this.historyData = Array.from(set)
				this.historyData = [...this.historyData].reverse()
			}
		}
	}
</script>

<style lang="scss">
	.searchBox {
		width: 100%;
		box-sizing: border-box;
		position: fixed;
	}

	.mainContent {
		padding-top: 90rpx;

		.search_history {
			padding: 0 20rpx;
			display: flex;
			justify-content: space-between;
			align-items: center;
			box-sizing: border-box;
			height: 70rpx;
			width: 100%;
			border-bottom: 1px solid #ccc;
		}

		.history {
			padding: 20rpx 30rpx;
			height: 100%;
			width: 100%;
			box-sizing: border-box;
			font-size: 28rpx;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			gap: 35rpx;

			text {
				background-color: #eaeaea;
				padding: 15rpx 25rpx;
				border-radius: 20rpx;
			}
		}

		.list {
			box-sizing: border-box;
			padding: 0 10rpx;
			height: 90rpx;
			width: 100%;
			border: 1px solid #ccc;
			display: flex;
			justify-content: space-between;
			align-items: center;

			.txt {
				flex: 1;
				white-space: nowrap;
				font-size: 28rpx;
				overflow: hidden;
				text-overflow: ellipsis;
			}
		}
	}

	.van-search {
		height: 90rpx;
	}

	.delete {
		&:after {
			content: 'x';
			position: fixed;
			font-size: 18rpx;
			width: 25rpx;
			height: 25rpx;
			border-radius: 50%;
			background-color: #bfbfbf;
			text-align: center;
			line-height: 20rpx;
			color: white;
		}
	}
</style>
