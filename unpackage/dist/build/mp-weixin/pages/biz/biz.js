(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/biz/biz"],{"26c7":function(e,n,t){"use strict";t.r(n);var o=t("6f86"),i=t.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return o[e]}))}(a);n["default"]=i.a},4711:function(e,n,t){"use strict";t.d(n,"b",(function(){return i})),t.d(n,"c",(function(){return a})),t.d(n,"a",(function(){return o}));var o={tnNavBar:function(){return Promise.all([t.e("common/vendor"),t.e("tuniao-ui/components/tn-nav-bar/tn-nav-bar")]).then(t.bind(null,"9b26"))},tnNoticeBar:function(){return Promise.all([t.e("common/vendor"),t.e("tuniao-ui/components/tn-notice-bar/tn-notice-bar")]).then(t.bind(null,"a0d5"))}},i=function(){var e=this.$createElement;this._self._c},a=[]},"6f86":function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={name:"Home",data:function(){return{cardCur:0,isAndroid:!0,list:["别偷懒了赶紧干活！","滴滴滴这里是卓越快递！","磨磨唧唧","不要，不要，快去登录，受不了了","从哪里跌倒，就在哪里睡一觉","杂鱼~"],bussiness:[{title:"揽收快件",icon:"image-text-fill",color:"#5177EE",value:"查看详情",url:"/homePages/pickup"},{title:"转运派单",icon:"calendar-fill",color:"#19cf8a",value:"查看详情",url:"/homePages/transfer"},{title:"派送包裹",icon:"image-fill",color:"#5F4FD9",value:"查看详情",url:"/homePages/deliver"},{title:"签收包裹",icon:"theme-fill",color:"#954FF6",value:"查看详情",url:"/homePages/signup"},{title:"待送包裹",icon:"trophy-fill",color:"#F33F5A",value:"查看详情",url:"/homePages/honor"},{title:"敬请期待",icon:"location-fill",color:"#FF7043",value:"查看详情",url:"/homePages/map"}]}},created:function(){var n=e.getSystemInfoSync();n.system.toLocaleLowerCase().includes("ios")?this.isAndroid=!1:this.isAndroid=!0},methods:{tn:function(n){e.navigateTo({url:n})}}};n.default=t}).call(this,t("543d")["default"])},"9fe3":function(e,n,t){},ce74:function(e,n,t){"use strict";t.r(n);var o=t("4711"),i=t("26c7");for(var a in i)["default"].indexOf(a)<0&&function(e){t.d(n,e,(function(){return i[e]}))}(a);t("fe21");var r=t("f0c5"),l=Object(r["a"])(i["default"],o["b"],o["c"],!1,null,"a83de1a8",null,!1,o["a"],void 0);n["default"]=l.exports},fe21:function(e,n,t){"use strict";var o=t("9fe3"),i=t.n(o);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/biz/biz-create-component',
    {
        'pages/biz/biz-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ce74"))
        })
    },
    [['pages/biz/biz-create-component']]
]);
