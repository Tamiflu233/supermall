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
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 直接通过querySelector获取dom不太好,因为可能别的组件会有类名一样的元素，很可能会获取其他同类名的dom
    // document.querySelector(".wrapper")
    // 用ref可以解决
    // 1. 创建Bscroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      // 如果不允许click事件的传递，那可滚动区域里面所有的点击跳转全部失效
      click: true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
    });
    // 挂载完不代表商品列表加载完
    // this.scroll.refresh();

    // 2.监听滚动位置
    if (this.probeType === 2 || this.probeType === 3) {
      this.scroll.on("scroll", (position) => {
        this.$emit("scroll", position);
      });
    }

    // 3. 监听scroll滚动到底不
    if (this.pullUpLoad) {
      this.scroll.on("pullingUp", () => {
        this.$emit("pullingUp");
      });
    }
  },
  updated() {
    // 首页中商品列表是实时更新的，这就导致scroll的滚动距离需要实时更新，所以在updated生命周期用refresh方法重新计算滚动距离
    this.scroll.refresh();
    // 我们在GoodsListItem向event bus发送加载好的事件并在home接收，然后回调执行refresh来重新计算滚动区域
    // 所以这里就不需要updated里面refresh了X
    // 还是加一下，亲测如果切换页面再切回来，由于混动区域要重新加载，此时一开始不refresh会有点卡顿
  },
  methods: {
    // 确保scroll对象存在才允许调用
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp();
    },
    refresh() {
      this.scroll && this.scroll.refresh();
    },
  },
};
</script>

<style scoped>
</style>