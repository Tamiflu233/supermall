<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default: "red"
      }
    },
    data() {
      return {
        // isActive: true
      }
    },
    computed: {
      isActive() {
        // indexOf为字符串子串匹配方法
        return this.$route.path.indexOf(this.path) !== -1
        
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path)
        
      }
    }

  }
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  /* 手机端的tabbar一般是49px */
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img{
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 
    去除图片基线对齐的下面那条缝
  */
  vertical-align: top;
  margin-bottom: 2px;
}

/* .active {
  color: red;
} */
</style>