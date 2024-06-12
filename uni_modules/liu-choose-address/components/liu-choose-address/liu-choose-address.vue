<template>
	<view>
		<!-- 弹出层 -->
		<view :class="['scroll-popup', isShow ? 'scroll-open' : '', animation ? 'scroll-animation' : '']">
			<view class="scroll-box">
				<view class="scroll-top">
					<view class="scroll-top-left" @click="getResult('cancel')">取消</view>
					<view class="scroll-top-right" v-if="checkArr.length == tabList.length"
						@click="getResult('confirm')">确定</view>
				</view>
				<scroll-view class="scroll-title" scroll-x="true" :scroll-left="scrollViewWidth" scroll-with-animation>
					<view class="scroll-title-item-box" v-for="(i, e) in tabList" @click="checkTab(e)" :key="e">
						<view v-if="tabId >= e" :id="'se-' + e"
							:class="['scroll-title-item', tabId == e ? ' scroll-title-item-true' : '']">
							{{ checkArr[e] ? checkArr[e].label : i.title }}
							<image class="span" :src='nextImg' v-if="tabId > e"></image>
						</view>
					</view>
				</scroll-view>
				<scroll-view class="scroll-view_H" scroll-y="true">
					<view class="scroll-view-grid-box"
						v-if="checkBox && checkBox.length && checkBox[tabId] && checkBox[tabId].length">
						<view v-for="(item, index) in checkBox[tabId]" :key="index" @click="check(index)"
							:class="checkArr && checkArr[tabId] && checkArr[tabId].label == item.label ? 'scroll-view-item-true' : 'scroll-view-item'">
							{{ item.label || '' }}
						</view>
					</view>
					<view class="scroll-view-noBox" v-else>
						<image :src="noDataImg"></image>
						<view class="text">暂无数据</view>
					</view>
				</scroll-view>
				<view v-show="safeArea" class="scroll-temp"></view>
			</view>
		</view>
		<!-- 遮罩层 -->
		<view v-show="isShow" class="scroll-mask" @click.stop="isMask ? close() : ''"></view>
	</view>
</template>

<script>
	import noData from '../../static/noData.png'
	import next from '../../static/next.png'
	import cityList from '../../city.js'; //模拟数据
	export default {
		props: {
			//是否点击阴影关闭
			isMask: {
				type: Boolean,
				default: true,
			},
			//是否开启动画
			animation: {
				type: Boolean,
				default: true,
			},
			//是否开启安全条
			safeArea: {
				type: Boolean,
				default: true,
			},
		},
		data() {
			return {
				isShow: false,
				checkBox: [],
				noDataImg: '',
				nextImg: '',
				tabId: 0, //计算当前顶部滑块id
				checkArr: [],
				id: 0, //通tabId，他们2的区别是，id先赋值，tabId在数据请求成功后才会赋值
				tabList: [{
						title: '选择所在省',
						id: 0
					},
					{
						title: '选择所在市',
						id: 1
					},
					{
						title: '选择所在区县',
						id: 2
					}
				],
				scrollViewWidth: 0,
				elWidth: 0,
				cityList: cityList,
			};
		},
		mounted() {
			this.nextImg = next
			this.noDataImg = noData
		},
		methods: {
			open() {
				this.isShow = true;
				this.init();
			},
			close() {
				this.isShow = false;
			},
			init() {
				// 初始化数据
				this.id = 0;
				this.tabId = 0;
				this.checkBox = [];
				this.checkArr = [];
				//初始化求出滚动的宽度
				let view = uni.createSelectorQuery().in(this).select(".scroll-title")
				view.boundingClientRect(rect => {
					this.scrollViewWidth = Math.round(rect.width)
				}).exec()
				this.getData();
			},
			async check(index) {
				this.$set(this.checkArr, this.id, this.checkBox[this.id][index]);
				if (this.id < this.tabList.length - 1) this.id = this.id + 1;
				await this.getData(); //同步请求
				//获取点击元素的宽度求出元素一半的宽度
				let view = uni.createSelectorQuery().in(this).select('#se-' + this.tabId)
				view.boundingClientRect(rect => {
					this.elWidth = Math.round(rect.width);
				}).exec()
				//定时器别删，不然最后一步有Bug
				setTimeout(() => {
					this.scrollViewWidth = this.scrollViewWidth + this.elWidth;
				});
				if (this.tabId < this.tabList.length - 1) this.tabId = this.tabId + 1;
			},
			checkTab(e) {
				if (e == this.id) return;
				this.id = e;
				this.tabId = e;
				this.checkArr = this.checkArr.splice(0, e);
			},
			getResult(event) {
				if (event == 'confirm') {
					if (this.checkArr.length != this.tabList.length) return;
					let result = this.checkArr;
					this.$emit('change', {
						value: result
					})
				}
				this.close();
			},
			//使用本地假数据进行加载
			async getData() {
				if (this.checkArr.length == this.tabList.length) return;
				uni.showLoading({
					title: '加载中...'
				});
				//模拟数据实例-------------------------
				let list = [];
				if (this.checkArr.length) {
					var id = this.checkArr[this.id - 1].value
					let idList = this.checkBox[this.id - 1].find(item => {
						return item.value == id;
					})
					idList.children.map(e => {
						list.push(e);
					});
					uni.hideLoading();
					this.$set(this.checkBox, this.id, list)
				} else {
					this.cityList.map(e => {
						list.push(e);
					});
					uni.hideLoading()
					this.$set(this.checkBox, this.id, list)
				}
				//接口请求数据实例--------------
				// let params = {
				// 	code: this.checkArr && this.checkArr.length > 0 ? this.checkArr[this.checkArr.length - 1]
				// 		.code : ''
				// };
				// await getData(params).then(res => {
				// 	if (res.code == 200) {
				// 		this.$set(this.checkBox, this.id, res.data);
				// 	} else {
				// 		this.$set(this.checkBox, this.id, []);
				// 	}
				// 	uni.hideLoading()
				// })
			},
		},
	};
