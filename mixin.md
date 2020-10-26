### mixin混入用法
---
#### 1.使用原因
- 比如本项目Detail.vue和Home.vue的mounted生命周期函数都需要全局监听事件总线上的itemImageLoad事件，代码一模一样，完全可以把mounted函数抽出来复用。
- Vue实例有一个属性mixins: [],数组里面可以放各种封装好的mixins,到时候会加载到Vue实例内部，比如我封装好mounted函数:
```js
import {debounce} from './utils';
export const itemListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 1. 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 100);

    // 对监听的事件进行保存 
    this.itemImgListener = () => {
      refresh();
    }

    this.$bus.$on('itemImageLoad', this.itemImgListener)
    console.log('我是混入的内容');
  },
}
```
- 这样在Home.vue和Detail.vue中我们只需要
  - 导入mixin
   ```import {itemListenerMixin} from 'common/mixin'```
  - 添加mixins属性
   ```mixins: [itemListenerMixin],```