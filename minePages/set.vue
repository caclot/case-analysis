<template>
	<view class="template-content">
		<!-- 顶部自定义导航 -->
		<tn-nav-bar fixed alpha customBack>
			<view slot="back" class='tn-custom-nav-bar__back' @click="goBack">
				<text class='icon tn-icon-left'></text>
				<text class='icon tn-icon-home-capsule-fill'></text>
			</view>
		</tn-nav-bar>


		<view class="tn-margin tn-text-center" :style="{paddingTop: vuex_custom_bar_height + 'px'}">
			别看了还没开发呢
		</view>


		<view class="container1">
			<view class="button-number tn-flex tn-flex-row-between tn-flex-col-center tn-shadow-blur"
				style="background: linear-gradient(-120deg, #3E445A, #31374A, #2B3042, #262B3C);">

				<view class="tn-margin-left" @click="tn('/homePages/member')">
					<view class="tn-flex tn-flex-col-center" style="color: #F1C68E;margin-top: -20rpx;">
						<text class="tn-text-bold tn-text-xl">至尊</text>
						<text class="tn-icon-vip-text tn-text-center" style="font-size: 92rpx;"></text>
					</view>
					<view class='tn-color-white tn-text-sm'>会员福利，助力事业一骑绝尘</view>
				</view>
				<view class="tn-margin-right">
					<tn-button shape="round" backgroundColor="#F1C68E" fontColor="#634738" padding="10rpx 0"
						width="160rpx" shadow @click="tn('/homePages/member')">
						<!-- <text class="tn-icon-vip tn-padding-right-sm tn-text-lg"></text> -->
						<text class="tn-text-bold">权 益</text>
					</tn-button>
				</view>

				<view class="tnwave waveAnimation">
					<view class="waveWrapperInner bgTop">
						<view class="wave waveTop"
							style="background-image: url('https://resource.tuniaokj.com/images/wave/wave-2.png')">
						</view>
					</view>
					<view class="waveWrapperInner bgMiddle">
						<view class="wave waveMiddle"
							style="background-image: url('https://resource.tuniaokj.com/images/wave/wave-2.png')">
						</view>
					</view>
					<view class="waveWrapperInner bgBottom">
						<view class="wave waveBottom"
							style="background-image: url('https://resource.tuniaokj.com/images/wave/wave-1.png')">
						</view>
					</view>
				</view>

			</view>
		</view>

	</view>
</template>

<script>
	import template_page_mixin from '@/libs/mixin/template_page_mixin.js'
	export default {
		name: 'TemplateContent',
		mixins: [template_page_mixin],
		data() {
			return {}
		},
		methods: {

		}
	}
</script>

<style lang="scss" scoped>
	/* 胶囊*/
	.tn-custom-nav-bar__back {
		width: 100%;
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

		&:before {
			content: " ";
			width: 1rpx;
			height: 110%;
			position: absolute;
			top: 22.5%;
			left: 0;
			right: 0;
			margin: auto;
			transform: scale(0.5);
			transform-origin: 0 0;
			pointer-events: none;
			box-sizing: border-box;
			opacity: 0.7;
			background-color: #FFFFFF;
		}
	}

		
		
	.container1{
		display: flex;
		transform: translate(10%);
		width: 90%;
		
	}

	/* 背景波浪高度 */
	.button-number {
		width: 90%;
		height: 150rpx;
		border-radius: 15rpx;
		
		position: relative;
		z-index: 1;
	}

	/* 动态背景波浪*/
	@keyframes move_wave {
		0% {
			transform: translateX(0) translateZ(0) scaleY(1)
		}

		50% {
			transform: translateX(-25%) translateZ(0) scaleY(1)
		}

		100% {
			transform: translateX(-50%) translateZ(0) scaleY(1)
		}
	}

	.tnwave {
		overflow: hidden;
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		margin: auto;
		z-index: -1;
		border-radius: 15rpx;
	}

	.waveWrapperInner {
		position: absolute;
		width: 100%;
		overflow: hidden;
		height: 100%;
	}

	.wave {
		position: absolute;
		left: 0;
		width: 200%;
		height: 100%;
		background-repeat: repeat no-repeat;
		background-position: 0 bottom;
		transform-origin: center bottom;
	}

	.bgTop {
		opacity: 0.1;
	}

	.waveTop {
		background-size: 50% 45px;
	}

	.waveAnimation .waveTop {
		animation: move_wave 4s linear infinite;
	}

	.bgMiddle {
		opacity: 0.2;
	}

	.waveMiddle {
		background-size: 50% 40px;
	}

	.waveAnimation .waveMiddle {
		animation: move_wave 3.5s linear infinite;
	}

	.bgBottom {
		opacity: 0.3;
	}

	.waveBottom {
		background-size: 50% 35px;
	}

	.waveAnimation .waveBottom {
		animation: move_wave 2s linear infinite;
	}
</style>