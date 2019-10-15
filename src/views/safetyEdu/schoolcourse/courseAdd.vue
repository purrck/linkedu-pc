<template>
  <div>
    <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)"
                  class="bF5F5F5">


      <el-main class="pt0">
        <el-button type="primary" class="button-v2-rao b93BF88">发布课程</el-button>
        <el-row class="mb10">
          <el-col :span="10">
            <div class="phoneModel-wrap">
              <div class="phoneModel-content">
                <div class="phone-main" id="coursePage">
                  <!--<iframe id="coursePage" width="100%" height="667" scrolling="no" frameborder="0"
                          :src="`http://192.168.2.138:8080/#/course?token=${access_token}&courseId=${courseId}`"></iframe>-->
                </div>
              </div>
            </div>

          </el-col>
          <el-col :span="14" v-show="!showSend">
            <div v-show="pageState == 'shenhe'" class="bfff mt50 border-radius3 pa10 pt40" style="min-height:600px">
              <el-form ref="form" :model="formData" label-width="120px" >
                <el-form-item label="课程名称：">
                  {{formData.entityName}}
                </el-form-item>
                <el-form-item label="发布时间：">
                  {{formData.effectiveDt}}
                </el-form-item>
                <el-form-item label="下架时间：">
                  {{formData.expiryDt}}
                </el-form-item>
                <!--<el-form-item label="发布对象：">
                  {{formData.belongName}}
                </el-form-item>-->
                <el-form-item label="">
                  <el-button type="primary" :loading="shenheLoading" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click="tongguo">
                    通过
                  </el-button>
                  <el-button :loading="bohuiLoading" type="primary" size="small" @click="bohui"
                             class="button-v2-rao border-color-cccccc c000000 bfff">驳回
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <div v-show="pageState == 'detail'" class="bfff mt50 border-radius3 pa10 pt40" style="min-height:600px">
              <el-form ref="form" :model="formData" label-width="120px">
                <el-form-item label="课程名称：">
                  {{formData.entityName}}
                </el-form-item>
                <el-form-item label="发布时间：">
                  {{formData.effectiveDt}}
                </el-form-item>
                <el-form-item label="下架时间：">
                  {{formData.expiryDt}}
                </el-form-item>
                <el-form-item label="状态：">
                  <span :style="{'color':formData.entityOrgStatusCodeStr&&formData.entityOrgStatusCodeStr.split(';')[1]}">
                    {{formData.entityOrgStatusCodeStr&&formData.entityOrgStatusCodeStr.split(";")[0]}}</span>
                </el-form-item>
                <!--<el-form-item label="发布对象：">
                  {{formData.belongName}}
                </el-form-item>
                <el-form-item label="审核结果：">
                    {{formData.entityOrgRuleStatusCodeStr && formData.entityOrgRuleStatusCodeStr.split(";")[0]}}
                </el-form-item>-->
                <el-form-item label="">

                  <el-button type="primary" size="small" class="button-v2-rao border-color-cccccc c93BF88 bfff" @click="viewGuankan">
                    查看观看情况
                  </el-button>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click="goBack">
                    返回
                  </el-button>
                  <el-button v-show="formData.entityOrgStatusCode == 'opening'" type="primary" size="small" @click="tingyong"
                             class="button-v2-rao border-color-cccccc c000000 bfff">停用
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
            <div v-show="pageState == 'add' || pageState == 'edit'" class="bfff mt50 pt40 border-radius3 pa10"
                 style="min-height:600px">
              <el-form ref="form" :model="formData" label-width="120px" :rules="rules" class="edit-form">
                <el-form-item label="课程名称：" prop="entityId">
                  <el-select size="mini" class="select-v2-rao p100" popper-class="select-popper-v2-rao"
                             v-model="formData.entityId" placeholder="请选择" maxlength="32">
                    <el-option
                      label="无"
                      value=""
                    ></el-option>
                    <el-option
                      v-for="item in data.records"
                      :key="item.entityId"
                      :label="item.entityName"
                      :value="item.entityId"
                    >
                    <div @click="courseClick(item)">{{item.entityName}}</div>
                    </el-option>
                  </el-select>


                </el-form-item>
                <el-form-item label="发布时间：" prop="effectiveDt">
                  <el-date-picker size="mini" class="date-v2-rao" popper-class="date-popper-v2-rao"
                                  v-model="formData.effectiveDt" type="date"
                                  placeholder="选择日期" value-format="yyyy-MM-dd HH:mm" :picker-options="pickTime"></el-date-picker>
                </el-form-item>
                <el-form-item label="下架时间：" prop="expiryDt">
                  <el-date-picker size="mini" class="date-v2-rao" popper-class="date-popper-v2-rao"
                                  v-model="formData.expiryDt" type="date"
                                  placeholder="选择日期" value-format="yyyy-MM-dd HH:mm" :picker-options="pickTime1"></el-date-picker>
                </el-form-item>
                <el-form-item label="">
                  <el-button type="primary" v-show="pageState == 'add'" :loading="saveLoading" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click="save">
                    保存
                  </el-button>
                  <el-button type="primary" v-show="pageState == 'edit'" :loading="saveLoading" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click="editPlus">
                    保存
                  </el-button>
                  <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click="sendTo">
                    下一步
                  </el-button>
                  <el-button type="primary" size="small" class="button-v2-rao border-color-cccccc c000000 bfff"
                             @click="goBack">返回
                  </el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>

          <el-col :span="14" class="bfff mt50" v-show="showSend" style="padding: 40px;">
            <SendObject :header="header" @finish="finish"></SendObject>
            <div class="text-center mt20">
              <el-button type="primary" :loading="saveLoading" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "save2">
                保存
              </el-button>
              <el-button type="primary" :loading="shenheLoading" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "shenhe">
                提交审核
              </el-button>
              <el-button type="primary" size="small" class="button-v2-rao border-color-cccccc c000000 bfff" @click="goBack">返回</el-button>
            </div>
          </el-col>
        </el-row>

      </el-main>


    </el-container>

    <el-dialog title="审核" :before-close="shenheCancelHandler" :center="true" :visible.sync="dialogTableVisible">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea3" class="select-v2-rao">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="tongguo" :loading="shenheLoading">确 定</el-button>
        <el-button @click="shenheCancelHandler">取 消</el-button>

      </div>
    </el-dialog>

    <el-dialog title="驳回" :before-close="bohuiCancelHandler" :center="true" :visible.sync="dialogTableVisiblebohui">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
         class="select-v2-rao">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bohui" :loading="bohuiLoading">确 定</el-button>
        <el-button @click="bohuiCancelHandler">取 消</el-button>

      </div>
    </el-dialog>

  </div>
