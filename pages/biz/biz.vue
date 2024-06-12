<template>
  <view class="template-index tn-safe-area-inset-bottom">
    
    <view v-if="isAndroid" class="" style="width: 100%;height: 220rpx;background: linear-gradient(0deg, rgba(255,255,255,0), rgba(0,0,0,0.16));position: fixed;top: 0;z-index: 1;">
      <tn-nav-bar fixed :isBack="false" :bottomShadow="false" backgroundColor="#FFFFFF00">
        <view class="custom-nav tn-flex tn-flex-col-center tn-flex-row-left">
			<view class="justify-content-item pos tn-text-bold">
			  卓越快递
			</view>
          <!-- 图标logo -->
          <view class="custom-nav__back" @click="tn('/homePages/about')">
            <!-- 图片模式-->
            <view class="logo-pic tn-shadow-blur" style="background-image:url('')">
			<!-- 这里要加一张图片是个图标 starrr -->
              <view class="logo-image">
              </view>
            </view> 
            <!-- 如果有图片那就放图片，如果没有，那就删掉上面的放字体icon -->
            <view class="tn-icon-left">aaaa</view>
          </view>   
        </view>
      </tn-nav-bar>
    </view>
    
    <!-- 通知-->
    <view class="tn-bg-white tn-margin-top" style="border-radius: 20rpx;margin-top: 72px;">
      <tn-notice-bar :list="list" mode="vertical" leftIconName="notice"></tn-notice-bar>
    </view>

    <!-- 标题-->
    <view class="tn-flex tn-flex-row-between tn-flex-col-center tn-margin-top" @click="tn('')" style="margin-top: -10px;">
      <view class="justify-content-item tn-margin tn-text-bold tn-text-xl blue-title">
        业务
      </view>
      <view class="justify-content-item tn-margin-right tn-text-df tn-color-gray">
        <text class="tn-padding-xs">更多</text>
        <text class="tn-icon-right"></text>
      </view>
    </view>
    
    <!-- 功能入口-->
    <view class="tn-info__container tn-flex tn-flex-wrap tn-flex-col-center tn-flex-row-between tn-margin-left tn-margin-right">
      <block v-for="(item, index) in bussiness" :key="index">
        <view class="tn-info__item tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-between tn-color-white tn-shadow-blur" :style="'background-color:'+ item.color +';'"  @click="tn(item.url)">
          <view class="tn-info__item__left tn-flex tn-flex-direction-row tn-flex-col-center tn-flex-row-left">
            <!-- <view class="tn-info__item__left--icon tn-flex tn-flex-col-center tn-flex-row-center">
              <view :class="[`tn-icon-${item.icon}`]"></view>
            </view> -->
            <view class="tn-info__item__left__content">
              <view class="tn-info__item__left__content--title tn-text-bold" style="font-size: 38rpx;">{{ item.title }}</view>
              <view class="tn-info__item__left__content--data tn-padding-top-xs">
                {{ item.value }}
                <text class="tn-icon-right tn-padding-left-xs"></text>
              </view>
            </view>
          </view>
<!--          <view class="tn-info__item__right">
            <view class="tn-info__item__right--icon">
              <view :class="[`tn-icon-${item.icon}`]"></view>
            </view>
          </view> -->
          <view class="tn-info__item__bottom">
            <view class='name tn-text-sm tn-color-gray' style="margin-left: -10rpx;">
              <text class="tn-icon-code tn-padding-right-xs" style="opacity: 0;"></text>
            </view>
          </view>
        </view>
      </block>
    </view>



  </view>
</template>

<script>
  export default {
    name: 'Home',
    data(){
      return {
        cardCur: 0,
        isAndroid: true,
        list: [
          '别偷懒了赶紧干活！',
          '滴滴滴这里是卓越快递！',
		  '磨磨唧唧',
		  '不要，不要，快去登录，受不了了',
		  '从哪里跌倒，就在哪里睡一觉',
		  '杂鱼~'
        ],

        bussiness: [
          {
            title: '揽收快件',
            icon: 'image-text-fill',
            color: '#5177EE',
            value: '查看详情',
            url: '/homePages/pickup'
          },
          {
            title: '转运派单',
            icon: 'calendar-fill',
            color: '#19cf8a',
            value: '查看详情',
            url: '/homePages/transfer'
          },
          {
            title: '派送包裹',
            icon: 'image-fill',
            color: '#5F4FD9',
            value: '查看详情',
            url: '/homePages/deliver'
          },
          {
            title: '签收包裹',
            icon: 'theme-fill',
            color: '#954FF6',
            value: '查看详情',
            url: '/homePages/signup'
          },
          {
            title: '拆分包裹',
            icon: 'trophy-fill',
            color: '#F33F5A',
            value: '查看详情',
            url: '/homePages/split'
          },
          {
            title: '敬请期待',
            icon: 'location-fill',
            color: '#FF7043',
            value: '查看详情',
            url: '/homePages/map'
          }
        ],
      }
    },
    created() {
      const systemInfo = uni.getSystemInfoSync()
      if (systemInfo.system.toLocaleLowerCase().includes('ios')) {
        this.isAndroid = false
      } else {
        this.isAndroid = true
      }
    },
    methods: {
      // cardSwiper
      // 跳转
      tn(e) {
      	uni.navigateTo({
      		url: e,
      	});
      },
    }
  }
</script>

