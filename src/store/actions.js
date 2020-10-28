import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types';
export default {
  addCart(context, payload) {
    // payload新添加的商品
    // 数组的find方法，参数是回调函数和this,返回满足回调函数条件的第一个元素值
    // 1.查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
    // 2.判断oldProduct
    if (oldProduct) {
      context.commit(ADD_COUNTER, oldProduct)
    } else {
      payload.count = 1;
      context.commit(ADD_TO_CART, payload)
    }

  }
}