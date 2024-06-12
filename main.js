import App from './App'
import store from './store'
import loginState from './store/loginState'; // 导入 Vuex 的状态管理
import Vue from 'vue'
Vue.config.productionTip = false
App.mpType = 'app'


// 引入全局TuniaoUI
import TuniaoUI from 'tuniao-ui'
Vue.use(TuniaoUI)
// 引入TuniaoUI提供的vuex简写方法
import UniSection from '@/libs/components/uni-section.vue'
Vue.use(UniSection)

let vuexStore = require('@/store/$t.mixin.js')
Vue.mixin(vuexStore)

// 引入TuniaoUI对小程序分享的mixin封装
let mpShare = require('tuniao-ui/libs/mixin/mpShare.js')
Vue.mixin(mpShare)


const app = new Vue({
  store,
  ...App
})

app.$mount()