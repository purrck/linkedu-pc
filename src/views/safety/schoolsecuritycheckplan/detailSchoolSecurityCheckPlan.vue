<template>
  <div class="detailSchoolSecurityCheckPlan">

    <div class="edit-box">
      <div v-show="$store.state.common.lizi">
          <el-button @click="example">示例</el-button>
        </div>
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="w520"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">
          <el-col :span="24">
            <el-form-item label="巡检线路 :" prop="checkRouteId">
              <!--<el-input class="input-v2-rao" v-model="formData.checkRouteId" maxlength="32"></el-input>-->
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.checkRouteId" placeholder="请您选择">
                <el-option
                  v-for="item in optionsList1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <div @click="checkRouteChange(item)">{{item.label}}</div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="巡检周期 :" prop="frequencyTypeCode">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.frequencyTypeCode" placeholder="请您选择">
                <el-option
                  v-for="item in optionsList2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.frequencyTypeCode === 'week'">
            <el-form-item label="选择周巡检 :" prop="frequencyNum">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.frequencyNum" placeholder="请您选择">
                <el-option
                  v-for="item in weekNumList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.frequencyTypeCode === 'month'">
            <el-form-item label="选择月巡检 :" prop="frequencyNum">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.frequencyNum" placeholder="请您选择">
                <el-option
                  v-for="item in monthNumList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.frequencyTypeCode === 'day'">
            <el-form-item label="选择日巡检 :" prop="frequencyNum">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.frequencyNum" placeholder="请您选择">
                <el-option
                  v-for="item in dayNumList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="管理部门 :" prop="adminDepartId">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.adminDepartId" placeholder="请您选择部门" @change="change(formData.adminDepartId)">
                <el-option
                  v-for="item in optionsList4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <div @click="adminDepartChange(item)">{{item.label}}</div>
                </el-option>
              </el-select>
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.userId" placeholder="请您选择人员">
                <el-option value="">请选择</el-option>
                <el-option
                  v-for="item in optionsList5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <div @click="userChange(item)">{{item.label}}</div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="巡检人 :" prop="planedUserId">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.planedUserId" placeholder="请您选择人员">
                <el-option
                  v-for="item in optionsList6"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                  <div @click="xunjianChange(item)">{{item.userName}}</div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </div>


      <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="w520"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">
          <el-col :span="24">
            <el-form-item label="巡检线路 :" prop="checkRouteId">
              <!--<el-input class="input-v2-rao" v-model="formData.checkRouteId" maxlength="32"></el-input>-->
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.checkRouteId" placeholder="请您选择">
                <el-option
                  v-for="item in optionsList1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <div @click="checkRouteChange(item)">{{item.label}}</div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="巡检周期 :" prop="frequencyTypeCode">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.frequencyTypeCode" placeholder="请您选择">
                <el-option
                  v-for="item in optionsList2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.frequencyTypeCode === 'week'">
            <el-form-item label="选择周巡检 :" prop="frequencyNum">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.frequencyNum" placeholder="请您选择">
                <el-option
                  v-for="item in weekNumList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.frequencyTypeCode === 'month'">
            <el-form-item label="选择月巡检 :" prop="frequencyNum">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.frequencyNum" placeholder="请您选择">
                <el-option
                  v-for="item in monthNumList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24" v-if="formData.frequencyTypeCode === 'day'">
            <el-form-item label="选择日巡检 :" prop="frequencyNum">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.frequencyNum" placeholder="请您选择">
                <el-option
                  v-for="item in dayNumList"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="管理部门 :" prop="adminDepartId">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.adminDepartId" placeholder="请您选择部门" @change="change(formData.adminDepartId)">
                <el-option
                  v-for="item in optionsList4"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <div @click="adminDepartChange(item)">{{item.label}}</div>
                </el-option>
              </el-select>
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.userId" placeholder="请您选择人员">
                <el-option value="">请选择</el-option>
                <el-option
                  v-for="item in optionsList5"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                  <div @click="userChange(item)">{{item.label}}</div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="巡检人 :" prop="planedUserId">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.planedUserId" placeholder="请您选择人员">
                <el-option
                  v-for="item in optionsList6"
                  :key="item.userId"
                  :label="item.userName"
                  :value="item.userId">
                  <div @click="xunjianChange(item)">{{item.userName}}</div>
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <!--<el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">-->
          <el-col>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small">
              <div class="p100">
                <div class="detail-title-v2 ">
                  基本信息
                </div>
                <div class="detail-item-v2">

                  <div class="p50" v-if="formData.routeName">
                    <el-form-item label="巡检路线 :" prop="routeName">
                      <span v-if="formData.routeName">{{formData.routeName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.adminDepartName">
                    <el-form-item label="管理部门 :" prop="adminDepartName">
                      <span v-if="formData.adminDepartName">{{formData.adminDepartName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.userName">
                    <el-form-item label="管理人员 :" prop="userName">
                      <span v-if="formData.userName">{{formData.userName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="巡检频率 :" prop="frequencyTypeCode">
                      <div v-if="formData.frequencyTypeCode === 'day'" class="one-line">日</div>
                      <div v-else-if="formData.frequencyTypeCode === 'week'" class="one-line">周</div>
                      <div v-else-if="formData.frequencyTypeCode === 'month'" class="one-line">月</div>
                      <div v-else-if="formData.frequencyTypeCode === 'week'" class="one-line">年</div>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.frequencyNum">
                    <el-form-item label="巡检频率参数 :" prop="frequencyNum">
                      <span v-if="formData.frequencyNum">{{formData.frequencyNum}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="计划状态 :" prop="checkPlanStatusCode">
                      <span v-if="formData.checkPlanStatusCodeStr" :style="{'color':formData.checkPlanStatusCodeStr.split(';')[1]}">{{formData.checkPlanStatusCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="计划时间 :" prop="planedDt">
<!--                      {{formData.planedDtv-if="formData.planedDt"}}                  -->
                      <span > {{formData.planStartDt}}</span>
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
          <!--<router-link :to="`/safety/listSchoolSecurityCheckResult?checkPlanId=`+-->
          <!--formData.checkPlanId">-->
          <!--<i class="iconfont icon-icon_liebiao"></i>安全巡检结果-->
          <!--</router-link>-->
          <!---->
          <!--</li>-->
          <!--</ul>-->
          <!--</div>-->
          <!--</el-col>-->
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
import api from './schoolsecuritycheckplanUrl'
import validation from '@/util/validate2'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import upload from '@/components/upload/uploadFileV1'
import uploads from '@/components/upload/uploadFile'
import {getDepPosiTree, getTheSchoolRoute} from '@/api/basedata/schoolBaseApi'
import {coverData} from '@/util/util'

export default {
  components: {editor, upload, uploads},
  data () {
    return {
      optionsList6:[],
      dayNumList : [],
      monthNumList : [

      ],
      weekNumList : [
        {
          value : 1,
          label : "周一"
        },
        {
          value : 2,
          label : "周二"
        },
        {
          value : 3,
          label : "周三"
        },
        {
          value : 4,
          label : "周四"
        },
        {
          value : 5,
          label : "周五"
        },
        {
          value : 6,
          label : "周六"
        },
        {
          value : 7,
          label : "周日"
        }
      ],
      pickerOptions2: {
        shortcuts: [{
          text: '未来一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime())
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '未来三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime())
            end.setTime(start.getTime() + 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      pickerOptions0: {
        disabledDate (time) {
          return time.getTime() < Date.now() - 8.64e7
        }
      },
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      frequencyTypeCodeOptions: [{'label': '全部', 'name': ''}], frequencyTypeCode: null,
      checkPlanStatusCodeOptions: [{'label': '全部', 'name': ''}], checkPlanStatusCode: null,
      optionsList1: [],
      optionsList2: [],
      optionsList3: [
        {label: '1天', value: 1},
        {label: '2天', value: 2}
      ],
      optionsList4: [],
      optionsList5: [],
      formData: {
        planStartDt:'',
        routeName : "",
        checkRouteId:"",
        checkPlanId : "",
        adminDepartId: '',
        adminDepartName: '',
        userId: '',
        userName: '',
        frequencyTypeCode: '',
        frequencyNum: '',
        planedUserId : "",
        planedUserName : ""
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        checkRouteId: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        routeName: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        adminDepartId: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        adminDepartName: [
          // {max: 32, message: '最多能输入32个字', trigger: 'blur'},
        ],
        userId: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        userName: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        frequencyTypeCode: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        frequencyNum: [
          {validator: validation.number, trigger: 'blur'},

        ],
        schoolId: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        schoolName: [
          {max: 255, message: '最多能输入255个字', trigger: 'blur'},

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
    for(let i=1; i<=20; i++){
      this.monthNumList.push({
        value : i,
        label : i
      })
    }
    for(let i=1; i<=23; i++){
      if(i<10){
        this.dayNumList.push({
          value : i,
          label : `0${i}:00`
        })
      }else{
        this.dayNumList.push({
          value : i,
          label : `${i}:00`
        })
      }

    }

    api.baoweikeList().then(res => {
      console.log(res)

      this.optionsList6 = res.data.data
    },res => {

    })
    getDepPosiTree().then(res => {
      // this.optionsList3 = coverData(res.data.data.children, 'name', 'id')
      let data = res.data.data.children || []
      this.optionsList4 = data.map(item => {
        return {
          label: item.name,
          value: item.id,
          children: item.children || []
        }
      })
      if(this.pageState == "edit" || this.pageState == "detail"){
        this.getDetail(this.$route.params.id)
      }

    })

    commonApi.getCodeIntType('frequencyType').then(res => {
      this.optionsList2 = coverData(res.data.data || [], 'codeDesc', 'codeId')
    })
    commonApi.getCodeIntType('checkPlanStatus').then(res => {
      let viewList = res.data.data || []
      for (let checkPlanStatusItem of viewList) {
        this.checkPlanStatusCodeOptions.push({
          'label': checkPlanStatusItem.codeDesc,
          'name': checkPlanStatusItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
    getTheSchoolRoute().then(res => {
      this.optionsList1 = coverData(res.data.data || [], 'routeName', 'checkRouteId')
    })

  },
  methods: {
    xunjianChange(event){
      this.formData.planedUserName = event.userName
    },
    adminDepartChange(event){
      console.log(event)
      this.formData.adminDepartName = event.label
    },
    userChange(event){
      this.formData.userName = event.label
      console.log(event)
    },
    checkRouteChange(event){
      this.formData.routeName = event.label
    },
    submit (formName) {

      const set = this.$refs
      this.isLoaded = true
      /*this.formData.planStartDt = this.formData.daterange && this.formData.daterange[0]
      this.formData.planEndDt = this.formData.daterange && this.formData.daterange[1]
      delete this.formData.daterange
      this.formData.adminDepartName = this.optionsList4.find(item => {
        return item.value === this.formData.adminDepartId
      }).label
      this.optionsList4.forEach(item => {
        if (item.value === this.formData.adminDepartId) {
          this.formData.userName = item.children.find(k => {
            return k
          }).name
        }
      })*/
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
              this.$message.success('添加成功')
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

            //this.formData = res.data.data
            for(let key in this.formData){
              this.formData[key] = res.data.data[key]
            }
            console.log(this.formData)
            this.optionsList4.map(item => {

              if(item.value == this.formData.adminDepartId){
                console.log("22")
                //this.optionsList5 = item.children
                this.optionsList5 = coverData(item.children || [], 'name', 'id')
              }
            })

          }
          this.isLoaded = false
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    change (val) {
      let children = this.optionsList4.find(item => {
        if (item.value === val) {
          return item.children
        }
      })
      this.optionsList5 = coverData(children.children || [], 'name', 'id')
      this.formData.userId = ""
      this.formData.userName = ""
    },
    example(){
        this.formData = {"adminDepartId":"2fef09c7c0a802252b273dea4518fcee","adminDepartName":"校长办公室","userId":"ca82e7da7f000001163088cb4a6089cb","userName":"王原思","frequencyTypeCode":"week","frequencyNum":"3","routeName":"路线2-食堂","checkRouteId":"720feb92c0a802253caa712dcf3774e5","planedUserName":"王原思","planedUserId":"ca82e7da7f000001163088cb4a6089cb"}
      }
  }
}
</script>
<style lang="scss" scoped>
  .detailSchoolSecurityCheckPlan {
    .el-checkbox + .el-checkbox {
      margin-left: 22px;
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
