<template>
  <div>
    <div class="edit-box">

      <questionEdit v-if="index === 2" @enter="enterQuestion" :data="formData"></questionEdit>


      <SendObject v-show="index === 3" :header="header" @finish="finish"></SendObject>

      <div v-if="index === 1">

        <el-form :label-position="'right'" class="w520"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="问卷标题 :" prop="surveyName">
              <el-input class="input-v2-rao" v-model="formData.SurveyMasterAd.surveyName"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="问卷分类 :" prop="surveyType">
              <el-select v-model="formData.SurveyMasterAd.surveyType" placeholder="请选择问卷分类">
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
            <el-form-item label="问卷首页 :" prop="surveyType">
              <editor :true-height="350" v-model="formData.SurveyMasterAd.headerTextContent"></editor>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="完成提示 :" prop="startDt">
              <editor :true-height="350" v-model="formData.SurveyMasterAd.footerTextContent"></editor>
            </el-form-item>
          </el-col>

        </el-form>
      </div>

      <div class="text-center mt-30">
        <el-button v-if="pageState!=='detail'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click.native="submit('formData')">保存
        </el-button>
        <el-button v-if="pageState!=='detail' &&  maxIndex === index" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click.native="check('formData')">提交审核
        </el-button>
        <el-button v-if="pageState!=='detail' && maxIndex > index" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click.native="next('formData')">下一步
        </el-button>
        <el-button plain @click="$router.go(-1)">返回</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from './surveymasterUrl'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import upload from '@/components/upload/uploadFileV1'
import uploads from '@/components/upload/uploadFile'
import Question from '../surveyqnchoice/detailSurveyQnChoice'
import SendObject from '@/components/sendObject/index'
import ResultPreview from '@/components/review/resultPreview'
import {coverData} from '@/util/util'
import QuestionEdit from '../surveyqnchoice/detailSurveyQnChoiceEdit'

