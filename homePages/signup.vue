<template>
	<view class="container">
	    <!-- 顶部自定义导航 -->
	    <tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
	      <view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
	        <text class='icon tn-icon-left-arrow'></text>
	      </view>
	      <view class="tn-flex tn-flex-col-center tn-flex-row-center">
	        <text class="tn-text-bold tn-text-xl tn-color-black">包裹签收</text>
	      </view>
	    </tn-nav-bar>
	    
	    <view class="search-container">
	      <view class="search-box">
	        <input type="number" class="search-input" placeholder="请输入运单号" v-model="package_id3">
	        <view class="camera-btn" @click="scanCode">
	          <uni-icons type="scan" :size="28" color="#666"></uni-icons>
	        </view>
	        <view class="search-btn" @click="handleClick">签收</view>
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
					package_id3: ''
				}
			},

			onLoad() {},
			methods: {

				scanCode() {
					console.log('大概');
					uni.scanCode({
						success: (res) => {
							// 扫码成功，将结果填充到输入框中
							this.package_id3 = res.result;
						},
						fail: (err) => {
							console.error('扫码失败', err);
						}
					});
				},
				// 拍照按钮悬停时高亮
				handleClick() {
					const postData = {
						id: this.package_id3 //传入输入框中的数据
					}
					console.log(this.package_id3);
		
					uni.request({
						url: 'http://139.196.211.123:8081/package/signedPackage',
						method: 'POST',
						data: this.package_id3,
						success: (res) => {
							console.log('请求成功', res.data);
							if (res.statusCode === 200) {
								uni.showToast({
									title: '签收成功',
									icon: 'success'
								})
							}
							else{
								console.error('请求失败', res.errMsg);
								// 请求失败也可以弹出提示框
								uni.showToast({
									title: '签收失败，请重试',
									icon: 'none'
								});
							}
						},
						fail: (err) => {
							console.error('请求失败', err);
							// 请求失败也可以弹出提示框
							uni.showToast({
								title: '签收失败，请重试',
								icon: 'none'
							});
						}
					});
			}
			
		}
	}
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

	.search-container {
		position: relative;
		width: 100%;
		padding: 5rpx;
		margin-top: 20%;
	}
	
	.search-box {
		position: relative;
		display: flex;
		align-items: center;
		width: 80%;
		border: 2px solid #4e6ef2;
		/* 添加蓝色轮廓 */
		border-radius: 6px;
		margin: 35% auto;
		background-color: #fff;
		box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
		/* 添加阴影 */
	}
	
	.search-input {
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
		padding: 20rpx 35rpx;
		font-size: 28rpx;
		color: #fff;
		background-color: #4e6ef2;
		border-radius: 0 4px 4px 0;
		/* 右边圆角 */
		cursor: pointer;
	}
</style>