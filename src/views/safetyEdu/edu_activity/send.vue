<template>
  <div>
    <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)" class="bF5F5F5">



      <el-main class="pt0">
        <el-button type="primary" class="button-v2-rao b93BF88">发布对象</el-button>
            <xx-sendObject @callback="finish"></xx-sendObject>
            <!--<gg-sendObject @callback="finish"></gg-sendObject>-->

          <div class="text-center mt20">
            <el-button type="primary" :loading="saveLoading" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "save">
                保存
            </el-button>
            <el-button type="primary" :loading="shenheLoading" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "shenhe">
                提交审核
            </el-button>
            <el-button type="primary" size="small" class="button-v2-rao border-color-cccccc c000000 bfff" @click="goBack">返回</el-button>
          </div>
      </el-main>



    </el-container>

  </div>
</template>

<script>

  import commonApi from "@/api/common/common";
  import api from "./activityinfoUrl";

import { mapGetters, mapMutations } from 'vuex';


  export default {
    components: {},
    data() {
      return {
        saveLoading : false,
        shenheLoading : false,
        isFinish : false,
        courseNames : [
            {
              codeDesc : "消防全使用办法",
              codeId : "1"
            },
            {
              codeDesc : "消防全使用办法1",
              codeId : "1"
            }

          ],
        formData: {
          courseNamesValue : "",
          effectiveDt : "",
          endDt : ""
        },
        finishLoading : false
      }
    },
    computed:{
      ...mapGetters(["isLoading"]),
      pageState() {
        return this.$route.query.type;
      }
    },
    mounted() {
      this.formData1 = JSON.parse(decodeURIComponent(this.$route.query.formData));
      console.log(this.formData1)
      this.SET_IS_LOADING(false)
      console.log(this.isFinish)
    },
    methods: {
      ...mapMutations(['SET_IS_LOADING']),
      shenhe(){

        if(!this.isFinish){
          this.$message.error("请点击完成选择");
          return
        }
        this.shenheLoading = true;
        this.formData1.entityOrganizationScopeVO['entityOrgStatusCode'] = 'approving'
        if(this.pageState == "add"){
          api.activityPlansAd(this.formData1).then(res => {
              if (res.data.resultCode === "000000") {
                this.$router.push({
                  path:"/safetyEdu/edu_activity"
                })
                this.$message.success("发布成功");
              } else {
                this.$message.error(res.data.message);
              }
              this.shenheLoading = false;
            })
        }

        if(this.pageState == "edit"){
          api.activityPlansAdEdit(this.formData1).then(res => {
              if (res.data.resultCode === "000000") {
                this.$message.success("修改成功");
                this.$router.push({
                  path:"/safetyEdu/edu_activity"
                })
              } else {
                this.$message.error(res.data.message);
              }
              this.shenheLoading = false;
            })
        }
      },
      save(){

        if(!this.isFinish){
          this.$message.error("请点击完成选择");
          return
        }
        this.saveLoading = true;
        this.formData1.entityOrganizationScopeVO['entityOrgStatusCode'] = 'editing'
        if(this.pageState == "add"){
          api.activityPlansAd(this.formData1).then(res => {
              if (res.data.resultCode === "000000") {
                this.$router.push({
                  path:"/safetyEdu/edu_activity"
                })
                this.$message.success("发布成功");
              } else {
                this.$message.error(res.data.message);
              }
              this.saveLoading = false;
            })
        }

        if(this.pageState == "edit"){
          api.activityPlansAdEdit(this.formData1).then(res => {
              if (res.data.resultCode === "000000") {
                this.$router.push({
                  path:"/safetyEdu/edu_activity"
                })
                this.$message.success("修改成功");
              } else {
                this.$message.error(res.data.message);
              }
              this.saveLoading = false;
            })
        }
      },
      finish(data){
        console.log(data)
        this.$message.success("选择成功");
        //this.formData1["scope"] = JSON.stringify(data);

        this.formData1.entityOrganizationScopeVO['roleId'] = data.role[0]
        this.formData1.entityOrganizationScopeVO['gradeIds'] = data.grade
        this.formData1.entityOrganizationScopeVO['classIds'] = data.class

        this.isFinish = true;

      },
      goBack() {
        this.$router.go(-1);
      },
      sendTo(){
        this.$router.push({
          path:"/safetyEdu/send"
        })
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.phoneModel-wrap {
    width: 350px;
    height: 667px;
    margin:50px auto 0px;
    padding: 24px 20px;
    box-sizing: border-box;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 30px;
    background-color: #ccc;

    .phone-main {
      background-color: #fff;
      padding: 15px;
      overflow: hidden;

      .title {
        color: #474747;
        font-size: 21px;
      }

      .author-bar {
        margin: 10px 0;
        display: flex;
        font-size: 12px;
        color: #999;
        .author {
          margin-right: 5px;
        }

        .flex1 {
          flex: 1;
          justify-content: flex-end;
        }
      }

      .phone-content {
        border-radius: 8px;
        img {
          width: 100%;
        }
      }
    }
  }

  .phone-component__scroll {
    height: 100%;
    border-radius: 10px;
    background-color: #fff;
    .el-scrollbar-wrap {
      overflow-x: hidden;
      overflow-y: auto;

      .is-horizontal {
        display: none;
      }
    }
  }



</style>
