<template>
  <div>
    <div  class="edit-box ">
      <div class=" formFlex100 left-box br border-color-e8e8e8 pr-20">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="80px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">
          <el-form-item label="名称 *  :" prop="surveyType">
            <el-input class="input-v2-rao" v-model="formData.surveyName" disabled>
            </el-input>
          </el-form-item>
          <!--<el-form-item label="分类 *  :" prop="surveyType">-->
            <!--<el-input class="input-v2-rao" v-model="formData.surveyType" disabled></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="内容 *  :" prop="detail">
            <ResultPreview v-if="surDetail" v-for="(item,index) in surDetail.SurveyItemAdTOList" :key="index"
                           :index="index+1"
                           :data="item" :total="surDetail.SurveyItemAdTOList.length"></ResultPreview>
          </el-form-item>

        </el-form>
      </div>

      <div class="right-box formFlex100">



        <div v-if="pageState === 'detail'">
          <!-- 详细查看 -->
          <el-form :label-position="'right'" label-width="120px"
                   :inline="false" :model="formData" size="small" class="flex row wrap">
            <div class="p100">
              <div class="detail-item-v2">

                <!--<div class="p100">-->
                <!--<el-form-item label="适用学段 :" prop="startDt">-->
                <!--<span v-if="formData.startDt"> {{formData.startDt}}</span>-->
                <!--</el-form-item>-->
                <!--</div>-->
                <!--<div class="p100">-->
                <!--<el-form-item label="适用年级 :" prop="endDt">-->
                <!--<span v-if="formData.endDt"> {{formData.endDt}}</span>-->
                <!--</el-form-item>-->
                <!--</div>-->
              </div>
            </div>
          </el-form>
        </div>

        <div class="text-center mt-30">
          <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="small"
                     @click="goBack">返回
          </el-button>

          <el-button v-if="pageState === 'detail'" type="primary"
                     class="fush-btn button-v2-rao b93BF88"
                     :loading="formLoading" size="small"
                     @click="toFabu('formData')">发布
          </el-button>


        </div>
      </div>

    </div>
  </div>
</template>


<script>
  import api from "./surveySourseUrl";
  import api2 from "./surveymasterUrl";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import ResultPreview from "@/components/review/resultPreview";
  import SendObject from "../../../components/sendObject/testSendObject";
  import {coverData} from '@/util/util'

  export default {
    components: {SendObject, ResultPreview, editor, upload, uploads},
    name: "detailSurveySourse",
    data() {
      return {
        formLoading: false,
        showSend: false,
        isLoaded: true,
        maxIndex: 3,
        index: 1,
        surveyType: null,
        header: [
          {
            title: '1、通知角色/学段',
            isActive: true,
            code: 'stage',
            children: [
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '角色',
                subTitleType: 'role',
                isActive: false,
                url: '/userapp/base/codeInt/list?codetypeId=userType'
              },
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '学段',
                subTitleType: 'segment',
                isActive: false,
                url: '/userapp/base/segmentGrade?type=1'
              }
            ]
          },
          {
            title: '2、选择年级',
            isActive: false,
            code: 'class',
            children: [
              {
                checked: [],
                children: [],
                subTitle: '年级',
                isActive: false,
                url: '/userapp/base/segmentGrade?type=2'
              },
            ]
          },
          {
            title: '3、选择班级',
            isActive: false,
            code: 'persons',
            children: [
              {
                checked: [],
                children: [],
                subTitle: '人员',
                isActive: false,
                url: '/sm/user/schoolPerson/option'
              },
            ]
          },
        ],
        imagePath: [], //单独使用一个图片变量
        optionsList: [], //问卷列表
        surDetail: {}, //问卷列表
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        formData: {
          sendObj: null,
          entityOrgId: null,
          surDetail: null,
          surveyName: null,
          gradeIds: [],
          segmentIds: [],
          classIds: [],
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          surveyName:
            [
              {required: true, message: "请您输入问卷标题", trigger: "blur"},
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],
          surveyType:
            [
              {required: true, message: "请您输入问卷类型", trigger: "blur"},
              {max: 1, message: "最多能输入1个字", trigger: "blur"},

            ],
          organizedStartDt:
            [
              {required: true, message: "请您选择开始时间", trigger: "blur"},
            ],
          organizedEndDt:
            [
              {required: true, message: "请您选择结束时间", trigger: "blur"},
            ],
        }
      }
    },
    computed: {
      pageState() {
        return this.$route.params.type;
      }
    },
    created() {
      const entityId = this.$route.params.id;
      // const entityOrgRuleId = this.$route.params.entityOrgRuleId;
      this.init(entityId)
    },
    methods: {
      init(id) {

        api.getObj(id).then(res => {
          let obj = res.data.data;
          this.surDetail = res.data.data;
          this.formData.entityId = id;
          this.formData.surveyName = obj.SurveyMasterAd.surveyName
        })
      },

      typeChange(id) {
        // console.log(arguments);

      },

      next(formName) {
        const set = this.$refs;
        this.isLoaded = true;

        set['formData'].validate(valid => {

        })
        this.maxIndex > this.index && this.index++
      },
      toFabu() {
        let opath = '/safetyEdu/detailSurveyMaster/add/0?entityId=' + this.$route.params.id;
        this.$router.push({path: opath})
      },

      submit(type) {
        const set = this.$refs;
        this.isLoaded = true;

        set['formData'].validate(valid => {
          if(valid && type===2) {
            this.formLoading = true;
            this.formData.entityOrgRuleStatusCode = 'approving';
          }else if(valid && type===1){
            this.formLoading = true;
            this.formData.entityOrgRuleStatusCode = 'editing';
          }
          api.addObj(this.formData).then(res => {
            if (res.data.resultCode === "000000") {
              this.formLoading = false;
              this.$message.success("提交成功");
              this.$router.push({path:'/safetyEdu/ListSurveyMaterXs'})
            } else {
              this.$message.error(res.data.message);
              this.formLoading = false;
            }
          })
        });
        this.isLoaded = false;
      },
      postShenhe () {
        let obj  ={
          entityOrgRuleIds:[this.entityOrgRuleId],//对象范围ID
          entityOrgRuleStatusCode:'approving'//状态
        }
        api2.changeStatus(obj).then(res=>{
          if(res.data.resultCode==='000000'){
            this.$message.success("提交审核成功");
          }
        })
      },
      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
            }
            this.isLoaded = false;
          })
        }
      },

      goBack() {
        this.$router.push({path:'/safetyEdu/ListSurveySourseXs'})
      }
    }
  }
</script>

<style lang="scss" scoped>
  .right-box {
    flex: 1;
  }

  .edit-box {
    padding: 40px;
    display: flex;
    flex: 1;
    flex-direction: row;

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
      padding: 0;
    }

  }

  .left-box {
    width: 50%;
  }
</style>
