<template>
	<view class="container">

		<tn-nav-bar fixed customBack :bottomShadow="false" backgroundColor="#FFFFFF">
			<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
				<text class='icon tn-icon-left-arrow'></text>
			</view>
			<view class="tn-flex tn-flex-col-center tn-flex-row-center">
				<text class="tn-text-bold tn-text-xl tn-color-black">包裹转运</text>
			</view>
		</tn-nav-bar>


		<view class="sections">
			<uni-collapse accordion v-model="accordionVal" @change="change">

				<uni-collapse-item title="创建转运批次">
					<view class="content">


						<view class="title">选择目的地：</view>
						<view class="uni-form-item uni-column input-box" @click="onPickAddress2()">
							<view class="picker">
								<view class="uni-input" v-if="address2">{{address2}}</view>
								<view class="uni-input" style="color:#999;font-size:31rpx" v-else>请选择目的地转运中心</view>
							</view>
						</view>
						<pickAdress :isOpen="isPickAddressShow2" @close="onCloseAddress"
							@bindChage="onBindChageAddress2">
						</pickAdress>


						<view class="title">载具ID：</view>
						<view class="uni-form-item uni-column input-box">

							<input class="uni-input" v-model="vehicleId" placeholder="请输入载具ID" />
						</view>
						<view class="uni-form-item uni-column">
							<button @click="createBatch" class="uni-button">确定</button>
						</view>
					</view>
				</uni-collapse-item>

				<uni-collapse-item title="添加包裹到批次">
					<view class="content">
						<view class="title">包裹ID：</view>
						<view class="uni-form-item uni-column input-box">

							<input class="uni-input" v-model="packageIds" placeholder="请输入包裹ID" />
							<view class="camera-btn" @click="scanCode()">
								<uni-icons type="scan" :size="28" color="#666"></uni-icons>
							</view>
						</view>
						<view class="title">批次ID：</view>
						<view class="uni-form-item uni-column input-box">
							<input class="uni-input" v-model="batchId2" placeholder="请输入批次ID" />
							<view class="camera-btn" @click="scanCode1()">
								<uni-icons type="scan" :size="28" color="#666"></uni-icons>
							</view>
						</view>
						<view class="uni-form-item uni-column">
							<button @click="addPackagesToBatch" class="uni-button">确定</button>
						</view>
					</view>
				</uni-collapse-item>

				<uni-collapse-item title="确认已送达">
					<view class="content">
						<!-- 这里放更新批次状态的表单 -->
						<view class="title">批次ID：</view>
						<view class="uni-form-item uni-column input-box">
							<input class="uni-input" v-model="batchId2" placeholder="请输入批次ID" />
						</view>
						<view class="uni-form-item uni-column">
							<button @click="updateBatchStatus" class="uni-button">确定</button>
						</view>
					</view>
				</uni-collapse-item>
			</uni-collapse>
		</view>

	</view>
</template>

