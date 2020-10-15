<template>
  <div class="tab-control">
    <!-- 这个组件很多地方就只是文字不一样，没必要用插槽，v-for props就可以了 -->
    <div v-for="item in titles" :key="item">
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
    }

  }
</script>

<style scoped>

</style>