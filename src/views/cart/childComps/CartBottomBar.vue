<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button 
        class="check-button" 
        :is-checked="isSelectAll"
        @click.native="checkClick">
      </check-button>
      <span>全选</span>
    </div>

    <div class="price">
      合计: {{ totalPrice }}
    </div>

    <div class="calculate" @click="calcClick">
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
    ...mapGetters(['cartLength','cartList']),
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
    },
    isSelectAll() {
      if (this.cartList.length === 0) return false
      // return !(this.cartList.filter(item => !item.checked).length)
      return !this.cartList.find(item => !item.checked)
    }
  },
  methods: {
    checkClick() {
      if(this.isSelectAll) { // 全部选中
        this.cartList.forEach(item => item.checked = false)
      }else {
        this.cartList.forEach(item => item.checked = true)
      }

      // 不可以这么简化代码,因为isSelectAll计算属性也要通过checked计算，他们会相互影响，导致错误
      /* this.cartList.forEach(item => item.checked = !this.isSelectAll) */
      
    },
    calcClick() {
      if(!this.checkLength) {
        this.$toast.show('请选择购买的商品', 2000)
      }
    }
  }
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