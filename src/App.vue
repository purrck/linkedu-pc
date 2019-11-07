<!--
  -    Copyright (c) 2018-2025, lengleng All rights reserved.
  -
  - Redistribution and use in source and binary forms, with or without
  - modification, are permitted provided that the following conditions are met:
  -
  - Redistributions of source code must retain the above copyright notice,
  - this list of conditions and the following disclaimer.
  - Redistributions in binary form must reproduce the above copyright
  - notice, this list of conditions and the following disclaimer in the
  - documentation and/or other materials provided with the distribution.
  - Neither the name of the pig4cloud.com developer nor the names of its
  - contributors may be used to endorse or promote products derived from
  - this software without specific prior written permission.
  - Author: lengleng (wangiegie@gmail.com)
  -->

<template>
	<div id="app"  ref="viewBox">
			<router-view></router-view>
	</div>
</template>

<script>
export default {
  name: "app",
  data() {
    return {
      box:''
    };
  },
  watch: {},
  mounted () {
    this.box = this.$refs.viewBox
    // 监听这个dom的scroll事件\
    // window.addEventListener("scroll", function(){
      // // console.log('scrolling');
      // // console.log(arguments[0].target.scrollingElement.scrollTop);
    // });

  },
  created() {
  },
  methods: {
    scrolls() {
    }
  },
  computed: {}
};
</script>
<style lang="scss">
#app {
  width: 100%;
  overflow:hidden;
}
</style>
