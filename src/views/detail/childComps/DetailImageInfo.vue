<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc clear-fix">{{ detailInfo.desc }}</div>
      <div class="end"></div>
    </div>
    <div v-for="(item, index) in detailInfo.detailImage" :key="index">
      <div class="info-key">{{ item.key }}</div>
      <div class="info-list">
        <img
          @load="imgLoad"
          v-for="(item2, index2) in item.list"
          :key="index2"
          :src="item2"
          alt=""
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailImageInfo",
  props: {
    detailInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      // counter: 0,
      imagesLength: 0,
    };
  },
  methods: {
    imgLoad() {
      // 等全部图片都加载完才发送事件(避免频繁发射事件)
      /* if (++this.counter === this.imagesLength) {
        this.$emit("detailImageLoad");
      } */
      // 干脆用防抖了，就不用特地算最后一个图片了(防抖相对更好点，等最后一张加载完才发事件感觉图片多了还是会卡)
      this.$emit("detailImageLoad");
    },
  },
  watch: {
    // 一开始detailInfo默认为空，当父组件传来对象后，值发生变化，就触发了watch(watch只有监视属性发生变化才会执行对应的函数)
    // 监视的是什么属性，函数名就是啥
    // 下面是获取图片个数
    detailInfo() {
      this.imagesLength = this.detailInfo.detailImage[0].list.length;
    },
  },
};
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;
}
.clear-fix::before,
.clear-fix::after {
  content: "";
  display: table;
  clear: both;
}
.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}

.info-desc .start {
  float: left;
}
.info-desc .end {
  float: right;
}
.info-desc .start::before,
.info-desc .end::after {
  content: "";
  position: absolute;
  width: 5px;
  height: 5px;
  bottom: 0;
  background-color: #333333;
}

.info-desc .start::before {
  left: 0;
}

.info-desc .end::after {
  right: 0;
}
.info-desc .desc {
  font-size: 14px;
  padding: 15px 0;
}
.info-key {
  font-size: 15px;
  margin: 10px 0 10px 15px;
  color: #333333;
}

.info-list img {
  width: 100%;
  vertical-align: top;
}
</style>