</template>

<script>
  import api from "./entityorganizationUrl";

  import {mapGetters, mapMutations} from 'vuex';
  import SendObject from "../../../components/sendObject/testSendObject";

  export default {
    components: {SendObject},
    data() {

      return {
        url : "",
        courseId : "",
        pickTime : {},
        pickTime1: {},
        saveLoading : false,
        data: {},
        header: [
          {
            title: '1、通知角色/学段',
            isActive: true,
            code: 'segment',
            children: [
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '角色',
                subTitleType: 'role',
                nextType: 'grade',
                single:true,
                isActive: false,
                url: '/userapp/base/codeInt/list?codetypeId=userType'
              },
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '学段',
                subTitleType: 'segment',
                nextType: 'grade',
                isActive: false,
                url: '/sm/base/schoolSegmentAd/segmentGrade?type=1'
              }
            ]
          },
          {
            title: '2、选择年级',
            isActive: false,
            code: 'grade',
            children: [
              {
                checked: [],
                children: [],
                subTitleType: 'grade',
                nextType: 'grade',
                subTitle: '年级',
                isActive: false,
              },
            ]
          },
          {
            title: '3、选择班级',
            isActive: false,
            code: 'class',
            children: [
              {
                checked: [],
                children: [],
                subTitleType: 'class',
                nextType: 'none',
                subTitle: '人员',
                isActive: false,
              },
            ]
          },
        ],
        bohuiLoading: false,
        showSend: false,
        textarea3: '',
        dialogTableVisiblebohui: false,
        dialogTableVisible: false,
        shenheLoading: false,
        isFinish: false,
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          entityType : "courseinfo"
        },
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
          entityId: "",
          effectiveDt: "",
          expiryDt: ""
        },
        rules: {
          entityId: [
            {
              required: true,
              message: `请您选择课程名称`,
              trigger: "blur"
            }
          ],
          effectiveDt: [
            {
              required: true,
              message: `请您选择发布时间`,
              trigger: "blur"
            }
          ],
          expiryDt: [
            {
              required: true,
              message: `请您选择下架时间`,
              trigger: "blur"
            }
          ]
        }
      }
    },
    computed: {
      ...mapGetters(["isLoading", "access_token"]),
      pageState() {
        return this.$route.query.type
      },
      entityOrgId() {
        return this.$route.query.entityOrgId
      },
      entityId() {
        return this.$route.query.entityId
      }
    },
    mounted() {
      //this.url = `http://192.168.2.138:8080/#/course?token=${this.access_token}&courseId=${this.entityId}`
      this.formData.entityId = this.entityId
      let _this = this;
      this.pickTime =  {
          disabledDate(time) {
            return time.getTime() > new Date(_this.formData.expiryDt).getTime();
          }
        }
      this.pickTime1 =  {
        disabledDate(time) {
          return time.getTime() < new Date(_this.formData.effectiveDt).getTime();
        }
      }

      this.SET_IS_LOADING(false);
      if(this.pageState == "edit" || this.pageState == "shenhe" || this.pageState == "detail"){
        this.getDetail(this.entityOrgId)
      }
      if(this.pageState == "add" || this.pageState == "edit"){
        this.getList();
      }


    },
    methods: {
      ...mapMutations(['SET_IS_LOADING']),

      courseClick(item){
        //this.url = `http://192.168.2.138:8080/#/course?token=${this.access_token}&courseId=${item.entityId}&dsd=3343`
        /*document.getElementById("coursePage").innerHTML = `<iframe  width="100%" height="667" scrolling="no" frameborder="0"
                          :src="http://192.168.2.138:8080/#/course?token=${this.access_token}&courseId=${item.entityId}"></iframe>`*/
        document.getElementById("coursePage").innerHTML= ""
        let b="192.168.2.60:8099";

        if(window.location.host == "192.168.2.60:2088"){
          b = "192.168.2.60:8099"
        }
        if(window.location.host == "192.168.2.60:2099"){
          b = "192.168.2.60:9099"
        }
        if(window.location.host == "47.106.35.119"){
          b = "47.106.35.119:5188"
        }
        let a = document.createElement("iframe")
        a.src= `http://${b}/#/inLineCourseDetail?token=${this.access_token}&courseId=${item.entityId}`
        a.width="300"
        a.height="504"
        a.style="border:none"
        a.border="no"
        a.frameborder="0"
        document.getElementById("coursePage").appendChild(a)
        /*document.getElementById("coursePage").innerHTML = `<iframe  width="100%" height="667" scrolling="no" frameborder="0"
                          :src="http://www.baidu.com"></iframe>`*/
        //this.url = `http://www.baidu.com?courseId=${item.entityId}`
        console.log(item)
      },

      viewGuankan(){
        this.$router.push({
          path:"/safetyEdu/guankanList",
          query : {entityOrgId:this.entityOrgId}
        })
      },

      bohuiCancelHandler() {
        this.bohuiLoading = false;
        this.dialogTableVisiblebohui = false;
      },

      bohui() {
        this.bohuiLoading = true;
        api.updateStatus({
          entityOrgIds: [this.entityOrgId],//对象范围ID
          entityOrgStatusCode: "rejected"//状态
        }).then(res => {
          if (res.data.resultCode === '000000') {

            this.$message.success("驳回成功");
            this.goBack();
          }
          this.bohuiLoading = false;
        }, res => {
          this.bohuiLoading = false;
          this.$message.error(res.message);
        });
      },

      shenheCancelHandler() {
        this.shenheLoading = false;
        this.dialogTableVisible = false;
      },

      tongguo() {
        this.shenheLoading = true;
        api.updateStatus({
          entityOrgIds: [this.entityOrgId],//对象范围ID
          entityOrgStatusCode: "opening"//状态
        }).then(res => {
          if (res.data.resultCode === '000000') {
            this.$message.success("通过成功");
            this.goBack();
          }
          this.shenheLoading = false;
        }, res => {
          this.shenheLoading = false;
          this.$message.error(res.message);
        });
      },

      tingyong() {
        this.SET_IS_LOADING(true);
        api.tingyong({
          entityOrgIds: [this.entityOrgId],//对象范围ID
          entityOrgRuleStatusCode: "finished"//状态
        }).then(res => {
          if (res.data.resultCode === '000000') {
            this.SET_IS_LOADING(false);
            this.$message.success("停用成功");
            this.goBack();
          }

        }, res => {
          this.SET_IS_LOADING(false);
          this.$message.error(res.message);
        });
      },
      getDetail(paramsId) {
        this.SET_IS_LOADING(true);
        if (this.pageState !== 'add') {
          api.entityOrganizationAdDetail(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              if(res.data.data.hasOwnProperty("soluOutTime")){
                res.data.data['expiryDt'] = res.data.data.soluOutTime
              }
              if(res.data.data.hasOwnProperty("organizationTime")){
                res.data.data['organizedDt'] = res.data.data.organizationTime
              }

              this.formData = res.data.data
            }
            this.isLoaded = false;
            this.SET_IS_LOADING(false);
          })
        }
      },
      getList() {
        this.SET_IS_LOADING(true);
        api.getSystemList({
          entityType : "courseinfo",
          limit : "9999",
          page : "1"
        }).then(res => {
          this.data = res.data.data;
          this.SET_IS_LOADING(false);
        }, res => {
          this.$message.error(res.message);
          this.SET_IS_LOADING(false);
        });
      },
      editPlus(){
        this.$refs['form'].validate((valid) => {

          if (valid) {
            this.saveLoading = true;
            this.SET_IS_LOADING(true);
            this.formData.entityOrgStatusCode = "editing";
            this.formData.entityType = "courseinfo"

            api.entityOrganizationAdEdit(this.formData).then(res => {
              if (res.data.resultCode === '000000') {
                this.$message.success("保存成功");
                this.$router.go(-1);
              }
              this.SET_IS_LOADING(false);
              this.saveLoading = false;
            }, res => {
              this.SET_IS_LOADING(false);
              this.saveLoading = false;
              this.$message.error(res.message);
            });
          }

        })

      },
      save() {
        this.$refs['form'].validate((valid) => {
          alert(1)
          if (valid) {
            this.saveLoading = true;
            this.SET_IS_LOADING(true);
            this.formData.entityOrgStatusCode = "editing";
            this.formData.entityType = "courseinfo"
            console.log(this.formData)
            api.entityOrganizationAdAdd(this.formData).then(res => {
              if (res.data.resultCode === '000000') {
                this.$message.success("保存成功");
                this.$router.go(-1);
              }
              this.SET_IS_LOADING(false);
              this.saveLoading = false;
            }, res => {
              this.SET_IS_LOADING(false);
              this.saveLoading = false;
              this.$message.error(res.message);
            });
          }

        })

      },

      goBack() {
        this.$router.go(-1);
      },
      sendTo() {
        this.$refs['form'].validate((valid) => {

          if (valid) {
            this.showSend = true;
            // this.formData.entityType = "courseinfo"
            // // this.showSend = true;
            // this.$router.push({
            //   path: "/safetyEdu/send",
            //   query: {type: this.pageState, formData: encodeURIComponent(JSON.stringify(this.formData))}
            // })
          }
        })
      },
      shenhe(){
        if(!this.isFinish){
          this.$message.error("请点击完成选择");
          return
        }
        this.shenheLoading = true;
        this.formData.entityOrgStatusCode = 'approving'
        this.formData.entityType = "courseinfo"
        if(this.pageState == "add"){
          api.publish(this.formData).then(res => {
            if (res.data.resultCode === "000000") {
              this.$router.push({
                path:"/safetyEdu/schoolCourseList"
              })
              this.$message.success("发布成功");
            } else {
              this.$message.error(res.data.message);
            }
            this.shenheLoading = false;
          })
        }

        if(this.pageState == "edit"){
          api.entityOrganizationAdEdit(this.formData).then(res => {
            if (res.data.resultCode === "000000") {
              this.$message.success("修改成功");
              this.$router.push({
                path:"/safetyEdu/schoolCourseList"
              })
            } else {
              this.$message.error(res.data.message);
            }
            this.shenheLoading = false;
          })
        }
      },
      save2(){

        if(!this.isFinish){
          this.$message.error("请点击完成选择");
          return
        }
        this.saveLoading = true;
        this.formData.entityOrgStatusCode = 'editing'
        this.formData.entityType = "courseinfo"
        if(this.pageState == "add"){
          api.publish(this.formData).then(res => {
            if (res.data.resultCode === "000000") {
              this.$router.push({
                path:"/safetyEdu/schoolCourseList"
              })
              this.$message.success("发布成功");
            } else {
              this.$message.error(res.data.message);
            }
            this.saveLoading = false;
          })
        }

        if(this.pageState == "edit"){
          api.entityOrganizationAdEdit(this.formData).then(res => {
            if (res.data.resultCode === "000000") {
              this.$router.push({
                path:"/safetyEdu/schoolCourseList"
              })
              this.$message.success("修改成功");
            } else {
              this.$message.error(res.data.message);
            }
            this.saveLoading = false;
          })
        }
      },
      finish(val){
        this.index++
        this.isFinish = true;
        this.formData.scope = val.header;
        this.formData.roleId = val.header[0].children[0].checked;;
        this.formData.segmentIds = val.header[0].children[1].checked;
        let resData = val.header;
        let temp = [];

        resData[1].children.forEach(res => {
          temp = temp.concat(res.checked);
        })
        this.formData.gradeIds = temp;

        let claTem = [];
        resData[2].children.forEach(res => {
          claTem = claTem.concat(res.checked);
        });
        console.log('claTem');
        console.log(claTem);
        this.formData.classIds = claTem;
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .phoneModel-wrap {
    width: 325px;
    height: 556px;
    margin: 50px auto 0px;
    padding: 24px 20px;
    box-sizing: border-box;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 30px;
    background-color: #ccc;
    .phoneModel-content{
      background-color: #fff;
      margin-bottom: -11px;
      height: 100%;
    }
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




</style>
