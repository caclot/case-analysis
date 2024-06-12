<template>
	<view class="container">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
			<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
				<text class='icon tn-icon-left-arrow'></text>
			</view>
			<view class="tn-flex tn-flex-col-center tn-flex-row-center">
				<text class="tn-text-bold tn-text-xl tn-color-black">登录登录</text>
			</view>
		</tn-nav-bar>

		<view class="register-container">
			<view class="register-form">
				<view class="logo">注册</view>
				<input v-model="name" type="text" placeholder="请输入姓名" class="input" />
				<input v-model="phonenum" type="text" placeholder="请输入手机号" class="input" />
				<input v-model="email" type="text" placeholder="请输入邮箱" class="input" />
				<input v-model="password" type="password" placeholder="请输入密码" class="input" />
				<view class="picker" @click="onPickAddress()">
					<view v-if="address">{{address}}</view>
					<view style="color:#999;font-size:32rpx" v-else>省、市、区</view>
				</view>
				<pickAdress :isOpen="isPickAddressShow" @close="onCloseAddress" @bindChage="onBindChageAddress">
				</pickAdress>
				<view class="button" @tap="register">注册</view>
				<view class="login-link" @tap="goToLogin">已有账号？登录</view>
			</view>
		</view>
	</view>
</template>

<script>
	import pickAdress from '@/components/pick-address.vue'
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateHistory',
		mixins: [template_page_mixin],
		components: {
			pickAdress,
		},
		data() {
			return {
				name: '',
				email: '',
				phonenum: '',
				password: '',
				logistics: '',
				isPickAddressShow: false,
				selectAddress: {},
				address: '',
			};
		},
		methods: {
			onPickAddress() {
				console.log("弹出选择框");
				if (this.authState) return
				this.isPickAddressShow = true
			},
			onCloseAddress(type, data) {
				this.isPickAddressShow = false
			},
			onBindChageAddress(data) {
				this.selectAddress = data
				this.address = data.area1_name + data.area2_name + data.area3_name
				this.logistics = data.area3_code
				this.isPickAddressShow = false
			},
			register() {

				// 检查输入是否为空
				if (!this.name.trim() || !this.phonenum.trim() || !this.email.trim() || !this.password.trim()) {
					uni.showToast({
						title: '请输入完整信息',
						icon: 'none',
					});
					return;
				}
				// 检查密码和确认密码是否一致
				// 发送注册请求
				uni.request({
					url: 'http://139.196.211.123:8081/employee/enroll',
					method: 'POST',
					data: {
						name: this.name,
						phone: this.phonenum,
						email: this.email,
						password: this.password,
						serveAt: this.logistics,
					},
					success: (res) => {
						if (res.data.code === 200) {
							uni.showToast({
								title: '注册成功',
								icon: 'success',
								duration: 2000,
								success: () => {
									uni.navigateTo({
										url: 'login',
									});
								},
							});
						} else {
							uni.showToast({
								title: res.data.message || '注册失败，请重试',
								icon: 'none',
							});
						}
					},
					fail: (error) => {
						uni.showToast({
							title: '注册失败，请检查网络连接',
							icon: 'none',
						});
						console.error('Registration error:', error);
					},
				});
			},
			goToLogin() {
				uni.redirectTo({
					url: 'login',
				});

			},


		},
	};
</script>

<style scoped>
	.register-container {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 100vh;
		background-color: #f5f5f5;
	}

	.register-form {
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

	.picker {
		width: 96%;
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

	.login-link {
		text-align: center;
		font-size: 14px;
		color: #007bff;
		margin-top: 10px;
		cursor: pointer;
	}

	.login-link:hover {
		text-decoration: underline;
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