<template>
  <div class="pull-height animated">
    <!--header导航-->
    <top class="top"></top>
    <div v-on:mouseleave="mouseleave()">
      <div class="flex row abstract">
        <div class="abstract-nav" >
          <div  class="abstract-item" v-for="(item,index) in routerTwo" :class="{is_active: activeTwo===item.label}" :key="index" v-on:mouseenter="checkThree(item,index)" @click="choeseTwo(item,index)" >
            <span>{{item.label}}</span>
            <ul class="last-nav" v-show="item.label===activeTwo_is">
              <li v-for="(item,index) in routerThree" :class="{is_active: activeThree===item.label}" :key="index"  @click="choeseThree(item,index)" >
                <span>{{item.label}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="last-nav-div-rao">

      </div>
    </div>

    <div style="padding: 12px 30px;color: #999999;font-size: 12px">
      <p>当期位置：<span v-show="activeOne">{{activeOne}}</span><span v-show="activeTwo">{{' > '+activeTwo}}</span><span  v-show="activeThree">{{' > '+activeThree}}</span> </p>
    </div>
    <!--内容-->
    <div class="main">
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </div>
    <!--footer-->
    <bottom/>
  </div>
</template>

<script>
  import {resolveUrlPath,findArrayByValue} from "@/util/util";
  import top from "./top/";
  import bottom from "./bottom/";
  import { validatenull } from "@/util/validate";

  import {mapState, mapGetters} from "vuex";
  export default {
    name: "container"
    ,
    computed: {
      ...mapGetters(["menu", "tag",'routerOne','routerTwo', 'activeOne','routerThree','activeOne','activeTwo','activeThree','tagList'])
    },
    components: {
      top,
      bottom,
    },
    data() {
      return {
        activeTwo_is:'',
        whiteList : ['/login', '/404', '/401', '/lock']
      }
    },
    created () {
      this.activeTwo_is = this.activeTwo;
      // this.$store.commit('SET_SCREN',e);
      // if (validatenull(this.menu)) {
      //   this.$store.dispatch("GetMenu").then(data => {
      //     initMenu(this.$router,data);
      //   });
      // }
    },

    methods: {
      //检查是否有第三级路由 随光标经过改变第三级路由
      checkThree(item,index) {
        this.activeTwo_is = item.label;
        this.$store.commit("SET_ROUTHERTHREE",this.routerTwo[index].children);

      },
      addTags(to) {
        const value = to.path
        const label = to.name
        if (this.whiteList.indexOf(value) === -1&&this.tag.value !== value) {
          this.$store.commit('DEL_ALL_TAG')
          this.$store.commit('ADD_TAG', {
            label: label,
            value: value,
            query: to.query
          })
        }

      },
      //选择第二级路由 如果有儿子 那只是显示第三级 否则跳转到当前路由
      choeseTwo(item,index) {
        if(!this.routerTwo[index].children.length){
          // this.$router.push({path:item.path});
          this.$router.push({
            path: resolveUrlPath(item.path, item.label),
            query: item.query
          })
          this.addTags(item);
          this.$store.commit("SET_ACTIVETWO",item.label);
          this.$store.commit("SET_ACTIVETHREE",'');
        }
      },
      mouseleave() {
        if(this.routerThree.length>0){
          let res = findArrayByValue('label',this.activeTwo,this.routerTwo);
          if(res!==-1){
            this.$store.commit("SET_ROUTHERTHREE",this.routerTwo[res].children);
            this.activeTwo_is = this.activeTwo;
          }
        }
      },
      choeseThree(item,index) {
        this.$store.commit("SET_ACTIVETHREE",item.label);
        this.$store.commit("SET_ACTIVETWO",this.activeTwo_is);
        if(!item.children.length){
          this.$router.push({
            path: resolveUrlPath(item.path, item.label),
            query: item.query
          })
          this.addTags(item);

        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .top {
    padding: 10px 20px 10px 20px;
  }

  .last-nav-div-rao{
      background: #F1F1F1;
      height: 46px;
  }
  .last-nav{
    font-size: 12px;
    position: absolute;
    width: 100vh;
    left: 0;
    top: 45px;
    display: flex;
    li{
      /*float: left;*/
      white-space: nowrap;
      margin: 10px 15px;
      padding: 0 20px ;
      border-radius: 15px;
      color: #757575;
      height: 26px;
      background: #f1f1f1;
      line-height: 26px;
    }
    li:hover{
      background: #4A9388;
      color: #fff;
    }

    .is_active{
      background: #4A9388;
      color: #fff;
    }
  }

  .main {
    min-height: 500px;
    background: #fff;
    width: 100%;
    box-sizing: border-box;
  }


</style>

