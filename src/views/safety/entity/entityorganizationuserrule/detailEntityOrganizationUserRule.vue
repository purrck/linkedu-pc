<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="所属机构id :" prop="belongId">
              <el-input v-model="formData.belongId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="所属机构 :" prop="belongName">
              <el-input v-model="formData.belongName" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label=" :" prop="userTypeCode">
              <el-select v-model="formData.userTypeCode" placeholder="请您选择">
                <el-option v-for="userTypeCodeItem in userTypeCodeOptions"
                           :key="userTypeCodeItem.name"
                           :label="userTypeCodeItem.label" :value="userTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="安全教育类型 :" prop="entityType">
              <el-input v-model="formData.entityType" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="安全教育类型 :" prop="entityTypeName">
              <el-input v-model="formData.entityTypeName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="教育内容 :" prop="entityId">
              <el-input v-model="formData.entityId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="教育内容 :" prop="entityName">
              <el-input v-model="formData.entityName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="组织时间 :" prop="organizedDt">
              <el-date-picker v-model="formData.organizedDt" type="datetime" placeholder="选择日期"

                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="组织用户数 :" prop="organizedUserNum">
              <el-input v-model="formData.organizedUserNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="参与用户数 :" prop="participatedUserNum">
              <el-input v-model="formData.participatedUserNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="完成用户数 :" prop="completedUserNum">
              <el-input v-model="formData.completedUserNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="状态 :" prop="entityOrgRuleStatusCode">
              <el-select v-model="formData.entityOrgRuleStatusCode" placeholder="请您选择">
                <el-option v-for="entityOrgRuleStatusCodeItem in entityOrgRuleStatusCodeOptions"
                           :key="entityOrgRuleStatusCodeItem.name"
                           :label="entityOrgRuleStatusCodeItem.label" :value="entityOrgRuleStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="组织用户数 :" prop="organizedUserNum">
              <el-input v-model="formData.organizedUserNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="参与用户数 :" prop="participatedUserNum">
              <el-input v-model="formData.participatedUserNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="完成用户数 :" prop="completedUserNum">
              <el-input v-model="formData.completedUserNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="状态 :" prop="entityOrgRuleStatusCode">
              <el-select v-model="formData.entityOrgRuleStatusCode" placeholder="请您选择">
                <el-option v-for="entityOrgRuleStatusCodeItem in entityOrgRuleStatusCodeOptions"
                           :key="entityOrgRuleStatusCodeItem.name"
                           :label="entityOrgRuleStatusCodeItem.label" :value="entityOrgRuleStatusCodeItem.name">
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
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="schoolForm-rao schoolForm-detail-rao" label-width="165px"
                     :inline="true" :model="formData" size="small">


              <el-col :span="12">
                <el-form-item label="用户类型 :" prop="userTypeCode" :style="{'color':formData.userTypeCodeStr.split(';')[1]}">
                  {{formData.userTypeCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="组织时间 :" prop="organizedDt">
                  {{formData.organizedDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="状态 :" prop="entityOrgRuleStatusCode">
                              <!--:style="{'color':formData.entityOrgRuleStatusCodeStr.split(';')[1]}">-->
                  <!--{{formData.entityOrgRuleStatusCodeStr.split(';')[0]}}-->
                </el-form-item>
              </el-col>

            </el-form>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly">
              <ul>
                <li>
                  <router-link :to="`/safety/listEntityOrganizationUser?entityOrgRuleId=${formData.entityOrgRuleId}`">
                    <img src="~@/assets/img/menu_quickly/icon_classinfo.png"/>安全教育组织用户
                  </router-link>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center">
        <el-button v-if="pageState === 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "./entityorganizationuserruleUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'

  export default {
    data() {
      return {
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        userTypeCodeOptions: [{"label": "全部", "name": ""}], userTypeCode: null,
        entityOrgRuleStatusCodeOptions: [{"label": "全部", "name": ""}], entityOrgRuleStatusCode: null,
        formData: {
          entityOrgRuleId: '',
          organizedUserNum: "",
          participatedUserNum: "",
          completedUserNum: "",
          entityOrgRuleStatusCode: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          belongId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          belongName: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          userTypeCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          entityType: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          entityTypeName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          entityId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          entityName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          organizedDt: [],
          organizedUserNum: [
            {validator: validation.number, trigger: "blur"},

          ],
          participatedUserNum: [
            {validator: validation.number, trigger: "blur"},

          ],
          completedUserNum: [
            {validator: validation.number, trigger: "blur"},

          ],
          entityOrgRuleStatusCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
        }
      }
    },
    computed: {

      pageState() {
        return this.$route.params.type;
      }
    },
    components: {editor, upload},
    created() {
      this.getDetail(this.$route.params.id);
      commonApi.getCodeIntType("userType").then(res => {
        let viewList = res.data.data || [];
        for (let userTypeItem of viewList) {
          this.userTypeCodeOptions.push({
            "label": userTypeItem.codeDesc,
            "name": userTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("entityOrgRuleStatus").then(res => {
        let viewList = res.data.data || [];
        for (let entityOrgRuleStatusItem of viewList) {
          this.entityOrgRuleStatusCodeOptions.push({
            "label": entityOrgRuleStatusItem.codeDesc,
            "name": entityOrgRuleStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
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
          if (this.pageState === 'edit' && valid) {
                this.formLoading = true;
            api.putObj(this.formData).then(res => {

              if (res.data.resultCode === '000000') {
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
          } else if (this.pageState === 'add' && valid) {
                this.formLoading = true;
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode === '000000') {
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
              this.formData = res.data.data;
            }
            this.isLoaded = false;
          }, res => {
            this.$message.error(res.message);
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .menu-quickly {
    width: 186px;
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





  .ml80 {
    margin-left: 80px;
  }


</style>
