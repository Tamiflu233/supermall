<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control
      :titles="['流行', '新款', '精选']"
      @tabClick="tabClick"
      ref="tabControl1"
      class="tab-control"
      v-show="isTabFixed"
    ></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :probe-type="3"
      :pull-up-load="true"
      @scroll="contentScroll"
      @pullingUp="loadMore"
    >
      <home-swiper
        :banners="banners"
        @swiperImageLoad="swiperImageLoad"
      ></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control
        :titles="['流行', '新款', '精选']"
        @tabClick="tabClick"
        ref="tabControl2"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <!-- .native修饰符可以让组件能使用原生的监听事件(不加就用不了) -->
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";

import { getHomeMultidata, getHomeGoods } from "network/home";

import { debounce } from "common/utils.js";
export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      currentType: "pop",
      isShowBackTop: false,
      tabOffsetTop: 0,
      isTabFixed: false,
    };
  },
  created() {
    // 组件创建完成后发送网络请求
    // 1.请求多个数据
    this.getHomeMultidata();

    // 2. 请求商品数据
    this.getHomeGoods("pop");
    this.getHomeGoods("new");
    this.getHomeGoods("sell");
  },
  mounted() {
    // 1. 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 500);
    this.$bus.$on("itemImageLoad", () => {
      refresh(); //闭包不会销毁refresh
    });
    // 2.获取tabControl的offsetTop
    // 自定义组件没有一般dom的offsetTop属性，但是都有$el属性,用于获取组件中的元素
    // 然后放在mounted得到的结果不对，因为挂载完，网速不好的话图片还没加载好，这个时候会获得错误的值
    /* this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop
    console.log(this.tabOffsetTop); */
  },
  methods: {
    /* 
      事件监听相关的方法
    */
    //  防抖函数(处理图片加载事件的高频响应)
    tabClick(index) {
      //  console.log(index);
      switch (index) {
        case 0:
          this.currentType = "pop";
          break;
        case 1:
          this.currentType = "new";
          break;
        case 2:
          this.currentType = "sell";
          break;
      }
      /* 同步俩tabbar的选中项(为了实现fixed干脆用俩tabbar，前者等滚动到offsetHeight才显示) */
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    contentScroll(position) {
      // 1.判断BackTop是否显示
      this.isShowBackTop = Math.abs(position.y) > 1000;

      // 2.决定tabControl是否吸顶(position: fixed)
      this.isTabFixed = -position.y > this.tabOffsetTop;
    },
    loadMore() {
      this.getHomeGoods(this.currentType);
    },
    swiperImageLoad() {
      // 加载完轮播图后，获取tabControl的offsetTop(精确值)
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
    },
    /* 
      网络请求相关的方法
    */
    getHomeMultidata() {
      getHomeMultidata().then((res) => {
        console.log(res);
        // 箭头函数的this取决于作用域链，而外层created的this就是组件
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then((res) => {
        // console.log(res);
        // es6 ...扩展运算符可以结构可迭代对象
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;
        // 加载完数据结束better-scroll的pullup事件以便再次触发
        this.$refs.scroll.finishPullUp();
      });
    },
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list;
    },
  },
};
</script>

<style scoped>
#home {
  /* 之前为了让主页面不会被nav-bar盖住加了padding-top,但为了保证content部分的计算高度能到100% - navbar - tabbar */
  /* 得去掉，然后在content加上margin-top来代替 */
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  /* 用了better-scroll局部滚动了，所以nav-bar不会被滚掉，就没必要fixed了
    如果用浏览器原生滚动就要用position: fixed了
   */
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999; */
}

/* 方案二： 利用绝对定位设置top和bottom然后height默认auto自动调整 */
.content {
  /* height: 300px; */
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tab-control {
  position: relative;
  top: -1px;  /* 感觉和nav-bar之间有条缝，调整一下 */
  z-index: 999;
}

/* .fixed {
   会发现没有吸顶，反而消失了，原因是better-scroll内部其实是修改transform: translate
    这个平移样式会把fixed的tabControl也会平移到上面去
   
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
}
 */
/* 方案一 calc动态计算滚动部分的高度 */
/* .content {
  margin-top: 44px;
  height: calc(100% - 93px);
  overflow: hidden;
} */
</style>
