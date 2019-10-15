<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'" class='mh500'>
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="统计 *  :" prop="jobKey">
              <el-input v-model="formData.jobKey" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="结果key *  :" prop="resultKey">
              <el-input v-model="formData.resultKey" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="VAL :" prop="value1">
              <el-input v-model="formData.value1" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="VAL :" prop="value2">
              <el-input v-model="formData.value2" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="VAL :" prop="value3">
              <el-input v-model="formData.value3" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="VAL :" prop="value4">
              <el-input v-model="formData.value4" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="VAL :" prop="value5">
              <el-input v-model="formData.value5" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="VAL :" prop="value6">
              <el-input v-model="formData.value6" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="VAL :" prop="value7">
              <el-input v-model="formData.value7" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="VAL :" prop="value8">
              <el-input v-model="formData.value8" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="VAL :" prop="value9">
              <el-input v-model="formData.value9" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="VAL :" prop="value10">
              <el-input v-model="formData.value10" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="执行时间 *  :" prop="performedDt">
              <el-date-picker v-model="formData.performedDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="状态 :" prop="statisticsResultsStatusCode">
              <el-select v-model="formData.statisticsResultsStatusCode" placeholder="请您选择">
                <el-option v-for="statisticsResultsStatusCodeItem in statisticsResultsStatusCodeOptions"
                           :key="statisticsResultsStatusCodeItem.name"
                           :label="statisticsResultsStatusCodeItem.label" :value="statisticsResultsStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="序号 :" prop="sequnceNum">
              <el-input v-model="formData.sequnceNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="值key :" prop="valueKey">
              <el-input v-model="formData.valueKey" maxlength="255"></el-input>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>


      <div v-if="pageState === 'detail'" class='mh500'>
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="schoolForm-rao schoolForm-detail-rao" label-width="165px"
                     :inline="true" :model="formData" size="small">


              <el-col :span="12" v-if="formData.valueKey">
                <el-form-item label="值key :" prop="valueKey">
                  {{formData.valueKey}}
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
  import api from "./statisticsresultsUrl";
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

        statisticsResultsStatusCodeOptions: [{"label": "全部", "name": ""}], statisticsResultsStatusCode: null,
        formData: {
          jobKey: this.$route.params.id,
          resultKey: this.$route.params.id,
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          value1: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          value2: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          value3: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          value4: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          value5: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          value6: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          value7: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          value8: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          value9: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          value10: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          performedDt: [
            {required: true, message: "请您输入执行时间", trigger: "blur"},

          ],
          statisticsResultsStatusCode: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          sequnceNum: [
            {validator: validation.number, trigger: "blur"},

          ],
          valueKey: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

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
      commonApi.getCodeIntType("statisticsResultsStatus").then(res => {
        let viewList = res.data.data || [] || [];
        for (let statisticsResultsStatusItem of viewList) {
          this.statisticsResultsStatusCodeOptions.push({
            "label": statisticsResultsStatusItem.codeDesc,
            "name": statisticsResultsStatusItem.codeId
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
          if (this.pageState === "edit" && valid) {
        this.formLoading = true;
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
                this.formLoading = true;
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
          api.getObj(paramsId,this.$route.params.resultKey).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
              this.formData.performedDt = this.data.performedDt;
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
