<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'" class='mh500'>
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="edit-form"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="名 *  :" prop="firstName">
              <el-input v-model="formData.firstName" maxlength="100"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="头像 :" prop="headPicture">
              <upload v-on:uploadData="uploadData" :imagelist="formData.headPicture"/>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="电子邮箱 :" prop="email">
              <el-input v-model="formData.email" maxlength="200"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="开启时间 :" prop="effectiveDt">
              <el-date-picker v-model="formData.effectiveDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm" :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="状态 :" prop="status">
              <el-select class="filter-item" v-model="formData.status" placeholder="状态">
                <el-option v-for="item in  userOptions" :key="item.name" :label="item.label"
                           :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="性别 :" prop="gender">
              <!--<el-input v-model="formData.gender" maxlength="1"></el-input>-->
              <el-select class="filter-item" v-model="formData.gender" placeholder="性别">
                <el-option v-for="item in  sexOptions" :key="item.name" :label="item.label"
                           :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="用户类型 :" prop="subjectType">
              <el-select class="filter-item" v-model="formData.subjectType" placeholder="用户类型">
                <el-option v-for="item in  subjectTypeOptions" :key="item.name" :label="item.label"
                           :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="手机号 :" prop="mobilePhone">
              <el-input v-model="formData.mobilePhone" maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'edit'" class='mh500'>
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="edit-form"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="名 *  :" prop="firstName">
              <el-input v-model="formData.firstName" maxlength="100"></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="头像  :" prop="headPicture">
              <upload v-on:uploadData="uploadData" :imagelist="formData.headPicture"/>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="电子邮箱 :" prop="email">
              <el-input v-model="formData.email" maxlength="200"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="开启时间 :" prop="effectiveDt">
              <el-date-picker v-model="formData.effectiveDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm" :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="状态 :" prop="status">
              <el-select class="filter-item" v-model="formData.status" placeholder="状态">
                <el-option v-for="item in  userOptions" :key="item.name" :label="item.label"
                           :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="性别 :" prop="gender">
              <!--<el-input v-model="formData.gender" maxlength="1"></el-input>-->
              <el-select class="filter-item" v-model="formData.gender" placeholder="性别">
                <el-option v-for="item in  sexOptions" :key="item.name" :label="item.label"
                           :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="用户类型 :" prop="subjectType">
              <el-select class="filter-item" v-model="formData.subjectType" placeholder="用户类型">
                <el-option v-for="item in  subjectTypeOptions" :key="item.name" :label="item.label"
                           :value="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="手机号 :" prop="mobilePhone">
              <el-input v-model="formData.mobilePhone" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="昵称 :" prop="nickname">
              <el-input v-model="formData.nickname" maxlength="50"></el-input>
            </el-form-item>
          </el-col>


          <div class="clearfix"></div>

        </el-form>
      </div>


      <div v-if="pageState === 'detail'" class='mh500'>
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="edit-form" label-width="165px"
                     :inline="true" :model="formData" size="small">


              <el-col :span="12" v-if="formData.subjectId">
                <el-form-item label="用户id :" prop="subjectId">
                  {{formData.subjectId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.firstName">
                <el-form-item label="名 :" prop="firstName">
                  {{formData.firstName}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.lastName">
                <el-form-item label="姓 :" prop="lastName">
                  {{formData.lastName}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.email">
                <el-form-item label="电子邮箱 :" prop="email">
                  {{formData.email}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.effectiveDt">
                <el-form-item label="开启时间 :" prop="effectiveDt">
                  {{formData.effectiveDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.expiryDt">
                <el-form-item label="截止时间 :" prop="expiryDt">
                  {{formData.expiryDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.status">
                <el-form-item label="状态 :" prop="status">
                  {{formData.status}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.lastLoginDt">
                <el-form-item label="最近登录时间 :" prop="lastLoginDt">
                  {{formData.lastLoginDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.lastLoginIp">
                <el-form-item label="最近登录ip :" prop="lastLoginIp">
                  {{formData.lastLoginIp}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.allowedLoginLevel">
                <el-form-item label="允许登录级别 :" prop="allowedLoginLevel">
                  {{formData.allowedLoginLevel}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.logicalDel">
                <el-form-item label="逻辑删除 :" prop="logicalDel">
                  {{formData.logicalDel}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.nric">
                <el-form-item label="身份证 :" prop="nric">
                  {{formData.nric}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.gender">
                <el-form-item label="性别 :" prop="gender">
                  {{formData.gender}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.headPicture">
                <el-form-item label="头像 :" prop="headPicture">
                  <!--{{formData.headPicture}}-->
                  <img :src="formData.headPicture" alt="" style="height:84px">
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.onlineStatus">
                <el-form-item label="在线状态 :" prop="onlineStatus">
                  {{formData.onlineStatus}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.subjectType">
                <el-form-item label="用户类型 :" prop="subjectType">
                  {{formData.subjectType}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.mobilePhone">
                <el-form-item label="手机号 :" prop="mobilePhone">
                  {{formData.mobilePhone}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.cityNums">
                <el-form-item label="城市编号 :" prop="cityNums">
                  {{formData.cityNums}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.cityName">
                <el-form-item label="城市名称 :" prop="cityName">
                  {{formData.cityName}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.districtNums">
                <el-form-item label="区县编号 :" prop="districtNums">
                  {{formData.districtNums}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.districtName">
                <el-form-item label="区县名称 :" prop="districtName">
                  {{formData.districtName}}
                </el-form-item>
              </el-col>


              <el-col :span="24" v-if="formData.localGps">
                <el-form-item label="地理位置 :" prop="localGps">
                  <span>会议地址：</span>
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


              <el-col :span="12" v-if="formData.longitude">
                <el-form-item label="经度 :" prop="longitude">
                  {{formData.longitude}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.latitude">
                <el-form-item label="纬度 :" prop="latitude">
                  {{formData.latitude}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.isAnonymous">
                <el-form-item label="是否匿名 :" prop="isAnonymous">
                  <div v-if="formData.isAnonymous == 'Y'">
                    <el-switch v-model="formData.onSwitchStatus" disabled></el-switch>
                  </div>
                  <div v-else>
                    <el-switch v-model="formData.offSwitchStatus" disabled></el-switch>
                  </div>
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.coverImagePath">
                <el-form-item label="封面图 :" prop="coverImagePath">
                  {{formData.coverImagePath}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.signature">
                <el-form-item label="签名 :" prop="signature">
                  {{formData.signature}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.nickname">
                <el-form-item label="昵称 :" prop="nickname">
                  {{formData.nickname}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.appOrgId">
                <el-form-item label="机构 :" prop="appOrgId">
                  {{formData.appOrgId}}
                </el-form-item>
              </el-col>


              <el-col :span="12" v-if="formData.appId">
                <el-form-item label="应用 :" prop="appId">
                  {{formData.appId}}
                </el-form-item>
              </el-col>


            </el-form>
          </el-col>

        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center">
        <el-button v-if="pageState === 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary"  :loading="formLoading" size="small"
                   @click="goBack">返回
        </el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import api from "./aasubjectUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import {BaiduMap, BmNavigation, BmMarker, BmInfoWindow, BmGeolocation, BmLocalSearch,} from 'vue-baidu-map';

  export default {
    data() {
      return {
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        localGpsKeyword: "",
        localGpsMarkerPoint: {
          lng: "",
          lat: ""
        },
        localGpsLocation: "",
        localGpsShow: false,
        lng: "",
        lat: "",
        userOptions: [],
        subjectTypeOptions: [],
        ynOptions: [{"label": "全部", "name": ""}], isAnonymous: null,
        sexOptions: [{name: "Y", label: "男", imagePath: "/lookupCode/open.gif", fontColor: "red"},
          {name: "N", label: "女", imagePath: "/lookupCode/open.gif", fontColor: "red"}],
        statusOptions: [{name: "Y", label: "启用", imagePath: "/lookupCode/open.gif", fontColor: "red"},
          {name: "N", label: "未启用", imagePath: "/lookupCode/open.gif", fontColor: "red"}],
        data: "",
        formData: {
          subjectId:null,
          email: "",
          effectiveDt: "",
          expiryDt: "",
          status: "",
          lastLoginDt: "",
          lastLoginIp: "",
          allowedLoginLevel: "",
          logicalDel: "",
          nric: "",
          gender: "",
          headPicture: "",
          onlineStatus: "",
          subjectType: "",
          mobilePhone: "",
          cityNums: "",
          cityName: "",
          districtNums: "",
          districtName: "",
          localGps: "",
          longitude: "",
          latitude: "",
          isAnonymous: "",
          coverImagePath: "",
          signature: "",
          nickname: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          firstName: [
            {required: true, message: "请您输入名", trigger: "blur"},
            {max: 100, message: "最多能输入100个字", trigger: "blur"},

          ],
          email: [
            {max: 200, message: "最多能输入200个字", trigger: "blur"},

          ],
          effectiveDt: [],
          status: [
            {required: true, message: "请您输入状态", trigger: "blur"},
            {max: 1, message: "最多能输入1个字", trigger: "blur"},

          ],
          gender: [
            {max: 1, message: "最多能输入1个字", trigger: "blur"},

          ],
          subjectType: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          mobilePhone: [
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
    components: {BaiduMap, BmNavigation, BmMarker, BmInfoWindow, BmGeolocation, BmLocalSearch, editor, upload},
    created() {
      this.getDetail(this.$route.params.id);
      commonApi.getCodeIntType("boolean_yn").then(res => {
        let viewList = res.data.data || [];
        for (let ynItem of viewList) {
          this.ynOptions.push({
            "label": ynItem.codeDesc,
            "name": ynItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("userStatus").then(res => {
        let viewList = res.data.data || [];
        for (let ynItem of viewList) {
          this.userOptions.push({
            "label": ynItem.codeDesc,
            "name": ynItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("subjectType").then(res => {
        let viewList = res.data.data || [];
        for (let ynItem of viewList) {
          this.subjectTypeOptions.push({
            "label": ynItem.codeDesc,
            "name": ynItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      //图片上传
      uploadData(res) {
        this.formData.headPicture = res;
      },
      //编辑器
      getEditorValue(val) {
        this.formData.content = val
      },
      //选填信息
      xuantianHandler() {
        this.xuantian = this.xuantian ? false : true;
      },
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          if (this.pageState === "edit" && valid) {
                this.formLoading = true;
            api.putObj(this.formData).then(res => {

              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
                ()
              } else {
                //this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          } else if (this.pageState === "add" && valid) {
                this.formLoading = true;
            this.formData.subjectId = null;
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
                ()
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          }
        })
        this.isLoaded = false;

      },


      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              this.data = res.data.data;
              this.formData = res.data.data
            }
            this.isLoaded = false;
          }, res => {
            this.$message.error(res.message);
          });
        }
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
<style lang="scss" scoped>


  .el-form-item--small.el-form-item {
    margin-bottom: 25px;
  }

  .schoolForm-detail-rao {

    .el-form-item {
      margin-bottom: 5px;
    }

  }

  .ml80 {
    margin-left: 80px;
  }


</style>
