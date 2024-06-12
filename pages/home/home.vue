<template>
	<view class="template-order">
		<!-- 顶部自定义导航 -->


		<view class="order--wrap" :style="{top: vuex_custom_bar_height  +'px'}" v-if="serveAtpermission">
			<!-- 顶部标签 -->
			<view class="tn-bg-white">
				<tn-tabs-swiper class="order__tabs tn-text-xl" ref="tabs" activeColor="#3165CC" inactiveColor="#080808"
					:list="list" :current="tabsIndex" :isScroll="false" @change="tabsChange" @click="fetchPackages()"></tn-tabs-swiper>
			</view>


			<!-- 标签内容 -->
			<swiper class="order__swiper" :style="{top: `${swiperTop}px`, height: `${swiperHeight}px`}"
				:current="swiperIndex" @transition="swiperTransition" @animationfinish="swiperAnimationFinish">

				<swiper-item class="order__swiper__item">
					<scroll-view :style="{height: `${swiperHeight}px`}" scroll-y>
						<view v-for="(item, index) in unpickedpackages" :key="item.id" class="order__item">
							<view @click="toPickupPage(item.id,item.receiverAddress)">
								<view
									class="order__item__head tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between">
									<view class="order__item__head__title">
										<text class="tn-text-bold">订单编号：{{ item.id }}</text>
										<text
											class="tn-color-blue--disabled tn-padding-left-xs tn-text-df tn-icon-copy"></text>
									</view>
									<view class="tn-color-gray" click="">待揽收</view>
								</view>

								<view
									class="order__item__content tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-center">
									<view class="order__item__content__title">{{ item.receiverAddress }}</view>
								</view>
							</view>
							<view
								class="order__item__operation tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
								<view class="order__item__operaation__left">
									<text
										class="order__item__operaation__left--text tn-color-gray">{{ item.receiverName }}
										{{ item.receiverPhone }}</text>
								</view>
								<view
									class="order__item__operation__right tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-right">
									<view class="order__item__operation__right__button">
										<tn-button shadow shape="round" fontColor="tn-color-white"
											backgroundColor="tn-bg-blue" :fontSize="24" height="auto"
											padding="10rpx 18rpx" @click="showModal(item)">修改信息</tn-button>
									</view>
								</view>
							</view>
						</view>
						<view class="tn-padding-bottom"></view>
					</scroll-view>
				</swiper-item>


				<swiper-item class="order__swiper__item">
					<scroll-view :style="{height: `${swiperHeight}px`}" scroll-y>
						<view v-for="(item, index) in undeliveredpackages" :key="item.id" class="order__item">
							
							<view @click="tosignupPage(item.id)">
								<view
									class="order__item__head tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between">
									<view class="order__item__head__title">
										<text class="tn-text-bold">订单编号：{{ item.id }}</text>
										<text
											class="tn-color-blue--disabled tn-padding-left-xs tn-text-df tn-icon-copy"></text>
									</view>
									<view class="tn-color-gray">待派送</view>
								</view>

								<view
									class="order__item__content tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-center">
									<view class="order__item__content__title">{{ item.receiverAddress }}</view>
								</view>
							</view>
							<view
								class="order__item__operation tn-flex tn-flex-direction-row tn-flex-nowrap tn-flex-col-center tn-flex-row-between">
								<view class="order__item__operaation__left">
									<text
										class="order__item__operaation__left--text tn-color-gray">{{ item.receiverName }}
										{{ item.receiverPhone }}</text>
								</view>

							</view>
						</view>
						<view class="tn-padding-bottom"></view>
					</scroll-view>
				</swiper-item>


			</swiper>
		</view>
		<view class="homeelse" v-else>
		    <view class="center-container">
		      <zero-empty></zero-empty>
		      <text class="message">您没有查看权限\n！！！！!</text>
		    </view>
		  </view>
		<UpdatePackageModal :visible="isModalVisible" :initialData="selectedPackage" @close="isModalVisible = false"
			@save="updatePackageInfo" />
	</view>
</template>

