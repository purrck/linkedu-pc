<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="安防名称 *  :" prop="securityOrganizationName">
              <el-input class="input-v2-rao" v-model="formData.securityOrganizationName"
                        maxlength="128"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="安防类型 *  :" prop="securityOrganizationTypeCode">
              <el-select class="select-v2-rao" v-model="formData.securityOrganizationTypeCode" placeholder="请您选择">
                <el-option v-for="securityOrganizationTypeCodeItem in securityOrganizationTypeCodeOptions"
                           :key="securityOrganizationTypeCodeItem.name"
                           :label="securityOrganizationTypeCodeItem.label"
                           :value="securityOrganizationTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="介绍 *  :" prop="description"
                          class="orgIntroduction">
              <editor v-model="formData.description" :true-height="350"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="图片 :" prop="imagePath">
              <upload :many="1" v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>

          </el-col>
          <el-col :span="24">
            <el-form-item label="地址 :" prop="organizationAddressGps" class="orgIntroduction">
              <el-input v-model="searchAddress">
                <el-button slot="append" icon="el-icon-search"
                           @click="organizationAddressGpsSearch"></el-button>
              </el-input>
              <baidu-map class="bm-view" :center="{lng: 113.46466, lat: 23.178076}" :zoom="19"
                         ak="tGtrBb54ZCSAd91zVdjFvnn6I6ZVD7zy" :scroll-wheel-zoom="true"
                         ref="organizationAddressGpsBaidumap" @click="organizationAddressGpsPoint">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-geolocation>
                <bm-marker :position="markerPoint" :dragging="true"
                           @click="organizationAddressGpsMapWinOpen">

                </bm-marker>
                <bm-info-window :show="organizationAddressGpsShow" @close="organizationAddressGpsMapWinClose"
                                @open="organizationAddressGpsMapWinOpen"></bm-info-window>
                <bm-local-search :panel="false" :keyword="addressKeyword"
                                 :auto-viewport="true"
                                 :location="organizationAddressGpsLocation"></bm-local-search>
              </baidu-map>
            </el-form-item>


          </el-col>

          <el-col :span="24">
            <el-form-item label="详细地址 :" prop="organizationAddressGpsKeyword">
              <p>
                <span v-show="lng&&lat">{{`经度：${lng}，纬度：${lat},区域：${address}`}}</span>
              </p>
              <el-input class="input-v2-rao" v-model="addressDetail"
                        maxlength="32"></el-input>

            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="电话 *  :" prop="organizationPhonenum">
              <el-input class="input-v2-rao" v-model="formData.organizationPhonenum"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="更新时间 :" prop="refreshedDt">
              <el-date-picker class="date-v2-rao" v-model="formData.refreshedDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <!--                  <el-col :span="24">-->
          <!--                    <el-form-item label="序号 :" prop="sequnceNum">-->
          <!--                      <el-input class="input-v2-rao" v-model="formData.sequnceNum"-->
          <!--                                maxlength="11"></el-input>-->
          <!--                    </el-form-item>-->
          <!--                  </el-col>-->
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="安防名称 *  :" prop="securityOrganizationName">
              <el-input class="input-v2-rao" v-model="formData.securityOrganizationName"
                        maxlength="128"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="安防类型 *  :" prop="securityOrganizationTypeCode">
              <el-select class="select-v2-rao" v-model="formData.securityOrganizationTypeCode" placeholder="请您选择">
                <el-option v-for="securityOrganizationTypeCodeItem in securityOrganizationTypeCodeOptions"
                           :key="securityOrganizationTypeCodeItem.name"
                           :label="securityOrganizationTypeCodeItem.label"
                           :value="securityOrganizationTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="介绍 *  :" prop="description"
                          class="orgIntroduction">
              <editor v-model="formData.description" :true-height="350"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="图片 :">
              <upload :many="1" v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="地址 :" prop="organizationAddressGps">
              <el-input v-model="searchAddress">
                <el-button slot="append" icon="el-icon-search"
                           @click.stop="organizationAddressGpsSearch"></el-button>
              </el-input>
              <baidu-map class="bm-view" :center="{lng: 113.46466, lat: 23.178076}" :zoom="19"
                         ak="tGtrBb54ZCSAd91zVdjFvnn6I6ZVD7zy" :scroll-wheel-zoom="true"
                         ref="organizationAddressGpsBaidumap" @click="organizationAddressGpsPoint">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-geolocation>
                <bm-marker :position="markerPoint" :dragging="true"
                           @click="organizationAddressGpsMapWinOpen">
                  <bm-info-window :show="organizationAddressGpsShow" @close="organizationAddressGpsMapWinClose"
                                  @open="organizationAddressGpsMapWinOpen"></bm-info-window>
                </bm-marker>
                <bm-local-search :panel="false" :keyword="addressKeyword"
                                 :auto-viewport="true"
                                 :location="organizationAddressGpsLocation"></bm-local-search>
              </baidu-map>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="电话 *  :" prop="organizationPhonenum">
              <el-input class="input-v2-rao" v-model="formData.organizationPhonenum"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="更新时间 :" prop="refreshedDt">
              <el-date-picker class="date-v2-rao" v-model="formData.refreshedDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>

        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">

            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <div class="detail-title-v2 ">
                  {{formData.securityOrganizationName}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.securityOrganizationName">
                    <el-form-item label="安防名称 :" prop="securityOrganizationName">
                      <span v-if="formData.securityOrganizationName">{{formData.securityOrganizationName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="安防类型 :" prop="securityOrganizationTypeCode">
                            <span v-if="formData.securityOrganizationTypeCodeStr"
                                  :style="{'color':formData.securityOrganizationTypeCodeStr.split(';')[1]}">{{formData.securityOrganizationTypeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.description">
                    <el-form-item label="介绍 :" prop="description">
                      <span v-if="formData.description" v-html="formData.description"></span>
                    </el-form-item>
                  </div>


                  <div class="p100">
                    <el-form-item label="图片 :" prop="imagePath">
                      <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                    </el-form-item>
                  </div>

                  <div class="p100">
                    <el-form-item label="地址 :" prop="organizationAddressGps" >
                      {{addressKeyword}}
                      <baidu-map class="bm-view" :center="{lng: lng, lat: lat}" :zoom="19"

                                 ak="tGtrBb54ZCSAd91zVdjFvnn6I6ZVD7zy" :scroll-wheel-zoom="true">
                        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                        <bm-marker :position="markerPoint" :dragging="true"
                                   @click="organizationAddressGpsMapWinOpen">
                          <bm-info-window :show="organizationAddressGpsShow"
                                          @close="organizationAddressGpsMapWinClose"
                                          @open="organizationAddressGpsMapWinOpen"></bm-info-window>
                        </bm-marker>
                      </baidu-map>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.organizationPhonenum">
                    <el-form-item label="电话 :" prop="organizationPhonenum">
                      <span v-if="formData.organizationPhonenum">{{formData.organizationPhonenum}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.organizationAddressGps">
                    <el-form-item label="详情地址 :" prop="organizationAddressGps">
                      <span v-if="formData.organizationAddressGps">{{formData.organizationAddressGps.split(',')[2]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="更新时间 :" prop="refreshedDt">
                      <span v-if="formData.refreshedDt"> {{formData.refreshedDt}}</span>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form>
          </el-col>

          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly">
              <ul>
                <li>
                  <router-link :to="`/safety/listSecurityOrganizationContact?securityOrganizationId=`+
                                  formData.securityOrganizationId">
                    <i class="iconfont icon-icon_liebiao"></i>安全联防联系人
                  </router-link>
                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>

      <div class="text-center mt-30">
        <el-button v-if="pageState === 'edit'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="medium"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="medium"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="medium"
                   @click="goBack">返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "./securityorganizationUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import {BaiduMap, BmNavigation, BmMarker, BmInfoWindow, BmGeolocation, BmLocalSearch,} from 'vue-baidu-map';

  export default {
    components: {BaiduMap, BmNavigation, BmMarker, BmInfoWindow, BmGeolocation, BmLocalSearch, editor, upload, uploads},
    data() {
      return {
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        securityOrganizationTypeCodeOptions: [{"label": "全部", "name": ""}], securityOrganizationTypeCode: null,
        imagePathFileList: [],
        imagePathFileType: '',
        addressKeyword: "",
        searchAddress: "",
        markerPoint: {
          lng: "",
          lat: ""
        },
        organizationAddressGpsLocation: "",
        organizationAddressGpsShow: false,
        lng: "",
        lat: "",
        address: "",
        addressDetail: "",
        formData: {
          securityOrganizationId: '',
          securityOrganizationName: "",
          securityOrganizationTypeCode: "",
          description: "",
          imagePath: "",
          organizationAddressGps: "",
          organizationPhonenum: "",
          refreshedDt: "",
          sequnceNum: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          securityOrganizationName:
            [
              {required: true, message: "请您输入安防名称", trigger: "blur"},
              {max: 128, message: "最多能输入128个字", trigger: "blur"},

            ],
          securityOrganizationTypeCode:
            [
              {required: true, message: "请您输入安防类型", trigger: "blur"},
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          description:
            [
              {required: true, message: "请您输入介绍", trigger: "blur"},
              {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

            ],
          organizationAddressGps:
            [
              {required: true, message: "请您选择地址确认经纬度", trigger: "blur"},

            ],
          organizationPhonenum:
            [
              {required: true, message: "请您输入电话", trigger: "blur"},
              {max: 11, message: "最多能输入11个数字", trigger: "blur"},
              {validator: validation.mobileNum, trigger: "blur"},

            ],
          refreshedDt:
            [],
          sequnceNum:
            [
              {validator: validation.number, trigger: "blur"},

            ],
        }
      }
    },
    computed: {
      detailAddressGps(){
        let str = `${this.lng},${this.lat},${this.address}${this.searchAddress}${this.addressDetail}`;
        return str
      },
      pageState() {
        return this.$route.params.type;
      }
    },
    created() {
      this.getDetail(this.$route.params.id);
      commonApi.getCodeIntType("securityOrganizationType").then(res => {
        let viewList = res.data.data || [];
        for (let securityOrganizationTypeItem of viewList) {
          this.securityOrganizationTypeCodeOptions.push({
            "label": securityOrganizationTypeItem.codeDesc,
            "name": securityOrganizationTypeItem.codeId
          });
        }
      });
    },
    methods: {
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        this.formData.organizationAddressGps = this.detailAddressGps;
        set[formName].validate(valid => {
          if (this.pageState === 'edit' && valid) {
            this.formLoading = true;
            api.putObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("发布成功");
                this.goBack()
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            })
          } else if (this.pageState === 'add' && valid) {
            this.formLoading = true;
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改00成功");
                this.goBack()
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            })
          }
        })
        this.isLoaded = false;
      },
      //获取图片上传信息
      uploadData(res) {
        this.formData.imagePath = res;
      },
      // 地图搜索
      organizationAddressGpsSearch(e) {
        //搜索关键字，Keyword改变 会引起地图搜索
        this.addressKeyword = this.searchAddress;
        //搜索到的gps定位
        let searchGps = this.$refs.organizationAddressGpsBaidumap.map.gf;

        this.formData.organizationAddressGps = searchGps.lat + "," + searchGps.lng + "," + this.formData.searchAddress;
      },

      organizationAddressGpsMapWinOpen() {
        this.organizationAddressGpsShow = true;
      },

      // 地图
      organizationAddressGpsMapWinClose() {
        this.organizationAddressGpsShow = false;
      },

      organizationAddressGpsPoint(type) {
        console.log('触发了点击')
        let currPoint = type.point;
        this.lat = currPoint.lat;
        this.lng = currPoint.lng;
        this.markerPoint = currPoint
        var geoc = new BMap.Geocoder()
        this.getLocaltionMsg(geoc, currPoint)
      },
      getLocaltionMsg (geoc, point) {
        let _this = this
        geoc.getLocation(point, function (rs) {
          console.log(rs);
          let address = rs.address;
          _this.address = address
        })
      },
      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
              let organizationAddressGpsData = this.formData.organizationAddressGps.split(',');
              this.markerPoint = {
                lng: organizationAddressGpsData[0],
                lat: organizationAddressGpsData[1]
              };
              this.address = organizationAddressGpsData[2];
              this.lng = this.markerPoint.lng = organizationAddressGpsData[0];
              this.lat = this.markerPoint.lat = organizationAddressGpsData[1];
            }
            this.isLoaded = false;
          })
        }
      },
      goBack() {
        this.$router.go(-1);
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
