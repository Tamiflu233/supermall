import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

import FastClick from 'fastclick';
import VueLazyLoad from 'vue-lazyload';

import toast from 'components/common/toast';

Vue.config.productionTip = false

// 将事件总线$bus添加到Vue的原型中
Vue.prototype.$bus = new Vue()

// 安装toast插件
Vue.use(toast)

// 解决移动端300ms的延迟
FastClick.attach(document.body)

// 使用图片懒加载插件
Vue.use(VueLazyLoad, {
  // 加载中的占位图片需要用require()导入
  loading: require('./assets/img/common/placeholder.png')
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
