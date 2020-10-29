<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button class="check-button"></check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{ totalPrice }}
    </div>

    <div class="calculate">
      去计算({{checkLength}})
    </div>
  </div>
</template>

<script>
import CheckButton from "components/content/checkButton/CheckButton";

import {mapGetters} from 'vuex';
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    ...mapGetters(['cartList']),
    totalPrice() {
      return (
        "￥" +
        this.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0).toFixed(2)
      );
    },
    checkLength() {
      return this.cartList.filter(item => item.checked).length
    }
  },
};
</script>

<style scoped>
.bottom-bar {
  position: relative;
  display: flex;
  height: 40px;
  line-height: 40px;
  background-color: #eee;
}

.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}

.check-button {
  width: 20px;
  height: 20px;
  /* line-height若继承了.bottom-bar的40px,checkbutton的img由于是行内元素会被影响，往下拉，所以此处要覆盖掉,改为20px */
  line-height: 20px;
  margin-right: 5px;
}

.price {
  margin-left: 30px;
  flex: 1; 
}
/* flex布局里面用浮动没啥用，可以给定左右俩个div宽度，中间不给，给中间flex:1 让他伸展把右边那个顶到最右边*/
.calculate {
  width: 90px;
  background-color: orangered;
  color: #fff;
  text-align: center;
}
</style>