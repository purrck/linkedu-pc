<template>
  <div>
    <div class="edit-box">
      <div v-show="$store.state.common.lizi">
          <el-button @click="example">示例</el-button>
        </div>
      <div class="detailActivityInfo">
        <PhoneModelActivity class="phone" :data="formData"></PhoneModelActivity>
        <div v-if="pageState === 'add'" v-show="index === 0">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" size="small" >

            <el-col :span="24">
              <el-form-item label="活动题目:" prop="topic">
                <el-input class="input-v2-rao" v-model="formData.topic"
                          maxlength="255"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="活动类型 :" prop="securityEducationTypeCode">
                <el-select class="select-v2-rao" v-model="formData.securityEducationTypeCode" placeholder="请您选择">
                  <el-option v-for="actypeCodeItem in actypeCodeOptions"
                             :key="actypeCodeItem.value"
                             :label="actypeCodeItem.label" :value="actypeCodeItem.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="活动封面 :" prop="imagePath">
                <upload v-on:uploadData="uploadData" :many="1" :imagelist="formData.imagePath"/>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="下载资料 :" >
                <duozhang-upload v-model="formData.filePath"></duozhang-upload>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="活动内容 :" prop="mainContent"
                            class="orgIntroduction">
                <editor v-model="formData.mainContent" :true-height="350"/>
              </el-form-item>
            </el-col>

          </el-form>
        </div>

        <SendObject :header="header" v-show="index === 1" @finish="finish"></SendObject>


        <div v-show="index === 0" v-if="pageState === 'edit' ">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" size="small">

            <el-col :span="24">
              <el-form-item label="活动题目:" prop="topic">
                <el-input class="input-v2-rao" v-model="formData.topic"
                          maxlength="255"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="活动类型 :" prop="securityEducationTypeCode">
                <el-select class="select-v2-rao" v-model="formData.securityEducationTypeCode" placeholder="请您选择">
                  <el-option v-for="actypeCodeItem in actypeCodeOptions"
                             :key="actypeCodeItem.value"
                             :label="actypeCodeItem.label" :value="actypeCodeItem.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="活动封面 :" prop="imagePath">
                <upload v-on:uploadData="uploadData" :many="1" :imagelist="formData.imagePath"/>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="下载资料 :" prop="filePath">
                <duozhang-upload v-model="formData.filePath"></duozhang-upload>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="活动内容 :" prop="mainContent"
                            class="orgIntroduction">
                <editor v-model="formData.mainContent" :true-height="350"/>
              </el-form-item>
            </el-col>

          </el-form>
        </div>

        <div v-if="pageState === 'detail'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" size="small">

            <el-col :span="24">
              <el-form-item label="活动题目:" prop="topic">
                {{formData.topic}}
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="活动类型 :" prop="securityEducationTypeCode">
                {{formData.actypeCodeStr && formData.actypeCodeStr.split(";")[0]}}
                <!--<el-select disabled class="select-v2-rao" v-model="formData.actypeCode" placeholder="请您选择">
                  <el-option v-for="actypeCodeItem in optionsList1"
                             :key="actypeCodeItem.value"
                             :label="actypeCodeItem.label" :value="actypeCodeItem.value">
                  </el-option>
                </el-select>-->
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="活动封面 :" prop="imagePath">
                <img style="width: 200px;" :src="formData.imagePath" alt="">
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="活动内容 :" prop="mainContent"
                            class="orgIntroduction">
                <div v-html="formData.mainContent"></div>
              </el-form-item>
            </el-col>

            <!--<el-col :span="24">-->
              <!--<el-form-item label="适用范围 :"-->
                            <!--class="orgIntroduction">-->
                <!--<div></div>-->
              <!--</el-form-item>-->
            <!--</el-col>-->
            <el-col :span="24">
              <el-form-item label="审核结果 :"
                            class="orgIntroduction">
                <div>
                  <span v-if="formData.acstatusCode==='opening'">审核通过</span>
                  <span v-if="formData.acstatusCode==='rejected'">驳回审核</span>
                </div>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="审核说明 :"
                            class="orgIntroduction">
                <div></div>
              </el-form-item>
            </el-col>

          </el-form>
        </div>

        <div v-if="pageState === 'check'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData"  size="small">

            <el-col :span="24">
              <el-form-item label="活动题目:" prop="topic">
                <el-input disabled class="input-v2-rao" v-model="formData.topic"
                          maxlength="255"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="活动类型 :" prop="securityEducationTypeCode">
                <el-select disabled class="select-v2-rao" v-model="formData.securityEducationTypeCode" placeholder="请您选择">
                  <el-option v-for="actypeCodeItem in optionsList1"
                             :key="actypeCodeItem.value"
                             :label="actypeCodeItem.label" :value="actypeCodeItem.value">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="活动封面 :" prop="imagePath">
                <img style="width: 200px;" :src="formData.imagePath" alt="">
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="活动内容 :" prop="mainContent"
                            class="orgIntroduction">
                <div v-html="formData.mainContent"></div>
              </el-form-item>
            </el-col>

          </el-form>
        </div>
      </div>

      <div class="text-center mt-30">
        <el-button type="primary" class="fush-btn button-v2-rao b93BF88"
                    size="small"
                   v-if="index !== maxIndex && pageState !== 'detail'&& pageState !== 'check'"
                   @click="index<maxIndex && index++">下一步
        </el-button>

        <el-button type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoadingSave" size="small"
                   v-if=" pageState !== 'detail'&& pageState !== 'check'"
                   @click="submit('formData')">保存
        </el-button>

        <el-button type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   v-if="index ===  maxIndex && pageState !== 'detail'&& pageState !== 'check'"
                   @click="submit('formData','approving')">提交审核
        </el-button>
        <el-button type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   v-if="pageState === 'check'&&formData.acstatusCode==='approving'"
                   @click="pass('formData')">通过
        </el-button>
        <el-button type="primary" class="fush-btn button-v2-rao b93BF88"
                    size="small"
                   v-if="pageState === 'check'&&formData.acstatusCode==='approving'"
                   @click="dialogVisible = true">驳回
        </el-button>

        <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="small"
                   @click="goBack">返回
        </el-button>
      </div>
    </div>
    <el-dialog
      title="请输入理由"
      :visible.sync="dialogVisible"
      width="30%">
      <el-input v-model="reason" placeholder="请输入理由" type="textarea" :rows="4"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="reject">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import api from './activityinfoUrl'
