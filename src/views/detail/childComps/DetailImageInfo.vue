<template>
  <div v-if="Object.keys(detailInfo).length !== 0" class="goods-info">
    <div class="info-desc clear-fix">
      <div class="start"></div>
      <div class="desc clear-fix">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>
    <div v-for="(item,index) in detailInfo.detailImage" :key="index">
      <div class="info-key">{{item.key}}</div>
      <div class="info-list">
        <img v-for="(item2,index2) in item.list" :key="index2" :src="item2" alt="">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "DetailImageInfo",
    props: {
      detailInfo: {
        type:Object,
        default() {
          return {}
        }
      }
    },
    methods: {
      
    }
  }
</script>

<style scoped>
.goods-info {
  padding: 20px 0;
  border-bottom: 5px solid #f2f5f8;

}
.clear-fix::before,
.clear-fix::after{
  content: '';
  display: table;
  clear: both;
}
.info-desc {
  padding: 0 15px;
}

.info-desc .start,
.info-desc .end {
  position: relative;
  width: 90px;
  height: 1px;
  background-color: #a3a3a5;
}

.info-desc .start {
  float: left;
}
.info-desc .end {
  float: right;
}
.info-desc .start::before,
.info-desc .end::after {
  content: '';
  position: absolute;
  width: 5px;
  height: 5px;
  bottom: 0;
  background-color: #333333;
}

.info-desc .start::before {
  left: 0;
}

.info-desc .end::after {
  right: 0;
}
.info-desc .desc {
  font-size: 14px;
  padding: 15px 0;
}
.info-key {
  font-size: 15px;
  margin: 10px 0 10px 15px;
  color: #333333;
}

.info-list img{
  width: 100%;
}
</style>