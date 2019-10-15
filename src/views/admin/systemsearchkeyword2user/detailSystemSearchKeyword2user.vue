<template>
  <div>
    <div class="edit-box">

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

              <el-col :span="12" v-if="formData.keyword">
                <el-form-item label="搜索关键字 :" prop="keyword">
                  {{formData.keyword}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.userName">
                <el-form-item label="用户 :" prop="userName">
                  {{formData.userName}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.usedTimes">
                <el-form-item label="使用次数 :" prop="usedTimes">
                  {{formData.usedTimes}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.recentUsedDt">
                <el-form-item label="使用时间 :" prop="recentUsedDt">
                  {{formData.recentUsedDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.isRecentUsedHad">
                <el-form-item label="是否有结果 :" prop="isRecentUsedHad">
                  <el-switch v-model="formData.isRecentUsedHad == 'Y'" disabled></el-switch>
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.entityName">
                <el-form-item label="信息类型 :" prop="entityName">
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
        <el-button type="primary" class="mr80" size="small"
                   @click="goBack">返回
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import api from "./systemsearchkeyword2userUrl";
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

        ynOptions: [{"label": "全部", "name": ""}], isRecentUsedHad: null,
        formData: {
          keyword2userId: '',
          usedTimes: "",
          recentUsedDt: "",
          isRecentUsedHad: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          keyword: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          userId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          userName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          usedTimes: [
            {validator: validation.number, trigger: "blur"},

          ],
          recentUsedDt: [],
          isRecentUsedHad: [
            {max: 2, message: "最多能输入2个字", trigger: "blur"},

          ],
          entityType: [
            {max: 128, message: "最多能输入128个字", trigger: "blur"},

          ],
          entityName: [
            {max: 128, message: "最多能输入128个字", trigger: "blur"},

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
      commonApi.getCodeIntType("boolean_yn").then(res => {
        let viewList = res.data.data || [];
        for (let ynItem of viewList) {
          this.ynOptions.push({
            "label": ynItem.codeDesc,
            "name": ynItem.codeId
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

              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
                ()
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
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
                ()
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


              this.formData.recentUsedDt = this.data.recentUsedDt;


            }
            this.isLoaded = false;
          }, res => {
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





  .ml80 {
    margin-left: 80px;
  }

  .width100 {
    width: 100%;
  }

  .form-table {
    margin-top: 20px;
  }

  .bm-view {
    width: 760px;
    height: 300px;
    margin-top: 10px;
  }
</style>
