<template>
  <div>
    <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)"
                  class="bF5F5F5">


      <el-main class="pt0">
        <el-button type="primary" class="button-v2-rao b93BF88">发布课程</el-button>
        <el-row class="mb10">
          <el-col :span="24">
            <div class="phoneModel-wrap">
              <el-scrollbar class="phone-component__scroll">
                <div class="phone-main">
                  <iframe width="100%" height="667" scrolling="no" frameborder="0"
                          :src="'http://192.168.2.60:8099/#/course?token='+access_token"></iframe>

                </div>


              </el-scrollbar>
            </div>

          </el-col>


          <!--<el-col :span="12">
              <div class="bfff mt50 border-radius3 pa10" style="min-height:600px">
                <el-form ref="form" :model="formData" label-width="120px">
                      <el-form-item label="活动名称：">
                        {{formData.entityName}}
                      </el-form-item>
                      <el-form-item label="适用学段：">
                        {{formData.organizedDt}}
                      </el-form-item>
                      <el-form-item label="适用年级：">
                        {{formData.expiryDt}}
                      </el-form-item>
                      <el-form-item label="">
                        <el-button type="primary" size="small" @click="toAdd" class="button-v2-rao border-color-cccccc c000000 bfff" >发布</el-button>
                        <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "goBack">
                          返回
                        </el-button>

                      </el-form-item>
                </el-form>
              </div>
          </el-col>-->

        </el-row>
        <div class="text-center">
          <el-button type="primary" size="small" class="button-v2-rao border-color-cccccc c000000 bfff"
                     @click="goBack">返回
          </el-button>
        </div>
      </el-main>


    </el-container>

  </div>
</template>

<script>

  import api from "./entityorganizationUrl";
  import {mapGetters, mapMutations} from 'vuex';


  export default {
    components: {},
    data() {
      return {
        courseNames: [
          {
            codeDesc: "消防全使用办法",
            codeId: "1"
          },
          {
            codeDesc: "消防全使用办法1",
            codeId: "1"
          }

        ],
        formData: {
          entityName: "",
          organizedDt: "",
          expiryDt: ""
        }
      }
    },
    computed: {
      ...mapGetters(["isLoading", "access_token"]),
      type() {
        return this.$route.query.type
      }
    },
    mounted() {
      this.SET_IS_LOADING(false)

    },
    methods: {
      ...mapMutations(['SET_IS_LOADING']),
      goBack() {
        this.$router.go(-1);
      },
      toAdd() {
        let opath = `/safetyEdu/schoolCourseAdd?type=add`;
        this.$router.push({path: opath})
      },
      tingyong() {
        this.SET_IS_LOADING(true)
        api.tingyong({
          entityOrgRuleIds: [this.entityOrgRuleId],//对象范围ID
          entityOrgRuleStatusCode: "disabled"//状态
        }).then(res => {
          if (res.data.resultCode === '000000') {
            this.$message.success("停用成功");
            this.$router.go(-1);
            this.SET_IS_LOADING(false)
          }
        }, res => {
          this.SET_IS_LOADING(false)
          this.$message.error(res.message);
        });
      },
      goBack() {
        this.$router.go(-1);
      },
      sendTo() {
        this.$router.push({
          path: "/safetyEdu/send"
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
    margin: 50px auto 0px;
    padding: 24px 20px;
    box-sizing: border-box;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 30px;
    background-color: #ccc;

    .phone-main {
      background-color: #fff;

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
