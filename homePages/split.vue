<template>
	<view class="template-order">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
			<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
				<text class='icon tn-icon-left-arrow'></text>
			</view>
			<view class="tn-flex tn-flex-col-center tn-flex-row-center">
				<text class="tn-text-bold tn-text-xl tn-color-black">包裹拆分</text>
			</view>
		</tn-nav-bar>
		<view class="search-container">
			<view class="search-box">
				<input type="number" class="search-input" placeholder="请输入批次号" v-model="batchID">
				<view class="camera-btn" @click="scanCode()">
					<uni-icons type="scan" :size="28" color="#666"></uni-icons>
				</view>
				<view class="search-btn" @click="fetchPackages()">查询</view>
			</view>
		</view>

		<!-- 标签内容 -->
		<swiper class="order__swiper" :style="{top: `${swiperTop}px`, height: `${swiperHeight}px`}">

			<swiper-item class="order__swiper__item">
				<scroll-view :style="{height: `${swiperHeight}px`}" scroll-y>
					<view v-for="(item, index) in unsplitedpackages" :key="item.id" class="order__item">
						<view>
							<view
								class="order__item__head tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between">
								<view class="order__item__head__title">
									<text class="tn-text-bold">订单编号：{{ item.id }}</text>
									<text
										class="tn-color-blue--disabled tn-padding-left-xs tn-text-df tn-icon-copy"></text>
								</view>
								<view class="tn-color-gray" click="">{{ item.status }}</view>
							</view>
						</view>

					</view>
					<view class="tn-padding-bottom"></view>
				</scroll-view>
			</swiper-item>

		</swiper>
		<uni-fab  class="fab" :pattern="pattern" :content="content" :horizontal="horizontal"
			:vertical="vertical" direction="direction" @trigger="trigger" @fabClick="fabClick" />
	</view>
</template>

<script>
	import { handleError } from 'vue';
