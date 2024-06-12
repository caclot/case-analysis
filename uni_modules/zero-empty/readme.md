# zero-empty


## 插件说明

个人仅测试于微信小程序


## 使用方法

**符合`easycom`组件模式, 导入 `uni_modules` 后直接使用即可 **

```html
<template>
	<view class="container">
		<!-- 默认用法 -->
		<zero-empty v-if="empty"></zero-empty>
		<!-- 自定义 -->
		<zero-empty v-if="empty" :needBtn="needBtn"  @click='handleClick'></zero-empty>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		created() {
		},
		methods: {
			handleClick() {
				uni.showToast({
					title: '点击了返回',
					duration: 2000
				});
			}
		},
	}
</script>
	<style lang="scss" scoped>
	</style>
```

## 参数说明

|参数			|类型	|默认值		|描述							|
|--				|--		|--			|--								|
|emptyImg		|String	|			|图片路径						|
|emptyImgSize	|Number	|300		|图片大小（widthFix），单位rpx	|
|emptyTips		|String	|'暂无数据'	|提示文案						|
|emptyTipsSize	|Number	|32			|提示文案字号，单位rpx			|
|needBtn		|Boolean|false		|是否显示按钮					|
|btnText		|String	|'返回'		|按钮文案						|
|btnColor		|String	|'#0396FF'	|按钮颜色						|
|top			|String	|'50%'		| 距离顶部高度					|


## event说明
|事件名	|说明			|返回值	|
|--		|--				|--		|
|@click	|点击按钮时触发	|-		|




插件预览:
![code](https://img.zerojs.cn/mweb/we_code.jpg)

> 预览的小程序不一定能及时更新当前插件