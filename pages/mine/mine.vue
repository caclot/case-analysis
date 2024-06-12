<template>
	<view class="page-e tn-safe-area-inset-bottom">
		<!-- 顶部自定义导航 -->
		<!-- <tn-nav-bar :isBack="false" :bottomShadow="false" backgroundColor="none">
      <view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left" @click="tn('/minePages/message')">
        <view class="custom-nav__back">
          <view class="tn-icon-notice tn-color-gray" style="font-size: 50rpx;">
          </view>
        </view>
      </view>
    </tn-nav-bar> -->

		<view class="top-backgroup">
			<image src='/static/images/mineBack.png' mode='widthFix' class='backgroud-image'>
			</image>
		</view>

		<view class="tn-margin-left tn-margin-right " :style="{paddingTop: vuex_custom_bar_height + 'px'} ">
			<!-- 图标logo/头像 -->
			<view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-bottom" style="margin-top: -450rpx;">
				<view class="justify-content-item">
					<view class="tn-flex tn-flex-col-center tn-flex-row-left">
						<view class="logo-pic tn-shadow" @click="tn('/minePages/info')">
							<view class="logo-image">
								<view class="tn-shadow-blur"
									style="background-image:url('/static/images/5.jpg');width: 110rpx;height: 110rpx;background-size: cover;overflow: hidden;">
								</view>
							</view>
						</view>
						<view class="tn-padding-right">
							<view class="tn-padding-right tn-paddin g-left-sm">
								<text class="tn-color-wallpaper tn-text-xl tn-text-bold">{{username}}</text>
								<!-- <text class=" tn-round tn-text-xs tn-bg-red tn-color-white tn-margin-left-sm" style="padding: 10rpx 20rpx;">
                  未实名
                </text> -->
							</view>
							<view class="tn-padding-right tn-padding-top-xs tn-padding-left-sm tn-text-ellipsis"
								@click="copyUid">
								<text class="tn-color-gray">Uid: {{uid}}</text>
								<text class="tn-color-blue--disabled tn-padding-left-xs tn-text-sm tn-icon-copy"></text>
							</view>
						</view>

					</view>
				</view>
				<view class="justify-content-item" @click="tn('/minePages/set')">
					<view class="tn-icon-install tn-color-gray" style="font-size: 50rpx;opacity: 0.5;">
					</view>
				</view>
			</view>

			<!-- 没有授权，则显示这个授权按钮 -->
			<view v-show="!login" class="tn-flex tn-flex-row-between" @click="tn('/minePages/login')">
				<view class="tn-flex-1 justify-content-item tn-margin-xs tn-text-center">
					<tn-button shape="round" backgroundColor="#1D2541" fontColor="#ffffff" padding="20rpx 0" width="40%"
						shadow>
						<text class="tn-padding-right-xs tn-text-xl"></text>
						<text class="">点击登录</text>
					</tn-button>
				</view>
			</view>
			<view class="wallpaper-shadow tn-margin-top-lg tn-padding-top-sm tn-padding-bottom-sm tn-bg-white">

				<view class="tn-flex tn-flex-row-center tn-radius tn-padding-top">
					<view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/minePages/order')">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view
								class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-blue--light">
								<view class="tn-icon-order tn-color-wallpaper"></view>
							</view>
							<view class="tn-text-center">
								<text class="tn-text-ellipsis">全部订单</text>
							</view>
						</view>
					</view>
					<view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/homePages/member')">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view
								class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-blue--light">
								<view class="tn-icon-vip tn-color-wallpaper"></view>
							</view>
							<view class="tn-text-center">
								<text class="tn-text-ellipsis">会员权益</text>
							</view>
						</view>
					</view>
					<view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/minePages/info')">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view
								class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-blue--light">
								<view class="tn-icon-identity tn-color-wallpaper"></view>
							</view>
							<view class="tn-text-center">
								<text class="tn-text-ellipsis">个人信息</text>
							</view>
						</view>
					</view>
					<view class="tn-padding-sm tn-margin-xs tn-radius" @click="tn('/minePages/help')">
						<view class="tn-flex tn-flex-direction-column tn-flex-row-center tn-flex-col-center">
							<view
								class="icon12__item--icon tn-flex tn-flex-row-center tn-flex-col-center tn-bg-blue--light">
								<view class="tn-icon-help tn-color-wallpaper"></view>
							</view>
							<view class="tn-text-center">
								<text class="tn-text-ellipsis">常见问题</text>
							</view>
						</view>
					</view>

				</view>
			</view>

			<view class="wallpaper-shadow tn-margin-top-lg tn-margin-bottom-lg tn-padding-top-sm tn-padding-bottom-sm">
				<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30">
					<button class="tn-flex tn-flex-col-center tn-button--clear-style" open-type="contact">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center"
							style="color: #7C8191;">
							<view class="tn-icon-service-fill"></view>
						</view>
						<view class="tn-flex tn-flex-row-between" style="width: 100%;">
							<view class="tn-margin-left-sm">关于我们</view>
							<view class="tn-color-gray tn-icon-right"></view>
						</view>
					</button>
				</tn-list-cell>
				<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30">
					<button class="tn-flex tn-flex-col-center tn-button--clear-style" open-type="feedback">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center"
							style="color: #7C8191;">
							<view class="tn-icon-tip-fill"></view>
						</view>
						<view class="tn-flex tn-flex-row-between" style="width: 100%;">
							<view class="tn-margin-left-sm">问题反馈</view>
							<view class="tn-color-gray tn-icon-right"></view>
						</view>
					</button>
				</tn-list-cell>
				<tn-list-cell :hover="true" :unlined="true" :radius="true" :fontSize="30" @click="callPhoneNumber"
					data-number="18266666666">
					<view class="tn-flex tn-flex-col-center">
						<view class="icon1__item--icon tn-flex tn-flex-row-center tn-flex-col-center"
							style="color: #7C8191;">
							<view class="tn-icon-tel-circle-fill"></view>
						</view>
						<view class="tn-margin-left-sm tn-flex-1">技术热线</view>
						<view
							class="tn-margin-left-sm tn-color-wallpaper tn-text-sm tn-padding-left-xs tn-padding-right-xs tn-bg-gray--light tn-round" @click="callPhoneNumber">
							只有帅的人才能看见</view>
					</view>
				</tn-list-cell>
			</view>

		</view>


		<view v-show="login">
			<!-- 退出登录按钮 -->
			<view class="logout-button" @click="showLogoutConfirmDialog">退出登录</view>

			<!-- 确认退出弹窗 -->
			<view class="confirm-dialog" v-show="showConfirmDialog" style="z-index: 999;">
				<view class="dialog-box">
					<view class="dialog-content">
						<view class="dialog-message">确认退出？</view>
						<view class="dialog-buttons">
							<view class="confirm-button" @click="confirmLogout">确定</view>
							<view class="cancel-button" @click="cancelLogout">取消</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class='tn-tabbar-height'></view>

	</view>
