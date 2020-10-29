import {
  ADD_COUNTER,
  ADD_TO_CART
} from './mutation-types';
export default {
  // mutations唯一的目的就是修改state中状态
  // mutations中的每一个方法尽可能完成的事件比较单一
  [ADD_COUNTER](state, payload) {
    payload.count++;
  },
  [ADD_TO_CART](state, payload) {
    /* 购物车的商品默认是选中的，用户可以自行取消勾选(在cartList里面管理商品是否选中,而不是在页面里管理) */
    payload.checked = true;
    state.cartList.push(payload);
  }
}