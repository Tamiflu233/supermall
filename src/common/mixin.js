import {debounce} from './utils';
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