</template>

<script>
	import {
		mapGetters,
		mapActions
	} from 'vuex';
	export default {
		name: 'Mine',
		computed: {
			username() {
				return this.$store.state.username;
			},
			uid() {
				return this.$store.state.uid;
			},
			phone() {
				return this.$store.state.phone;
			},
			mail() {
				return this.$store.state.mail;
			},
			area() {
				return this.$store.state.area;
			},
			login() {
				return this.$store.state.login;
			},
		},
		methods: {
			
		},
		data() {
			return {
				show1: false,

				showConfirmDialog: false, // 是否显示确认退出弹窗
			}
		},
		mounted() {
			console.log('mine页面生命周期');
		},
		methods: {
			// 跳转
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},

			// 跳转到图鸟UI
			navTuniaoUI() {
				uni.navigateToMiniProgram({
					appId: 'wxf3d81a452b88ff4b'
				})
			},

			// 收货地址
			navAddress() {
				uni.chooseAddress({})
			},

			// 单纯短震动
			short() {
				wx.vibrateShort();
			},

			//拨打固定电话
			callPhoneNumber() {
				uni.makePhoneCall({
					phoneNumber: "19838166025",
				});
			},
			// 复制id
			copyUid() {
				wx.vibrateShort();
				uni.setClipboardData({
					data: "10262008",
				})
			},
			showLogoutConfirmDialog() {
				this.showConfirmDialog = true;
			},
			// 点击确认退出按钮
			confirmLogout() {
				// 调用退出登录方法
				this.stateLogout();
				// 刷新界面
				// 可以重新加载当前页面或者跳转到登录页面等操作
				// uni.reLaunch({ url: '/pages/login/index' });
				uni.showToast({
					title: '退出登录成功',
					icon: 'none',
				});
				this.showConfirmDialog = false; // 隐藏确认退出弹窗
			},
			// 点击取消按钮，隐藏确认退出弹窗
			cancelLogout() {
				this.showConfirmDialog = false;
			},

			// 退出登录方法，这里用一个示例方法代替
			stateLogout() {
				uni.setStorage('name', '未命名');
				uni.setStorage('uid', '请先登录');
				uni.setStorage('email', '0');
				uni.setStorage('phone', '0');
				uni.setStorage('login', false);
				console.log(uni.getStorage('name'));
				this.$store.commit('userLogout');
				uni.navigateTo({
					url: 'mine',
				})
				// 这里可以写退出登录的逻辑，比如清除本地缓存、清空登录状态等操作
				// uni.removeStorageSync('token'); // 清除登录凭证
			},
		}
	}