<script>
	import pickAdress from '@/components/pick-address.vue'
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	import '@/store/updateLocation.js';
	export default {
		name: 'TemplateHistory',
		mixins: [template_page_mixin],
		components: {
			pickAdress,
		},
		data() {
			return {
				// 第一个下拉框的数据
				accordionVal: '0',
				origin: '',
				destination: '',
				responsible: '',
				vehicleId: '',

				// 第二个下拉框的数据
				accordionVal2: '0',
				packageIds: '',
				batchId2: '',

				// 第三个下拉框的数据
				accordionVal3: '0',
				batchId: '',
				status: 'arrive',

				logistics: '',
				isPickAddressShow2: false,
				selectAddress: {},
				address1: '',
				address2: '',
			};
		},
		methods: {
			toPickupPage(id,receiverAddress) {
				console.log("toPickupPage函数调用成功");
				this.$store.commit("setPickupPackid", id);
				this.$store.commit("updatereceiverAddress", receiverAddress);
				uni.navigateTo({
					url: "/bizPages/pickupPacks",
				});
				console.log("toPickupPage函数调用成功");
			},
			onPickAddress2() {
				console.log("弹出选择框2");
				if (this.authState) return
				this.isPickAddressShow2 = true
			},
			onCloseAddress(type, data) {
				this.isPickAddressShow2 = false
			},
			onBindChageAddress2(data) {
				console.log("触发弹窗2")
				this.selectAddress = data

				this.address2 = data.area1_name + data.area2_name + data.area3_name
				if (data.area3_code) {
					this.destination = data.area3_code
					console.log(data.destination)
				} else if (data.area2_code) {
					this.destination = data.area2_code
					console.log(data.destination)
				} else {
					this.destination = data.area1_code
					console.log(data.destination)
				}

				this.isPickAddressShow2 = false
				console.log("origin:" + this.origin)
				console.log("destination:" + this.destination)
				console.log(data)
			},
			change(e) {
				console.log(e);
			},
			scanCode() {
				console.log('大概');
				uni.scanCode({
					success: (res) => {
						// 扫码成功，将结果填充到输入框中
						this.packageIds = res.result;
					},
					fail: (err) => {
						console.error('扫码失败', err);
					}
				});
			},
			scanCode1() {
				console.log('大概');
				uni.scanCode({
					success: (res) => {
						// 扫码成功，将结果填充到输入框中
						this.batchId2 = res.result;
					},
					fail: (err) => {
						console.error('扫码失败', err);
					}
				});
			},
			createBatch() {
				// 构造提交的数据
				const postData = {
					origin: parseInt(this.$store.state.logisticId),
					destination: parseInt(this.destination),
					responsible: parseInt(this.$store.state.uid),
					vehicleId: parseInt(this.vehicleId)
				};

				console.log(this.$store.state.logisticId);
				console.log(this.$store.state.uid);
				// console.log(this.$store.state.logisticId);
				// console.log(this.$store.state.logisticId);
				this.$store.commit("setvehicleid", this.vehicleId);
				// 调用后端接口提交数据
				uni.request({
					url: 'http://139.196.211.123:8081/batch/createBatch',
					method: 'POST',
					data: postData,
					success: (res) => {
						if (res.data.code === 200) {
							this.batchId2 = res.data.data
							console.log(res.data.data);
							console.log(this.batchId2);
							// 提交成功，显示成功提示
							uni.showToast({
								title: '创建成功',
								icon: 'success'
							});
							this.toPickupPage(res.data.data,this.address2);
						} else {
							uni.showToast({
								title: '创建失败',
								icon: 'fail'
							});
						};
					},
					fail: (err) => {
						// 提交失败，显示失败提示
						uni.showToast({
							title: '提交失败，请检查网络连接',
							icon: 'none'
						});
					}
				});
			},
			addPackagesToBatch() {
				// 构造提交的数据
				const postData = {
					packageIds: this.packageIds.split(',').map(id => parseInt(id.trim())), // 将输入的包裹ID字符串转为数组
					batchId: parseInt(this.batchId2) // 将输入的批次ID转为整数
				};

				// 调用后端接口提交数据
				uni.request({
					url: 'http://139.196.211.123:8081/package/addPackageToBatch',
					method: 'POST',
					data: postData,

					success: (res) => {
						if (res.data.code === 200) {
							// 提交成功，显示成功提示
							uni.showToast({
								title: '包裹添加成功',
								icon: 'success'
							});
						} else {
							uni.showToast({
								title: '包裹添加失败',
								icon: 'fail'
							});
						};

					},
					fail: (err) => {
						// 提交失败，显示失败提示
						uni.showToast({
							title: '提交失败，请检查网络连接',
							icon: 'none'
						});
					}
				});
			},
			updateBatchStatus() {
				const postData = {
					batchId: parseInt(this.batchId2),
					status: this.status
				};

				// 调用后端接口更新批次状态
				uni.request({
					url: 'http://139.196.211.123:8081/batch/updateBatchStatus',
					method: 'POST',
					data: postData,
					success: (res) => {
						if (res.data.code === 200) {
							uni.showToast({
								title: '批次状态更新成功',
								icon: 'success'
							});
						} else {
							uni.showToast({
								title: '批次状态更新失败，请重试',
								icon: 'none'
							});
						};
					},
					fail: (err) => {
						uni.showToast({
							title: '提交失败，请检查网络连接',
							icon: 'none'
						});
					}
				});
			},
		}
	};
</script>

<style lang="scss" scoped>
	.example-body {
		flex-direction: column;
		flex: 1;
	}

	.content {
		padding: 15px;
	}

	.text {
		font-size: 14px;
		color: #666;
		line-height: 20px;
	}

	.button {
		// margin-top: 10px;
		margin: 10px;
		margin-bottom: 0;
	}

	.uni-form-item {
		margin-bottom: 15px;
	}

	.title {
		font-weight: bold;
		font-size: 15px;
		margin-bottom: 5px;
		margin-left: 15rpx;
		margin-top: 8rpx;
	}

	.sections {
		margin-top: 20%;
	}

	.uni-input {
		padding: 5px;
		font-size: 30rpx;
	}

	.uni-button {
		background-color: #007aff;
		color: #fff;
		padding: 3px 20px;
		border-radius: 5px;
		font-size: 16px;

	}

	.camera-btn {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-left: 270rpx;
		width: 40rpx;
		height: 40rpx;
		background-color: #ffffff;
		/* 初始颜色 */
		cursor: pointer;
	}

	.input-box {
		position: relative;
		display: flex;
		align-items: center;
		border: 2px solid #c1c1c1;
		/* 添加蓝色轮廓 */
		border-radius: 6px;

	}

	.camera-btn:hover {
		background-color: #999;
		/* 鼠标悬停时颜色变深 */
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
</style>