<style lang="scss" scoped>
  .template-index{
    max-height: 100vh;
  }
  .tn-tabbar-height {
  	min-height: 100rpx;
  	height: calc(120rpx + env(safe-area-inset-bottom) / 2);
  }
  
  /* 阴影*/
  .home-shadow{
      box-shadow: 0rpx 0rpx 80rpx 0rpx rgba(0, 0, 0, 0.07);
  }
  
  /* 自定义导航栏内容 start */
  .custom-nav {
    height: 100%;
    
    &__back {
      margin: auto 5rpx;
      font-size: 40rpx;
      margin-right: 10rpx;
      margin-left: 30rpx;
      flex-basis: 5%;
    }
    
    &__search {
      flex-basis: 60%;
      width: 100%;
      height: 100%;
      
      &__box {
        width: 100%;
        height: 70%;
        padding: 10rpx 0;
        margin: 0 30rpx;
        border-radius: 60rpx 60rpx 0 60rpx;
        font-size: 24rpx;
      }
      
      &__icon {
        padding-right: 10rpx;
        margin-left: 20rpx;
        font-size: 30rpx;
      }
      
      &__text {
        // color: #AAAAAA;
      }
    }
  }
  .logo-image{
    width: 65rpx;
    height: 65rpx;
    position: relative;
  }
  .logo-pic{
    background-size: cover;
    background-repeat:no-repeat;
    // background-attachment:fixed;
    background-position:top;
    border-radius: 50%;
  }
  /* 自定义导航栏内容 end */
  

  
  .pos{
	  display: inline-block;
	margin: 42%
  }
  .spot{
    background-color: #FFFFFF;
    opacity: 0.4;
    width: 10rpx;
    height: 10rpx;
    border-radius: 20rpx;
    top: -60rpx;
    margin: 0 8rpx !important;
    position: relative;
  }
  
  .spot.active{
    opacity: 0.6;
    width: 30rpx;
    background-color: #FFFFFF;
  }
  
  /* 资讯主图 start*/
  .image-article {
    border-radius: 8rpx;
    width: 220rpx;
    height: 120rpx;
    position: relative;
  }
  
  .image-pic{
    // border: 1rpx solid #F8F7F8;
    background-size: cover;
    background-repeat:no-repeat;
    // background-attachment:fixed;
    background-position:top;
    border-radius: 10rpx;
  }
  
  /* 文字截取*/
  .clamp-text-1 {
    -webkit-line-clamp: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  .clamp-text-2 {
    -webkit-line-clamp: 2;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  
  .blue-title::before {
    content: "";
    position: absolute;
    display: block;
    width: 80rpx;
    height: 26rpx;
    background: #269EFC;
    margin-top: 24rpx;
    margin-left: 0rpx;
    opacity: 0.3;
    z-index: -1;
    border-radius: 4rpx;
  }
  
  
 .icon12 {
   &__item {
     transform: scale(1);
     transition: transform 0.3s linear;
     transform-origin: center center;
     
     &--icon {
       width: 100rpx;
       height: 100rpx;
       font-size: 60rpx;
       border-radius: 50%;
       margin-bottom: 18rpx;
       position: relative;
       z-index: 1;
       
       &::after {
         content: " ";
         position: absolute;
         z-index: -1;
         width: 100%;
         height: 100%;
         left: 0;
         bottom: 0;
         border-radius: inherit;
         opacity: 1;
         transform: scale(1, 1);
         background-size: 100% 100%;
   //      background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg2.png);
 
           
       }
     }
   }
 }



  /* 胶囊banner*/
  .image-capsule{
    padding: 100rpx 0rpx;
    font-size: 40rpx;
    font-weight: 300;
    position: relative;
  }
  .image-piccapsule{
    background-size: cover;
    background-repeat:no-repeat;
    // background-attachment:fixed;
    background-position:top;
    border-radius: 20rpx 20rpx 0 0;
  }
  
  /* 工作区展示 start */
  .tn-info {
    
    &__container {
      margin-top: 10rpx;
      margin-bottom: 50rpx;
    }
    
    &__item {
      width: 47.7%;
      margin: 15rpx 0rpx 30rpx 0rpx;
      padding: 40rpx 30rpx;
      border-radius: 10rpx;
      
  
        position: relative;
        z-index: 1;
        
        &::after {
          content: " ";
          position: absolute;
          z-index: -1;
          width: 100%;
          height: 100%;
          left: 0;
          bottom: 0;
          border-radius: inherit;
          opacity: 1;
          transform: scale(1, 1);
          background-size: 100% 100%;
          background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/2.png);
        }
      
      &__left {
        
        &--icon {
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          font-size: 40rpx;
          margin-right: 20rpx;
          position: relative;
          z-index: 1;
          
          &::after {
            content: " ";
            position: absolute;
            z-index: -1;
            width: 100%;
            height: 100%;
            left: 0;
            bottom: 0;
            border-radius: inherit;
            opacity: 1;
            transform: scale(1, 1);
            background-size: 100% 100%;
            background-image: url(https://resource.tuniaokj.com/images/cool_bg_image/icon_bg5.png);
          }
        }
        
        &__content {
          font-size: 25rpx;          
          
          &--data {
            color: rgba(255,255,255,0.5);
            margin-top: 5rpx;
            // font-weight: bold;
          }
        }
      }
      
      &__right {
        &--icon {
          position: absolute;
          right: 0rpx;
          top: 50rpx;
          font-size: 100rpx;
          width: 108rpx;
          height: 108rpx;
          text-align: center;
          line-height: 60rpx;
          opacity: 0.15;  
        }
      }
      &__bottom {
        box-shadow: 0rpx 0rpx 30rpx 0rpx rgba(0, 0, 0, 0.12);
        border-radius: 0 0 10rpx 10rpx;
        position: absolute;
        width: 85%;
        line-height: 15rpx;
        left: 50%;
        bottom: -15rpx;
        transform: translateX(-50%);
        z-index: -1;
        text-align: center;
      }
    }
  }
  /* 工作区展示 end */
  
</style>