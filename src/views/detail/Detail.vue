<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-image-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-image-info>
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailImageInfo from './childComps/DetailImageInfo'

import Scroll from "components/common/scroll/Scroll";

import { getDetail, Goods, Shop } from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo:{}
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    Scroll,
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详细数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      const data = res.result;
      // 1. 获取顶部图片的轮播数据
      this.topImages = data.itemInfo.topImages;
      // 2. 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3. 创建店铺信息对象
      this.shop = new Shop(data.shopInfo);

      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.refresh()
    }
  },
};
</script>

<style scoped>
#detail {
  height: 100vh;
  position: relative;
  z-index: 9999;
  background-color: #fff;
}

.detail-nav {
  position: relative;
  z-index: 9999;
  background-color: #fff;
}

.content {
  height: calc(100% - 44px);
}



</style>