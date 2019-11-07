<template>
  <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                style="min-height: 600px" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)" class="bF5F5F5">
    <el-main>
      <el-button v-if="pageState === 'add'" type="primary" class="button-v2-rao b93BF88 mb10">新增学生家长信息</el-button>
      <el-button v-if="pageState === 'edit'" type="primary" class="button-v2-rao b93BF88 mb10">编辑学生家长信息</el-button>
      <el-button v-if="pageState === 'detail'" type="primary" class="button-v2-rao b93BF88 mb10">详情学生家长信息</el-button>
      <div>
        <div class="edit-box bfff">
          <div v-if="pageState === 'add'">
            <div class="clearfix" v-for="(item,index) in lotClassList" :key="index">
              <el-form :label-position="'right'"
                       label-width="200px" ref="formData" :inline="false" :model="item" :rules="rules" size="small">

                <el-col :span="8">
                  <el-form-item label="家长姓名 :" prop="parentUserName">
                    <el-col :span="24">
                      <role-dialog :url="'/user/parentAd/page'" ref="parent" :type="'parent'"
                                   :params="{page:1,limit:10}" @callback="jzCallback">选择
                      </role-dialog>
                    </el-col>
                  </el-form-item>
                </el-col>
                <el-col :span="8">
                  <el-form-item label="学生姓名 :" prop="studentUserName">
                    <el-col :span="24">
                      <role-dialog :url="'/user/studentAd/page'" ref="student" :type="'student'"
                                   :params="{page:1,limit:10}" @callback="xsCallback">选择
                      </role-dialog>
                    </el-col>
                  </el-form-item>
                </el-col>


                <el-col :span="8">
                  <el-form-item label="家长子女关系 :" prop="studentParentTypeCode">
                    <el-select class="select-v2-rao" popper-class="select-popper-v2-rao"
                               v-model="item.studentParentTypeCode" placeholder="请您选择">
                      <el-option v-for="studentParentTypeCodeItem in studentParentTypeCodeOptions"
                                 :key="studentParentTypeCodeItem.name"
                                 :label="studentParentTypeCodeItem.label" :value="studentParentTypeCodeItem.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>


                <el-col :span="8">
                  <el-form-item label="关系状态 :" prop="studentParentStatusCode">
                    <el-select class="select-v2-rao" popper-class="select-popper-v2-rao"
                               v-model="item.studentParentStatusCode" placeholder="请您选择">
                      <el-option v-for="studentParentStatusCodeItem in studentParentStatusCodeOptions"
                                 :key="studentParentStatusCodeItem.name"
                                 :label="studentParentStatusCodeItem.label" :value="studentParentStatusCodeItem.name">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <div class="clearfix"></div>

              </el-form>

            </div>
            <div class="clearfix">
              <el-button type="primary" class="mt10" size="small"
                         @click="addItem"><i class="iconfont icon-icon_xinjian f12 cfff"></i>新增
              </el-button>
            </div>
          </div>

          <div v-if="pageState === 'edit'">

            <el-form :label-position="'right'" class="schoolForm-rao"
                     label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


              <el-col :span="8">
                <el-form-item label="家长姓名 :" prop="parentUserName">
                  <el-col :span="24">
                    <role-dialog :url="'/user/parentAd/page'" ref="parent" :type="'parent'" :params="{page:1,limit:10}"
                                 @callback="jzCallback">选择
                    </role-dialog>
                  </el-col>
                </el-form-item>
              </el-col>
              <el-col :span="8">
                <el-form-item label="学生姓名 :" prop="studentUserName">
                  <el-col :span="24">
                    <role-dialog :url="'/user/studentAd/page'" ref="student" :type="'student'"
                                 :params="{page:1,limit:10}" @callback="xsCallback">选择
                    </role-dialog>
                  </el-col>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                <el-form-item label="家长子女关系 :" prop="studentParentTypeCode">
                  <el-select class="select-v2-rao" popper-class="select-popper-v2-rao"
                             v-model="formData.studentParentTypeCode" placeholder="请您选择">
                    <el-option v-for="studentParentTypeCodeItem in studentParentTypeCodeOptions"
                               :key="studentParentTypeCodeItem.name"
                               :label="studentParentTypeCodeItem.label" :value="studentParentTypeCodeItem.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>


              <el-col :span="8">
                <el-form-item label="关系状态 :" prop="studentParentStatusCode">
                  <el-select class="select-v2-rao" popper-class="select-popper-v2-rao"
                             v-model="formData.studentParentStatusCode" placeholder="请您选择">
                    <el-option v-for="studentParentStatusCodeItem in studentParentStatusCodeOptions"
                               :key="studentParentStatusCodeItem.name"
                               :label="studentParentStatusCodeItem.label" :value="studentParentStatusCodeItem.name">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>


              <div class="clearfix"></div>

            </el-form>
          </div>

          <div v-if="pageState === 'detail'">
            <el-row>
              <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">

                <!-- 详细查看 -->
                <el-form :label-position="'right'" class="" label-width="165px"
                         :inline="true" :model="formData" size="small">


                  <el-col :span="8" v-if="formData.parentUserName">
                    <el-form-item label="家长姓名 :" prop="parentUserName">
                      {{formData.parentUserName}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.studentUserName">
                    <el-form-item label="学生姓名 :" prop="studentUserName">
                      {{formData.studentUserName}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.studentParentTypeCode">
                    <el-form-item label="家长子女关系 :" prop="studentParentTypeCode"
                                  :style="{'color':formData.studentParentTypeCodeStr.split(';')[1]}">
                      {{formData.studentParentTypeCodeStr.split(';')[0]}}
                    </el-form-item>
                  </el-col>


                  <el-col :span="8" v-if="formData.studentParentStatusCode">
                    <el-form-item label="关系状态 :" prop="studentParentStatusCode"
                                  :style="{'color':formData.studentParentStatusCodeStr.split(';')[1]}">
                      {{formData.studentParentStatusCodeStr.split(';')[0]}}
                    </el-form-item>
                  </el-col>


                </el-form>
              </el-col>

            </el-row>
          </div>
          <div class="clearfix"></div>

          <div class="text-center">
            <el-button type="primary" class="mr80" size="small"
                       @click="goBack">返回
            </el-button>
            <el-button v-if="pageState === 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                       @click="submit('formData')">更新
            </el-button>
            <el-button v-if="pageState === 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                       @click="submit('formData')">发布
            </el-button>

          </div>

        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
  import api from "./basicstudentparentUrl";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import {mapGetters, mapMutations} from 'vuex';

  export default {
    data() {
      return {
        lotClassList: [
          {
            "studentParentId": null,
            "studentUserName": "",
            "parentUserName": "",
            "studentParentTypeCode": "",
            "studentParentStatusCode": "",
            "parentId": "",
            "studentId": ""
          }
        ],
        parentId: "",
        studentId: "",
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        studentParentTypeCodeOptions: [{"label": "请选择", "name": ""}], studentParentTypeCode: null,
        studentParentStatusCodeOptions: [{"label": "请选择", "name": ""}], studentParentStatusCode: null,
        formData: {
          studentParentId: null,
          studentUserName: "",
          parentUserName: "",
          studentParentTypeCode: "",
          studentParentStatusCode: ""
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          parentId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          parentUserName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          studentId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          studentUserName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          studentParentTypeCode: [
            {required: true, message: "请您选择家长子女关系", trigger: "change"},

          ],
          studentParentStatusCode: [
            {required: true, message: "请您选择关系状态", trigger: "change"},

          ],
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
      // this.SET_IS_LOADING(true);
      this.getDetail(this.$route.params.id);
      commonApi.getCodeIntType("studentParentType").then(res => {
        let viewList = res.data.data || [];
        for (let studentParentTypeItem of viewList) {
          this.studentParentTypeCodeOptions.push({
            "label": studentParentTypeItem.codeDesc,
            "name": studentParentTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("studentParentStatus").then(res => {
        let viewList = res.data.data || [];
        for (let studentParentStatusItem of viewList) {
          this.studentParentStatusCodeOptions.push({
            "label": studentParentStatusItem.codeDesc,
            "name": studentParentStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      ...mapMutations(['SET_IS_LOADING']),
      addItem() {
        this.lotClassList.push({
          "studentParentId": null,
          "studentUserName": "",
          "parentUserName": "",
          "studentParentTypeCode": "",
          "studentParentStatusCode": "",
          "parentId": "",
          "studentId": ""
        })
      },
      xsCallback(event) {
        // console.log(event)
        this.formData.studentId = event.studentId;
        this.formData.studentUserName = event.userName;
      },
      jzCallback(event) {
        // console.log(event)
        this.formData.parentId = event.parentId;
        this.formData.parentUserName = event.userName;

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
        if (!this.formData.parentId) {
          this.$message.error("请选择家长");
          return
        }
        if (!this.formData.studentId) {
          this.$message.error("请选择学生");
          return
        }
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          if (this.pageState === "edit" && valid) {
            api.putObj(this.formData).then(res => {

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
            api.addObj(this.formData).then(res => {
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
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
              if (this.pageState == 'edit') {
                this.$refs.student.setRoleId(this.formData.studentId, this.formData.studentUserName)
                this.$refs.parent.setRoleId(this.formData.parentId, this.formData.parentUserName)
              }
            }
            this.SET_IS_LOADING(false);
            this.isLoaded = false;
          }, res => {
            this.SET_IS_LOADING(false);
            this.$message.error(res.message);
          });
        }

      },
      goBack() {
        this.$router.go(-1);
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
