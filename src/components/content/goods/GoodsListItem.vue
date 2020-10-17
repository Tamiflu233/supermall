<template>
  <div class="goods-item">
    <img :src="goodsItem.show.img" alt="">
    <div class="goods-info">
      <p>
        {{goodsItem.title}}
      </p>
      <span class="price">{{goodsItem.price}}</span>
      <span class="collect">{{goodsItem.cfav}}</span>
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
          return {}
        }
      }
    }

  }
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
  .goods-info .price{
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect{
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    /* background: 图片url background-position的x、y偏移量/background-size的width和height */
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;

  }
</style>