export default {
  name: 'editSurveyMaster',
  components: {QuestionEdit, ResultPreview, SendObject, Question, editor, upload, uploads},
  data () {
    return {
      SendObjectData: {
        roleIds: [],
        segmentIds: [],
        gradeIds: [],
        areas: [],
      },
      index: 1, // 索引
      maxIndex: 3,
      editHeader: '',
      header: [
        {
          title: '1、选择学段',
          isActive: true,
          code: 'stage',
          children: [
            {
              isCheckAll: true,
              checked: [],
              children: [],
              subTitle: '学段',
              isActive: false,
              url: '/userapp/base/segmentGrade?type=1'
            }
          ]
        },
        {
          title: '2、选择年级',
          isActive: false,
          code: 'grade',
          children: [
            {
              checked: [],
              children: [],
              subTitle: '年级2',
              isActive: false,
              url: '/userapp/base/segmentGrade?type=2'
            },
          ]
        },
        {
          title: '3、选择省份',
          isActive: false,
          code: 'province',
          children: [
            {
              children: [],
              checked: [],
              subTitle: '省份',
              isActive: false,
              url: '/userapp/base/getArea?areaType=2&id=china'
            }
          ]
        },
        {
          title: '4、选择市区',
          isActive: false,
          code: 'city',
          children: [
            {
              children: [],
              checked: [],
              subTitle: '市区',
              isActive: false,
              url: '/userapp/base/getArea?areaType=3&id='
            }
          ]
        },
        {
          title: '4、选择区域',
          isActive: false,
          code: 'area',
          children: [
            {
              checked: [],
              children: [],
              subTitle: '区域',
              isActive: false,
              url: '/userapp/base/getArea?areaType=4'
            }
          ]
        }
      ],
      optionsList1: [],
      optionsList: [
        {label: '单选题', value: 'S'},
        {label: '多选题', value: 'M'},
        {label: '问答题', value: 'L'}
      ],
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      formData: {
        surveyId: '',
        surveyName: '',
        surveyType: '',
        footerTextContent: '',
        headerTextContent: '',
        qnChoiceContent: []
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        surveyName:
          [
            {required: true, message: '请您输入问卷标题', trigger: 'blur'},
            {max: 255, message: '最多能输入255个字', trigger: 'blur'},

          ],
        surveyType:
          [
            {required: true, message: '请您输入问卷类型', trigger: 'blur'},
            {max: 1, message: '最多能输入1个字', trigger: 'blur'},

          ],
        status:
          [
            {required: true, message: '请您输入状态', trigger: 'blur'},
            {max: 1, message: '最多能输入1个字', trigger: 'blur'},

          ],
        startDt:
          [],
        endDt:
          [],
        allowViewResultInd:
          [
            {max: 1, message: '最多能输入1个字', trigger: 'blur'},

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
    commonApi.getCodeIntType('surveyType').then(res => {
      this.optionsList1 = coverData(res.data.data, 'codeDesc', 'codeId')
    })
  },
  methods: {
    submit (formName, clickType) {
      const set = this.$refs
      this.isLoaded = true
      // console.log(this)
      this.formData.SurveyItemAdTOList.forEach(item => {
        item.surveyId = this.$route.params.id
        if (item.options && item.options.length) {
          item.qnChoiceContent = item.options.map(item => {
            return item.value
          })
        }
        delete item.options
        // let o = {
        //   qnType: item.type,
        //   qnChoiceContent: [],
        //   qnContent: item.title,
        //   surveyId: ''
        // }
        // for (const q of item.questionList) {
        //   o.qnChoiceContent.push(q.value)
        // }
        // obj.vSurveyItemAdTOS.push(o)
      })
      this.formData.SurveyMasterAd.surveyId = this.$route.params.id
      let obj = {vSurveyMasterAdTO: this.formData.SurveyMasterAd, vSurveyItemAdTOS: this.formData.SurveyItemAdTOList, clickType: clickType || 'save', scope: this.SendObjectData}
      // console.log(obj)
      // console.log(set[formName])
      // set[formName].validate(valid => {
      // obj.vSurveyMasterAdTO.qnChoiceContent = []
      // if (this.pageState === 'edit') {
      this.formLoading = true
      api.putObj(obj).then(res => {
        if (res.data.resultCode === '000000') {
          this.formLoading = false
          this.$message.success('成功')
          this.goBack()
        } else {
          this.$message.error(res.data.message)
          this.formLoading = false
        }
      })
      // }
      // })
      this.isLoaded = false
    },
    getDetail (paramsId) {
      if (this.pageState !== 'add') {
        api.getObj(paramsId).then(res => {
          if (res.data.resultCode === '000000') {
            this.formData = res.data.data
            this.editHeader = JSON.parse(this.formData.Scope.extendData)
          }
          this.isLoaded = false
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    next (formName) {
      this.maxIndex > this.index && this.index++
      // this.submit(formName)
    },
    finish (val) {
      // console.log(val)
      let {header} = val
      let extendData = JSON.stringify(header)
      let province = []
      let city = []
      let area = []
      for (const headerElement of header) {
        switch (headerElement.code) {
          case 'stage':
            for (const child of headerElement.children) {
              this.SendObjectData.segmentIds = [...child.checked]
            }
            break
          case 'grade':
            for (const child of headerElement.children) {
              this.SendObjectData.gradeIds = [...child.checked]
            }
            break
          case 'province':
            for (const child of headerElement.children) {
              for (const child1 of child.children) {
                for (const checkedElement of child.checked) {
                  if (child1.id === checkedElement) {
                    province.push(child1)
                  }
                }
              }
            }
            break
          case 'city':
            for (const child of headerElement.children) {
              for (const child1 of child.children) {
                for (const checkedElement of child.checked) {
                  if (child1.id === checkedElement) {
                    city.push(child1)
                  }
                }
              }
            }
            break
          case 'area':
            for (const child of headerElement.children) {
              for (const child1 of child.children) {
                for (const checkedElement of child.checked) {
                  // console.log(child, child1, checkedElement)
                  if (child1.id === checkedElement) {
                    area.push(child1)
                  }
                }
              }
            }
            break
        }
      }
      // console.log('province', province, 'city', city, 'area', area)
      if (area.length) {
        this.SendObjectData.areas = area
      } else if (city.length) {
        this.SendObjectData.areas = city
      } else {
        this.SendObjectData.areas = province
      }
      this.SendObjectData.extendData = extendData
    },
    enterQuestion (data) {
      this.formData.qnChoiceContent = data
    },
    async check (formName) {
      await this.submit(formName, 'next')
      // this.goBack()
    },
    indexPlus (index) {
      return ++index
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

    .detail-item-v21 {
      padding: 30px;

      .detail-item-description {
        margin-bottom: 30px;
      }
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
