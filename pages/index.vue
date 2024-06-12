<template>
	<view class="start-index">
		<view v-if="tabberPageLoadFlag[0]" :style="{display: currentIndex === 0 ? '' : 'none'}">
			<scroll-view class="custom-tabbar-page" scroll-y enable-back-to-top @scrolltolower="tabbarPageScrollLower">
				<Home ref="home"></Home>
			</scroll-view>
		</view>
		<view v-if="tabberPageLoadFlag[1]" :style="{display: currentIndex === 1 ? '' : 'none'}">
			<scroll-view class="custom-tabbar-page" scroll-y enable-back-to-top @scrolltolower="tabbarPageScrollLower">
				<Biz ref="biz"></Biz>
			</scroll-view>
		</view>
		<view v-if="tabberPageLoadFlag[2]" :style="{display: currentIndex === 2 ? '' : 'none'}">
			<scroll-view class="custom-tabbar-page" scroll-y enable-back-to-top @scrolltolower="tabbarPageScrollLower">
				<Mine ref="mine"></Mine>
			</scroll-view>
		</view>

		<tn-tabbar v-model="currentIndex" :list="tabbarList" activeColor="#838383" inactiveColor="#AAAAAA"
			activeIconColor="#3668FC" :animation="true" :safeAreaInsetBottom="true" @change="switchTabbar"></tn-tabbar>
	</view>
</template>

<script>
	import Home from './home/home.vue'
	import Biz from './biz/biz.vue'
	import Mine from './mine/mine.vue'
//	import '@/store/updateLocation.js';
	export default {
		components: {
			Home,
			Biz,
			Mine
		},
		data() {
			return {
				// 底部tabbar菜单数据
				tabbarList: [{
						title: '首页',
						// activeIcon: '/static/tabbar/tn-tabbar0-curnew.png',
						// inactiveIcon: '/static/tabbar/tn-tabbar0.png'
						activeIcon: 'home-in-fill',
						inactiveIcon: 'home-in'
					},
					{
						// 服务、案例、品牌、合作、发现、探索
						title: '业务',
						activeIcon: 'reload-planet-fill',
						inactiveIcon: 'rocket',
						activeIconColor: '#FFFFFF',
						inactiveIconColor: '#FFFFFF',
						iconSize: 50,
						out: true
					},
					{
						title: '我的',
						/* activeIcon: '/static/tabbar/tn-tabbar3-curnew.png',
						inactiveIcon: '/static/tabbar/tn-tabbar3.png' */
						activeIcon: 'my-circle-fill',
						inactiveIcon: 'my-circle',

					}
				],
				// tabbar当前被选中的序号
				currentIndex: 0,
				// 自定义底栏对应页面的加载情况
				tabberPageLoadFlag: []
			}
		},
		onLoad(options) {
			
			console.log("index页面的onload运行起来了");
			const index = Number(options.index || 0)
			// 根据底部tabbar菜单列表设置对应页面的加载情况
			this.tabberPageLoadFlag = this.tabbarList.map((item, tabbar_index) => {
				return index === tabbar_index
			})
			
			this.switchTabbar(index)
			this.$store.commit('userLogin', {
				username: uni.getStorageSync('name'),
				uid: uni.getStorageSync('id'),
				phone: uni.getStorageSync('phone'),
				mail: uni.getStorageSync('email'),
				serveAt: uni.getStorageSync('serveat'),
				logisticId: uni.getStorageSync('logisticId'),
			});
			console.log("全局变量：login = "+ this.$login);
			console.log("全局变量：name = "+ this.$name);
			console.log("全局变量：uid = "+ this.$uid);
			
			console.log(uni.getStorageSync('name'));
			console.log(uni.getStorageSync('id'));
			console.log(uni.getStorageSync('email'));
			console.log(uni.getStorageSync('login'));
			console.log(uni.getStorageSync('serveat'));
			console.log(uni.getStorageSync('logisticId'));
			

			
			
		},
		onShow() {
			console.log("index界面的onshow");
		},
		methods: {
			// 切换导航
			switchTabbar(index) {
				this._switchTabbarPage(index)
			},


			// 瀑布流导航页面滚动到底部
			tabbarPageScrollLower(e) {
				if (this.currentIndex === 1) {
					this.$refs.comm.getRandomData && this.$refs.comm.getRandomData()
				}
			},

			// 切换导航页面
			_switchTabbarPage(index) {
				wx.vibrateShort();
				const selectPageFlag = this.tabberPageLoadFlag[index]
				if (selectPageFlag === undefined) {
					return
				}
				if (selectPageFlag === false) {
					this.tabberPageLoadFlag[index] = true
				}
				this.currentIndex = index
			}
		}
	}
</script>

<style lang="scss" scoped>
</style>