import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types';
export default {
  addCart(context, payload) {
    /* 返回Promise对象，这样可以在dispatch那调用then(为了让组件
      知道购物车添加成功了，然后才能显示Toast组件提示添加成功) */
    return new Promise((resolve, reject) => {
      // payload新添加的商品
      // 数组的find方法，参数是回调函数和this,返回满足回调函数条件的第一个元素值
      // 1.查找之前数组中是否有该商品
      let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
      // 2.判断oldProduct
      if (oldProduct) { //数量+1
        context.commit(ADD_COUNTER, oldProduct)
        resolve('当前的商品数量+1')
      } else {  //添加新的商品
        payload.count = 1;
        context.commit(ADD_TO_CART, payload)
        resolve('添加了新的商品')
      }
    })

  }
}