</script>

<style lang="scss" scoped>
	.page-e {
		max-height: 100vh;
	}

	/* 底部安全边距 start*/
	.tn-tabbar-height {
		min-height: 120rpx;
		height: calc(140rpx + env(safe-area-inset-bottom) / 2);
		height: calc(140rpx + constant(safe-area-inset-bottom));
	}

	.tn-color-wallpaper {
		color: #1D2541;
	}


	/* 自定义导航栏内容 start */
	.custom-nav {
		height: 100%;

		&__back {
			margin: auto 5rpx;
			font-size: 40rpx;
			margin-right: 10rpx;
			flex-basis: 5%;
			width: 100rpx;
			position: absolute;
		}
	}

	/* 自定义导航栏内容 end */

	/* 顶部背景图 start */
	.top-backgroup {
		height: 450rpx;
		z-index: -1;

		.backgroud-image {
			width: 100%;
			height: 450rpx;
			z-index: -1;
		}
	}

	/* 顶部背景图 end */


	/* 图标容器5 start */
	.icon5 {
		&__item {
			// width: 30%;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 0rpx;
			margin: 0rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 96rpx;
				height: 96rpx;
				border-radius: 50%;
				margin-bottom: 18rpx;
				position: relative;
				z-index: 1;
			}
		}
	}

	/* 用户头像 start */
	.logo-image {
		width: 110rpx;
		height: 110rpx;
		position: relative;
		overflow: hidden;
		border-radius: 50%;
	}

	.logo-pic {
		background-size: cover;
		background-repeat: no-repeat;
		// background-attachment:fixed;
		background-position: top;
		border: 8rpx solid rgba(255, 255, 255, 0.05);
		box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.15);
		border-radius: 50%;
		overflow: hidden;
		// background-color: #FFFFFF;
	}

	/* 页面阴影 start*/
	.wallpaper-shadow {
		border-radius: 15rpx;
		box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);
	}

	/* 页面阴影 end*/


	/* 图标容器12 start */
	.icon12 {
		&__item {
			width: 30%;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 30rpx;
			margin: 20rpx 10rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 15rpx;
				height: 15rpx;
				font-size: 50rpx;
				border-radius: 50%;
				margin-bottom: 38rpx;
				position: relative;
				z-index: 1;

				&::after {
					content: " ";
					position: absolute;
					z-index: -1;
					width: 100%;
					height: 100%;
					left: 0;
					bottom: 0;
					border-radius: inherit;
					opacity: 1;
					transform: scale(1, 1);
					background-size: 100% 100%;

				}
			}
		}
	}

	/* 图标容器1 start */
	.icon1 {
		&__item {
			// width: 30%;
			background-color: #FFFFFF;
			border-radius: 10rpx;
			padding: 30rpx;
			margin: 20rpx 10rpx;
			transform: scale(1);
			transition: transform 0.3s linear;
			transform-origin: center center;

			&--icon {
				width: 40rpx;
				height: 40rpx;
				font-size: 40rpx;
				border-radius: 50%;
				position: relative;
				z-index: 1;

				&::after {
					content: " ";
					position: absolute;
					z-index: -1;
					width: 100%;
					height: 100%;
					left: 0;
					bottom: 0;
					border-radius: inherit;
					opacity: 1;
					transform: scale(1, 1);
					background-size: 100% 100%;
					background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg.png);
				}
			}
		}
	}

	.logout-button {
		width: 80%;
		margin: 20px auto;
		padding: 15px;
		border-radius: 30px;
		background-color: rgba(255, 0, 0, 0.3);
		color: #fff;
		text-align: center;
		font-size: 16px;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
	}

	/* 确认退出弹窗样式 */
	.confirm-dialog {
		position: fixed;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: rgba(0, 0, 0, 0.5);
	}

	.dialog-box {
		width: 80%;
		max-width: 300px;
	}

	.dialog-content {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
	}

	.dialog-message {
		padding: 20px;
		text-align: center;
		font-size: 16px;
	}

	.dialog-buttons {
		display: flex;
	}

	.confirm-button,
	.cancel-button {
		flex: 1;
		padding: 15px 0;
		text-align: center;
		color: #007aff;
		font-size: 16px;
		box-shadow: 0 0 1px rgba(0, 0, 0, 0.5);
	}

	.confirm-button {
		border-top: 1px solid #e6e6e6;
	}

	.cancel-button {
		border-right: 1px solid #e6e6e6;
	}
</style>