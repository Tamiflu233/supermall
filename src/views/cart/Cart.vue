<template>
  <div class="cart">
    <!-- 导航 -->
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
    <!-- 商品的列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";

import CartList from './childComps/CartList';
import CartBottomBar from './childComps/CartBottomBar';

import {mapGetters} from 'vuex';
export default {
  name: "Cart",
  components: {
    NavBar,
    CartList,
    CartBottomBar
  },
  computed: {
    //   两种语法
    //1.参数是数组，直接给定要转换成计算属性的getters
    // ...mapGetters(['cartLength','cartList'])
    // 2.参数是对象，可以给getters起别名
    ...mapGetters({
        length: 'cartLength',
        list: 'cartList'
    })
  },
  
};
</script>

<style scoped>
.cart {
  height: 100vh;
}
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