</script>

<style>
	/deep/ ::-webkit-scrollbar {
		width: 0;
		height: 0;
		color: transparent;
		display: none;
	}
</style>
<style lang="scss" scoped>
	.scroll-popup {
		width: 100%;
		position: fixed;
		bottom: -100%;
		z-index: 999;
	}

	.scroll-open {
		bottom: 0px !important;
	}

	.scroll-animation {
		transition: all 0.25s linear;
	}

	.scroll-mask {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(0, 0, 0, 0.3);
		z-index: 998;
	}

	.scroll-box {
		position: absolute;
		bottom: 0;
		width: 100%;
		background: #ffff;
		border-radius: 24rpx 24rpx 0 0;
	}

	.scroll-temp {
		padding-bottom: env(safe-area-inset-bottom);
	}

	.scroll-top {
		height: 88rpx;
		line-height: 88rpx;
	}

	.scroll-top-left {
		float: left;
		padding-left: 24rpx;
		font-size: 28rpx;
	}

	.scroll-top-right {
		float: right;
		padding-right: 24rpx;
		color: #1890ff;
		font-size: 28rpx;
	}

	.scroll-title {
		white-space: nowrap;
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		background-color: #fafafa;
	}

	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		height: 400rpx;
		line-height: 100rpx;
		background-color: #ffffff;
	}

	.scroll-title-item {
		position: relative;

		image {
			position: absolute !important;
			right: -48rpx !important;
			top: 0 !important;
			bottom: 0 !important;
			width: 28rpx !important;
			height: 28rpx !important;
			margin: auto !important;
		}
	}

	.scroll-title-item-box {
		display: inline-block;
		margin: 0 32rpx;
		font-size: 28rpx;
		color: #333333;
	}

	.scroll-title-item-true {
		font-size: 28rpx;
		font-weight: 700;
		color: #1890ff;
	}

	.scroll-view-box {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin: 16rpx;
	}

	.scroll-view-grid-box {
		width: calc(100% - 20rpx);
		margin: 10rpx;
		padding-bottom: 10rpx;
	}

	.scroll-view-noBox {
		width: 100%;
		height: 400rpx;
		text-align: center;

		image {
			width: 200rpx;
			height: 200rpx;
			margin-top: 32rpx;
		}

		.text {
			width: 100%;
			text-align: center;
			color: #888;
			font-size: 28rpx;
			margin-top: -40rpx;
		}
	}

	.scroll-view-item {
		padding: 0rpx 24rpx;
		text-align: left;
		border-radius: 6rpx;
		background: #f7f7f7;
		color: #333333;
		font-size: 28rpx;
		margin: 12rpx 4rpx;
		height: 66rpx;
		line-height: 66rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.scroll-view-item-true {
		padding: 0rpx 24rpx;
		text-align: left;
		border-radius: 6rpx;
		background-color: #1890ff;
		color: #ffffff;
		font-size: 28rpx;
		margin: 12rpx 4rpx;
		height: 66rpx;
		line-height: 66rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
</style>