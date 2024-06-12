<template>
	<view class="container" >
		<tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#efa915">
			<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
				<text class='icon tn-icon-left-arrow'></text>
			</view>
			<view class="tn-flex tn-flex-col-center tn-flex-row-center">
				<text class="tn-text-bold tn-text-xl tn-color-black">包裹揽收</text>
			</view>
		</tn-nav-bar>
		<view class="background"></view>
		<view class="container2" @click='handleClick()'>
			<view class="panel">
				<view class="header">请扫描以下任意二维码或条形码</view>
				<view>
					<w-barcode :options="bar"></w-barcode>
					<view class="barnum">{{ code }}</view>
				</view>
				<view class="address-block">
				      <text class="label">收件人地址：</text>
				      <text class="content">{{ receiverLabel }}</text>
				    </view>
				
				<view style="display: flex;justify-content:space-between ;width: 80%;flex-wrap: wrap;">
					<w-qrcode @press="longtap" style="margin-top: 1rem;" v-for="(item,index) in arrList" :key="index"
						:options="item" ref="qrcode" @generate="hello"></w-qrcode>
				</view>
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

				package_id1: this.$store.state.packid,
				receiverLabel: this.$store.state.receiverAddress,
				show: true,
				code: this.$store.state.packid,
				title: '条码 二维码',
				background: {
					backgroundColor: '#1b82d2'
				},
				arrList: [{
						code: this.$store.state.packid,
						size: 580, // 二维码大小
						type: 'none',
						padding: 10,
						src: '/static/bg6.png',
						border: {
							opacity: 0.5,
							degree: 10,
							color: ['#e96443', '#904e95'], //边框颜色支持渐变色
							lineWidth: 5 //边框宽度
						},
						color: ['#000000'] //边框颜色支持渐变色
					},

				],
				bar: {
					code: this.$store.state.packid,
					color: ['#000000'], // 条形码的颜色
					bgColor: '#FFFFFF', // 背景色
					width: 670, // 宽度
					height: 100 // 高度
				}


			}
		},

		onLoad() {},
		methods: {
			hello(res) {
				try {
					// console.log(321, res)
				} catch (e) {}
			},
			async SaveCode() { //保存条形码图片
				const res = await this.$refs.barcode.GetCodeImg()
				console.log(res)
			},
			aleard(res) { // 条形码创建成功的回调 修改参数同样触发
				console.log(res)
			},
			handleError(e) { //当发生错误时触发
				console.log(e);
			},
			longtap(e) { //长安事件
				console.log(e);
			},
			// 拍照按钮点击事件

			// 拍照按钮悬停时高亮
			handleClick() {
				const postData = {
					id: this.code //传入输入框中的数据
				}
				console.log(this.code);
			
				uni.request({
					url: 'http://139.196.211.123:8081/package/pickupPackage',
					method: 'POST',
					data: String(this.code),
					success: (res) => {
						console.log('请求成功', res.data);
						if (res.statusCode === 200) {
							uni.showToast({
								title: '揽收成功',
								icon: 'success'
							})
						} else {
							console.error('请求失败', res.errMsg);
							// 请求失败也可以弹出提示框
							uni.showToast({
								title: '揽收失败，请重试',
								icon: 'none'
							});
						}
					},
					fail: (err) => {
						console.error('请求失败', err.errMsg);
						// 请求失败也可以弹出提示框
						uni.showToast({
							title: '揽收失败，请重试',
							icon: 'none'
						});
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
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

	page {
		background-color: #1b82d2;
	}

	.background {
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: -1;
		background-color: #1b82d2;
	}

	.container2 {
		margin-top: 100rpx;
		display: flex;
		justify-content: center;
	}

	.panel {
		margin-top: 80rpx;
		display: flex;
		overflow: hidden;
		flex-direction: column;
		justify-content: space-between;
		align-items: stretch;
		align-items: center;
		width: 95%;
		border-radius: 10rpx;
		background-color: #fff;
		padding-bottom: 80rpx;
	}

	.header {
		width: 100%;
		height: 140rpx;
		background-color: #f0f0f0;
		border-radius: 10rpx 10rpx 0 0;
		text-align: center;
		line-height: 140rpx;
		font-weight: bold;
		letter-spacing: 2px;
		margin-bottom: 40rpx;
		color: #1b82d2;
	}

	.barnum {
		width: 670rpx;
		height: 100rpx;
		line-height: 100rpx;
		font-size: 38rpx;
		font-weight: bold;
		text-align: center;
		letter-spacing: 5rpx;
		white-space: nowrap;
	}
</style>