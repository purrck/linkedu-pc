<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" size="small">

          <el-col :span="24">
            <el-form-item label="学校 :" prop="schoolOrgName">
              <el-select v-model="formData.schoolOrgId" placeholder="请选择学校" @change="schoolChange">
                <el-option
                  v-for="item in optionsList1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="学级 :" prop="">
              <el-select v-model="formData.segmentId" placeholder="请选择学段" @change="segmentChange">
                <el-option
                  v-for="item in optionsList3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="formData.gradeId" placeholder="请选择年级">
                <el-option
                  v-for="item in optionsList4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="年次 :" prop="">
              <el-select v-model="formData.schoolYearStart" placeholder="开始年次">
                <el-option
                  v-for="(item,index) of yearList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select v-model="formData.schoolYearEnd" placeholder="结束年次">
                <el-option
                  v-for="(item,index) of yearList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="学期 :" prop="schoolTerm">
              <el-select v-model="formData.schoolTerm" placeholder="请选择学期">
                <el-option
                  v-for="(item ,index) of optionsList2"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>




          <el-col :span="24">
            <el-form-item label="类型 :" prop="type">
              <el-select v-model="formData.calendarTypeCode" placeholder="请选择类型">
                <el-option
                  v-for="item in optionsList5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="开始日期 :" prop="effectiveDt">
              <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>

            <el-form-item label="截止日期 :" prop="expiryDt">
              <el-date-picker class="date-v2-rao" v-model="formData.expiryDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>


        </el-form>
      </div>

      <div v-if="pageState === 'edit'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" size="small">

          <el-col :span="24">
            <el-form-item label="学校 :" prop="schoolOrgName">
              <el-select disabled v-model="formData.schoolOrgId" placeholder="请选择学校">
                <el-option
                  v-for="item in optionsList1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="年次 :" prop="">
              <el-select disabled v-model="formData.schoolYearStart" placeholder="开始年次">
                <el-option
                  v-for="(item,index) of yearList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select disabled v-model="formData.schoolYearEnd" placeholder="结束年次">
                <el-option
                  v-for="(item,index) of yearList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="学期 :" prop="schoolTerm">
              <el-select disabled v-model="formData.schoolTerm" placeholder="请选择学期">
                <el-option
                  v-for="item in optionsList2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="学级 :" prop="">
              <el-select disabled v-model="formData.segmentId" placeholder="请选择学段" @change="segmentChange">
                <el-option
                  v-for="item in optionsList3"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
              <el-select disabled v-model="formData.gradeId" placeholder="请选择年级">
                <el-option
                  v-for="item in optionsList4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="类型 :" prop="type">
              <el-select v-model="formData.calendarTypeCode" placeholder="请选择类型">
                <el-option
                  v-for="item in optionsList5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="开始日期 :" prop="effectiveDt">
              <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm">
                <!--:picker-options="pickTime"-->
              </el-date-picker>
            </el-form-item>

            <el-form-item label="截止日期 :" prop="expiryDt">
              <el-date-picker disabled class="date-v2-rao" v-model="formData.expiryDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                             >
              </el-date-picker>
            </el-form-item>
          </el-col>


        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="24" :sm="24" :md="24" :lg="24" :xl="24">

            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <div class="detail-title-v2 ">
                  {{formData.schoolOrgName}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50">
                    <el-form-item label="开始日期 :" prop="effectiveDt">
                      <span v-if="formData.effectiveDt"> {{formData.effectiveDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="截止日期 :" prop="expiryDt">
                      <span v-if="formData.expiryDt"> {{formData.expiryDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.weekSchoolYear">
                    <el-form-item label="学年周次 :" prop="weekSchoolYear">
                      <span v-if="formData.weekSchoolYear">{{formData.weekSchoolYear}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.weekSchoolTerm">
                    <el-form-item label="学期周次 :" prop="weekSchoolTerm">
                      <span v-if="formData.weekSchoolTerm">{{formData.weekSchoolTerm}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="安排类型 :" prop="calendarTypeCode">
                            <span v-if="formData.calendarTypeCodeStr"
                                  :style="{'color':formData.calendarTypeCodeStr.split(';')[1]}">{{formData.calendarTypeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="状态 :" prop="calendarStatusCode">
                            <span v-if="formData.calendarStatusCodeStr"
                                  :style="{'color':formData.calendarStatusCodeStr.split(';')[1]}">{{formData.calendarStatusCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.description">
                    <el-form-item label="描述 :" prop="description">
                      <span v-if="formData.description" v-html="formData.description"></span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.sequnceNum">
                    <el-form-item label="序号 :" prop="sequnceNum">
                      <span v-if="formData.sequnceNum">{{formData.sequnceNum}}</span>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form>
          </el-col>

          <!--<el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">-->
            <!--<div class="menu-quickly">-->
              <!--<ul>-->
                <!--<li>-->
                  <!--<router-link :to="`/basedata/listOrgSchoolCalendarDetail?calendarId=`+-->
                                  <!--formData.calendarId">-->
                    <!--<i class="iconfont icon-icon_liebiao"></i>机构校历详细安排-->
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
import api from './orgschoolcalendarUrl'
import validation from '@/util/validate2'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import upload from '@/components/upload/uploadFileV1'
import uploads from '@/components/upload/uploadFile'
import {coverData} from '@/util/util'

export default {
  components: {editor, upload, uploads},
  data () {
    return {
      yearList:[
      ],
      optionsSelectData: [],
      pickerOptions2: {
        shortcuts: [{
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近六个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 180)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近十二个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 360)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      optionsList1: [
        {label: '硕希望实验小学', value: '580df6d6c0a802137a30f614fcb1d90d'}
      ],
      optionsList2: [
        {label: '第一学期', value: '1'},
        {label: '第二学期', value: '2'}
      ],
      optionsList3: [],
      optionsList4: [],
      optionsList5: [],
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      calendarTypeCodeOptions: [{'label': '全部', 'name': ''}], calendarTypeCode: null,
      calendarStatusCodeOptions: [{'label': '全部', 'name': ''}], calendarStatusCode: null,
      ynOptions: [{'label': '全部', 'name': ''}], isCurrent: null,
      formData: {
        schoolTerm: '',
        calendarTypeCodeStr: '',
        schoolYearStart: '',
        schoolYearEnd: '',
        gradeId: '',
        schoolOrgName: '',
        schoolOrgId: '',
        years: '',
        semester: '',
        section: '',
        grade: '',
        type: '',
        calendarId: '',
        effectiveDt: '',
        expiryDt: '',
        weekSchoolYear: '',
        weekSchoolTerm: '',
        calendarTypeCode: '',
        calendarStatusCode: '',
        isCurrent: '',
        description: '',
        sequnceNum: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < new Date().setFullYear(2018,9,1)
        }
      },
      pickTime2: {
        disabledDate (time) {
          return new Date().setFullYear(2020) < time.getTime()
        }
      }
    }
  },
  computed: {
    pageState () {
      return this.$route.params.type
    }
  },
  created () {
    for (let i = 0; i < 10; i++) {
      this.yearList.push({
        label: `${2018+i}年`,
        value: `${2018+i}`,
      })
    }
    this.getDetail(this.$route.params.id)
    commonApi.getCodeIntType('calendarType').then(res => {
      this.optionsList5 = coverData(res.data.data)
    })
    commonApi.getCodeIntType('calendarStatus').then(res => {
      let viewList = res.data.data || []
      for (let calendarStatusItem of viewList) {
        this.calendarStatusCodeOptions.push({
          'label': calendarStatusItem.codeDesc,
          'name': calendarStatusItem.codeId
        })
      }
    })
    commonApi.getCodeIntType('boolean_yn').then(res => {
      let viewList = res.data.data || []
      for (let ynItem of viewList) {
        this.ynOptions.push({
          'label': ynItem.codeDesc,
          'name': ynItem.codeId
        })
      }
    })
    commonApi.getAllSchool().then(res => {
      this.optionsList1 = coverData(res.data.data.records,'schoolOrgName','schoolOrgId')
    })
    // commonApi.getClassTreeBySchool().then(res => {
    //   this.optionsSelectData = res.data.data
    //   this.optionsList3 = coverData(res.data.data.children, 'name', 'id')
    // })
  },
  methods: {
    segmentChange (type) {
      this.formData.gradeId = type ? this.formData.gradeId : ''
      this.optionsSelectData.children.forEach(item => {
        if (item.id === this.formData.segmentId) {
          this.optionsList4 = coverData(item.children, 'name', 'id')
        }
      })
    },
    schoolChange(){
      let id = this.formData.schoolOrgId;
      commonApi.getClassTreeBySchool(id).then(res => {
        this.optionsSelectData = res.data.data
        this.optionsList3 = coverData(res.data.data.children, 'name', 'id')
      })
    },
    submit (formName) {
      const set = this.$refs
      this.isLoaded = true

      this.formData.schoolOrgName = this.optionsList1.find(item => item.value === this.formData.schoolOrgId).label
      this.formData.segmentName = this.optionsList3.find(item => item.value === this.formData.segmentId).label
      this.formData.gradeName = this.optionsList4.find(item => item.value === this.formData.gradeId).label
      this.formData.calendarTypeCodeStr = this.optionsList5.find(item => item.value === this.formData.calendarTypeCode).label
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
            this.$set(this.formData, 'schoolYearStart',this.formData.schoolYear.split('-')[0])
            this.$set(this.formData, 'schoolYearEnd',this.formData.schoolYear.split('-')[1])
            this.segmentChange(1)
          }
          this.isLoaded = false
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    },

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
      margin-right: 40px;
      color: #707070;
      font-size: 14px;
    }

    .detail-item-v2 {
      display: flex;
      flex-wrap: wrap;
      padding: 25px 25px 0 25px;
    }

  }

  .el-form-item--small.el-form-item {
    margin-bottom: 25px;
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
