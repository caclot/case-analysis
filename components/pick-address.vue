<template>
	<view class="">
		<!-- 支付按钮 -->
		<view class="pay_popup" :class="isOpen ? 'on' : ''">
			<view class="pay-title flex-sb-cent">
				<button class="btn" @click="onClose">取消</button>
				<button class="btn" @click="onSubmit">完成</button>
			</view>
			<view class="">
				<picker-view :value="idxArr" @change="bindChange" class="picker-view" indicator-class="picker-box">
					<picker-view-column>
						<view class="item" v-for="(item,index) in provinceArray" :key="index">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column>
						<view class="item" v-for="(item,index) in cityArray" :key="index">{{item.label}}</view>
					</picker-view-column>
					<picker-view-column v-if="isDistrictY">
						<view class="item" v-for="(item,index) in districtArray" :key="index">{{item.label}}</view>
					</picker-view-column>
				</picker-view>
			</view>
		</view>
		<view class="mask" v-if="isOpen" @click="onClose"></view>
	</view>
</template>

<script>
	import {
		mapGetters
	} from "vuex";
	import addressData from '@/address(1).js'
	export default {
		props: {
			isOpen: {
				default: false,
				type: Boolean
			},
			isDistrictY: { // 判断是否选择区域数据true表示选择false表示不显示
				default: true,
				type: Boolean
			}
		},
		
		data() {
			return {
				title: 'picker-view',
				area1_name: '',
				area2_name: '',
				area3_name: '',
				area1_code: '',
				area2_code: '',
				area3_code: '',
				idxArr: [0, 0, 0],
				oldpProvinceDataList: addressData,
				provinceArray: [],
				cityArray: [],
				districtArray: [],
				column1: 0,
				column2: 0,
				column3: 0,
				// indicatorStyle: `height: 50px;`
			}
		},
		created() {
			for (let i = 0; i < this.oldpProvinceDataList.length; i++) {
				this.provinceArray.push(this.oldpProvinceDataList[i]);
			}
			for (let i = 0; i < this.oldpProvinceDataList[0].children.length; i++) {
				this.cityArray.push(this.oldpProvinceDataList[0].children[i]);
			}
			this.area1_name = this.provinceArray[0].label
			this.area2_name = this.cityArray[0].label
			this.area1_code = this.provinceArray[0].value
			this.area2_code = this.cityArray[0].value
			if (!this.isDistrictY) return
			for (let i = 0; i < this.oldpProvinceDataList[0].children[0].children.length; i++) {
				this.districtArray.push(this.oldpProvinceDataList[0].children[0].children[i]);
			}
			this.area3_name = this.districtArray[0].label
			this.area3_code = this.districtArray[0].value
		},
		methods: {
			pickerColumnchange() {
				let idxArr = this.idxArr
				if (this.oldpProvinceDataList[idxArr[0]].children && this.oldpProvinceDataList[idxArr[0]].children.length >
					0) {
					this.cityArray = this.oldpProvinceDataList[idxArr[0]].children.map((item, index) => {
						return item
					})
				}
				if (!this.isDistrictY) return
				if (this.oldpProvinceDataList[idxArr[0]].children && this.oldpProvinceDataList[idxArr[0]].children.length >
					0 &&
					this.oldpProvinceDataList[idxArr[0]].children[idxArr[1]].children && idxArr.length == 3) {
					this.districtArray = this.oldpProvinceDataList[idxArr[0]].children[idxArr[1]].children.map((item,
						index) => {
						return item
					})
				} else {
					this.idxArr[2] = 0
					this.districtArray = []
				}
			},
			bindChange: function(e) {
				const val = e.detail.value
				if (this.column1 !== val[0]) {
					this.column1 = val[0]
					this.column2 = 0
					this.column3 = 0
				} else if (this.column2 !== val[1]) {
					this.column1 = val[0]
					this.column2 = val[1]
					this.column3 = 0
				} else {
					this.column1 = val[0]
					this.column2 = val[1]
					this.column3 = val[2]
				}

				this.idxArr = [this.column1, this.column2, this.column3]
				this.pickerColumnchange()
				if (this.provinceArray.length > 0) {
					this.area1_name = this.provinceArray[this.column1].label
					this.area1_code = this.provinceArray[this.column1].value
				}
				if (this.cityArray.length > 0) {
					this.area2_name = this.cityArray[this.column2].label
					this.area2_code = this.cityArray[this.column2].value
				} else {
					this.area2_name = ''
					this.area2_code = ''
				}
				if (!this.isDistrictY) return
				if (this.districtArray.length > 0) {
					this.area3_name = this.districtArray[this.column3].label
					this.area3_code = this.districtArray[this.column3].value
				} else {
					this.area3_name = ''
					this.area3_code = ''
				}
			},
			onClose() {
				this.$emit('close', 1)
			},
			onSubmit() {
				let data = {
					area1_name: this.area1_name,
					area2_name: this.area2_name,
					area3_name: this.area3_name,
					area1_code: this.area1_code,
					area2_code: this.area2_code,
					area3_code: this.area3_code,
				}
				this.$emit('bindChage', data)
			},
		}
	}
