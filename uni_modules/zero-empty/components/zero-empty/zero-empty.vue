<template>
	<view class="zero_empty" :style="{top: top}">
		<view class="img" :style="{width: emptyImgSize+'rpx'}">
			<image :src="emptyImg" mode="widthFix"></image>
		</view>
		<view class="tips"  v-if="emptyTips" :style="{color: emptyTipsColor,fontSize:emptyTipsSize+'rpx'}">
			{{emptyTips|| ''}}
		</view>
		<view class="btn" v-if="needBtn" :style="{'--color':btnColor}" @click="handleClick">
			{{btnText}}
		</view>
	</view>
</template>

<script>
	export default {
		name: "zero-empty",
		emits: ['click'],
		props: {
			emptyImg:{
				type: String,
				default: require('../../static/empty.svg')
			},
			emptyImgSize:{
				type: Number,
				default: 300,
			},
			emptyTips: {
				type: [String,Boolean],
				default: '暂无数据',
			},
			emptyTipsColor:{
				type: String,
				default: '#C8C8C8',
			},
			emptyTipsSize:{
				type: Number,
				default: 32,
			},
			needBtn: {
				type: Boolean,
				default: false,
			},
			btnText:{
				type: String,
				default: '返回',
			},
			btnColor:{
				type: String,
				default: '#0396FF',
			},
			top:{
				type: String,
				default: '50%',
			}
		},
		
		data() {
			return {
			};
		},
		
		methods: {
			handleClick() {
				this.$emit('click')
			},
		},
	};
</script>
<style lang="scss" scoped>
	.zero_empty{
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%,-50%);
		text-align: center;
		.img{
			margin: 0 auto;
			width: 100rpx;
			image{
				width: 100%;
				height: auto;
			}
		}
		.tips{
			margin: 50rpx 0;
			font-size: 40rpx;
		}
		.btn{
			display: inline-block;
			margin: 0 auto;
			font-size: 28rpx;
			border-radius: 50rpx;
			border: 1px solid var(--color);
			color:  var(--color);
			padding: 20rpx 50rpx;
			&:active{
				background-color: #fff;
				filter: brightness(.8);
			}
		}
	}
</style>
