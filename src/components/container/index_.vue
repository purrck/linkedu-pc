<template>
  <div class="pull-height ">
    <!--top导航-->
    <top ></top>

    <!--main内容-->
    <el-container class="main">
      <sidebar style="border-right: 1px solid #C3DBBE;"  />
      <el-main style="padding: 0">
        <div class="main-right animated">
          <!--<div class="flex row  bitch" style="display:none">-->
            <!--<div   style="height: 39px;line-height: 39px; " >-->
              <!--<span v-for="(item,index) in tagList"   :key="index" class="f14 bitchItem c999999" @click="toWhere(item.path)"-->
                    <!--:class="[activeTag === item.path?'is_active':'']">{{addDesc(item)}}-->
                <!--<i class=" el-icon-circle-close" v-show="index!==0" @click="deleteTags(item.path)"></i></span>-->
            <!--</div>-->
          <!--</div>-->
          <div class="flex row  bitch" >
            <!--<h1>{{activeTag.label}}</h1>-->
            <div   style="height: 39px;line-height: 39px; " >
              <span v-for="(item,index) in tagList"  :key="index" class="f14 bitchItem c999999" @click="toWhere(item)"
                    :class="[activeTag.path === item.path?'is_active':'']">{{addDesc(item)}}
                <i class=" el-icon-circle-close" v-show="index!==0" @click.stop="deleteTags(item)"></i></span>
            </div>
          </div>


          <keep-alive>
            <router-view  style="background: #fff;border-radius: 4px;"
                         v-if="$route.meta.$keepAlive"/>
          </keep-alive>
          <router-view style="background: #fff;border-radius: 4px;"
                       v-if="!$route.meta.$keepAlive"/>
        </div>
      </el-main>
    </el-container>
    <!--main内容-->
    <!--footer-->
    <!-- <bottom/> -->
    <!--footer-->
  </div>
</template>

<script>
  import {resolveUrlPath, findArrayByValue} from "@/util/util";
  import top from "./top/";
  import sidebar from "./sidebar/";
  // import bottom from "./bottom/";
  import {validatenull} from "@/util/validate";
  import {mapState, mapGetters} from "vuex";

  export default {
    name: "container2",

    data() {
      return {
        whiteList: ['/login', '/404', '/401', '/lock'],
        title:'',
        activeTagss:'/safety/editSystemmessage/detail/70d95c44a3e243f5b8df9b409030f9e4',
        radios:[
          {title:'通知列表',path:'/safety/listMeetinginfo',id:1},
          {title:'新增通知',path:'/safety/courseDetail/add/0',id:2},
          {title:'编辑列表',path:'/safety/courseDetail/edit/0d8a751bc0a802f9016e4562a802cd99',id:3},
          {title:'通知详情',path:'/safety/courseDetail/detail/0d8a751bc0a802f9016e4562a802cd97',id:4},
        ],
      }
    },
    created() {
      // if (validatenull(this.menu)) {
      //   this.$store.dispatch("GetMenu").then(data => {
      //     // initMenu(this.$router, data);
      //   });
      // }
    },
    computed: {

      ...mapGetters(["menu", "activeTag", 'routerOne', 'routerTwo', 'activeOne', 'routerThree', 'activeOne', 'activeTwo', 'activeThree', 'tagList'])
    },
    components: {
      top,
      bottom,
      sidebar
    },
    methods: {
      addDesc(res) {
        let path = res.path
        let params = res.params
        if(typeof(res.label) === 'undefined') {
          return '未定义';
        }else{
          if(path.indexOf('/add/')!==-1){
            return res.label+'添加'
          }else if(path.indexOf('/edit/')!==-1){
            return res.label+'编辑'
          }else if(path.indexOf('/detail/')!==-1){
            return res.label+'详情'
          }else if(path.indexOf('/fabu/')!==-1){
            return res.label+'发布'
          }else if(path.indexOf('/shenhe/')!==-1){
            return res.label+'审核'
          }else{
            return res.label
          }
        }

      },
      toWhere(item) {
        // alert(path);
        // this.$store.commit('SET_TAG_TYPE', item)
        this.$router.push({path:item.path,params:item.params,query:item.query})
      },
      deleteTags(item) {
        // this.$message.error('删除标签')
        this.$store.commit('DEL_TAG', item)
      },
    }
  }
</script>

<style lang="scss" scoped>
  .top {
    padding: 10px 20px 10px 20px;
  }

  .last-nav-div-rao {
    background: #F1F1F1;
    height: 46px;
  }

  .main {
    background: #F5F5F5;
    display: flex;
    flex-direction: row;
    flex: 1;
    flex-basis: auto;
    box-sizing: border-box;
    min-width: 0;

    .main-right{
      padding: 30px;
      background: #F5F5F5;
    }
  }
  .bitch {
    margin-bottom: 30px;
    height: 40px;
    span:nth-child(1) {
     border-top-left-radius:4px ;
     border-bottom-left-radius:4px ;
    }
    span:last-child{
      border-top-right-radius:4px ;
      border-bottom-right-radius:4px ;
    }
    .bitchItem {
      padding: 10px 10px;
      background: #fff;
      cursor:pointer
    }
    .is_active{
      background: #93BF88;
      color: #fff!important;
    }
  }


</style>

