import {debounce} from './utils';
import BackTop from "components/content/backTop/BackTop";
import {BACK_POSITION} from 'common/const';
// 滚动区域高度刷新(防抖处理)
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null,
      newRefresh: null
    }
  },
  mounted() {
    // 1. 图片加载完成的事件监听
    this.newRefresh = debounce(this.$refs.scroll.refresh, 100);

    // 对监听的事件进行保存 
    this.itemImgListener = () => {
      this.newRefresh();
    }

    this.$bus.$on('itemImageLoad', this.itemImgListener)
    // console.log('我是混入的内容');
  },
}

// 回到顶部按钮的mixin封装
export const backTopMixin = {
  components:{
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0, 0);
    },
    listenShowBackTop(position) {
      this.isShowBackTop = Math.abs(position.y) > BACK_POSITION;
    }
  },
}