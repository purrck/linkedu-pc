<template>
  <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                style="min-height: 600px" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)" class="bF5F5F5">
    <el-main>
      <el-button v-if="pageState === 'add'" type="primary" class="button-v2-rao b93BF88 mb10">新增家长信息</el-button>
      <el-button v-if="pageState === 'edit'" type="primary" class="button-v2-rao b93BF88 mb10">编辑家长信息</el-button>
      <el-button v-if="pageState === 'detail'" type="primary" class="button-v2-rao b93BF88 mb10">详情家长信息</el-button>
      <div>
        <div class="edit-box bfff">
          <div v-show="$store.state.common.lizi">
            <el-button @click="example">示例</el-button>
          </div>
          <div v-if="pageState === 'add'">

            <el-form :label-position="'right'"
                     label-width="220px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


              <el-col :span="8">
                <el-form-item label="姓名  :" prop="userName">
                  <el-input class="input-v2-rao" v-model="formData.userName" maxlength="32"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="身份证件类型 :" prop="idCardTypeCode">
                  <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao"
                             v-model="formData.idCardTypeCode" placeholder="请您选择">
                    <el-option v-for="idCardTypeCodeItem in idCardTypeCodeOptions"
                               :key="idCardTypeCodeItem.name"
                               :label="idCardTypeCodeItem.label" :value="idCardTypeCodeItem.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="证件号 :" prop="idCardNum">
                  <el-input class="input-v2-rao" v-model="formData.idCardNum" maxlength="255"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="联系电话 :" prop="contactPhoneNum">
                  <el-input class="input-v2-rao" v-model="formData.contactPhoneNum" maxlength="32"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="手机号 :" prop="telPhoneNum">
                  <el-input class="input-v2-rao" v-model="formData.telPhoneNum" maxlength="32"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="qq 号 :" prop="qqNum">
                  <el-input class="input-v2-rao" v-model="formData.qqNum" maxlength="32"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="电子邮箱 :" prop="contactEmail">
                  <el-input class="input-v2-rao" v-model="formData.contactEmail" maxlength="32"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="邮政编码 :" prop="postNum">
                  <el-input class="input-v2-rao" v-model="formData.postNum" maxlength="16"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="通讯地址 :" prop="contactAddress">
                  <el-input class="input-v2-rao" v-model="formData.contactAddress" maxlength="255"></el-input>
                </el-form-item>
              </el-col>
              <el-col :span="24">
                <el-form-item label="">
                  <el-button @click="addStudent()" type="primary" size="small"
                             class="button-v2-rao border-color-cccccc c000000 bfff">添加学生
                  </el-button>
                </el-form-item>
              </el-col>


              <div v-for="(data,index) in formData.basicStudentParentVOS" :key="index">
                <div>
                  <el-col :span="6">
                    <el-form-item label="学生 :" :prop="'basicStudentParentVOS.' + index + '.studentUserName'" :rules="{
         required: true, message: '请您输入姓名', trigger: 'change'}">
                      <el-col :span="16">
                        <el-input v-model="data.studentUserName" readonly="readonly" class="input-v2-rao"
                                  maxlength="11"></el-input>
                      </el-col>
                      <el-col :span="4">
                        <el-button @click="selectStudent(data)" type="primary" size="small"
                                   class="button-v2-rao border-color-cccccc c000000 bfff">选择
                        </el-button>
                      </el-col>
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="家长子女关系 :" :prop="'basicStudentParentVOS.' + index + '.studentParentTypeCode'"
                                  :rules="{
         required: true, message: '请选择家长子女关系', trigger: 'change'}">
                      <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao"
                                 v-model="data.studentParentTypeCode">
                        <el-option v-for="idCardTypeCodeItem in studentParentTypeList"
                                   :key="idCardTypeCodeItem.name"
                                   :label="idCardTypeCodeItem.label" :value="idCardTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>

                  <el-col :span="6">
                    <el-form-item label="关系状态 :" :prop="'basicStudentParentVOS.' + index + '.studentParentStatusCode'"
                                  :rules="{
         required: true, message: '请选择关系状态', trigger: 'change'}">
                      <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao"
                                 v-model="data.studentParentStatusCode">
                        <el-option v-for="idCardTypeCodeItem in studentParentStatusList"
                                   :key="idCardTypeCodeItem.name"
                                   :label="idCardTypeCodeItem.label" :value="idCardTypeCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="3">
                    <el-form-item label="" prop="idCardTypeCode">
                      <el-button @click="removeStudent(index)" type="primary" size="small"
                                 class="button-v2-rao border-color-cccccc c000000 bfff">删除
                      </el-button>
                    </el-form-item>
                  </el-col>
                </div>
                <div class="clearfix"></div>
              </div>

              <div class="clearfix"></div>

            </el-form>
          </div>

          <div v-if="pageState === 'edit'">

            <el-form :label-position="'right'" class="schoolForm-rao"
                     label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


              <el-col :span="8">
                <el-form-item label="姓名 *  :" prop="userName">
                  <el-input class="input-v2-rao" v-model="formData.userName" maxlength="32"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="身份证件类型 :" prop="idCardTypeCode">
                  <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao"
                             v-model="formData.idCardTypeCode" placeholder="请您选择">
                    <el-option v-for="idCardTypeCodeItem in idCardTypeCodeOptions"
                               :key="idCardTypeCodeItem.name"
                               :label="idCardTypeCodeItem.label" :value="idCardTypeCodeItem.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="证件号 :" prop="idCardNum">
                  <el-input class="input-v2-rao" v-model="formData.idCardNum" maxlength="255"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="联系电话 :" prop="contactPhoneNum">
                  <el-input class="input-v2-rao" v-model="formData.contactPhoneNum" maxlength="32"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="手机号 :" prop="telPhoneNum">
                  <el-input class="input-v2-rao" v-model="formData.telPhoneNum" maxlength="32"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="qq 号 :" prop="qqNum">
                  <el-input class="input-v2-rao" v-model="formData.qqNum" maxlength="32"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="电子邮箱 :" prop="contactEmail">
                  <el-input class="input-v2-rao" v-model="formData.contactEmail" maxlength="32"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="邮政编码 :" prop="postNum">
                  <el-input class="input-v2-rao" v-model="formData.postNum" maxlength="16"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="通讯地址 :" prop="contactAddress">
                  <el-input class="input-v2-rao" v-model="formData.contactAddress" maxlength="255"></el-input>
                </el-form-item>
              </el-col>


              <el-col :span="24">
                <el-form-item label="">
                  <el-button @click="addStudent()" type="primary" size="small"
                             class="button-v2-rao border-color-cccccc c000000 bfff">添加学生
                  </el-button>
                </el-form-item>
              </el-col>


              <div v-for="(data,index) in formData.basicStudentParentVOS" :key="index">
                <el-col :span="8">
                  <el-form-item label="学生 :" prop="studentUserName">
                    <el-col :span="16">
                      <el-input v-model="data.studentUserName" readonly="readonly" class="input-v2-rao"
                                maxlength="11"></el-input>
                    </el-col>
                    <el-col :span="4">
                      <el-button @click="selectStudent(data)" type="primary" size="small"
                                 class="button-v2-rao border-color-cccccc c000000 bfff">选择
                      </el-button>
                    </el-col>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="家长子女关系 :" prop="studentParentTypeCode">
                    <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao"
                               v-model="data.studentParentTypeCode" placeholder="请您选择">
                      <el-option v-for="idCardTypeCodeItem in studentParentTypeList"
                                 :key="idCardTypeCodeItem.name"
                                 :label="idCardTypeCodeItem.label" :value="idCardTypeCodeItem.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :span="8">
                  <el-form-item label="关系状态 :" prop="idCardTypeCode">
                    <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao"
                               v-model="data.studentParentStatusCode" placeholder="请您选择">
                      <el-option v-for="idCardTypeCodeItem in studentParentStatusList"
                                 :key="idCardTypeCodeItem.name"
                                 :label="idCardTypeCodeItem.label" :value="idCardTypeCodeItem.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </div>

              <div class="clearfix"></div>

            </el-form>
          </div>


          <div v-if="pageState === 'detail'">
            <el-row>
              <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                <!-- 详细查看 -->
                <el-form :label-position="'right'" class="" label-width="165px"
                         :inline="true" :model="formData" size="small">

                  <el-col :span="8" v-if="formData.userName">
                    <el-form-item label="姓名 :" prop="userName">
                      {{formData.userName}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.idCardTypeCodeStr">
                    <el-form-item label="身份证件类型 :" prop="idCardTypeCode"
                                  v-if="formData.idCardTypeCodeStr"
                                  :style="{'color':formData.idCardTypeCodeStr.split(';')[1]}">
                      {{formData.idCardTypeCodeStr&&formData.idCardTypeCodeStr.split(';')[0]}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.idCardNum">
                    <el-form-item label="证件号 :" prop="idCardNum">
                      {{formData.idCardNum}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.contactPhoneNum">
                    <el-form-item label="联系电话 :" prop="contactPhoneNum">
                      {{formData.contactPhoneNum}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.telPhoneNum">
                    <el-form-item label="手机号 :" prop="telPhoneNum">
                      {{formData.telPhoneNum}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.qqNum">
                    <el-form-item label="qq 号 :" prop="qqNum">
                      {{formData.qqNum}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.contactEmail">
                    <el-form-item label="电子邮箱 :" prop="contactEmail">
                      {{formData.contactEmail}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.postNum">
                    <el-form-item label="邮政编码 :" prop="postNum">
                      {{formData.postNum}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.contactAddress">
                    <el-form-item label="通讯地址 :" prop="contactAddress">
                      {{formData.contactAddress}}
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="">

                    </el-form-item>
                  </el-col>

                  <div v-for="(data,index) in formData.basicStudentParentVOS" :key="index">
                    <el-col :span="8">
                      <el-form-item label="学生 :" prop="studentUserName">
                        <el-col :span="24">
                          {{data.studentUserName}}
                        </el-col>
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label="家长子女关系 :" prop="idCardTypeCode">
                        {{data.studentParentTypeCodeStr&&data.studentParentTypeCodeStr.split(';')[0]}}
                      </el-form-item>
                    </el-col>

                    <el-col :span="8">
                      <el-form-item label="关系状态 :" prop="idCardTypeCode">
                        {{data.studentParentStatusCodeStr&&data.studentParentStatusCodeStr.split(';')[0]}}
                      </el-form-item>
                    </el-col>
                  </div>


                </el-form>
              </el-col>

            </el-row>
          </div>
          <div class="clearfix"></div>

          <div class="text-center mt20">

            <el-button v-if="pageState === 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                       @click="submit('formData')">更新
            </el-button>
            <el-button v-if="pageState === 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                       @click="submit('formData')">发布
            </el-button>

            <el-button type="primary" class="mr80" size="small"
                       @click="goBack">返回
            </el-button>

          </div>

        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import api from "./basicparentUrl";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    data() {
      // 手机号码校验
      const mobileNum = (rule, value, callback) => {
        var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(17[0-9]{1})|(15[0-3]{1})|(15[5-9]{1})|(18[0-9]{1})|(16[6-7]{1})|(19[8-9]{1}))+\d{8})$/;
        if (reg.test(value) == false) {
          callback(new Error('手机号码格式错误'));
        } else {
          callback();
        }
      }
      return {
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),
        studentParentStatusList: [],
        studentParentTypeList: [],
        idCardTypeCodeOptions: [{"label": "全部", "name": ""}], idCardTypeCode: null,

        formData: {
          "userName": "",
          "idCardTypeCode": "",
          "idCardNum": "",
          "contactPhoneNum": "",
          "telPhoneNum": "",
          "qqNum": "",
          "contactEmail": "",
          "postNum": "",
          "contactAddress": "",
          "basicStudentParentVOS": [
            {
              "studentId": "",
              "studentUserName": "",
              "studentParentTypeCode": "",
              "studentParentStatusCode": "",
              "studentUserId": ""
            }
          ]
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          /*studentParentTypeCode:[
              { required: true, validator : studentParentTypeCodeCheck, trigger: 'change' }
          ],*/
          userName: [
            {required: true, message: "请您输入姓名", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"}
          ],
          telPhoneNum: [
            {required: true, validator: mobileNum, trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"}
          ]
        }
      }
    },
    computed: {
      ...mapGetters(['isLoading']),
      pageState() {
        return this.$route.params.type;
      }
    },
    components: {editor, upload},
    created() {
      this.SET_IS_LOADING(false)
      this.getDetail(this.$route.params.id);
      commonApi.getCodeIntType("studentParentStatus").then(res => {
        let viewList = res.data.data || [];
        for (let idCardTypeItem of viewList) {
          this.studentParentStatusList.push({
            "label": idCardTypeItem.codeDesc,
            "name": idCardTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("studentParentType").then(res => {
        let viewList = res.data.data || [];
        for (let idCardTypeItem of viewList) {
          this.studentParentTypeList.push({
            "label": idCardTypeItem.codeDesc,
            "name": idCardTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });

      commonApi.getCodeIntType("idCardType").then(res => {
        let viewList = res.data.data || [];
        for (let idCardTypeItem of viewList) {
          this.idCardTypeCodeOptions.push({
            "label": idCardTypeItem.codeDesc,
            "name": idCardTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      ...mapMutations(['SET_IS_LOADING']),
      removeStudent(index) {
        if (this.formData.basicStudentParentVOS.length == 1) {
          this.$message.error("至少有一项");
          return
        }
        this.formData.basicStudentParentVOS.splice(index, 1)
      },
      addStudent() {
        this.formData.basicStudentParentVOS.push({
          "studentId": "",
          "studentUserName": "",
          "studentParentTypeCode": "",
          "studentParentStatusCode": "",
          "studentUserId": ""
        })
      },
      selectStudent(data) {
        this.$callStudentDialog({
          callback: (msg) => {
            // console.log(msg)
            data.studentUserName = msg.userName
            data.studentId = msg.studentId
            data.studentUserId = msg.userId
          }
        })
      },
      xsCallback(event) {
        this.formData.studentId = event.studentId;
        this.formData.studentUserName = event.userName;
      },
      //图片上传
      uploadData(res) {
        this.formData.imagePath = res;
      },
      //编辑器
      getEditorValue(val) {
        this.formData.content = val
      },
      //选填信息
      xuantianHandler() {
        this.xuantian = this.xuantian ? false : true;
      },
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          if (this.pageState === "edit" && valid) {
            this.formLoading = true;
            api.putObjV1(this.formData).then(res => {

              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
              } else {
                //this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          } else if (this.pageState === "add" && valid) {
            this.formLoading = true;
            api.addNewParent1(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          }
        })
        this.isLoaded = false;

      },
      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          this.SET_IS_LOADING(true);
          api.getObjV1({id: paramsId}).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
            }
            this.isLoaded = false;
            this.SET_IS_LOADING(false);
          }, res => {
            this.$message.error(res.message);
          });
        }
      },
      goBack() {
        this.$router.go(-1);
      },
      example() {
        this.formData = {
          "userName": "一日游",
          "idCardTypeCode": "IDCARD",
          "idCardNum": "441481198512256023",
          "contactPhoneNum": "15005659875",
          "telPhoneNum": "15005659875",
          "qqNum": "234345",
          "contactEmail": "asdasd@163.com",
          "postNum": "23423424",
          "contactAddress": "阿萨达",
          "basicStudentParentVOS": [{
            "studentId": "02360b79d69a4746b21bbf95f1e0b503",
            "studentUserName": "王晓飞",
            "studentParentTypeCode": "Grandmother2",
            "studentParentStatusCode": "available",
            "studentUserId": "831888963d0349edb56b39a7910ef73c"
          }]
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .menu-quickly {
    width: 166px;
    border: 1px solid #d8d8d8;

    a.current {
      background: #4A9388;
      color: #fff
    }

    a {
      padding: 10px 0 10px 15px;
      font-size: 14px;
      display: block;

      img {
        padding-right: 8px;
        vertical-align: -4px;
      }

    }

    a:hover {
      text-decoration: none;
    }

  }

  .el-form-item--small.el-form-item {
    margin-bottom: 25px;
  }

  .schoolForm-detail-rao {

    .el-form-item {
      margin-bottom: 5px;
    }

  }

  .ml80 {
    margin-left: 80px;
  }


</style>
