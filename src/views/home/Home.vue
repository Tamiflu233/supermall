<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <h2>首页</h2>
  </div>
</template>

<script>
import NavBar from 'components/common/navbar/NavBar'
import {getHomeMultidata} from 'network/home'

export default {
  name: "Home",
  components: {
    NavBar
  },
  data() {
    return {
      banners: [],
      recommends: []
    };
  },
  computed: {},
  created() {
    // 组件创建完成后发送网络请求
    // 1.请求多个数据
    getHomeMultidata().then(res => {
      console.log(res);
      // 箭头函数的this取决于作用域链，而外层created的this就是组件
      this.banners = res.data.banner.list 
      this.recommends = res.data.recommend.list
    })
  },
  methods: {},
};
</script>

<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
