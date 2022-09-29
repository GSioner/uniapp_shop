<template>
	<view class="login">
		<!-- 登陆图标 -->
		<uni-icons type="contact-filled" size="110" color="#afafaf"></uni-icons>

		<!-- 登陆按钮 -->
		<button class="login_btn" @click="login">
			一键登录
		</button>

		<!-- 提示信息 -->
		<view class="login_txt">
			登陆后尽享更多权益
		</view>
	</view>
</template>

<script>
	export default {
		name: "my-login",
		data() {
			return {

			};
		},
		methods: {
			login() {
				this.$emit('login')
			}
		}
	}
</script>

<style lang="scss">
	page {
		background-color: #fff;
	}

	.login {
		width: 100%;
		height: 60vh;
		display: flex;
		overflow: hidden;
		position: relative;
		align-items: center;
		flex-direction: column;
		justify-content: center;
		background-color: #f6f9f6;

		&::after {
			content: '';
			bottom: -40rpx;
			width: 100%;
			height: 80rpx;
			position: absolute;
			background-color: #fff;
			border-radius: 50%;
		}
	}

	.login_btn {
		width: 80%;
		color: white;
		height: 80rpx;
		font-size: 35rpx;
		border-radius: 40rpx;
		background-color: #c00000;
		text-align: center;
		line-height: 80rpx;
		margin: 40rpx 0;

		&:active {
			background-color: #9a0000;
		}
	}

	.login_txt {
		font-size: 25rpx;
		color: #9a9a9a;
	}
</style>
