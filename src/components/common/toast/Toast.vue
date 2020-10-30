<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
export default {
  name: "Toast",
  props:{
    /* message: {
      type: String,
      default: ''
    },
    show: {
      type: Boolean,
      default: false
    } */
  },
  data() {
    return {
      message: '',
      isShow: false
    }
  },
  methods: {
    show(message='默认文字', duration=2000) {
      // duration = duration || 2000
      this.isShow = true;
      this.message = message;

      setTimeout(() => {
        this.isShow = false;
        this.message = '';
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 8px 10px;
  border-radius: 10px;
  color: #fff;
  background-color: rgba(0, 0, 0, .65);
  /* 之前detail设置了z-index为999,为了盖住首页的tab-bar,所以要显示必须要盖住detail，设置的超级大就好了 */
  z-index: 99999;
}
</style>