<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="安全巡检计划 :" prop="checkPlanId">
              <el-input class="input-v2-rao" v-model="formData.checkPlanId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="安全巡检计划 :" prop="checkPlanName">
              <el-input class="input-v2-rao" v-model="formData.checkPlanName" maxlength="128"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="巡检点 :" prop="placeId">
              <el-input class="input-v2-rao" v-model="formData.placeId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="巡检点 :" prop="placeName">
              <el-input class="input-v2-rao" v-model="formData.placeName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="巡检时间 :" prop="checkedDt">
              <el-date-picker class="date-v2-rao" v-model="formData.checkedDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="是否异常 :" prop="isException">
              <el-select class="select-v2-rao" v-model="formData.isException" placeholder="请您选择">
                <el-option v-for="isExceptionItem in ynOptions" :key="isExceptionItem.name"
                           :label="isExceptionItem.label" :value="isExceptionItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="内容 :" prop="remark">
              <el-input class="input-v2-rao" v-model="formData.remark" maxlength="512"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="图片 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="学校 :" prop="schoolId">
              <el-input class="input-v2-rao" v-model="formData.schoolId" maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="学校 :" prop="schoolName">
              <el-input class="input-v2-rao" v-model="formData.schoolName" maxlength="32"></el-input>
            </el-form-item>
          </el-col>

        </el-form>
      </div>

      <div v-if="pageState === 'edit'">

        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="24">
            <el-form-item label="是否异常 :" prop="isException">
              <el-select class="select-v2-rao" v-model="formData.isException" placeholder="请您选择">
                <el-option v-for="isExceptionItem in ynOptions" :key="isExceptionItem.name"
                           :label="isExceptionItem.label" :value="isExceptionItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="内容 :" prop="remark">
              <el-input class="input-v2-rao" v-model="formData.remark" maxlength="512"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="图片 :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>


        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small">
              <div class="p100">
                <div class="detail-title-v2 ">
                  巡检信息
                </div>
                <div class="detail-item-v2">

                  <div class="p25">
                    <el-form-item label="学校 :" prop="checkPlanName">
                      <span v-if="formData.schoolName">{{formData.schoolName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p25">
                    <el-form-item label="日期 :" prop="checkedDt">
                      <span v-if="formData.checkedDt"> {{formData.checkedDt}}</span>
                    </el-form-item>
                  </div>

                  <div class="p25">
                    <el-form-item label="巡检线路 :" prop="checkPlanName">
                      <span v-if="formData.checkPlanName">{{formData.checkPlanName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p25">
                    <el-form-item label="巡检点 :" prop="placeName">
                      <span v-if="formData.placeName">{{formData.placeName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p25">
                    <el-form-item label="巡检人 :" prop="checkedUserName">
                      <span v-if="formData.checkedUserName">{{formData.checkedUserName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p25">
                    <el-form-item label="巡检时间 :" prop="checkedUserName">
                      <span v-if="formData.checkedUserName">{{formData.checkedUserName}}</span>
                    </el-form-item>
                  </div>


                  <div class="p25">
                    <el-form-item label="巡检状态 :" prop="isException">
                      <!--<el-switch v-model="formData.isException == 'Y'" disabled></el-switch>-->
                      <span>{{formData.resultStatusCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>


                  <div class="p25" v-if="formData.dangerTypeCodeStr">
                    <el-form-item label="异常类型 :" prop="isException">
                      <!--<el-switch v-model="formData.isException == 'Y'" disabled></el-switch>-->
                      <span :style="{color: formData.dangerTypeCodeStr.split(';')[1]}">{{formData.dangerTypeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <!---->
                  <!--<div class="p25" v-if="formData.remark">-->
                  <!--<el-form-item label="报告对象 :" prop="remark">-->
                  <!--<span v-if="formData.remark">{{formData.remark}}</span>-->
                  <!--</el-form-item>-->
                  <!--</div>-->


                </div>
              </div>
              <div class="p100">
                <div class="detail-title-v2 ">
                  巡检描述
                </div>
                <div class="detail-item-v2">

                  <div class="p100">
                    <div>{{formData.content}}</div>
                  </div>
                </div>
              </div>
              <div class="p100 ">
                <div class="detail-title-v2 ">
                  巡检图片
                  <!--<span class="f12">（最多只能上传3张图片，图片大小不得超过 2M，支持jpg/png格式）</span>-->
                </div>
                <div class="detail-item-v2">
                  <div class="p100" v-if="formData.imagePathList">
                      <img :src="formData.imagePath" alt="" width="200px" height="200px" v-if="formData.imagePath" v-preview>
                    <div v-for="it in formData.imagePathList.split(',')" >
                      <img :src="it" alt="" width="200px" height="200px" v-preview>
                    </div>
                  </div>
                </div>
              </div>
            </el-form>
          </el-col>

        </el-row>
      </div>

      <div class="text-center mt-30">
        <el-button v-if="pageState === 'edit'" type="primary" class="fush-btn button-v2-rao b93BF88" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88" :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="small"
                   @click="goBack">返回
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
import api from './schoolsecuritycheckresultUrl'
import validation from '@/util/validate2'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import upload from '@/components/upload/uploadFileV1'
import uploads from '@/components/upload/uploadFile'
import preview from "@/util/preview";

export default {
  directives:{preview},
  components: {editor, upload, uploads},
  data () {
    return {
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      ynOptions: [{'label': '全部', 'name': ''}], isException: null,
      imagePathFileList: [],
      imagePathFileType: '',
      formData: {
        checkResultId: '',
        isException: '',
        remark: '',
        imagePath: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        checkPlanId: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        checkPlanName: [
          {max: 128, message: '最多能输入128个字', trigger: 'blur'},

        ],
        placeId: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        placeName: [
          {max: 64, message: '最多能输入64个字', trigger: 'blur'},

        ],
        checkedDt: [],
        isException: [
          {max: 2, message: '最多能输入2个字', trigger: 'blur'},

        ],
        remark: [
          {max: 512, message: '最多能输入512个字', trigger: 'blur'},

        ],
        imagePath: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        schoolId: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        schoolName: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
      }
    }
  },
  computed: {

    pageState () {
      return this.$route.params.type
    }
  },
  created () {
    this.getDetail(this.$route.params.id)
    commonApi.getCodeIntType('boolean_yn').then(res => {
      let viewList = res.data.data || []
      for (let ynItem of viewList) {
        this.ynOptions.push({
          'label': ynItem.codeDesc,
          'name': ynItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
  },
  methods: {

    submit (formName) {
      const set = this.$refs
      this.isLoaded = true
      set[formName].validate(valid => {
        if (this.pageState === 'edit' && valid) {
          this.formLoading = true

          api.putObj(this.formData).then(res => {

            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('修改成功')
              this.goBack()
            } else {
              //this.$message.error(res.data.message);
              this.formLoading = false
            }
          })
        } else if (this.pageState === 'add' && valid) {
          this.formLoading = true

          api.addObj(this.formData).then(res => {
            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('修改成功')
              this.goBack()
            } else {
              this.$message.error(res.data.message)
              this.formLoading = false
            }
          })
        }
      })
      this.isLoaded = false

    },


    //获取图片上传信息
    uploadData (res) {
      this.formData.imagePath = res
    },


    getDetail (paramsId) {
      if (this.pageState !== 'add') {
        api.getObj(paramsId).then(res => {
          if (res.data.resultCode === '000000') {
            this.formData = res.data.data
          }
          this.isLoaded = false
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
  .edit-box {
    padding: 40px;
    width: auto;

    .detail-title-v2 {
      background: #f5f5f5;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
      padding-left: 12px;
      color: #707070;
      font-size: 14px;
    }

    .detail-item-v2 {
      display: flex;
      flex-wrap: wrap;
      padding: 25px 25px 0 25px;
    }
  }



  .bm-view {
    width: 640px;
    height: 300px;
    margin-top: 10px;
  }

  .fush-btn {
    margin: 0 15px
  }
</style>
