<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState == 'add'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="24">
            <el-form-item label="字典类型 *  :" prop="codetypeId">
              <el-input v-model="formData.codetypeId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="字典类型描述 :" prop="codetypeDesc">
              <el-input v-model="formData.codetypeDesc" maxlength="66"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="只读 :" prop="readOnly">
              <el-select v-model="formData.readOnly" placeholder="请您选择">
                <el-option v-for="item in ynOptions"
                           :key="item.name"
                           :label="item.label" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState == 'edit'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="edit-form"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="24">
            <el-form-item label="字典类型描述 :" prop="codetypeDesc">
              <el-input v-model="formData.codetypeDesc" maxlength="66"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="只读 :" prop="readOnly">
              <el-select v-model="formData.readOnly" placeholder="请您选择">
                <el-option v-for="item in ynOptions"
                           :key="item.name"
                           :label="item.label" :value="item.name">
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
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="edit-form" label-width="165px"
                     :inline="true" :model="formData" size="small">
              <el-col :span="24" v-if="formData.codetypeDesc">
                <el-form-item label="字典描述 :" prop="codetypeDesc" class="orgIntroduction">
                  {{formData.codetypeDesc}}
                </el-form-item>
              </el-col>
              <el-col :span="24" v-if="formData.codetypeId">
                <el-form-item label="字典ID :" prop="codetypeId">
                  {{formData.codetypeId}}
                </el-form-item>
              </el-col>

            </el-form>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly">
              <ul>
                <li>
                  <router-link :to="'/basedata/listCodeInt?codetypeId='+formData.codetypeId">
                    <img src="~@/assets/img/menu_quickly/icon_classinfo.png"/>字典数据
                  </router-link>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center">
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
  import api from "./codetypeUrl";
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
        ynOptions: [{name: "y", label: "是", imagePath: "/lookupCode/open.gif", fontColor: "red"},
          {name: "n", label: "否", imagePath: "/lookupCode/open.gif", fontColor: "red"}],
        data: "",
        formData: {
          codetypeId: '',
          codetypeDesc: "",
          readOnly: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          codetypeDesc: [
            {max: 66, message: "最多能输入66个字", trigger: "blur"},

          ],
          codetypeId: [
            {required: true, message: '请输入字典类型ID', trigger: 'blur' },
            {max: 66, validator: validation.codeTpyec, trigger: 'blur'},

          ],
          readOnly: [
            {max: 1, message: "最多能输入1个字", trigger: "blur"},

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






  .ml80 {
    margin-left: 80px;
  }


</style>
