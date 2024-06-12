<template>
	<view class="container">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
			<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
				<text class='icon tn-icon-left-arrow'></text>
			</view>
			<view class="tn-flex tn-flex-col-center tn-flex-row-center">
				<text class="tn-text-bold tn-text-xl tn-color-black">登录您的账号</text>
			</view>
		</tn-nav-bar>
		<view class="login-container">
			<view class="login-form">
				<view class="logo">登录</view>
				<input v-model="email" type="text" placeholder="请输入邮箱" class="input" />
				<input v-model="password" type="password" placeholder="请输入密码" class="input" />
				<view class="button" @click="loginn">登录</view>
				<view class="register-link" @tap="goToRegister">没有账号？注册一个</view>
			</view>
		</view>
	</view>
</template>

<script>

	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'

	export default {
		name: 'TemplateHistory',
		mixins: [template_page_mixin],
		data() {
			return {
				email: '',
				password: '',
			};
		},
		methods: {
			goToRegister() {
				uni.redirectTo({
					url: 'enroll',
				});

				// uni.navigateTo({
				// 	url: 'enroll', // 注册页面路径
				// });
			},
			loginn() {
				// 检查邮箱和密码是否为空
				if (!this.email.trim() || !this.password.trim()) {
					uni.showToast({
						title: '请输入邮箱和密码',
						icon: 'none',
					});
					return;
				}
				// 发送登录请求
				uni.request({
					url: 'http://139.196.211.123:8081/employee/login',
					method: 'POST',
					data: {
						email: this.email,
						password: this.password,
					},
					success: (res) => {

						// 登录成功，跳转到首页或其他页面
						if (res.data.code === 200) {
							
							this.$store.commit('userLogin', {
								username: res.data.data.name,
								uid: res.data.data.id,
								phone: res.data.data.phone,
								mail: res.data.data.eamil,
								serveAt: res.data.data.serveAt,
								logisticId:res.data.data.logisticId,
							});
							
							uni.setStorage({
								key: 'login',
								data: '1',
								success: function() {
									console.log("login本地存储成功");
								}
							});
							console.log(uni.getStorageSync('login'));
							uni.setStorage({
								key: 'name',
								data: res.data.data.name,
								success: function() {
									console.log("name本地存储成功");
								}
							});
							uni.setStorage({
								key: 'email',
								data: res.data.data.eamil,
								success: function() {
									console.log("email本地存储成功", res.data.data.eamil);
								}
							});
							uni.setStorage({
								key: 'phone',
								data: res.data.data.phone,
								success: function() {
									console.log("phone本地存储成功");
								}
							});
							// 保存登录状态等操作
							uni.setStorage({
								key: 'id',
								data: res.data.data.id,
								success: function() {
									console.log("id本地存储成功");
								}
							});
							uni.setStorage({
								key: 'token',
								data: res.data.data.token,
								success: function() {
									console.log("token本地存储成功");
								}
							});
							
							uni.setStorage({
								key: 'serveat',
								data: res.data.data.serveAt,
								success: function() {
									console.log("serveat本地存储成功");
								}
							});
							uni.setStorage({
								key: 'logisticId',
								data: res.data.data.logisticId,
								success: function() {
									console.log("logisticId本地存储成功");
								}
							});
							uni.showToast({
								title: '登录成功',
								icon: 'success',
								duration: 500,
								//success: () => {},
							});

							console.log("登录跳转的验证日志，位于登录request=>success>")
							uni.navigateBack({
								url: '/pages/mine/mine',
							});

						} else {
							uni.showToast({
								title: res.data.message || '登录失败，请重试',
								icon: 'none',
							});
						}
					},
					fail: (error) => {
						uni.showToast({
							title: '登录失败，请检查网络连接',
							icon: 'none',
						});
						console.error('Login error:', error);
					},
				});
			},
		},
	};
</script>

<style scoped>
	.login-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #f5f5f5;
	}

	.login-form {
		width: 80%;
		max-width: 400px;
		padding: 20px;
		border-radius: 10px;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
	}

	.logo {
		font-size: 24px;
		font-weight: bold;
		text-align: center;
		margin-bottom: 20px;
	}

	.input {
		width: 90%;
		padding: 10px;
		margin-bottom: 15px;
		border: 1px solid #ccc;
		border-radius: 5px;
		font-size: 16px;
	}

	.button {
		width: 100%;
		padding: 10px;
		background-color: #409eff;
		color: #fff;
		text-align: center;
		border-radius: 5px;
		font-size: 16px;
		cursor: pointer;
	}

	.button:hover {
		background-color: #66b1ff;
	}

	.register-link {
		text-align: center;
		font-size: 14px;
		color: #007bff;
		margin-top: 10px;
		cursor: pointer;
	}

	.tn-custom-nav-bar__back {
		width: 60%;
		height: 100%;
		position: relative;
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		box-sizing: border-box;
		background-color: rgba(0, 0, 0, 0.15);
		border-radius: 1000rpx;
		border: 1rpx solid rgba(255, 255, 255, 0.5);
		color: #FFFFFF;
		font-size: 18px;

		.icon {
			display: block;
			flex: 1;
			margin: auto;
			text-align: center;
		}

	}


	.register-link:hover {
		text-decoration: underline;
	}
</style>