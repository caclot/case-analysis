(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["commPages/UpdatePackageModal"],{"384b":function(t,e,n){"use strict";n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return a})),n.d(e,"a",(function(){}));var r=function(){var t=this.$createElement;this._self._c},a=[]},5213:function(t,e,n){"use strict";var r=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=r(n("9523"));function c(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function i(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?c(Object(n),!0).forEach((function(e){(0,a.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var o={props:{visible:{type:Boolean,default:!1},initialData:{type:Object,default:function(){return{}}}},data:function(){return{formData:i({},this.initialData)}},methods:{closeModal:function(){this.$emit("close")},saveChanges:function(){this.$emit("save",this.formData)}},watch:{initialData:function(t){this.formData=i({},t)}}};e.default=o},"57c3":function(t,e,n){"use strict";n.r(e);var r=n("5213"),a=n.n(r);for(var c in r)["default"].indexOf(c)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(c);e["default"]=a.a},a8aa:function(t,e,n){"use strict";var r=n("c3d6"),a=n.n(r);a.a},c3d6:function(t,e,n){},fa9a:function(t,e,n){"use strict";n.r(e);var r=n("384b"),a=n("57c3");for(var c in a)["default"].indexOf(c)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(c);n("a8aa");var i=n("f0c5"),o=Object(i["a"])(a["default"],r["b"],r["c"],!1,null,"0b657cac",null,!1,r["a"],void 0);e["default"]=o.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'commPages/UpdatePackageModal-create-component',
    {
        'commPages/UpdatePackageModal-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fa9a"))
        })
    },
    [['commPages/UpdatePackageModal-create-component']]
]);
