
// #ifndef VUE3
import Vue from 'vue'
import App from './App'

// 网络请求
import { $http } from '@escook/request-miniprogram'
uni.$http = $http
$http.baseUrl = 'https://api-hmugo-web.itheima.net/api/public/v1'

// 请求拦截器
$http.beforeRequest = function () {
	uni.showLoading({
		title: '数据加载中...'
	})
}

//响应拦截器
$http.afterRequest = function () {
  uni.hideLoading()
}

uni.$msg = function({title = '数据加载失败', icon = 'none'}) {
	uni.showToast({
		title:title,
		duration: 1500,
		icon: icon
	})
}

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif