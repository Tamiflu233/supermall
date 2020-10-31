<template>
  <div class="goods-item" @click="itemClick">
    <img v-lazy="showImage" alt="" @load="imageLoad" />
    <div class="goods-info">
      <p>
        {{ goodsItem.title }}
      </p>
      <span class="price">{{ goodsItem.price }}</span>
      <span class="collect">{{ goodsItem.cfav }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "GoodsListItem",
  props: {
    goodsItem: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  computed: {
    showImage() {
      /* recommends的图片和goods的图片在不一样的属性里 */
      return this.goodsItem.image || this.goodsItem.show.img 
    },
    
  },
  methods: {
    imageLoad() {
      // 将事件发送到事件总线，这样任何其他组件都可以接收并监听
      // 但是默认是没有$bus这个属性的，得自己加到Vue的原型里
      // $bus是一个Vue实例
      this.$bus.$emit("itemImageLoad");
    },
    itemClick() {
      this.$router.push("/detail/" + this.goodsItem.iid)
    }
  },
};
</script>
  
<style scoped>
.goods-item {
  width: 48%;
  position: relative;
  padding-bottom: 40px;
}

.goods-item img {
  width: 100%;
  border-radius: 5px;
  border: 3px solid var(--color-tint);
}

.goods-info {
  font-size: 12px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 5px;
  text-align: center;
  overflow: hidden;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 4px;
}
.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: "";
  /* background: 图片url background-position的x、y偏移量/background-size的width和height */
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
}
</style>