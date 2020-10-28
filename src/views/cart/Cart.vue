<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{ length }})</div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
import {mapGetters} from 'vuex';
export default {
  name: "Cart",
  components: {
    NavBar,
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
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
}
</style>
