<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="隐患标题 *  :" prop="dangerTitle">
              <el-input class="input-v2-rao" v-model="formData.dangerTitle"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="隐患描述 *  :" prop="content"
                          class="orgIntroduction">
              <editor v-model="formData.content" :true-height="350"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="上报时间 :" prop="effectiveDt">
              <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="隐患类型 :" prop="dangerTypeCode">
              <el-select class="select-v2-rao" v-model="formData.dangerTypeCode" placeholder="请您选择">
                <el-option v-for="dangerTypeCodeItem in dangerTypeCodeOptions"
                           :key="dangerTypeCodeItem.name"
                           :label="dangerTypeCodeItem.label" :value="dangerTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="隐患级别 :" prop="dangerLevelCode">
              <el-select class="select-v2-rao" v-model="formData.dangerLevelCode" placeholder="请您选择">
                <el-option v-for="dangerLevelCodeItem in dangerLevelCodeOptions"
                           :key="dangerLevelCodeItem.name"
                           :label="dangerLevelCodeItem.label" :value="dangerLevelCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="巡检点 :" prop="happenedPlaceId">
              <el-input class="input-v2-rao" v-model="formData.happenedPlaceId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="巡检点 :" prop="happenedPlaceName">
              <el-input class="input-v2-rao" v-model="formData.happenedPlaceName"
                        maxlength="64"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="隐患标题 *  :" prop="dangerTitle">
              <el-input class="input-v2-rao" v-model="formData.dangerTitle"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="隐患描述 *  :" prop="content"
                          class="orgIntroduction">
              <editor v-model="formData.content" :true-height="350"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="上报时间 :" prop="effectiveDt">
              <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="隐患类型 :" prop="dangerTypeCode">
              <el-select class="select-v2-rao" v-model="formData.dangerTypeCode" placeholder="请您选择">
                <el-option v-for="dangerTypeCodeItem in dangerTypeCodeOptions"
                           :key="dangerTypeCodeItem.name"
                           :label="dangerTypeCodeItem.label" :value="dangerTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="隐患级别 :" prop="dangerLevelCode">
              <el-select class="select-v2-rao" v-model="formData.dangerLevelCode" placeholder="请您选择">
                <el-option v-for="dangerLevelCodeItem in dangerLevelCodeOptions"
                           :key="dangerLevelCodeItem.name"
                           :label="dangerLevelCodeItem.label" :value="dangerLevelCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="隐患状态 :" prop="dangerStatusCode">
              <el-select class="select-v2-rao" v-model="formData.dangerStatusCode" placeholder="请您选择">
                <el-option v-for="dangerStatusCodeItem in dangerStatusCodeOptions"
                           :key="dangerStatusCodeItem.name"
                           :label="dangerStatusCodeItem.label" :value="dangerStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col style="display: flex;justify-content: flex-end; margin-bottom: 30px;">
            <el-button size="small" type="primary" @click="$router.push(`/safety/listSecurityDangerProcessV2?dangerId=${formData.dangerId}&dangerTitle=${formData.dangerTitle}`)">隐患处理 ({{`${formData.processNum}`}})</el-button>
          </el-col>
          <el-col>

            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <div class="detail-title-v2 ">
                  问题名称
                </div>
                <div class="detail-item-v2">
                  <div class="p33">
                    <el-form-item label="隐患状态 :" prop="dangerTitle">
                      <span v-if="formData.dangerTitle">{{formData.dangerTitle}}</span>
                    </el-form-item>
                  </div>

                  <div class="p33">
                    <el-form-item label="报告对象 :" prop="content">
                      <span v-if="formData.acceptedUserName" v-html="formData.acceptedUserName"></span>
                    </el-form-item>
                  </div>


                  <!--<div class="p33">-->
                    <!--<el-form-item label="处理截止时间 :" prop="expiryDt">-->
                      <!--<span v-if="formData.expiryDt"> {{formData.expiryDt}}</span>-->
                    <!--</el-form-item>-->
                  <!--</div>-->
                  <div class="p33">
                    <el-form-item label="类型 :" prop="dangerTypeCode">
                            <span v-if="formData.dangerTypeCodeStr"
                                  :style="{'color':formData.dangerTypeCodeStr.split(';')[1]}">{{formData.dangerTypeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>

                  <div class="p33">
                    <el-form-item label="隐患级别 :" prop="dangerLevelCode" v-if="formData.dangerLevelCodeStr">
                            <span v-if="formData.dangerLevelCodeStr"
                                  :style="{'color':formData.dangerLevelCodeStr.split(';')[1]}">{{formData.dangerLevelCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p33">
                    <el-form-item label="上报时间 :" prop="effectiveDt">
                      <span v-if="formData.effectiveDt"> {{formData.effectiveDt}}</span>
                    </el-form-item>
                  </div>
                  <!--<div class="p33" v-if="formData.happenedPlaceName">-->
                    <!--<el-form-item label="巡检点 :" prop="happenedPlaceName">-->
                      <!--<span v-if="formData.happenedPlaceName">{{formData.happenedPlaceName}}</span>-->
                    <!--</el-form-item>-->
                  <!--</div>-->
                  <!--<div class="p33" v-if="formData.acceptedUserName">-->
                    <!--<el-form-item label="接收人 :" prop="acceptedUserName">-->
                      <!--<span v-if="formData.acceptedUserName">{{formData.acceptedUserName}}</span>-->
                    <!--</el-form-item>-->
                  <!--</div>-->
                </div>
              </div>
              <div class="p100">
                <div class="detail-title-v2 ">
                  问题描述
                </div>
                <div class="detail-item-v2">
                  <div>{{formData.content}}</div>
                </div>
              </div>
              <div class="p100">
                <div class="detail-title-v2 ">
                  现场图片
                </div>
                <div class="detail-item-v2">
                  <img style="width: 200px;" v-if="formData.imagePathList" v-preview :src="item" :alt="item" v-for="(item,index) of formData.imagePathList" :key="index">
                  <img style="width: 200px;" :src="formData.imagePath" v-preview :alt="item"  :key="index">
                </div>
              </div>
            </el-form>
          </el-col>

          <!--<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">-->
            <!--<div class="menu-quickly">-->
              <!--<ul>-->
                <!--<li>-->
                  <!--<router-link :to="`/basedata/listSecurityDangerProcess?dangerId=`+-->
                                  <!--formData.dangerId">-->
                    <!--<i class="iconfont icon-icon_liebiao"></i>安全隐患处理-->
                  <!--</router-link>-->
                <!--</li>-->
              <!--</ul>-->
            <!--</div>-->
          <!--</el-col>-->
        </el-row>
      </div>

      <div class="text-center mt-30">
        <el-button v-if="pageState === 'edit'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
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
import api from './schoolsecuritydangerUrl'
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

      dangerTypeCodeOptions: [{'label': '全部', 'name': ''}], dangerTypeCode: null,
      dangerLevelCodeOptions: [{'label': '全部', 'name': ''}], dangerLevelCode: null,
      dangerStatusCodeOptions: [{'label': '全部', 'name': ''}], dangerStatusCode: null,
      formData: {
        dangerId: '',
        dangerTitle: '',
        content: '',
        effectiveDt: '',
        dangerTypeCode: '',
        dangerLevelCode: '',
        dangerStatusCode: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        dangerTitle:
          [
            {required: true, message: '请您输入隐患标题', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        content:
          [
            {required: true, message: '请您输入隐患描述', trigger: 'blur'},
            {max: 2000, message: '最多能输入2000个字', trigger: 'blur'},

          ],
        effectiveDt:
          [],
        dangerTypeCode:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        dangerLevelCode:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        happenedPlaceId:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        happenedPlaceName:
          [
            {max: 64, message: '最多能输入64个字', trigger: 'blur'},

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
    commonApi.getCodeIntType('dangerType').then(res => {
      let viewList = res.data.data || []
      for (let dangerTypeItem of viewList) {
        this.dangerTypeCodeOptions.push({
          'label': dangerTypeItem.codeDesc,
          'name': dangerTypeItem.codeId
        })
      }
    })
    commonApi.getCodeIntType('dangerLevel').then(res => {
      let viewList = res.data.data || []
      for (let dangerLevelItem of viewList) {
        this.dangerLevelCodeOptions.push({
          'label': dangerLevelItem.codeDesc,
          'name': dangerLevelItem.codeId
        })
      }
    })
    commonApi.getCodeIntType('dangerStatus').then(res => {
      let viewList = res.data.data || []
      for (let dangerStatusItem of viewList) {
        this.dangerStatusCodeOptions.push({
          'label': dangerStatusItem.codeDesc,
          'name': dangerStatusItem.codeId
        })
      }
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
              this.$message.error(res.data.message)
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
      margin-right: 0;
      color: #707070;
      font-size: 14px;
    }

    .detail-item-v2 {
      display: flex;
      flex-wrap: wrap;
      padding: 25px;
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