<script>
	import UpdatePackageModal from '../../commPages/UpdatePackageModal.vue';
	export default {
		components: {
			UpdatePackageModal
		},
		computed: {
			serveAtpermission(){
				if(this.$store.state.serveAt === 'district') return true;
				else return false;
			}
		},
		data() {
			return {
				isModalVisible: false,
				selectedPackage: {},
				logisticsid: this.$store.state.logisticId,
				list: [{
						name: '待揽收',
						count: 0
					},
					{
						name: '待派送',
						count: 0
					},
				],
				tabsIndex: 0,
				swiperIndex: 0,
				swiperTop: 50,
				swiperHeight: 480,
				unpickedpackages: [],
				undeliveredpackages: [],

				weight: 0,
				packsize: ' ',
			}
		},

		mounted() {
			console.log("home界面onLoad运行");
			this.fetchPackages(); // 初次加载包裹信息
		},
		created() {
			console.log("home界面created运行");
			this.fetchPackages(); // 初次加载包裹信息
		},
		onShow() {
			console.log("home界面onshow运行");
			this.fetchPackages(); // 初次加载包裹信息
		},
		onPullDownRefresh() {
			this.fetchPackages(true); // 下拉刷新时重新获取包裹信息
		},
		onReady() {
			this.$nextTick(() => {
				this.updateSwiperInfo()
			})
		},

		methods: {
			fetchPackages(isPullDown) {
				const logisticsId = this.$store.state.logisticId; // 替换为实际的物流ID
				
				console.log("地区id为：");
				console.log(logisticsId);
				
				uni.request({
					url: 'http://139.196.211.123:8081/package/getUnpickedPackages', // 替换为实际的服务器地址
					method: 'GET',
					data: {
						logisticsId
					},
					success: res => {
						if (res.data.code === 200) {
							this.unpickedpackages = res.data.data;
							console.log(this.unpickedpackages[1]);
							this.updatePickListCount();
							uni.showToast({
								title: '获取成功',
								icon: 'success'
							});
						} else {
							uni.showToast({
								title: '获取失败',
								icon: 'none'
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: '请求失败，请检查网络',
							icon: 'none'
						});
					},
					complete: () => {
						console.log("触发了一次网络请求，下拉刷新动画应该结束了")
					}
				});

				uni.request({
					url: 'http://139.196.211.123:8081/package/getUndeliveredPackages',
					method: 'GET',
					data: {
						logisticsId
					},
					success: res => {
						if (res.data.code === 200) {
							this.undeliveredpackages = res.data.data;
							console.log(this.undeliveredpackages[1]);
							this.updateDeliverListCount();
							uni.showToast({
								title: '获取成功',
								icon: 'success'
							});
						} else {
							uni.showToast({
								title: '获取失败',
								icon: 'none'
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: '请求失败，请检查网络',
							icon: 'none'
						});
					},
					complete: () => {
						console.log("触发了一次网络请求，下拉刷新动画应该结束了")
					}
				});
			},

			showModal(item) {
				const [length, width, height] = item.size.split(','); // 使用 split 方法按逗号分隔
				this.$store.commit("setPickupPackid", item.id);
				this.selectedPackage = {
					'包裹重量': item.weight,
					'包裹长度': length,
					'包裹宽度': width,
					'包裹高度': height,
				};
				this.isModalVisible = true;
			},
			updatePackageInfo(updatedData) {
				const size = `${updatedData['包裹长度']},${updatedData['包裹宽度']},${updatedData['包裹高度']}`;
				console.log("id:"+this.$store.state.packid);
				uni.request({
					url: 'http://139.196.211.123:8081/package/updatePackage',
					method: 'POST',
					data: {
						packageId: this.$store.state.packid,
						weight: updatedData['包裹重量'],
						size: size,
					},
					success: res=> {
						if (res.data.code === 200) {
							uni.showToast({
								title: '保存成功',
								icon: 'success'
							});
							this.isModalVisible = false;
							this.fetchPackages(); // 刷新包裹信息
						} else {
							uni.showToast({
								title: '保存失败',
								icon: 'none'
							});
						}
					},
					fail: () => {
						uni.showToast({
							title: '请求失败，请检查网络',
							icon: 'none'
						});
					},
				});

			},

			updatePickListCount() {
				const unpickedCount = this.unpickedpackages.length;
				this.list = this.list.map((item, index) => {
					if (index === 0) { // 假设第一个标签是“待揽收”
						return {
							...item,
							count: unpickedCount
						};
					}
					return item;
				});
			},
			updateDeliverListCount() {
				const undeliveredCount = this.undeliveredpackages.length;
				this.list = this.list.map((item, index) => {
					if (index === 1) { // 假设第一个标签是“待揽收”
						return {
							...item,
							count: undeliveredCount
						};
					}
					return item;
				});
			},
			// 跳转
			toPickupPage(id,receiverAddress) {
				console.log("toPickupPage函数调用成功");
				this.$store.commit("setPickupPackid", id);
				this.$store.commit("updatereceiverAddress", receiverAddress);
				uni.navigateTo({
					url: "/bizPages/pickupPacks",
				});
			},
			tosignupPage(id) {
				console.log("toSignupPage函数调用成功");
				this.$store.commit("setSignupPackid", id);
				uni.navigateTo({
					url: "/bizPages/signupPacks",
				});
			},
			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},

			// 切换模式
			modeSwitch(index) {
				this.currentModeIndex = index
				this.showPassword = false
			},

			// 计算可滑动区域的高度信息
			updateSwiperInfo() {
				// 获取可滑动菜单的信息
				this._tGetRect('.order__tabs').then(res => {
					if (!res) {
						setTimeout(() => {
							this.updateSwiperInfo()
						}, 10)
						return
					}
					const systemInfo = uni.getSystemInfoSync()


				})
			},
			// 标签栏值发生改变
			tabsChange(index) {
				console.log("标签栏值发生改变")
				this.fetchPackages()
				this.swiperIndex = index
			},
			// swiper-item位置发生改变
			swiperTransition(event) {
				this.$refs.tabs.setDx(event.detail.dx)
			},
			// swiper动画结束
			swiperAnimationFinish(event) {
				const current = event.detail.current
				this.$refs.tabs.setFinishCurrent(current)
				this.swiperIndex = current
				this.tabsIndex = current
			}
		}
	}
</script>

<style lang="scss" scoped>
	.template-order {
		background-color: #FFFFFF;
	}

	.modal-content {
		background-color: white;
		border-radius: 20px;
		width: 96%;
		/* 左右距离页面二十分之一 */
		max-width: 600px;
		padding: 20px;
		position: relative;
		top: 33%;
		/* 上下距离页面三分之一 */
	}

	/* 胶囊*/
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
	.homeelse {
	  display: flex;
	  justify-content: center;
	  align-items: center;
	  height: 100vh;
	}
	.center-container {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	}
	.message {
	  margin-top: 300px; /* 控制文字与 zero-empty 组件之间的距离 */
	  font-size: 31px;
	  text-align: center;
	  color: #c8c8c8;
	}
	.order {
		&--wrap {
			position: fixed;
			left: 0;
			right: 0;
			width: 100%;
			background-color: inherit;
		}

		/* 导航栏 start */
		&__tabs {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			background-color: inherit;
		}

		/* 导航栏 end */

		/* swiper start */
		&__swiper {
			position: absolute;
			left: 0;
			right: 0;
			width: 100%;
			background-color: inherit;
			// padding: 0 16rpx;
		}

		/* swiper end */

		/* 订单内容 start */
		&__item {
			margin: 30rpx;
			padding: 36rpx 26rpx;
			background-color: #FFFFFF;
			border-radius: 15rpx;
			box-shadow: 0rpx 0rpx 50rpx 0rpx rgba(0, 0, 0, 0.07);

			&:first-child {
				margin-top: 40rpx;
			}

			&:last-child {
				margin-bottom: 0;
			}

			/* 头部 start */
			&__head {

				&__title {
					padding-bottom: 10rpx;
					line-height: normal;

					&--right-icon {
						font-size: 24rpx;
						margin-left: 8rpx;
					}
				}

				&__status {
					font-size: 22rpx;
					color: #AAAAAA;
				}
			}

			/* 头部 end */

			/* 内容 start */
			&__content {

				margin-top: 20rpx;

				&__image {
					margin-right: 20rpx;

					image {
						width: 140rpx;
						height: 140rpx;
						border-radius: 10rpx;
					}
				}

				&__title {
					padding-right: 40rpx;
					display: -webkit-box;
					overflow: hidden;
					white-space: normal !important;
					text-overflow: ellipsis;
					word-wrap: break-word;
					-webkit-line-clamp: 2;
					-webkit-box-orient: vertical;
				}

				&__info {

					&__price {
						&--unit {
							font-size: 20rpx;
						}

						&__value--integer,
						&__value--decimal {
							font-weight: bold;
						}

						&__value--decimal {
							font-size: 20rpx;
						}
					}

					&__count {
						color: #AAAAAA;
						font-size: 24rpx;
					}
				}
			}
			.background {
				width: 100%;
				height: 100%;
				position: absolute;

				background-color: #1b82d2;
			}
			
			/* 内容 end */

			/* 操作按钮 start */
			&__operation {
				margin-top: 30rpx;

				&__right {
					&__button {
						margin-left: 10rpx;
					}
				}
			}

			/* 操作按钮 end */
		}

		/* 订单内容 end */
	}
</style>