import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateHistory',
		mixins: [template_page_mixin],
		onLoad() {
			this.showbtn = false;
		},
		data() {
			return {

				selectedPackage: {},

				packageid: '',

				showbtn: false,
				selectid: '',
				swiperIndex: 0,
				swiperTop: 160,
				swiperHeight: 480,
				unsplitedpackages: [],
				undeliveredpackages: [],

				batchID: '',
				weight: 0,
				packsize: ' ',

				title: 'uni-fab',
				directionStr: '垂直',
				horizontal: 'left',
				vertical: 'bottom',
				direction: 'horizontal',
				pattern: {
					color: '#7A7E83',
					backgroundColor: '#fff',
					selectedColor: '#007AFF',
					buttonColor: '#007AFF',
					iconColor: '#fff'
				},
				is_color_type: false,
				content: [{
					iconPath: '/static/image.png',
					selectedIconPath: '/static/image-active.png',
					text: '拆包',
					active: false
				}]
			}
		},
		computed: {
			sortedPackages() {
				// 对 unsplitedpackages 进行排序
				return this.unsplitedpackages.slice().sort((a, b) => b.codein - a.codein);
			},
		},
		onBackPress() {
			if (this.$refs.fab.isShow) {
				this.$refs.fab.close()
				return true
			}
			return false
		},
		methods: {
			scanCode() {
				console.log('大概');
				uni.scanCode({
					success: (res) => {
						// 扫码成功，将结果填充到输入框中
						this.batchID = res.result;
					},
					fail: (err) => {
						console.error('扫码失败', err);
					}
				});
			},
			fetchPackages() {
				let batchId = Number(this.batchID);
				console.log("地区id为：");
				console.log(this.batchID);
			
				uni.request({
					url: 'http://139.196.211.123:8081/batch/getPackages', // 替换为际的服务器地址
					method: 'GET',
					data: {
						batchId
					},
					success: res => {
						console.log(res)
						console.log(res.data.code)
						if (res.data.code === 200) {
							console.log(res.data.data)
							this.unsplitedpackages = res.data.data.map(id => {
								return {
									id,
									status: '待分包',
									codein: 1,
								};
								console.log(this.unsplitedpackages);
							});
							this.showbtn = true;
			
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
						console.log("触发了一次网络请求")
					}
				});
			},
			
			trigger(e) {
				console.log(e)
				this.content[e.index].active = !e.item.active
				uni.showModal({
					title: '提示',
					content: `您${this.content[e.index].active ? '选中了' : '取消了'}${e.item.text}`,
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定')
						} else if (res.cancel) {
							console.log('用户点击取消')
						}
					}
				})
			},
			fabClick() {
				uni.scanCode({
					success: (res) => {
						this.packageid = res.result;
						this.nextPackage();
					},
					fail: (err) => {
						console.error('扫码失败', err);
					}
				});
				uni.showToast({
					title: '点击了悬浮按钮',
					icon: 'none'
				})
			},

			nextPackage() {
				uni.request({
					url: 'http://139.196.211.123:8081/package/getNextDestination',
					method: 'GET',
					data: {
						packageId: this.packageid,
						currentId: this.$store.state.logisticId,
					},
					success: (res) => {
						if (res.data.code === 200) {
							console.log(res.data.data);
							// 弹窗显示获取的结果
							uni.showModal({
								title: '下一站是',
								content: JSON.stringify(res.data.data),
								showCancel: false,
							});

							// 匹配并更新 unsplitedpackages 中的状态
							let packageToUpdate = this.unsplitedpackages.find((pkg) => pkg.id == this.packageid);
							if (packageToUpdate) {
								packageToUpdate.status = '已完成';
								packageToUpdate.codein = 0;
							}
							// 设置 showbtn 为 true
							this.showbtn = true;
						} else {
							// 处理错误
							uni.showToast({
								title: res.data.message || '请求失败',
								icon: 'none',
							});
							this.showbtn = false;
						}
					},
					fail: (error) => {
						// 处理请求失败
						uni.showToast({
							title: '请求失败，请检查网络连接',
							icon: 'none',
						});
						console.error('Request error:', error);
						this.showbtn = false;
					},
				});
			},

			

			tn(e) {
				uni.navigateTo({
					url: e,
				});
			},

			
			
			
			
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
		margin-top: 300px;
		/* 控制文字与 zero-empty 组件之间的距离 */
		font-size: 31px;
		text-align: center;
		color: #c8c8c8;
	}

	.search-container {
		position: relative;
		width: 100%;
		height: 50px;
		padding: 5rpx;
		margin-top: 30%;
	}

	.search-box {
		position: relative;
		display: flex;
		align-items: center;
		width: 90%;
		height: 60rpx;
		border: 2px solid #4e6ef2;
		/* 添加蓝色轮廓 */
		border-radius: 24px;
		margin: -5% auto;
		background-color: #fff;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
		/* 添加阴影 */
	}

	.search-input {
		height: 60rpx;
		flex: 1;
		padding: 12rpx 20rpx;
		font-size: 30rpx;
		border: none;
		border-radius: 4px 0 0 4px;
		/* 左边圆角 */
	}

	.camera-btn {

		display: flex;
		justify-content: center;
		align-items: center;
		margin-right: 5px;
		width: 40rpx;
		height: 40rpx;
		background-color: #ffffff;
		/* 初始颜色 */
		cursor: pointer;
	}

	.camera-btn:hover {
		background-color: #999;
		/* 鼠标悬停时颜色变深 */
	}

	.search-btn {
		height: 60rpx;
		padding: 11rpx 35rpx;
		font-size: 28rpx;
		color: #fff;
		background-color: #4e6ef2;
		border-radius: 0 20px 20px 0;
		/* 右边圆角 */
		cursor: pointer;
	}

	.warp {
		padding: 10px;
	}

	.button {
		margin-bottom: 10px;
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