import validation from '@/util/validate2'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import upload from '@/components/upload/uploadFileV1'
import SendObject from '@/components/sendObject/index'
// import SendObject1 from '@/components/sendObject/indexV1'
import PhoneModel from '@/components/phoneModel'
import PhoneModelActivity from '@/components/phoneModelActivity'

export default {
  components: {PhoneModelActivity, PhoneModel, SendObject, editor, upload},
  data () {
    return {
      reason: '',
      dialogVisible: false,
      index: 0,
      maxIndex: 1,
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
      optionsList1: [
        {label: '测试', value: 'test'}
      ],
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),
      formLoadingSave : false,
      imagePathFileList: [],
      imagePathFileType: '',
      actypeCodeOptions: [{'label': '全部', 'name': ''}], actypeCode: null,
      acstatusCodeOptions: [{'label': '全部', 'name': ''}], acstatusCode: null,
      ynOptions: [{'label': '全部', 'name': ''}], isPublic: null,
      publicServiceCodeOptions: [{'label': '全部', 'name': ''}], publicServiceCode: null,
      virtualCurrencyCodeOptions: [{'label': '全部', 'name': ''}], virtualCurrencyCode: null,
      formData: {
        topic : "",
        imagePath : "",
        securityEducationTypeCode:'',
        activityResourceAdVOList:[],
        filePath : [],
        mainContent : "",
        scope : null
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules2: {
        topic:
          [
            {required: true, message: '请您输入主题', trigger: 'blur'},
            {max: 255, message: '最多能输入30个字', trigger: 'blur'},
          ],

        mainContent:
          [
            {required: true, message: '请您选择活动内容', trigger: 'blur'},
          ],
        imagePath:
          [
            {max: 255, message: '最多能输入255个字', trigger: 'blur'},

          ],
        scopeVO:
          [],
        securityEducationTypeCode:
          [
            {required: true, message: '请您选择活动类型', trigger: 'blur'},
            {max: 16, message: '最多能输入16个字', trigger: 'blur'},
          ],
      },
      SendObjectData: {
        gradeIds : []
      },
    }
  },
  computed: {
    pageState () {
      return this.$route.params.type
    }
  },
  mounted(){

  },
  created () {

    this.getDetail(this.$route.params.id);
    commonApi.getCourseType().then(res=>{
      let resData = res.data.data
    })
    commonApi.getCodeIntType('securityEducationType').then(res => {
      let viewList = res.data.data || []
      for (let actypeItem of viewList) {
        this.actypeCodeOptions.push({
          'label': actypeItem.codeDesc,
          'name': actypeItem.codeId
        })
      }
    });
    commonApi.getCodeIntType('acstatus').then(res => {
      let viewList = res.data.data || []
      for (let acstatusItem of viewList) {
        this.acstatusCodeOptions.push({
          'label': acstatusItem.codeDesc,
          'name': acstatusItem.codeId
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
    commonApi.getCodeIntType('publicService').then(res => {
      let viewList = res.data.data || []
      for (let publicServiceItem of viewList) {
        this.publicServiceCodeOptions.push({
          'label': publicServiceItem.codeDesc,
          'name': publicServiceItem.codeId
        })
      }
    })
    commonApi.getCodeIntType('virtualCurrency').then(res => {
      let viewList = res.data.data || []
      for (let virtualCurrencyItem of viewList) {
        this.virtualCurrencyCodeOptions.push({
          'label': virtualCurrencyItem.codeDesc,
          'name': virtualCurrencyItem.codeId
        })
      }
    })
  },
  methods: {
    finish (val) {
      let {header} = val
      let extendData = JSON.stringify(header)
      // console.log(header)
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
              this.SendObjectData.gradeIds = this.SendObjectData.gradeIds.concat(child.checked)
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
                  if (child1.id === checkedElement) {
                    area.push(child1)
                  }
                }
              }
            }
            break
        }
      }
      if (area.length) {
        this.SendObjectData.areas = area
      } else if (city.length) {
        this.SendObjectData.areas = city
      } else {
        this.SendObjectData.areas = province
      }
      this.SendObjectData.extendData = extendData
      this.formData.scope = this.SendObjectData
    },
    submit (formName, type) {

      const set = this.$refs;
      this.isLoaded = true;
      this.formData.acstatusCode = type ? type : 'editing';

      set[formName].validate(valid => {
        let arr = [];
        this.formData.filePath.length >= 1 && this.formData.filePath.split(',').map(res=>{
          arr.push({
            resourceName: res.split('/')[res.split('/').length-1],
            formatCode: '',
            filePath: res
          });
          this.formData.activityResourceAdVOList = arr;
        });

        if (this.pageState !== 'add' && valid) {
          this.formLoading = true
          this.formLoadingSave = true;
          api.putObj(this.formData).then(res => {
            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('修改成功')
              this.goBack()
            } else {
              this.$message.error(res.data.message)
              this.formLoading = false
            }
            this.formLoadingSave = false;
          },res => {
            this.formLoadingSave = false;
          })
        } else if (this.pageState === 'add' && valid) {
          if(type == 'approving'){
            this.formLoading = true
          }else{
            this.formLoadingSave = true;
          }

          api.addObj(this.formData).then(res => {
            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('修改成功')
              this.goBack()
            } else {
              this.$message.error(res.data.message)
              this.formLoading = false
            }
            this.formLoadingSave = false;
          })
        }
      })

      this.isLoaded = false
    },
    pass () {

      let params = {
        activityId:this.$route.params.id,
        acstatusCode:'opening',
        auditOpinion:this.reason,
      };
      api.auditingObj(params).then(res => {
        if (res.data.resultCode === '000000') {
          this.$message.success('审核通过');
          this.$router.go(-1);
        }else{
          this.$message.error(res.data.message);
        }
        this.isLoaded = false
      })
    },
    reject () {

      let params = {
        activityId:this.$route.params.id,
        acstatusCode:'rejected',
        auditOpinion:this.reason,
      };
      api.auditingObj(params).then(res => {
        if (res.data.resultCode === '000000') {
          this.$message.success('驳回审核')
          this.$router.go(-1);
        }else{
          this.$message.error(res.data.message);
        }
        this.isLoaded = false
      })
    },
    //获取图片上传信息
    uploadData (res) {
      this.formData.imagePath = res
    },
    getDetail (paramsId) {
      if (this.pageState !== 'add') {
        api.getObj(paramsId).then(res => {
          if (res.data.resultCode === '000000') {
            this.formData = res.data.data;
            // this.formData.filePath = ["http://118.126.94.4:8410/group1/M00/00/17/rBAAAlyLi_mAWenzAABtUld5_R0551.png"]
            this.formData.filePath = this.formData.activityResourceAdVOList && this.formData.activityResourceAdVOList.map(res=>{
              return `${res.filePath}`
            }).join(",")
            // console.log("43")
            this.$forceUpdate();
            this.header = JSON.parse(this.formData.scope.extendData)
          }
          this.isLoaded = false
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    example(){
        this.formData = {"topic":"6757","imagePath":"http://47.107.119.79:8410/group1/M00/00/00/rBIHOlyxrGmAQ3IbAABCuGbbMws380.png","securityEducationTypeCode":"F","activityResourceAdVOList":[{"resourceName":"rBIHOlyxtnuAfrSRAACEjEu6rFA17.json","formatCode":"","filePath":"http://47.107.119.79:8410/group1/M00/00/00/rBIHOlyxtnuAfrSRAACEjEu6rFA17.json"}],"filePath":"http://47.107.119.79:8410/group1/M00/00/00/rBIHOlyxtnuAfrSRAACEjEu6rFA17.json","mainContent":"<p>665757</p>","scopeVO":{"segmentIds":["1","2","3"],"gradeIds":[],"areas":[{"id":"anhui","name":"安徽省","areaType":2},{"id":"beijing","name":"北京","areaType":2},{"id":"chongqing","name":"重庆","areaType":2},{"id":"fujian","name":"福建省","areaType":2},{"id":"gansu","name":"甘肃省","areaType":2},{"id":"guangdong","name":"广东省","areaType":2},{"id":"guangxi","name":"广西省","areaType":2},{"id":"guizhou","name":"贵州省","areaType":2},{"id":"hainan","name":"海南省","areaType":2},{"id":"hebei","name":"河北省","areaType":2},{"id":"heilongjiang","name":"黑龙江省","areaType":2},{"id":"henan","name":"河南省","areaType":2},{"id":"hongkong","name":"香港","areaType":2},{"id":"hubei","name":"湖北省","areaType":2},{"id":"hunan","name":"湖南省","areaType":2},{"id":"innermongolia","name":"内蒙古自治区","areaType":2},{"id":"jiangsu","name":"江苏省","areaType":2},{"id":"jiangxi","name":"江西省","areaType":2},{"id":"jilin","name":"吉林省","areaType":2},{"id":"liaoning","name":"辽宁省","areaType":2},{"id":"macau","name":"澳门","areaType":2},{"id":"ningxia","name":"宁夏","areaType":2},{"id":"qinghai","name":"青海省","areaType":2},{"id":"shaanxi","name":"陕西省","areaType":2},{"id":"shandong","name":"山东省","areaType":2},{"id":"shanghai","name":"上海","areaType":2},{"id":"shanxi","name":"山西省","areaType":2},{"id":"sichuan","name":"四川省","areaType":2},{"id":"taiwan","name":"台湾","areaType":2},{"id":"tianjin","name":"天津","areaType":2},{"id":"tibet","name":"西藏","areaType":2},{"id":"xinjiang","name":"新疆","areaType":2},{"id":"yunnan","name":"云南省","areaType":2},{"id":"zhejiang","name":"浙江省","areaType":2}],"extendData":"[{\"title\":\"1、选择学段\",\"isActive\":true,\"code\":\"stage\",\"children\":[{\"isCheckAll\":false,\"checked\":[\"1\",\"2\",\"3\"],\"children\":[{\"id\":\"1\",\"name\":\"小学\",\"type\":1},{\"id\":\"2\",\"name\":\"初中\",\"type\":1},{\"id\":\"3\",\"name\":\"高中\",\"type\":1}],\"subTitle\":\"学段\",\"isActive\":true,\"url\":\"/userapp/base/segmentGrade?type=1\",\"checkAll\":true}]},{\"title\":\"2、选择年级\",\"isActive\":true,\"code\":\"grade\",\"children\":[{\"test\":true,\"isCheckAll\":false,\"checkAll\":true,\"checked\":[\"1\",\"2\",\"3\",\"4\",\"5\",\"6\"],\"children\":[{\"id\":\"1\",\"name\":\"一年级\",\"type\":2},{\"id\":\"2\",\"name\":\"二年级\",\"type\":2},{\"id\":\"3\",\"name\":\"三年级\",\"type\":2},{\"id\":\"4\",\"name\":\"四年级\",\"type\":2},{\"id\":\"5\",\"name\":\"五年级\",\"type\":2},{\"id\":\"6\",\"name\":\"六年级\",\"type\":2}],\"subTitle\":\"小学\",\"id\":\"1\",\"isActive\":true,\"url\":\"/userapp/base/segmentGrade?type=2&id=1\"},{\"test\":true,\"isCheckAll\":true,\"checkAll\":[],\"checked\":[],\"children\":[],\"subTitle\":\"初中\",\"id\":\"2\",\"isActive\":false,\"url\":\"/userapp/base/segmentGrade?type=2&id=2\"},{\"test\":true,\"isCheckAll\":true,\"checkAll\":[],\"checked\":[],\"children\":[],\"subTitle\":\"高中\",\"id\":\"3\",\"isActive\":false,\"url\":\"/userapp/base/segmentGrade?type=2&id=3\"}]},{\"title\":\"3、选择省份\",\"isActive\":true,\"code\":\"province\",\"children\":[{\"children\":[{\"id\":\"anhui\",\"name\":\"安徽省\",\"areaType\":2},{\"id\":\"beijing\",\"name\":\"北京\",\"areaType\":2},{\"id\":\"chongqing\",\"name\":\"重庆\",\"areaType\":2},{\"id\":\"fujian\",\"name\":\"福建省\",\"areaType\":2},{\"id\":\"gansu\",\"name\":\"甘肃省\",\"areaType\":2},{\"id\":\"guangdong\",\"name\":\"广东省\",\"areaType\":2},{\"id\":\"guangxi\",\"name\":\"广西省\",\"areaType\":2},{\"id\":\"guizhou\",\"name\":\"贵州省\",\"areaType\":2},{\"id\":\"hainan\",\"name\":\"海南省\",\"areaType\":2},{\"id\":\"hebei\",\"name\":\"河北省\",\"areaType\":2},{\"id\":\"heilongjiang\",\"name\":\"黑龙江省\",\"areaType\":2},{\"id\":\"henan\",\"name\":\"河南省\",\"areaType\":2},{\"id\":\"hongkong\",\"name\":\"香港\",\"areaType\":2},{\"id\":\"hubei\",\"name\":\"湖北省\",\"areaType\":2},{\"id\":\"hunan\",\"name\":\"湖南省\",\"areaType\":2},{\"id\":\"innermongolia\",\"name\":\"内蒙古自治区\",\"areaType\":2},{\"id\":\"jiangsu\",\"name\":\"江苏省\",\"areaType\":2},{\"id\":\"jiangxi\",\"name\":\"江西省\",\"areaType\":2},{\"id\":\"jilin\",\"name\":\"吉林省\",\"areaType\":2},{\"id\":\"liaoning\",\"name\":\"辽宁省\",\"areaType\":2},{\"id\":\"macau\",\"name\":\"澳门\",\"areaType\":2},{\"id\":\"ningxia\",\"name\":\"宁夏\",\"areaType\":2},{\"id\":\"qinghai\",\"name\":\"青海省\",\"areaType\":2},{\"id\":\"shaanxi\",\"name\":\"陕西省\",\"areaType\":2},{\"id\":\"shandong\",\"name\":\"山东省\",\"areaType\":2},{\"id\":\"shanghai\",\"name\":\"上海\",\"areaType\":2},{\"id\":\"shanxi\",\"name\":\"山西省\",\"areaType\":2},{\"id\":\"sichuan\",\"name\":\"四川省\",\"areaType\":2},{\"id\":\"taiwan\",\"name\":\"台湾\",\"areaType\":2},{\"id\":\"tianjin\",\"name\":\"天津\",\"areaType\":2},{\"id\":\"tibet\",\"name\":\"西藏\",\"areaType\":2},{\"id\":\"xinjiang\",\"name\":\"新疆\",\"areaType\":2},{\"id\":\"yunnan\",\"name\":\"云南省\",\"areaType\":2},{\"id\":\"zhejiang\",\"name\":\"浙江省\",\"areaType\":2}],\"checked\":[\"anhui\",\"beijing\",\"chongqing\",\"fujian\",\"gansu\",\"guangdong\",\"guangxi\",\"guizhou\",\"hainan\",\"hebei\",\"heilongjiang\",\"henan\",\"hongkong\",\"hubei\",\"hunan\",\"innermongolia\",\"jiangsu\",\"jiangxi\",\"jilin\",\"liaoning\",\"macau\",\"ningxia\",\"qinghai\",\"shaanxi\",\"shandong\",\"shanghai\",\"shanxi\",\"sichuan\",\"taiwan\",\"tianjin\",\"tibet\",\"xinjiang\",\"yunnan\",\"zhejiang\"],\"subTitle\":\"省份\",\"isActive\":true,\"url\":\"/userapp/base/getArea?areaType=2&id=china\",\"isCheckAll\":false,\"checkAll\":true}]},{\"title\":\"4、选择市区\",\"isActive\":false,\"code\":\"city\",\"children\":[{\"children\":[],\"checked\":[],\"subTitle\":\"市区\",\"isActive\":false,\"url\":\"/userapp/base/getArea?areaType=3&id=\"}]},{\"title\":\"4、选择区域\",\"isActive\":false,\"code\":\"area\",\"children\":[{\"checked\":[],\"children\":[],\"subTitle\":\"区域\",\"isActive\":false,\"url\":\"/userapp/base/getArea?areaType=4\"}]}]"},"acstatusCode":"approving"}
    }
  }
}
</script>
<style lang="scss" scoped>
  .detailActivityInfo {
    display: flex;

    & div:not(:first-child) {
      flex: 1
    }

    .phone {
      margin-right: 20px;
    }
  }

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


  .bm-view {
    width: 640px;
    height: 300px;
    margin-top: 10px;
  }

  .fush-btn {
    margin: 0 15px
  }
</style>
