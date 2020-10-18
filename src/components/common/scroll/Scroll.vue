<template>
  <!-- ref在子组件里写可以让父组件访问子组件,在普通的元素上也可以 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 直接通过querySelector获取dom不太好,因为可能别的组件会有类名一样的元素，很可能会获取其他同类名的dom
    // document.querySelector(".wrapper")
    // 用ref可以解决
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 如果不允许click事件的传递，那可滚动区域里面所有的点击跳转全部失效
      click: true
    });
    // 挂载完不代表商品列表加载完
    // this.scroll.refresh();
  },
  updated() {
    // 首页中商品列表是实时更新的，这就导致scroll的滚动距离需要实时更新，所以在updated生命周期用refresh方法重新计算滚动距离
    this.scroll.refresh()
  },
};
</script>

<style scoped>
</style>