</script>


<style lang="less" scoped>
	.pay_popup {
		width: 100%;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 997;
		transform: translate3d(0, 100%, 0);
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		overflow: hidden;
		.body-title {
			font-size: 36rpx;
			color: #666;
			text-align: center;
			padding-bottom: 12rpx;

		}

		.pay-title {
			border-bottom: none;
			width: 100%;
			font-size: 36rpx;
			font-family: PingFang SC;
			font-weight: 500;
			color: #1C1C1F;
			text-align: center;
			position: relative;
			height: 112rpx;
			line-height: 112rpx;
			background: #FFFFFF;
			border-bottom: 1rpx solid #E5E5E5;

			.btn {
				// 修改：按钮样式
				font-size: 45rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #C90F07;
				line-height: 48rpx;
				border: none; // 移除边框
				background: none;
				padding: 10;

				&:first-child {
					// 修改：左上角按钮位置
					position: absolute;
					left: 25rpx;
					top: 32rpx;	
				}

				&:last-child {
					// 修改：右上角按钮位置
					position: absolute;
					right: 25rpx;
					top: 32rpx;
				}
			}
		}
	}

	.picker-view {
		width: 100%;
		height: 432rpx;
		padding: 0 32rpx;

		.picker-box {
			// width: 686px;
			height: 80rpx;
			background: #C90F07;
			font-weight: 500;
			color: #45454C;
			line-height: 80rpx;
			opacity: 0.12;
		}

		uni-picker-view-column {
			&:first-child {
				.picker-box {
					border-top-left-radius: 16rpx;
					border-bottom-left-radius: 16rpx;
				}
			}

			&:last-child {
				.picker-box {
					border-top-right-radius: 16rpx;
					border-bottom-right-radius: 16rpx;
				}
			}
		}
	}

	.item {
		height: 80rpx;
		line-height: 80rpx;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: #45454C !important;
		font-size: 36rpx;
		font-family: PingFang SC;
	}

	/* 弹出样式 */

	.pay_popup {
		width: 100%;
		background-color: #fff;
		position: fixed;
		left: 0;
		bottom: 0;
		z-index: 997;
		transform: translate3d(0, 100%, 0);
		transition: all 0.3s cubic-bezier(0.25, 0.5, 0.5, 0.9);
		border-top-left-radius: 32rpx;
		border-top-right-radius: 32rpx;
		overflow: hidden;
	}

	.pay_popup.on {
		transform: translate3d(0, 0, 0);
	}



	.pay_popup .right-close {
		position: absolute;
		left: 24rpx;
		font-size: 36rpx;
		color: #1C1C1F;
	}
	.mask {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 996;
	}
</style>