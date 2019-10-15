<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="家访标题 *  :" prop="familyVisitTitle">
              <el-input class="input-v2-rao" v-model="formData.familyVisitTitle"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="家访目的 :" prop="visitPurposeCode">
              <el-select class="select-v2-rao" v-model="formData.visitPurposeCode" placeholder="请您选择">
                <el-option v-for="visitPurposeCodeItem in visitPurposeCodeOptions"
                           :key="visitPurposeCodeItem.name"
                           :label="visitPurposeCodeItem.label" :value="visitPurposeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col :span="24">-->
            <!--<el-form-item label="发起时间 :" prop="publishedDt">-->
              <!--<el-date-picker class="date-v2-rao" v-model="formData.publishedDt" type="datetime"-->
                              <!--placeholder="选择日期"-->
                              <!--value-format="yyyy-MM-dd HH:mm"-->
                              <!--:picker-options="pickTime">-->
              <!--</el-date-picker>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="24">
            <el-form-item label="执行时间 :" prop="visitedBeginDt">
              <el-date-picker class="date-v2-rao" v-model="formData.visitedBeginDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="结束时间 :" prop="visitedEndDt">
              <el-date-picker class="date-v2-rao" v-model="formData.visitedEndDt" type="datetime"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="家庭住址 :" prop="familyAddressGps" class="orgIntroduction">
              <el-input v-model="familyAddressGpsModel">
                <el-button slot="append" icon="el-icon-search"
                           @click="familyAddressGpsSearch"></el-button>
              </el-input>
              <baidu-map class="bm-view" :center="{lng: 113.46466, lat: 23.178076}" :zoom="19"
                         ak="tGtrBb54ZCSAd91zVdjFvnn6I6ZVD7zy" :scroll-wheel-zoom="true"
                         ref="familyAddressGpsBaidumap" @click="familyAddressGpsPoint">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-geolocation>
                <bm-marker :position="familyAddressGpsMarkerPoint" :dragging="true"
                           @click="familyAddressGpsMapWinOpen">
                  <bm-info-window :show="familyAddressGpsShow" @close="familyAddressGpsMapWinClose"
                                  @open="familyAddressGpsMapWinOpen"></bm-info-window>
                </bm-marker>
                <bm-local-search :panel="false" :keyword="familyAddressGpsKeyword"
                                 :auto-viewport="true"
                                 :location="familyAddressGpsLocation"></bm-local-search>
              </baidu-map>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="线上线下 :" prop="familyVisitModeCode">
              <el-select class="select-v2-rao" v-model="formData.familyVisitModeCode" placeholder="请您选择">
                <el-option v-for="familyVisitModeCodeItem in familyVisitModeCodeOptions"
                           :key="familyVisitModeCodeItem.name"
                           :label="familyVisitModeCodeItem.label" :value="familyVisitModeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>.
          <el-col :span="24">
            <el-form-item label="家访学生 :" prop="studentId"  class="orgIntroduction">
              <send-object :header="header" @finish="finish" ></send-object>
            </el-form-item>
          </el-col>
          <!--<el-col :span="24">-->
            <!--<el-form-item label="学生id :" prop="studentId">-->
              <!--<el-input class="input-v2-rao" v-model="formData.studentId"-->
                        <!--maxlength="32"></el-input>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="24">
            <el-form-item label="学生 :" prop="studentName">
              <el-input class="input-v2-rao" v-model="formData.studentName"
                      disabled   maxlength="32"></el-input>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="家访标题 *  :" prop="familyVisitTitle">
              <el-input class="input-v2-rao" v-model="formData.familyVisitTitle"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="家访目的 :" prop="visitPurposeCode">
              <el-select class="select-v2-rao" v-model="formData.visitPurposeCode" placeholder="请您选择">
                <el-option v-for="visitPurposeCodeItem in visitPurposeCodeOptions"
                           :key="visitPurposeCodeItem.name"
                           :label="visitPurposeCodeItem.label" :value="visitPurposeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="家庭住址 :" prop="familyAddressGps">
              <el-input v-model="familyAddressGpsModel">
                <el-button slot="append" icon="el-icon-search"
                           @click="familyAddressGpsSearch"></el-button>
              </el-input>
              <baidu-map class="bm-view" :center="{lng: 113.46466, lat: 23.178076}" :zoom="19"
                         ak="tGtrBb54ZCSAd91zVdjFvnn6I6ZVD7zy" :scroll-wheel-zoom="true"
                         ref="familyAddressGpsBaidumap" @click="familyAddressGpsPoint">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-geolocation>
                <bm-marker :position="familyAddressGpsMarkerPoint" :dragging="true"
                           @click="familyAddressGpsMapWinOpen">
                  <bm-info-window :show="familyAddressGpsShow" @close="familyAddressGpsMapWinClose"
                                  @open="familyAddressGpsMapWinOpen"></bm-info-window>
                </bm-marker>
                <bm-local-search :panel="false" :keyword="familyAddressGpsKeyword"
                                 :auto-viewport="true"
                                 :location="familyAddressGpsLocation"></bm-local-search>
              </baidu-map>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="线上线下 :" prop="familyVisitModeCode">
              <el-select class="select-v2-rao" v-model="formData.familyVisitModeCode" placeholder="请您选择">
                <el-option v-for="familyVisitModeCodeItem in familyVisitModeCodeOptions"
                           :key="familyVisitModeCodeItem.name"
                           :label="familyVisitModeCodeItem.label" :value="familyVisitModeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="家访记录 :" prop="visitedContent"
                          class="orgIntroduction">
              <editor v-model="formData.visitedContent" :true-height="350"/>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="拒绝原因 :" prop="refusedReason">
              <el-input class="input-v2-rao" v-model="formData.refusedReason"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="线上群id :" prop="visitedImNum">
              <el-input class="input-v2-rao" disabled v-model="formData.visitedImNum"
                        maxlength="32"></el-input>
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
                  {{formData.familyVisitTitle}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.familyVisitTitle">
                    <el-form-item label="家访标题 :" prop="familyVisitTitle">
                      <span v-if="formData.familyVisitTitle">{{formData.familyVisitTitle}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="家访目的 :" prop="visitPurposeCode">
                            <span v-if="formData.visitPurposeCodeStr"
                                  :style="{'color':formData.visitPurposeCodeStr.split(';')[1]}">{{formData.visitPurposeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <!--<div class="p50">-->
                    <!--<el-form-item label="发起时间 :" prop="publishedDt">-->
                      <!--<span v-if="formData.publishedDt"> {{formData.publishedDt}}</span>-->
                    <!--</el-form-item>-->
                  <!--</div>-->
                  <div class="p50">
                    <el-form-item label="执行时间 :" prop="visitedBeginDt">
                      <span v-if="formData.visitedBeginDt"> {{formData.visitedBeginDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="结束时间 :" prop="visitedEndDt">
                      <span v-if="formData.visitedEndDt"> {{formData.visitedEndDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p100">
                    <el-form-item label="家庭住址 :" prop="familyAddressGps">
                      {{familyAddressGpsKeyword}}
                      <baidu-map class="bm-view" :center="{lng: lng, lat: lat}" :zoom="19"
                                 v-if="formData.familyAddressGps"
                                 ak="tGtrBb54ZCSAd91zVdjFvnn6I6ZVD7zy" :scroll-wheel-zoom="true">
                        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                        <bm-marker :position="familyAddressGpsMarkerPoint" :dragging="true"
                                   @click="familyAddressGpsMapWinOpen">
                          <bm-info-window :show="familyAddressGpsShow"
                                          @close="familyAddressGpsMapWinClose"
                                          @open="familyAddressGpsMapWinOpen"></bm-info-window>
                        </bm-marker>
                      </baidu-map>
                    </el-form-item>
                  </div>

                  <div class="p50">
                    <el-form-item label="线上线下 :" prop="familyVisitModeCode">
                            <span v-if="formData.familyVisitModeCodeStr"
                                  :style="{'color':formData.familyVisitModeCodeStr.split(';')[1]}">{{formData.familyVisitModeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="家访状态 :" prop="familyVisitStatusCode">
                            <span v-if="formData.familyVisitStatusCodeStr"
                                  :style="{'color':formData.familyVisitStatusCodeStr.split(';')[1]}">{{formData.familyVisitStatusCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.visitedContent">
                    <el-form-item label="家访记录 :" prop="visitedContent">
                      <span v-if="formData.visitedContent" v-html="formData.visitedContent"></span>
                    </el-form-item>
                  </div>

                  <div class="p50" v-if="formData.refusedReason">
                    <el-form-item label="拒绝原因 :" prop="refusedReason">
                      <span v-if="formData.refusedReason">{{formData.refusedReason}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.visitedImNum">
                    <el-form-item label="线上群id :" prop="visitedImNum">
                      <span v-if="formData.visitedImNum">{{formData.visitedImNum}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.studentName">
                    <el-form-item label="学生 :" prop="studentName">
                      <span v-if="formData.studentName">{{formData.studentName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.teacherName">
                    <el-form-item label="教师 :" prop="teacherName">
                      <span v-if="formData.teacherName">{{formData.teacherName}}</span>
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
                  <router-link :to="`/basedata/listStudentFamilyVisitResult?familyVisitId=`+
                                  formData.familyVisitId">
                    <i class="iconfont icon-icon_liebiao"></i>学生家访记录
                  </router-link>
                </li>
              </ul>
            </div>
          </el-col>
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
  import api from "./studentfamilyvisitUrl";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import {BaiduMap, BmGeolocation, BmInfoWindow, BmLocalSearch, BmMarker, BmNavigation,} from 'vue-baidu-map';
  import SendObject from "../../../components/sendObject/testSendObject";

  export default {
    components: {
      SendObject,
      BaiduMap,
      BmNavigation,
      BmMarker,
      BmInfoWindow,
      BmGeolocation,
      BmLocalSearch,
      editor,
      upload,
      uploads
    },
    data() {
      return {
        formLoading: false,
        header:[
          {
            title: '1、学段',
            isActive: true,
            code: 'segment',
            children: [
              {
                isCheckAll: false,
                checked: [],
                children: [],
                subTitle: '学段',
                subTitleType: 'segment',
                nextType: 'grade',
                single: true,
                isActive: false,
                url: '/userapp/base/segmentGrade?type=1'
              },
            ]
          },
          {
            title: '2、选择年级',
            isActive: false,
            code: 'grade',
            children: [
              {
                isCheckAll: false,
                checked: [],
                children: [],
                subTitle: '年级',
                subTitleType: 'grade',
                nextType: 'class',
                single: true,
                isActive: false,
                url: '/userapp/base/segmentGrade?type=2'
              },
            ]
          },
          {
            title: '3、选择班级',
            isActive: false,
            code: 'class',
            children: [
              {
                isCheckAll: false,
                checked: [],
                children: [],
                subTitle: '班级',
                single: true,
                subTitleType: 'class',
                nextType: 'students',
                isActive: false,
                url: ''
              },
            ]
          },
          {
            title: '4、选择学生',
            isActive: false,
            code: 'students',
            children: [
              {
                isCheckAll: false,
                checked: [],
                children: [],
                subTitle: '学生',
                subTitleType: 'students',
                nextType: 'parents',
                single: true,
                isActive: false,
                url: ''
              },
            ]
          },
        ],
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        visitPurposeCodeOptions: [{"label": "全部", "name": ""}], visitPurposeCode: null,
        familyAddressGpsKeyword: "",
        familyAddressGpsModel: "",
        familyAddressGpsMarkerPoint: {
          lng: "",
          lat: ""
        },
        familyAddressGpsLocation: "",
        familyAddressGpsShow: false,
        lng: "",
        lat: "",
        familyVisitModeCodeOptions: [{"label": "全部", "name": ""}], familyVisitModeCode: null,
        familyVisitStatusCodeOptions: [{"label": "全部", "name": ""}], familyVisitStatusCode: null,
        formData: {
          familyVisitId: '',
          familyVisitTitle: "",
          visitPurposeCode: "",
          familyAddressGps: "",
          familyVisitModeCode: "",
          visitedContent: "",
          refusedReason: "",
          visitedImNum: "",
          studentName: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          familyVisitTitle:
            [
              {required: true, message: "请您输入家访标题", trigger: "blur"},
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          visitPurposeCode:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          publishedDt:
            [],
          visitedBeginDt:
            [],
          visitedEndDt:
            [],
          familyAddressGps:
            [
              {max: 255, message: "最多能输入255个字", trigger: "blur"},

            ],
          familyVisitModeCode:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          studentId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          studentName:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

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
      this.getDetail(this.$route.params.id);
      commonApi.getCodeIntType("visitPurpose").then(res => {
        let viewList = res.data.data || [];
        for (let visitPurposeItem of viewList) {
          this.visitPurposeCodeOptions.push({
            "label": visitPurposeItem.codeDesc,
            "name": visitPurposeItem.codeId
          });
        }
      });
      commonApi.getCodeIntType("familyVisitMode").then(res => {
        let viewList = res.data.data || [];
        for (let familyVisitModeItem of viewList) {
          this.familyVisitModeCodeOptions.push({
            "label": familyVisitModeItem.codeDesc,
            "name": familyVisitModeItem.codeId
          });
        }
      });
      commonApi.getCodeIntType("familyVisitStatus").then(res => {
        let viewList = res.data.data || [];
        for (let familyVisitStatusItem of viewList) {
          this.familyVisitStatusCodeOptions.push({
            "label": familyVisitStatusItem.codeDesc,
            "name": familyVisitStatusItem.codeId
          });
        }
      });
    },
    methods: {
      finish(res) {
        console.log(res);

        this.formData.className = res.header[3].children[0].subTitle;
        // // this.formData.studentId = res.header[3].children[0].checked
        this.formData.studentUserId = res.header[3].children[0].checked;
        this.formData.classId = res.header[2].children[0].checked;

        res.header[3].children[0].children.forEach(res => {
          if (res.id === this.formData.studentUserId) {
            this.formData.studentName = res.name;
          }
        });
        //parentUserId className classId
        // this.formData.parentUserId = res.header[4].children[0].checked;
        // res.header[4].children[0].children.forEach(res => {
        //   if (res.id === this.formData.parentUserId) {
        //     this.formData.parentName = res.name;
        //   }
        // });
      },
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          if (this.pageState === 'edit' && valid) {
            this.formLoading = true;
            api.putObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
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
                this.$message.success("修改成功");
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
      // 地图搜索
      familyAddressGpsSearch(e) {
        this.familyAddressGpsKeyword = this.this.familyAddressGpsModel;
        let familyAddressGpsMap = this.$refs.familyAddressGpsBaidumap.map.gf;
        this.formData.familyAddressGps = familyAddressGpsMap.lat + "," + familyAddressGpsMap.lng + "," + this.formData.familyAddressGps;
      },

      familyAddressGpsMapWinOpen() {
        this.familyAddressGpsShow = true;
      },

      // 地图
      familyAddressGpsMapWinClose() {
        this.familyAddressGpsShow = false;
      },

      familyAddressGpsPoint(type) {
        console.log(this.$refs.familyAddressGpsBaidumap);
        let familyAddressGpsCurrPoint = type.point;
        var geoc = new BMap.Geocoder();
        this.formData.familyAddressGps = familyAddressGpsCurrPoint.lat + "," + familyAddressGpsCurrPoint.lng + "," + this.formData.familyAddressGps;
      },
      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
              let familyAddressGpsData = this.data.familyAddressGps.split(',');
              this.formData.familyAddressGps = familyAddressGpsData[2];
              this.lng = this.familyAddressGpsMarkerPoint.lng = familyAddressGpsData[1];
              this.lat = this.familyAddressGpsMarkerPoint.lat = familyAddressGpsData[0];
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



  .bm-view {
    width: 640px;
    height: 300px;
    margin-top: 10px;
  }

  .fush-btn {
    margin: 0 15px
  }
</style>
