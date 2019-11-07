<template>
  <transition name="el-message-fade">
    <slot></slot>
  </transition>
</template>
<script>
export default {
  data() {
    return {
      msgShow: true,
      css: {
        position: "absolute",
        top: "40%",
        left: "47%"
      },
      duration: 800
    };
  },
  created() {
    setTimeout(() => {
      this.msgShow = false;
    }, this.duration);
  }
};
</script>

<style>
</style>
