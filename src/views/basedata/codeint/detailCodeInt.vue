<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState == 'add'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="edit-form"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="字典类型 *  :" prop="codetypeId">
              <el-input v-model="formData.codetypeId" maxlength="32" disabled></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="字典关键字 *  :" prop="codeId">
              <el-input v-model="formData.codeId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="字典内容 :" prop="codeDesc">
              <el-input v-model="formData.codeDesc" maxlength="66"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="顺序 :" prop="codeSeq">
              <el-input v-model="formData.codeSeq" maxlength="23"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="状态 *  :" prop="status">
              <el-select v-model="formData.status" placeholder="请您选择">
                <el-option v-for="item in ynOptions"
                           :key="item.name"
                           :label="item.label" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <!--<el-col :span="12">-->
          <!--<el-form-item label="开始时间 :" prop="effectiveDt">-->
          <!--<el-date-picker v-model="formData.effectiveDt" type="datetime" placeholder="选择日期"-->
          <!--value-format="yyyy-MM-dd HH:mm"-->
          <!--:picker-options="pickTime"></el-date-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
          <!--<el-form-item label="截止时间 :" prop="expiryDt">-->
          <!--<el-date-picker v-model="formData.expiryDt" type="datetime" placeholder="选择日期"-->
          <!--value-format="yyyy-MM-dd HH:mm"-->
          <!--:picker-options="pickTime"></el-date-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <el-col :span="24">
            <el-form-item label="标示图 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="字体颜色 :" prop="fontColor">
              <el-color-picker size="small" class="theme-picker" popper-class="theme-picker-dropdown"
                               v-model="formData.fontColor"></el-color-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="拓展数据 :" prop="extenda">
              <el-input v-model="formData.extenda" maxlength="50"></el-input>
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


          <el-col :span="12">
            <el-form-item label="字典内容 :" prop="codeDesc">
              <el-input v-model="formData.codeDesc" maxlength="66"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="顺序 :" prop="codeSeq">
              <el-input v-model="formData.codeSeq" maxlength="23"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="状态 *  :" prop="status">
              <el-select v-model="formData.status" placeholder="请您选择">
                <el-option v-for="item in ynOptions"
                           :key="item.name"
                           :label="item.label" :value="item.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="标示图 :" prop="imagePath" class="orgIntroduction">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath" />
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="字体颜色 :" prop="fontColor">
              <el-color-picker size="small" class="theme-picker" popper-class="theme-picker-dropdown"
                               v-model="formData.fontColor"></el-color-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="拓展数据 :" prop="extenda">
              <el-input v-model="formData.extenda" maxlength="50"></el-input>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>
          <!--<div class="mb-20 cursor" @click="xuantianHandler">-->
            <!--选填信息-->
            <!--<img v-if="xuantian" src="~@/assets/img/icon-school-toggle.png" class="vm-1"/>-->
            <!--<img v-if="!xuantian" src="~@/assets/img/icon-school-show.png" class="vm-1"/>-->
            <!--<div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>-->
          <!--</div>-->
          <!--<div v-if="xuantian">-->
            <!--选填信息-->
          <!--</div>-->
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


              <el-col :span="12">
                <el-form-item label="字典关键字 :" prop="expiryDt">
                  {{formData.codeId}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="字典描述 :" prop="expiryDt">
                  {{formData.codeDesc}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="字典类型 :" prop="expiryDt">
                  {{formData.codetypeId}}
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="颜色 :" prop="expiryDt">
                  <div style="width: 40px;height: 25px;" :style="{background:formData.fontColor}"></div>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="标识图 :" prop="imagePath">
                  <div v-if="formData.imagePath">
                    <img :src="formData.imagePath" alt="" width="84px" class="scope-img">
                  </div>
                  <div v-if="!formData.imagePath">暂无数据</div>
                </el-form-item>
              </el-col>
            </el-form>
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
  import api from "./codeintUrl";
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

        imagePathFileList: [],
        imagePathFileType: '',
        data: "",
        ynOptions: [
          {name: "y", label: "启用", imagePath: "/lookupCode/open.gif", fontColor: "red"},
          {name: "n", label: "未启用", imagePath: "/lookupCode/open.gif", fontColor: "red"}],
        formData: {
          codetypeId: this.$route.query.codetypeId,
          codeId: '',
          codeDesc: "",
          codeSeq: "",
          status: "",
          effectiveDt: "",
          expiryDt: "",
          imagePath: "",
          fontColor: "",
          extenda: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          codeDesc: [
            {required: true, message: "请您输入字典描述", trigger: "blur"},
            {max: 66, message: "最多能输入66个字", trigger: "blur"},
          ],
          codeId: [
            {required: true, message: "请您输入字典ID", trigger: "blur"},
            {max: 66, message: "最多能输入66个字", trigger: "blur"},
          ],
          codetypeId: [
            {required: true, message: "请您输入字典分类ID", trigger: "blur"},
            {max: 66, message: "最多能输入66个字", trigger: "blur"},
          ],
          codeSeq: [
            {validator: validation.number, trigger: "blur"},
          ],
          status: [
            {required: true, message: "请您输入状态", trigger: "blur"},
            {max: 1, message: "最多能输入1个字", trigger: "blur"},

          ],
          effectiveDt: [],
          expiryDt: [],
          imagePath: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          fontColor: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          extenda: [
            {max: 50, message: "最多能输入50个字", trigger: "blur"},

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
      if (this.pageState === "add" ) {
        let codetypeId = this.$route.query.codetypeId;
        this.formData.codetypeId = codetypeId;
      }else{
        this.getDetail(this.$route.params.id);
        let codetypeId = this.$route.query.codetypeId;
        this.params.codetypeId = codetypeId;
      }
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
          }
          else if (this.pageState === "add" && valid) {
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
        let codetypeId = this.$route.query.codetypeId
        let obj = {};
        obj.codeId = paramsId;
        obj.codetypeId = codetypeId;
        if (this.pageState !== 'add') {
          api.getObj(obj).then(res => {
            if (res.data.resultCode == "000000") {
              this.data = res.data.data;
              this.formData = this.data;
              this.formData.codeId = this.data.codeId;

              if (this.data.imagePath != "" && this.data.imagePath != null) {
                var imagePathFileInfo = {
                  "name": this.data.imagePath,
                  "url": this.data.imagePath
                };
                this.imagePathFileList.push(imagePathFileInfo);
              }
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
