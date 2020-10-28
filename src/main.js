import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store';

Vue.config.productionTip = false

// 将事件总线$bus添加到Vue的原型中
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
