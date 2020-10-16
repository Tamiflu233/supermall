<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control
      class="tab-control"
      :titles="['流行', '新款', '精选']"
    ></tab-control>
    <ul>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
      <li>哈哈</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";

import NavBar from "components/common/navbar/NavBar";
import TabControl from "components/content/tabControl/TabControl";

import { getHomeMultidata } from "network/home";

export default {
  name: "Home",
  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
  },
  data() {
    return {
      banners: [],
      recommends: [],
    };
  },
  computed: {},
  created() {
    // 组件创建完成后发送网络请求
    // 1.请求多个数据
    getHomeMultidata().then((res) => {
      console.log(res);
      // 箭头函数的this取决于作用域链，而外层created的this就是组件
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
  },
  methods: {},
};
</script>

<style scoped>
#home {
  padding-top: 44px;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;
}

.tab-control {
  /* 粘滞定位兼容性不好，少用,移动端倒无所谓 */
  position: sticky;
  top: 43px;
}
</style>
