<template>
  <div class="tab-control">
    <!-- 这个组件很多地方就只是文字不一样，没必要用插槽，v-for props就可以了 -->
    <div v-for="(item, index) in titles" 
        :key="item" 
        class="tab-control-item" :class="{active: index === currentIndex}">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    components:{
      
    },
    props: {
      titles: {
        type:Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0
      }
    }

  }
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  position: sticky;
  top: 44px;
}

.tab-control-item {
  flex: 1;
}

.tab-control-item span{
  padding: 5px;
}

.active {
  color:  var(--color-high-text);
  
}

.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>