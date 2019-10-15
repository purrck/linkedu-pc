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
  <div  class="relative">
    <el-aside :width="leftWidth" class="relative">
      <div :class="[showLeft?'main-left':'main-left-false']" :style="{'min-height':wapperHeight}">
        <img src="../../../assets/img/gift.png" class="mr-10" alt="" v-if="showLeft">
        <label  v-if="showLeft">{{showLeft?activeTwo:activeTwo.substr(0,2)}}</label>
        <ul class="last-nav" ref="leftMemu">
          <li  v-if="!showLeft" class="flex center">
            <span><img src="../../../assets/img/gift.png" alt=""></span>
          </li>
          <li v-for="(item,index) in routerThree" :key="index" @click="choeseThree(item,index)"
              :class="{is_active: activeThree===item.label}">
            <div  v-on:mouseenter="mousemove(index,item.label)"  v-on:mouseleave="mouseleave(index,item.label.substr(0,2))">{{showLeft?item.label:item.label.substr(0,2)}}</div>
          </li>
        </ul>

        <div class="flex center c707070 btnMid" @click="changeUi" :style="{'bottom':btinMidHeight}">
          <span v-if="showLeft"><i class="iconfont icon-icon_zuojiantou"></i></span>
          <!--<span v-else><i class="iconfont icon-xx-arrow"></i> </span>-->
        </div>
      </div>
    </el-aside>
    <div class="absolute " style="bottom:100px;left: 32.5px" v-if="showLeft">
      <div class="c707070  " @click="changeUi" >
        <span  class="btn flex row center "><i class="iconfont icon-icon_zuojiantou"></i> 隐藏菜单</span>
      </div>
    </div>
    <div class="absolute" style="bottom:100px;left: 7px" v-else>
      <div class="c707070  " @click="changeUi" >
        <span  class="btn2 flex row center "><i class="iconfont icon-icon_youjiantou-copy"></i> </span>
      </div>
    </div>
  </div>
</template>

<script>
import { setUrlPath } from "@/util/util";
import { mapGetters } from "vuex";

import { validatenull } from "@/util/validate";
import { initMenu } from "@/util/util";
export default {
  name: "sidebar",
  data() {
    return {
      leftWidth:'40',
      showLeft:true
    };
  },
  computed: {
    wapperHeight () {
      let height = document.documentElement.clientHeight - 116 + 'px'
      return height
    },
    btinMidHeight () {
      let height = (document.documentElement.clientHeight - 116 ) / 2+ 'px'
      return height
    },
    ...mapGetters([ 'routerTwo',  'routerThree', 'activeOne', 'activeTwo','activeThree',])
  },
  created() {

  },
  mounted() {},
  methods: {
    mousemove (index,value) {
      // console.log(this.$refs.leftMemu.getElementsByTagName("li")[index+1].getElementsByTagName("div")[0].clientWidth)
      // console.log(this.$refs.leftMemu.getElementsByTagName("li")[index+1].getElementsByTagName("div"))
      let item = this.$refs.leftMemu.getElementsByTagName("li")[index+1].getElementsByTagName("div");
      if(item[0].clientWidth === 160) {
        item[0].innerText = value
      }
    },

    mouseleave (index,value) {
      console.log(this.$refs.leftMemu.getElementsByTagName("li")[index+1].getElementsByTagName("div")[0].clientWidth)
      console.log(this.$refs.leftMemu.getElementsByTagName("li")[index+1].getElementsByTagName("div"))
      let item = this.$refs.leftMemu.getElementsByTagName("li")[index+1].getElementsByTagName("div");
      if(item[0].clientWidth === 36) {
        item[0].innerText = value
      }
    },

    changeUi() {
      this.showLeft = !this.showLeft;
    },

    choeseThree(item, index) {
      console.log(item.path, item.query)
      this.$store.commit("SET_ACTIVETHREE", item.label);

      if (!item.children.length) {
        this.$store.commit("SET_TAG_TYPE",item);
        this.$router.push({
          path: item.path,
          query: item.query
        })
      }
    }
  }
};
</script>
<style lang="scss" scoped>
  .btn {
    width: 160px;
    height: 32px;
    background: #E0ECDC;
    border-radius: 4px;
  }
  .btn2 {
    width: 22px;
    height: 320px;
    /*background: #E0ECDC;*/
    border-radius: 4px;
  }
  .btn2:hover {
    background: #E0ECDC;
  }
  .btn2:active{
    background: #E0ECDC;
  }
  /*.fixed-box{*/
    /*position: fixed;*/
  /*}*/
  .main-left {
    padding:  25px 12.5px 0 32.5px;
    position: relative;
    ul{
      width: 190px;
      overflow: hidden;

    }
    label{
      font-size: 18px;
    }

    .btnMid {
      width: 20px;
      height: 80px;
      left: 236px;
      background: #E0ECDC;
      border-radius: 4px;
      position: absolute;
    }

    .last-nav {
      font-size: 14px;

      li {
        white-space: nowrap;
        margin: 12px 15px;
        padding: 0 16px;
        color: #757575;
        height: 26px;
        line-height: 26px;
      }
      li:hover {
        color: #468877;
        /*background: #fff;*/
        font-weight: bold;
      }
      .is_active {
        color: #468877;
        /*background: #fff;*/
        font-weight: bold;
      }
    }
  }
  .main-left-false {
    padding: 25px 0 0 0 ;
    position: relative;
    .btn {
      height: 360px;
      width: 20px;
      left: 8px;
      line-height: 360px;
      position: absolute;
      bottom: 180px
    }
    .btn:hover {
     background: #E0ECDC;
    }
    .last-nav {
      font-size: 14px;
      border-top: 1px solid #C3DBBE;

      ul{
        position: relative;
      }
      li {
        white-space: nowrap;
        height: 36px;
        width: 36px;
        border-bottom: 1px solid #C3DBBE;
        color: #757575;
      }
      li div {
        color: #757575;
        font-weight: bold;
        line-height: 36px;
        width: 36px;
        text-align: center;
        position: absolute;
      }
      li div:hover {
        color: #468877;
        /*background: #fff;*/
        font-weight: bold;
        width: 160px;
        z-index: 99999;
        background: #E0ECDC;
      }
      .is_active {
        color: #468877;
        /*background: #fff;*/
        background: #E0ECDC;
        font-weight: bold;
      }
    }
  }
</style>

