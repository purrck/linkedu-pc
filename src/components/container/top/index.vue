<template>
  <div class="top-index">
    <div class="top">
      <div class="top-logo flex center">
        <img src="../../../assets/img/icon_yunying.png" v-if="roleType === 'site'" alt="">
        <img src="../../../assets/img/icon_xitong.png" v-if="roleType === 'sys'" alt="">
        <img src="../../../assets/img/icon_xuexiao.png" v-if="roleType === 'school'" alt="">
      </div>
      <div class="top-menu">
        <ul class="flex row x-center">
          <li v-for="(item,index) in routerOne" :key="index" :class="{is_active:activeOne===item.label}"
              @click="choeseMenuOne(item,index)">{{item.label}}
          </li>
        </ul>
      </div>
      <div class="top-right">
        <div class="top-linLogo"><img src="~@/assets/img/icon-shape-lin.png"/></div>
        <div class="top-userInfo bl flex row x-center">
          <el-tooltip class="item" effect="dark" content="用户头像" placement="bottom">
            <img class="top-userImg" :src="userInfo.headPicture || require('../../../assets/img/icon-header.png')"/>
          </el-tooltip>

          <el-dropdown>
          <span class="el-dropdown-link">
            {{userInfo.firstName}}<span v-if="userInfo.extValues&&userInfo.extValues.schoolOrg">
            {{" | "+userInfo.extValues.schoolOrg.schoolOrgName}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>
                <router-link to="/">首页</router-link>
              </el-dropdown-item>
              <el-dropdown-item @click.native="logout" divided>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>

      </div>
    </div>

    <div class="abstract">
      <div class="abstract-nav ">
        <span class="abstract-item" v-for="(item,index) in routerTwo" :class="{is_active: activeTwo===item.label}"
             :key="index" @click="choeseTwo(item,index)">
         {{item.label}}
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import {mapState, mapGetters} from "vuex";
  import {fullscreenToggel, listenfullscreen} from "@/util/util";

  import routerSchool from "@/const/routerSchool";
  import {getStore, setStore} from '@/util/store'
  import {
    getToken
  } from '@/util/auth'
  export default {
    name: "top",
    data() {
      return {
        role: '教师端',
        roleClass: 'classTeacher',
      };
    },
    filters: {},
    components: {},
    created() {

    },
    mounted() {
    },
    computed: {
      ...mapState({
        userInfo: state => state.user.userInfo
      }),
      ...mapGetters(["routerOne", "routerTwo", 'activeOne', 'activeTwo', 'roleTest', 'roleType']),
    },
    methods: {
      showCollapse() {
        this.$store.commit("SET_COLLAPSE");
      },
      choeseMenuOne(item, index) {
        this.$store.commit("SET_ACTIVEONE", item.label);
        this.$store.commit("SET_ROUTHERTWO", this.routerOne[index].children);
        this.$store.commit("SET_ACTIVETWO", '');
        if(item.path==='/files/index'){
          let userId =  getStore({name:'userInfo'}).id;
          let b = 'http://183.56.219.252:5189';

          if(window.location.host == "183.56.220.189"){
            b = "http://183.56.220.189:5189"
          }
          let opath = b+'/#/WebTologin?token='+ getToken() + '&userId=' + userId;
          window.open(opath,'_blank');
        }
        if (!this.routerOne[index].children.length&&path!=='/files/index') {
          this.$router.push({path: item.path})
        }
      },
      //选择第二级路由 如果有儿子 跳转到儿子第一级 否则跳转到当前路由
      choeseTwo(item, index) {

        this.$store.commit("SET_ACTIVETWO", item.label);
        if (!this.routerTwo[index].children.length) {
          this.$store.commit("SET_ROUTHERTHREE", []);
          this.$store.commit("SET_ACTIVETHREE", '');
          this.$store.commit("SET_TAG_TYPE",item);
          this.$router.push({
            path: item.path,
            query: item.query
          })
        } else {
          let threeIndex = this.routerTwo[index].children[0];
          this.$store.commit("SET_ROUTHERTHREE", this.routerTwo[index].children);
          this.$store.commit("SET_ACTIVETHREE", threeIndex.label);
          this.$store.commit("SET_TAG_TYPE",threeIndex);
          this.$router.push({
            path: threeIndex.path,
            query: threeIndex.query
          })
        }
      },

      changeRole() {
        if (this.roleTest === '开发端') {
          let role = '校园端'
          this.$store.dispatch("changeRouterRole", routerSchool).then(res => {
            this.$store.commit("SET_ROLETEST", role);

          });
        }
        // else {
        //   let role = '开发端'
        //   this.$store.dispatch("changeRouterRole", routerDev).then(res => {
        //     this.$store.commit("SET_ROLETEST", role);
        //   });
        //
        // }
      },

      logout() {
        this.$confirm("是否退出系统, 是否继续?", "提示",{
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$store.dispatch("LogOut").then(() => {
            this.$router.push({path: "/login"});
          });
        }).catch(() => {

        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .top-index {
    .top {
      align-items: center;
      background-color: #fff;
      padding: 0 40px 0 0;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex: 1;
      font-size: 18px;
      color: #999;
      height: 72px;
      white-space: nowrap;

      .top-logo {
        width: 240px;

        img {
          width: 175px;
        }
      }

      .top-menu {
        /*overflow: hidden;*/
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: inherit;
        font-weight: 400;
        -webkit-box-flex: 1;
        -ms-flex: 1;
        flex: 1;
        max-width: 55%;
        overflow-x: auto;
        padding: 0 40px;

        ul {
          li {
            margin-right: 55px;
            height: 40px;
            font-size: 16px;
            line-height: 40px;
            /*border-bottom: 2px #fff solid;*/
            cursor: pointer;
          }
        }

        .is_active {
          /*border-color: #509A8F;*/
          color: #509A8F;
        }
      }
      .top-right {
        display: flex;
        justify-content: center;
        align-items: center;
        .top-linLogo {
          display: flex;
          width: 60px;
          justify-content: center;
          align-items: center;
        }
        .top-userInfo {
          display: flex;
          position: relative;
          border: 1px solid #93BF88;
          height: 38px;
          padding: 0 10px;
          border-radius: 40px;

          .el-dropdown-link {
            i {
              color: #93BF88;
            }
          }

          .top-userImg {
            width: 32px;
            height: 32px;
            margin-right: 10px;
            border-radius: 100%;
            box-sizing: border-box;
          }
        }

      }
    }

    .abstract {
      width: 100%;
      background: #93BF88;
      //overflow-y: auto;
      line-height: 30px;

      .abstract-nav {
        padding: 6px 30px 6px 266px;
        display: flex;
        background: #93BF88;
        flex-direction: row;
        flex-wrap: wrap;

        .abstract-item {
          font-size: 14px;
          color: white;
          padding:0 10px;
          border-radius: 4px;
          margin-right: 30px;
          background: #93BF88;
          cursor: pointer;
        }

        div:hover {
          background: #FFFFFF;
          color: #93BF88;
        }

        .is_active {
          background: #FFFFFF;
          color: #93BF88;
        }
      }
    }
  }

</style>

