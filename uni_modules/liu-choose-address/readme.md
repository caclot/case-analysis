### liu-choose-address适用于uni-app项目的多级选择组件
### 本组件目前兼容微信小程序、H5
### 本组件支持省市区选择、多级选择、自定义选择级数据自定义选择项、通过接口异步加载选择项
# --- 扫码预览、关注我们 ---

## 扫码关注公众号，查看更多插件信息，预览插件效果！ 

![](https://uni.ckapi.pro/uniapp/publicize.png)

### 使用方式	
``` html
<button @click="openAddress">打开地址选择器</button>
<liu-choose-address ref="scroll" @change='chooseSuccess'></liu-choose-address>
```
``` javascript
export default {
	data() {
		return {
			
		};
	},
	methods: {
		//打开地址选择器
		openAddress() {
			this.$refs.scroll.open()
		},
		//地址选择成功
		chooseSuccess(e) {
			console.log('所选择的地址信息:', e)
		}
	}
}
```

### 属性说明
| 名称                         | 类型            | 默认值                | 描述             |
| ----------------------------|--------------- | ---------------------- | ---------------|
| animation                   | Boolean        | true          | 是否开启动画
| safeArea                    | Boolean        | true          | 是否开启安全条
| isMask                      | Boolean        | true          | 是否点击阴影关闭
| @change                     | Function       |               | 选择成功回调事件



