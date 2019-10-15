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
            <el-form-item label="模板内容 *  :" prop="textId">
              <el-input v-model="formData.textId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="内容标题 :" prop="textLabel">
              <el-input v-model="formData.textLabel" maxlength="100"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="类型（头 底） *  :" prop="textType">
              <!--<el-input v-model="formData.textType" maxlength="1"></el-input>-->
              <el-select v-model="formData.textType">
                <el-option v-for="item in TypeCodeOptions" :label="item.label" :value="item.name" :key="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24" class="orgIntroduction">
            <el-form-item label="内容 :" prop="textContent">
              <editor v-model="formData.textContent" :true-height="350"></editor>
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
            <el-form-item label="模板内容 *  :" prop="textId">
              <el-input v-model="formData.textId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="内容标题 :" prop="textLabel">
              <el-input v-model="formData.textLabel" maxlength="100"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="类型（头 底） *  :" prop="textType">
              <!--<el-input v-model="formData.textType" maxlength="1"></el-input>-->
              <el-select v-model="formData.textType">
                <el-option v-for="item in TypeCodeOptions" :label="item.label" :value="item.name" :key="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24" class="orgIntroduction">
            <el-form-item label="内容 :" prop="textContent">
              <editor v-model="formData.textContent" :true-height="350"></editor>
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
            <el-form :label-position="'right'" class=" schoolForm-detail-rao" label-width="165px"
                     ref="formData" :inline="true" :model="formData" :rules="rules" size="small">

              <el-col :span="12" v-if="data.textLabel">
                <el-form-item label="内容标题 :" prop="textLabel">
                  {{data.textLabel}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="data.textType">
                <el-form-item label="类型（头 底） :" prop="textType">
                  <div v-if="data.textType==='H'">头部</div>
                  <div v-else>底部</div>
                </el-form-item>
              </el-col>

              <div style="width: 100%;float: left;">
                <label class="el-form-item__label" style="width: 165px;">内容 :</label>
              </div>
              <div class="el-form-item__content" style="padding-left: 175px">
                <div v-html="data.textContent"></div>
              </div>

              <!--<el-col :span="24" v-if="data.textContent" class="orgIntroduction">-->
                <!--<el-form-item label="内容 :" prop="textContent">-->
                  <!--<div v-html="data.textContent"></div>-->
                <!--</el-form-item>-->
              <!--</el-col>-->

            </el-form>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">

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
  import api from "./messagetptxtUrl";
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
        data: "",
        TypeCodeOptions: [{"label": "头部", "name": "H"},{"label": "底部", "name": "F"},], topTypeCode: null,
        formData: {
          textId: "",
          textLabel: "",
          textType: "",
          textContent: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          textLabel: [
            {max: 100, message: "只能输入100个字", trigger: "blur"},
          ],
          textType: [
            {max: 1, message: "只能输入1个字", trigger: "blur"},
            {required: true, message: "请您输入类型（头 底）", trigger: "blur"},
          ],
          textContent: [
            {max: 1000, message: "只能输入1000个字", trigger: "blur"},
          ],
        }
      }
    },
    computed: {

      pageState() {
        return this.$route.params.type;
      }
    },
    components: {editor},
    created() {
      this.getDetail(this.$route.params.id);
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
                this.$message.success("添加成功");
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
              this.formData.textId = this.data.textId;
              this.formData.textLabel = this.data.textLabel;
              this.formData.textType = this.data.textType;
              this.formData.textContent = this.data.textContent;
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





  .ml80 {
    margin-left: 80px;
  }


</style>
