import Vue from 'vue';
import VueRouter from 'vue-router';

// 懒加载组件
/* const Home = () => import('') */

// 懒加载
const Home = () => import('views/home/Home')
const Category = () => import('views/category/Category')
const Cart = () => import('views/cart/Cart')
const Me = () => import('views/me/Me')

// 1.安装插件
Vue.use(VueRouter)


const routes = [
  {
    path: '',
    redirect: '/home'
  },
  {
    path: '/home',
    // 指定的组件
    component: Home
  },
  {
    path: '/category',
    component: Category
  },
  {
    path: '/cart',
    component: Cart
  },
  {
    path: '/me',
    component: Me
  }
]

// 2.创建router
const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router;