<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
      ref="nav"
    ></detail-nav-bar>
    <scroll
      class="content"
      ref="scroll"
      @scroll="contentScroll"
      :probe-type="3"
    >
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-image-info
        @detailImageLoad="detailImageLoad"
        :detailInfo="detailInfo"
      ></detail-image-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailImageInfo from "./childComps/DetailImageInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from 'components/common/toast/Toast';

// BackTop在mixin里面注册过了，所以可以直接用
import { debounce } from "common/utils";
import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
// import {debounce} from 'common/utils.js';
import { itemListenerMixin, backTopMixin } from "common/mixin.js";
import {mapActions} from 'vuex';

export default {
  name: "Detail",
  mixins: [itemListenerMixin, backTopMixin], //滚动区域监听刷新与回到顶部按钮的mixin
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      getThemeTopY: null, //防抖处理的获取每个主题的offsetTop函数
      currentIndex: 0,
      // message: '',
      // show: false
    };
  },
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailImageInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;

    // 2.根据iid请求详细数据
    getDetail(this.iid).then((res) => {
      // console.log(res);
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

      // 5.获取参数的信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 6.取出评论信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }

      // 7. 生成每个主题的offsetTop
      // 1-第一次获取，值不对
      // 值不对的原因：this.$refs.params.$el压根没渲染
      /* this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44); */

      // 2-第二次获取： 值不对
      // 值不对的原因: 图片没计算在内
      /* 
        在Vue生命周期的created()钩子函数进行的DOM操作
        一定要放在Vue.nextTick()的回调函数中

        在created()钩子函数执行的时候DOM 其实并未进行任何渲染，
        而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码
        放进Vue.nextTick()的回调函数中。与之对应的就是mounted()钩子函数，
        因为该钩子函数执行时所有的DOM挂载和渲染都已完成，
        此时在该钩子函数中进行任何DOM操作都不会有问题 。

        在数据变化后要执行的某个操作，而这个操作需要使用随数据改变而改变的DOM结构的时候，
        这个操作都应该放进Vue.nextTick()的回调函数中。
        https://www.jianshu.com/p/a7550c0e164f
      */
      /* this.$nextTick(() => {
        // 根据最新的数据,对应的DOM是已经被渲染出来了
        // 但是图片依然是没有加载完（目前获取到的offsetTop不包含其中的图片）
        // offsetTop值不对的时候，一般都是因为图片的问题
        this.themeTopYs = [];
        this.themeTopYs.push(0);
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      }); */
    });

    // 3.请求推荐数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });

    // 4.给getThemeTopY赋值(对给this.themeTopYs赋值的操作进行防抖)
    this.getThemeTopY = debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44);
      this.themeTopYs.push(Number.MAX_VALUE);
      console.log(this.themeTopYs);
    }, 200);
  },
  mounted() {},
  updated() {
    // 这里updated会执行两次
    /* this.themeTopYs = [];
    this.themeTopYs.push(0);
    this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44);
    this.themeTopYs.push(this.$refs.comment.$el.offsetTop - 44);
    this.themeTopYs.push(this.$refs.recommend.$el.offsetTop - 44); */
    // console.log(this.themeTopYs);
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImgListener);
  },
  methods: {
    ...mapActions(['addCart']),
    detailImageLoad() {
      this.newRefresh(); //mixin里面干脆把防抖函数存到了data里面,mixin进来后直接用
      this.getThemeTopY();
    },
    titleClick(index) {
      // console.log(index);
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
    },
    contentScroll(position) {
      // 1.获取y值
      const positionY = -position.y;

      // 2.positionY和主题中值进行对比
      let length = this.themeTopYs.length;
      for (let i = 0; i < length - 1; i++) {
        // 若用for..in..,这里的i居然是个字符串，所以i+1的得到值是字符串拼接后的

        if (
          this.currentIndex !== i &&
          positionY >= this.themeTopYs[i] &&
          positionY < this.themeTopYs[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.nav.currentIndex = this.currentIndex;
        }

        /* if(this.currentIndex !== i && ((i < length - 1 
        && positionY >= this.themeTopYs[i] 
        && positionY < this.themeTopYs[i + 1]) || 
        (i === length - 1 && positionY > this.themeTopYs[i]))){
          this.currentIndex = i
          // console.log(this.currentIndex);
          this.$refs.nav.currentIndex = this.currentIndex
        } */
      }

      // 3.判断BackTop是否显示
      this.listenShowBackTop(position);
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    addToCart() {
      // 1.获取购物车需要展示的信息
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.realPrice;
      product.iid = this.iid;

      // 2.将商品添加到购物车里(1.Promise 2.mapActions)
      // 直接用mapActions映射到的addCart(内部会调用this.$store.dispatch('addCart', product))
      this.addCart(product).then(res => {
        // this.show = true;
        // this.message = res;
        // setTimeout(() => {
        //   this.show = false;
        //   this.message = '';
        // }, 1500);
        console.log(this.$toast);
        this.$toast.show(res, 1500)
        
      })
      /* this.$store.dispatch('addCart', product).then(res => {
        // 3.添加到购物车成功
        console.log(res);
      }) */

      
      
    },
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
  height: calc(100% - 44px - 58px);
  overflow: hidden;
}
</style>