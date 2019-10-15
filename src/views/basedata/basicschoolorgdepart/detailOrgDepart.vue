<template>
  <div class="bF5F5F5">
    <el-button v-if="pageState === 'add'" type="primary" class="button-v2-rao b93BF88 mb10">新增部门职位信息</el-button>
                  <el-button v-if="pageState === 'edit'" type="primary" class="button-v2-rao b93BF88 mb10">编辑部门职位信息</el-button>
                  <el-button v-if="pageState === 'detail'" type="primary" class="button-v2-rao b93BF88 mb10">详情部门职位信息</el-button>
    <div class="edit-box bfff">
      <div v-if="pageState == 'add'">

        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="8">
            <el-form-item label="模板部门 :" prop="tempDepartId">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.tempDepartId" placeholder="请您选择">
                <el-option v-for="OrgDepartTempItem in OrgDepartTempList"
                           :key="OrgDepartTempItem.name"
                           :label="OrgDepartTempItem.name" :value="OrgDepartTempItem.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="部门名称 :" prop="departName">
              <el-input class="input-v2-rao" v-model="formData.departName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="上级部门 :" prop="parentId">
              <el-input class="input-v2-rao" v-model="formData.parentId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="上级部门 :" prop="parentName">
              <el-input class="input-v2-rao" v-model="formData.parentName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="描述 :" prop="description">
              <el-input class="input-v2-rao" v-model="formData.description" maxlength="2000"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="部门状态 :" prop="departStatusCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.departStatusCode" placeholder="请您选择">
                <el-option v-for="departStatusCodeItem in departStatusCodeOptions"
                           :key="departStatusCodeItem.name"
                           :label="departStatusCodeItem.label" :value="departStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState == 'edit'">

        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="8">
            <el-form-item label="模板部门 :" prop="tempDepartId">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.tempDepartId" placeholder="请您选择">
                <el-option v-for="OrgDepartTempItem in OrgDepartTempList"
                           :key="OrgDepartTempItem.name"
                           :label="OrgDepartTempItem.name" :value="OrgDepartTempItem.id">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="部门名称 :" prop="departName">
              <el-input class="input-v2-rao" v-model="formData.departName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="上级部门 :" prop="parentId">
              <el-input class="input-v2-rao" v-model="formData.parentId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="上级部门 :" prop="parentName">
              <el-input class="input-v2-rao" v-model="formData.parentName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="描述 :" prop="description">
              <el-input class="input-v2-rao" v-model="formData.description" maxlength="2000"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="序号 :" prop="sequnceNum">
              <el-input class="input-v2-rao" v-model="formData.sequnceNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="8">
            <el-form-item label="部门状态 :" prop="departStatusCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="formData.departStatusCode" placeholder="请您选择">
                <el-option v-for="departStatusCodeItem in departStatusCodeOptions"
                           :key="departStatusCodeItem.name"
                           :label="departStatusCodeItem.label" :value="departStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <div class="clearfix"></div>

        </el-form>
      </div>


      <div v-if="pageState == 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="" label-width="165px"
                     :inline="true" :model="formData" size="small">

              <el-col :span="8">
                <el-form-item label="学校机构 :" prop="schoolOrgName">
                  {{formData.schoolOrgName}}
                </el-form-item>
              </el-col>

              <el-col :span="8" v-if="formData.departName">
                <el-form-item label="部门名称 :" prop="departName">
                  {{formData.departName}}
                </el-form-item>
              </el-col>

            </el-form>
          </el-col>

          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly">
              <ul>
                <li>
                  <router-link href="departId" :to="'/basedata/listOrgPosition?departId='+formData.departId">
                    <img src="~@/assets/img/menu_quickly/icon_classinfo.png"/>学校机构组织部门人员
                  </router-link>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center">
        <el-button type="primary" class="mr80" size="small"
                   @click="goBack">返回
        </el-button>
        <el-button v-if="pageState == 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState == 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import api from "./basicschoolorgdepartUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
import { mapGetters } from 'vuex';

  export default {
    data() {
      return {
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        departStatusCodeOptions: [{"label": "请选择", "name": ""}], departStatusCode: null,
        data: "",
        OrgDepartTempList : [],
        formData: {
          tempDepartId : "",
          departId: '',
          departName: "",
          parentId: "",
          parentName: "",
          description: "",
          sequnceNum: "",
          departStatusCode: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          tempDepartId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          schoolOrgId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          schoolOrgName: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          departName: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          parentId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          parentName: [
            {max: 64, message: "最多能输入64个字", trigger: "blur"},

          ],
          description: [
            {max: 2000, message: "最多能输入2000个字", trigger: "blur"},

          ],
          sequnceNum: [
            {validator: validation.number, trigger: "blur"},

          ],
          departStatusCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
        }
      }
    },
    computed: {
      ...mapGetters(['schoolInfo']),
      pageState() {
        return this.$route.params.type;
      }
    },
    components: {editor, upload},
    created() {
      this.getDetail(this.$route.params.id);
      /*api.orgDepartTemp({
        orgDepartTempId : "1f791961c0a802253aa03c7cf7d4a219"
      }).then(res => {
        this.OrgDepartTempList = res.data.data.children
      }, res => {
        this.$message.error(res.data.message);
      });*/

       commonApi.getCodeIntType("departStatus").then(res => {
        let viewList = res.data.data || [];
        for (let departStatusItem of viewList) {
          this.departStatusCodeOptions.push({
            "label": departStatusItem.codeDesc,
            "name": departStatusItem.codeId
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
        this.formData.schoolOrgId=this.schoolInfo.schoolOrgId;
        this.formData.schoolOrgName=this.schoolInfo.schoolOrgName;
        console.log(this.formData)
        set[formName].validate(valid => {
          if (this.pageState === "edit" && valid) {
            this.formLoading = true;
            api.putObj(this.formData).then(res => {

              if (res.data.resultCode == "000000") {
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
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode == "000000") {
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
      goBack() {
        this.$router.go(-1);
      },

      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode == "000000") {
              this.data = res.data.data;

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
    width: 196px;
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
