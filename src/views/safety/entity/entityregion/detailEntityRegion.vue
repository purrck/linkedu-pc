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
            <el-form-item label="区域类型 :" prop="regionTypeCode">
              <el-select v-model="formData.regionTypeCode" placeholder="请您选择">
                <el-option v-for="regionTypeCodeItem in regionTypeCodeOptions"
                           :key="regionTypeCodeItem.name"
                           :label="regionTypeCodeItem.label" :value="regionTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="区域编号 :" prop="regionNums">
              <el-input v-model="formData.regionNums" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="区域 :" prop="regionCnName">
              <el-input v-model="formData.regionCnName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="区域英文名 :" prop="regionEnName">
              <el-input v-model="formData.regionEnName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="实体 :" prop="entityId">
              <el-input v-model="formData.entityId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="实体类型 :" prop="entityType">
              <el-input v-model="formData.entityType" maxlength="32"></el-input>
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

              <el-col :span="12" v-if="formData.regionTypeCodeStr">
                <el-form-item label="区域类型 :" prop="regionTypeCode">
                  {{formData.regionTypeCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="formData.regionTypeCode">
                <el-form-item label="区域编号 :" prop="regionTypeCode">
                  {{formData.regionTypeCode}}
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="formData.regionCnName">
                <el-form-item label="区域 :" prop="regionTypeCode">
                  {{formData.regionCnName}}
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="formData.sequnceNum">
                <el-form-item label="序号 :" prop="regionTypeCode">
                  {{formData.sequnceNum}}
                </el-form-item>
              </el-col>
              <el-col :span="12" v-if="formData.entityName">
                <el-form-item label="实体 :" prop="regionTypeCode">
                  {{formData.entityName}}
                </el-form-item>
              </el-col>


            </el-form>
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
  import api from "./entityregionUrl";
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

        regionTypeCodeOptions: [{"label": "全部", "name": ""}], regionTypeCode: null,
        data: "",
        formData: {
          regionId: '',
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          regionTypeCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          regionNums: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          regionCnName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          regionEnName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          entityId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          entityType: [
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
       commonApi.getCodeIntType("regionType").then(res => {
        let viewList = res.data.data || [];
        for (let regionTypeItem of viewList) {
          this.regionTypeCodeOptions.push({
            "label": regionTypeItem.codeDesc,
            "name": regionTypeItem.codeId
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
            if (res.data.resultCode === '000000') {
              this.data = res.data.data;
              this.formData = res.data.data;
              this.formData.version = this.data.version;
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






  .ml80 {
    margin-left: 80px;
  }


</style>
