(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["homePages/pickup"],{3890:function(n,e,t){},"42ba":function(n,e,t){"use strict";var o=t("3890"),a=t.n(o);a.a},"723f":function(n,e,t){"use strict";t.r(e);var o=t("a881"),a=t("7d7c");for(var c in a)["default"].indexOf(c)<0&&function(n){t.d(e,n,(function(){return a[n]}))}(c);t("42ba");var i=t("f0c5"),u=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,"6894aaca",null,!1,o["a"],void 0);e["default"]=u.exports},"7d7c":function(n,e,t){"use strict";t.r(e);var o=t("bc0a"),a=t.n(o);for(var c in o)["default"].indexOf(c)<0&&function(n){t.d(e,n,(function(){return o[n]}))}(c);e["default"]=a.a},"9e2b":function(n,e,t){"use strict";(function(n,e){var o=t("4ea4");t("affb");o(t("66fd"));var a=o(t("723f"));n.__webpack_require_UNI_MP_PLUGIN__=t,e(a.default)}).call(this,t("bc2e")["default"],t("543d")["createPage"])},a881:function(n,e,t){"use strict";t.d(e,"b",(function(){return a})),t.d(e,"c",(function(){return c})),t.d(e,"a",(function(){return o}));var o={tnNavBar:function(){return Promise.all([t.e("common/vendor"),t.e("tuniao-ui/components/tn-nav-bar/tn-nav-bar")]).then(t.bind(null,"9b26"))},uniIcons:function(){return Promise.all([t.e("common/vendor"),t.e("uni_modules/uni-icons/components/uni-icons/uni-icons")]).then(t.bind(null,"a128"))}},a=function(){var n=this.$createElement;this._self._c},c=[]},bc0a:function(n,e,t){"use strict";(function(n){var o=t("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(t("cbad")),c={name:"TemplateHistory",mixins:[a.default],data:function(){return{package_id1:""}},onLoad:function(){},methods:{takePhoto:function(){console.log("拍照...")},scanCode:function(){var e=this;console.log("大概"),n.scanCode({success:function(n){e.package_id1=n.result},fail:function(n){console.error("扫码失败",n)}})},handleClick:function(){this.package_id1;console.log(this.package_id1),n.request({url:"http://139.196.211.123:8081/package/pickupPackage",method:"POST",data:this.package_id1,success:function(e){console.log("请求成功",e.data),200===e.statusCode?n.showToast({title:"揽收成功",icon:"success"}):(console.error("请求失败",e.errMsg),n.showToast({title:"揽收失败，请重试",icon:"none"}))},fail:function(e){console.error("请求失败",e.errMsg),n.showToast({title:"揽收失败，请重试",icon:"none"})}})}}};e.default=c}).call(this,t("543d")["default"])}},[["9e2b","common/runtime","common/vendor"]]]);