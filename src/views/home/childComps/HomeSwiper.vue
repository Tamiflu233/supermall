<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners" :key="item.link">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad"/>
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      isLoad: false
    }
  },
  components: {
    Swiper,
    SwiperItem,
  },
  methods: {
    imageLoad() {
      // 加载完一个轮播图就可以确定offsetTop了(其他图图加载快，轮播图只需要一张就能确定高度)
      // 所以只要发一次事件就够了
      if(!this.isLoad){
        this.isLoad = true
        this.$emit("swiperImageLoad")
      }
    }
  }
};
</script>

<style scoped>
</style>