<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="w520"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="24">
            <el-form-item label="巡检点名称 *  :" prop="placeName">
              <el-input class="input-v2-rao" v-model="formData.placeName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>

          <!--<el-col :span="24">-->
            <!--<el-form-item label="是否启用 *  :" prop="placeName">-->
              <!--<el-radio-group v-model="formData.model">-->
                <!--<el-radio label="Y">是</el-radio>-->
                <!--<el-radio label="N">否</el-radio>-->
              <!--</el-radio-group>-->
            <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="24">
            <el-form-item label="描述 *  :" prop="securityContent">
              <editor v-model="formData.securityContent" :true-height="350"></editor>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">

        <el-form :label-position="'right'" class="w520"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="巡检点名称 *  :" prop="placeName">
              <el-input class="input-v2-rao" v-model="formData.placeName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>
          <!--<el-col :span="24">-->
            <!--<el-form-item label="是否启用 *  :" prop="placeName">-->
              <!--<el-radio-group v-model="formData.model">-->
                <!--<el-radio label="Y">是</el-radio>-->
                <!--<el-radio label="N">否</el-radio>-->
              <!--</el-radio-group>-->
            <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="24">
            <el-form-item label="描述 *  :" prop="securityContent">
              <editor v-model="formData.securityContent" :true-height="350"></editor>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small">
              <div class="p100">
                <div class="detail-title-v2 ">
                  基本信息
                </div>
                <div class="detail-item-v2">
                  <div class="p100" v-if="formData.placeName">
                    <el-form-item label="巡检点名称 :" prop="placeNums">
                      <span v-if="formData.placeName">{{formData.placeName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p100" v-if="formData.securityContent">
                    <el-form-item label="分类描述 :" prop="placeNums">
                      <span v-if="formData.securityContent" v-html="formData.securityContent"></span>
                    </el-form-item>
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
import api from './schoolsecurityplaceUrl'
import validation from '@/util/validate2'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import upload from '@/components/upload/uploadFileV1'
import uploads from '@/components/upload/uploadFile'
import {BaiduMap, BmNavigation, BmMarker, BmInfoWindow, BmGeolocation, BmLocalSearch,} from 'vue-baidu-map'
import VueQr from 'vue-qr'
import {getTheSchoolRoute} from '@/api/basedata/schoolBaseApi'
import {coverData} from '@/util/util'

export default {
  components: {BaiduMap, BmNavigation, BmMarker, BmInfoWindow, BmGeolocation, BmLocalSearch, VueQr, editor, upload, uploads},
  data () {
    return {
      optionsList: [],
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      placeGpsKeyword: '',
      placeGpsModel: '',
      placeGpsMarkerPoint: {
        lng: '',
        lat: ''
      },
      placeGpsLocation: '',
      placeGpsShow: false,
      lng: '',
      lat: '',
      formData: {
        checkRouteId: this.$route.query.checkRouteId,
        securityPlaceId: '',
        placeNums: '',
        placeName: '',
        placeGps: '',
        placeRfid: '',
        placeScan: '',
        securityContent: '',
        adminDepartId: '',
        adminDepartName: '',
        adminUserId: '',
        adminUserName: '',
        sequnceNum: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {}
      // rules: {
      //   schoolId: [
      //     {required: true, message: '请您输入学校id', trigger: 'blur'},
      //     {max: 32, message: '最多能输入32个字', trigger: 'blur'},
      //
      //   ],
      //   schoolName: [
      //     {required: true, message: '请您输入学校', trigger: 'blur'},
      //     {max: 255, message: '最多能输入255个字', trigger: 'blur'},
      //
      //   ],
      //   placeNums: [
      //     {required: true, message: '请您输入编号', trigger: 'blur'},
      //     {max: 32, message: '最多能输入32个字', trigger: 'blur'},
      //
      //   ],
      //   placeName: [
      //     {required: true, message: '请您输入名称', trigger: 'blur'},
      //     {max: 64, message: '最多能输入64个字', trigger: 'blur'},
      //
      //   ],
      //   placeGps: [
      //     {max: 128, message: '最多能输入128个字', trigger: 'blur'},
      //
      //   ],
      //   placeRfid: [
      //     {max: 32, message: '最多能输入32个字', trigger: 'blur'},
      //
      //   ],
      //   placeScan: [
      //     {max: 255, message: '最多能输入255个字', trigger: 'blur'},
      //
      //   ],
      //   securityContent: [
      //     {max: 4000, message: '最多能输入4000个字', trigger: 'blur'},
      //
      //   ],
      //   adminDepartId: [
      //     {max: 32, message: '最多能输入32个字', trigger: 'blur'},
      //
      //   ],
      //   adminDepartName: [
      //     {max: 64, message: '最多能输入64个字', trigger: 'blur'},
      //
      //   ],
      //   adminUserId: [
      //     {max: 32, message: '最多能输入32个字', trigger: 'blur'},
      //
      //   ],
      //   adminUserName: [
      //     {max: 32, message: '最多能输入32个字', trigger: 'blur'},
      //
      //   ],
      //   sequnceNum: [
      //     {validator: validation.number, trigger: 'blur'},
      //
      //   ],
      // }
    }
  },
  computed: {

    pageState () {
      return this.$route.params.type
    }
  },
  created () {
    this.getDetail(this.$route.params.id)
    getTheSchoolRoute().then(res => {
      this.optionsList = coverData(res.data.data || [], 'routeName', 'checkRouteId')
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
              this.$message.success('新增成功')
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


    // 地图搜索
    placeGpsSearch (e) {
      this.placeGpsKeyword = this.this.placeGpsModel
      let placeGpsMap = this.$refs.placeGpsBaidumap.map.gf
      this.formData.placeGps = placeGpsMap.lat + ',' + placeGpsMap.lng + ',' + this.formData.placeGps
    },
    placeGpsMapWinOpen () {
      this.placeGpsShow = true
    },
    // 地图
    placeGpsMapWinClose () {
      this.placeGpsShow = false
    },
    placeGpsPoint (type) {
      let placeGpsCurrPoint = type.point
      this.formData.placeGps = placeGpsCurrPoint.lat + ',' + placeGpsCurrPoint.lng + ',' + this.formData.placeGps
    },


    getDetail (paramsId) {
      if (this.pageState !== 'add') {
        api.getObj(paramsId).then(res => {
          if (res.data.resultCode === '000000') {
            this.formData = res.data.data
            let placeGpsData = this.data.placeGps.split(',')
            this.formData.placeGps = placeGpsData[2]
            this.lng = this.placeGpsMarkerPoint.lng = placeGpsData[1]
            this.lat = this.placeGpsMarkerPoint.lat = placeGpsData[0]
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
