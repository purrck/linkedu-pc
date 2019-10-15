<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="12">
            <el-form-item label="会议主题 *  :" prop="meetingTopic">
              <el-input v-model="formData.meetingTopic" maxlength="255"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="会议内容 *  :" prop="content">
              <el-input v-model="formData.content" maxlength="4000"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="开会时间 *  :" prop="meetingBeginDt">
              <el-date-picker v-model="formData.meetingBeginDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="结会时间 :" prop="meetingEndDt">
              <el-date-picker v-model="formData.meetingEndDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime">
              </el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="参会人数 :" prop="participantsNum">
              <el-input v-model="formData.participantsNum" maxlength="11"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="付款金额 :" prop="payment">
              <el-input v-model="formData.payment" maxlength="9"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="会议状态 :" prop="meetingStatusCode">
              <el-select v-model="formData.meetingStatusCode" placeholder="请您选择">
                <el-option v-for="meetingStatusCodeItem in meetingStatusCodeOptions"
                           :key="meetingStatusCodeItem.name"
                           :label="meetingStatusCodeItem.label" :value="meetingStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="开会中 *  :" prop="isOpening">
              <el-select v-model="formData.isOpening" placeholder="请您选择">
                <el-option v-for="isOpeningItem in ynOptions" :key="isOpeningItem.name"
                           :label="isOpeningItem.label" :value="isOpeningItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="会议主图 *  :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="会议文件 :" prop="filePath">
              <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="联系电话 :" prop="contactPhonenum">
              <el-input v-model="formData.contactPhonenum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="联系邮件 :" prop="contactEmail">
              <el-input v-model="formData.contactEmail" maxlength="64"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="会议地址 :" prop="localGps">
              <el-input v-model="localGpsModel">
                <el-button slot="append" icon="el-icon-search"
                           @click="localGpsSearch"></el-button>
              </el-input>
              <baidu-map class="bm-view" :center="{lng: 113.46466, lat: 23.178076}" :zoom="19"
                         ak="tGtrBb54ZCSAd91zVdjFvnn6I6ZVD7zy" :scroll-wheel-zoom="true"
                         ref="localGpsBaidumap" @click="localGpsPoint">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-geolocation>
                <bm-marker :position="localGpsMarkerPoint" :dragging="true"
                           @click="localGpsMapWinOpen">
                  <bm-info-window :show="localGpsShow" @close="localGpsMapWinClose"
                                  @open="localGpsMapWinOpen"></bm-info-window>
                </bm-marker>
                <bm-local-search :panel="false" :keyword="localGpsKeyword"
                                 :auto-viewport="true"
                                 :location="localGpsLocation"></bm-local-search>
              </baidu-map>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="视频 :" prop="meetingVideo">
              <uploads :data="formData.meetingVideo" @fileMessage="getVideoMessage"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="语音 :" prop="meetingVoice">
              <uploads :data="formData.meetingVoice" @fileMessage="getVoiceMessage"/>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="会议二维码 :" prop="qrcodeScan">
              <el-input v-model="formData.qrcodeScan" maxlength="255"></el-input>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="会议主题 *  :" prop="meetingTopic">
              <el-input v-model="formData.meetingTopic" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="会议内容 *  :" prop="content" class="orgIntroduction">
              <editor v-model="formData.content" :true-height="350"/>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="开会时间 *  :" prop="meetingBeginDt">
              <el-date-picker v-model="formData.meetingBeginDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="结会时间 :" prop="meetingEndDt">
              <el-date-picker v-model="formData.meetingEndDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="付款金额 :" prop="payment">
              <el-input v-model="formData.payment" maxlength="9"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="会议状态 :" prop="meetingStatusCode">
              <el-select v-model="formData.meetingStatusCode" placeholder="请您选择">
                <el-option v-for="meetingStatusCodeItem in meetingStatusCodeOptions"
                           :key="meetingStatusCodeItem.name"
                           :label="meetingStatusCodeItem.label" :value="meetingStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="开会中 *  :" prop="isOpening">
              <el-select v-model="formData.isOpening" placeholder="请您选择">
                <el-option v-for="isOpeningItem in ynOptions" :key="isOpeningItem.name"
                           :label="isOpeningItem.label" :value="isOpeningItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="会议主图 *  :" prop="imagePath">
              <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="会议文件 :" prop="filePath">
              <uploads :data="formData.filePath" @fileMessage="getFileMessage"/>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="联系电话 :" prop="contactPhonenum">
              <el-input v-model="formData.contactPhonenum" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="联系邮件 :" prop="contactEmail">
              <el-input v-model="formData.contactEmail" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="会议地址 :" prop="localGps">
              <el-input v-model="localGpsModel">
                <el-button slot="append" icon="el-icon-search"
                           @click="localGpsSearch"></el-button>
              </el-input>
              <baidu-map class="bm-view" :center="{lng: 113.46466, lat: 23.178076}" :zoom="19"
                         ak="tGtrBb54ZCSAd91zVdjFvnn6I6ZVD7zy" :scroll-wheel-zoom="true"
                         ref="localGpsBaidumap" @click="localGpsPoint">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT"></bm-geolocation>
                <bm-marker :position="localGpsMarkerPoint" :dragging="true"
                           @click="localGpsMapWinOpen">
                  <bm-info-window :show="localGpsShow" @close="localGpsMapWinClose"
                                  @open="localGpsMapWinOpen"></bm-info-window>
                </bm-marker>
                <bm-local-search :panel="false" :keyword="localGpsKeyword"
                                 :auto-viewport="true"
                                 :location="localGpsLocation"></bm-local-search>
              </baidu-map>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="会议二维码 :" prop="qrcodeScan">
              <el-input v-model="formData.qrcodeScan" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="100px"
                     :inline="false" :model="formData" size="small" class="flex wrap row">
              <div class="p50 ">
                <div class="detail-title-v2 ">
                  基本信息
                </div>
                <div class="detail-item-v2">
                  <el-form-item label="会议主题 :" prop="meetingTopic" class="p50 ">
                    <span v-if="formData.meetingTopic">{{formData.meetingTopic}}</span>
                  </el-form-item>
                  <el-form-item label="开会时间 :" prop="meetingBeginDt" class="p50 ">
                    <span v-if="formData.meetingBeginDt"> {{formData.meetingBeginDt}}</span>
                  </el-form-item>
                  <el-form-item label="开会时间 :" prop="meetingBeginDt" class="p50 ">
                    <span v-if="formData.meetingBeginDt"> {{formData.meetingBeginDt}}</span>
                  </el-form-item>
                  <el-form-item label="开会时间 :" prop="meetingBeginDt" class="p50 ">
                    <span v-if="formData.meetingBeginDt"> {{formData.meetingBeginDt}}</span>
                  </el-form-item>
                  <el-form-item label="开会时间 :" prop="meetingBeginDt" class="p50 ">
                    <span v-if="formData.meetingBeginDt"> {{formData.meetingBeginDt}}</span>
                  </el-form-item>
                </div>
              </div>

              <div class="p50 ">
                <div class="detail-title-v2 ">
                  基本信息
                </div>
                <div class="detail-item-v2">
                  <el-form-item label="会议内容 :" prop="content">
                    <span v-if="formData.content" v-html="formData.content"></span>
                  </el-form-item>
                </div>
              </div>

              <div class="p50 ">
                <div class="detail-title-v2 ">
                  基本信息
                </div>
                <div class="detail-item-v2">


                  <el-col :span="12" v-if="formData.participantsNum">
                    <el-form-item label="参会人数 :" prop="participantsNum">
                      <span v-if="formData.participantsNum">{{formData.participantsNum}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" v-if="formData.payment">
                    <el-form-item label="付款金额 :" prop="payment">
                      <span v-if="formData.payment">{{formData.payment}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12">
                    <el-form-item label="会议状态 :" prop="meetingStatusCode">
                  <span v-if="formData.meetingStatusCodeStr"
                        :style="{'color':formData.meetingStatusCodeStr.split(';')[1]}">{{formData.meetingStatusCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </el-col>


                  <el-col :span="12">
                    <el-form-item label="开会中 :" prop="isOpening">
                      <el-switch v-model="formData.isOpening == 'Y'" disabled></el-switch>
                    </el-form-item>
                  </el-col>
                </div>
              </div>

              <div class="p50 ">
                <div class="detail-title-v2 ">
                  基本信息
                </div>
                <div class="detail-item-v2">
                  <el-col :span="24">
                    <el-form-item label="会议主图 :" prop="imagePath">
                      <img :src="formData.imagePath" alt="" width="200px" height="200px" v-show="formData.imagePath">
                    </el-form-item>
                  </el-col>


                  <el-col :span="24" v-if="formData.filePath">
                    <el-form-item label="会议文件 :" prop="filePath">
                      <i class="iconfont icon-xls"
                         v-if="filePathFileType=='xls'||filePathFileType=='xlsx'"></i>
                      <i class="iconfont icon-doc"
                         v-if="filePathFileType=='doc'||filePathFileType=='docx'"></i>
                      <i class="iconfont icon-ppt"
                         v-if="filePathFileType=='ppt'||filePathFileType=='pptx'"></i>
                      <i class="iconfont icon-txt"
                         v-if="filePathFileType=='pdf'||filePathFileType=='png'||filePathFileType=='jpg'||filePathFileType=='gif'||filePathFileType=='jpeg'"></i>
                      <i class="iconfont icon-avi"
                         v-if="filePathFileType=='mp4'||filePathFileType=='avi'||filePathFileType=='rmvb'||filePathFileType=='rm'||filePathFileType=='mov'"></i>
                      <i class="iconfont icon-mp3" v-if="filePathFileType=='mp3'"></i>
                      {{formData.filePath}}
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" v-if="formData.contactPhonenum">
                    <el-form-item label="联系电话 :" prop="contactPhonenum">
                      <span v-if="formData.contactPhonenum">{{formData.contactPhonenum}}</span>
                    </el-form-item>
                  </el-col>

                  <el-col :span="12" v-if="formData.contactEmail">
                    <el-form-item label="联系邮件 :" prop="contactEmail">
                      <span v-if="formData.contactEmail">{{formData.contactEmail}}</span>
                    </el-form-item>
                  </el-col>

                </div>
              </div>

              <div class="p50 ">
                <div class="detail-title-v2 ">
                  基本信息
                </div>
                <div class="detail-item-v2">
                  <el-col :span="24">
                    <el-form-item label="视频 :" prop="meetingVideo">
                      <video width="540" controls ref="meetingVideoVideo">
                        <source :src="formData.meetingVideo" type="video/mp4" v-if="formData.meetingVideo">
                      </video>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="语音 :" prop="meetingVoice">
                      <audio controls ref="audio" style="margin-top:4px;">
                        <source :src="formData.meetingVoice" type="audio/mpeg" v-if="formData.meetingVoice">
                      </audio>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="会议二维码 :" prop="qrcodeScan">
                      <vue-qr :text="formData.qrcodeScan" height="200" width="200" v-if="formData.qrcodeScan"></vue-qr>
                    </el-form-item>
                  </el-col>
                </div>
              </div>

              <div class="p100 ">
                <div class="detail-title-v2 ">
                  基本信息
                </div>
                <div class="detail-item-v2">
                  <el-col :span="24" v-if="formData.localGps">
                    <el-form-item label="会议地址 :" prop="localGps">
                      {{localGpsKeyword}}
                      <baidu-map class="bm-view" :center="{lng: lng, lat: lat}" :zoom="19"
                                 ak="tGtrBb54ZCSAd91zVdjFvnn6I6ZVD7zy" :scroll-wheel-zoom="true">
                        <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                        <bm-marker :position="localGpsMarkerPoint" :dragging="true"
                                   @click="localGpsMapWinOpen">
                          <bm-info-window :show="localGpsShow"
                                          @close="localGpsMapWinClose"
                                          @open="localGpsMapWinOpen"></bm-info-window>
                        </bm-marker>
                      </baidu-map>
                    </el-form-item>
                  </el-col>
                </div>
              </div>


            </el-form>
          </el-col>

          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly">
              <ul>
                <li>
                  <router-link :to="`/safety/listMeetingChecklist?meetingId=`+
                                    formData.meetingId">
                    <img src="~@/assets/img/menu_quickly/icon_classinfo.png"/>会议签到
                  </router-link>

                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center mb-15">
        <el-button v-if="pageState === 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="mr80" size="small"
                   @click="goBack">返回
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
import api from '@/views/safety/meetinginfo/meetinginfoUrl'
import validation from '@/util/validate2'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import upload from '@/components/upload/uploadFileV1'
import uploads from '@/components/upload/uploadFile'
import {BaiduMap, BmNavigation, BmMarker, BmInfoWindow, BmGeolocation, BmLocalSearch,} from 'vue-baidu-map'
import VueQr from 'vue-qr'

export default {
  components: {
    BaiduMap,
    BmNavigation,
    BmMarker,
    BmInfoWindow,
    BmGeolocation,
    BmLocalSearch,
    VueQr,
    editor,
    upload,
    uploads
  },
  data () {
    return {
      xuantian: false, //选填信息
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      meetingStatusCodeOptions: [{'label': '全部', 'name': ''}], meetingStatusCode: null,
      ynOptions: [{'label': '全部', 'name': ''}], isOpening: null,
      imagePathFileList: [],
      imagePathFileType: '',
      filePathFileList: [],
      filePathFileType: '',
      localGpsKeyword: '',
      localGpsModel: '',
      localGpsMarkerPoint: {
        lng: '',
        lat: ''
      },
      localGpsLocation: '',
      localGpsShow: false,
      lng: '',
      lat: '',
      meetingVideoFileList: [],
      meetingVideoFileType: '',
      meetingVoiceFileList: [],
      meetingVoiceFileType: '',
      formData: {
        meetingId: '',
        meetingTopic: '',
        content: '',
        meetingBeginDt: '',
        meetingEndDt: '',
        payment: '',
        meetingStatusCode: '',
        isOpening: '',
        imagePath: '',
        filePath: '',
        contactPhonenum: '',
        contactEmail: '',
        localGps: '',
        qrcodeScan: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        meetingTopic: [
          {required: true, message: '请您输入会议主题', trigger: 'blur'},
          {max: 255, message: '最多能输入255个字', trigger: 'blur'},

        ],
        content: [
          {required: true, message: '请您输入会议内容', trigger: 'blur'},
          {max: 4000, message: '最多能输入4000个字', trigger: 'blur'},

        ],
        meetingBeginDt: [
          {required: true, message: '请您输入开会时间', trigger: 'blur'},

        ],
        meetingEndDt: [],
        participantsNum: [
          {validator: validation.number, trigger: 'blur'},

        ],
        payment: [
          {validator: validation.number, trigger: 'blur'},

        ],
        meetingStatusCode: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},

        ],
        isOpening: [
          {required: true, message: '请您输入开会中', trigger: 'blur'},
          {max: 2, message: '最多能输入2个字', trigger: 'blur'},

        ],
        imagePath: [
          {required: true, message: '请您输入会议主图', trigger: 'blur'},
          {max: 255, message: '最多能输入255个字', trigger: 'blur'},

        ],
        filePath: [
          {max: 255, message: '最多能输入255个字', trigger: 'blur'},

        ],
        contactPhonenum: [
          {max: 32, message: '最多能输入32个字', trigger: 'blur'},
          {validator: validation.mobileNum, trigger: 'blur'},

        ],
        contactEmail: [
          {max: 64, message: '最多能输入64个字', trigger: 'blur'},
          {validator: validation.email, trigger: 'blur'},

        ],
        localGps: [
          {max: 255, message: '最多能输入255个字', trigger: 'blur'},

        ],
        meetingVideo: [
          {max: 255, message: '最多能输入255个字', trigger: 'blur'},

        ],
        meetingVoice: [
          {max: 255, message: '最多能输入255个字', trigger: 'blur'},

        ],
        qrcodeScan: [
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
    this.getDetail('1f556a4ac0a8120800ae19598bca91d6')
    commonApi.getCodeIntType('meetingStatus').then(res => {
      let viewList = res.data.data || []
      for (let meetingStatusItem of viewList) {
        this.meetingStatusCodeOptions.push({
          'label': meetingStatusItem.codeDesc,
          'name': meetingStatusItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
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

    //选填信息
    xuantianHandler () {
      this.xuantian = this.xuantian ? false : true
    },
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
          }, res => {
            this.$message.error('加载失败')
            this.formLoading = false
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
          }, res => {
            this.$message.error('加载失败')
            this.formLoading = false
          })
        }
      })
      this.isLoaded = false

    },


    //获取图片上传信息
    uploadData (res) {
      this.formData.imagePath = res
    },


    getFileMessage (res) {
      let obj = res
      console.log('图片基本信息')
      console.log(obj)
      this.formData.filePath = res.urlurl
      this.formData.url = res.urlurl
      this.formData.sizes = res.size
      this.formData.folderId = this.$route.params.id
    },


    // 地图搜索
    localGpsSearch () {
      this.localGpsKeyword = this.this.localGpsModel
      let localGpsMap = this.$refs.localGpsBaidumap.map.gf
      this.formData.localGps = localGpsMap.lat + ',' + localGpsMap.lng + ',' + this.formData.localGps
    },
    localGpsMapWinOpen () {
      this.localGpsShow = true
    },
    // 地图
    localGpsMapWinClose () {
      this.localGpsShow = false
    },
    localGpsPoint (type) {
      let localGpsCurrPoint = type.point
      this.formData.localGps = localGpsCurrPoint.lat + ',' + localGpsCurrPoint.lng + ',' + this.formData.localGps
    },

    getVideoMessage (res) {
      let obj = res
      console.log('视频基本信息')
      console.log(obj)
      this.formData.meetingVideo = res.urlurl
      this.formData.url = res.urlurl
      this.formData.sizes = res.size
      this.formData.folderId = this.$route.params.id
    },

    getVoiceMessage (res) {
      let obj = res
      console.log('图片基本信息')
      console.log(obj)
      this.formData.meetingVoice = res.urlurl
      this.formData.url = res.urlurl
      this.formData.sizes = res.size
      this.formData.folderId = this.$route.params.id
    },


    getDetail (paramsId) {
      if (this.pageState !== 'add') {
        api.getObj(paramsId).then(res => {
          if (res.data.resultCode === '000000') {
            this.formData = res.data.data
            let localGpsData = this.data.localGps.split(',')
            this.formData.localGps = localGpsData[2]
            this.lng = this.localGpsMarkerPoint.lng = localGpsData[1]
            this.lat = this.localGpsMarkerPoint.lat = localGpsData[0]
          }
          this.isLoaded = false
        }, res => {
          this.$message.error(res.message)
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
    width: 100%;

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



  .schoolForm-detail-rao {

    .el-form-item {
      margin-bottom: 5px;
    }

  }

  .ml80 {
    margin-left: 80px;
  }

  .width100 {
    width: 100%;
  }

  .form-table {
    margin-top: 20px;
  }

  .bm-view {
    width: 960px;
    height: 400px;
  }
</style>
