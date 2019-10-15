<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex wrap row">
              <div class="p50">
                <div class="detail-title-v2 ">
                  学生信息
                </div>
                <div class="detail-item-v2 ml-30">
                  <div class="p50 mb-20" v-if="formData.studentName">
                    <div class="img flex row x-center">
                      <img :src="formData.headPictureChildren" alt="."
                           width="64" height="64" style="border-radius: 64px">
                      <div class="ml-20">
                        <div class="up mb10 f18"><span>{{formData.studentName}}</span>
                          <!--<i class="icon-icon_nvsheng iconfont" style="color:#ff97D6"></i>-->
                        </div>
                        <div class="down f14">
                          <span class="mr-10">{{formData.schoolName}}</span> <span>{{formData.className}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p50">
                <div class="detail-title-v2 ">
                  授权人信息
                </div>
                <div class="detail-item-v2 ml-30">
                  <div class="p50 mb-20" v-if="formData.userName">
                    <div class="img flex row x-center">
                      <img :src="formData.headPictureParent" alt="xxx"
                           width="64" height="64" style="border-radius: 64px">
                      <div class="ml-20">
                        <div class="up mb10 f18"><span>{{formData.userName}}</span> <i
                          class="icon-icon_nan iconfont"></i></div>
                        <div class="down f14">
                          <span class="mr-10" v-if="formData.studentParentTypeCodeStr">{{formData.studentParentTypeCodeStr.split(';')[0]}}</span> <span>{{formData.publishedPhonenum}}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="p100">
                <div class="detail-title-v2 ">
                  授权信息
                </div>
                <div class="detail-item-v2">

                  <div class="p33">
                    <el-form-item label="授权类型 :" prop="gtScheduleTypeCode">
                      <span v-if="formData.gtDelegateTypeCodeStr"
                            :style="{'color':formData.gtDelegateTypeCodeStr.split(';')[1]}">{{formData.gtDelegateTypeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>

                  <!--<div class="p33">-->
                  <!--<el-form-item label="出发地 :" prop="effectiveDt">-->
                  <!--<span v-if="formData.effectiveDt"> 广州市六十九中学</span>-->
                  <!--</el-form-item>-->
                  <!--</div>-->

                  <div class="p33">
                    <el-form-item label="授权状态 :" prop="gtStatusCode">
                      <span v-if="formData.gtStatusCodeStr" :style="{'color':formData.gtStatusCodeStr.split(';')[1]}">{{formData.gtStatusCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>

                  <div class="p33">
                    <el-form-item label="授权时间 :" prop="effectiveDt">
                      <span v-if="formData.effectiveDt"> {{formData.effectiveDt}}</span>
                    </el-form-item>
                  </div>

                  <div class="p33">
                    <el-form-item label="接送时间 :" prop="effectiveDt">
                      <span v-if="formData.effectiveDt"> {{formData.effectiveDt}}</span>
                    </el-form-item>
                  </div>

                </div>
              </div>
              <div class="p100">
                <div class="detail-title-v2 ">
                  被授权信息
                </div>
                <div class="detail-item-v2">

                  <div class="p33">
                    <el-form-item label="授权区分 :" prop="gtDelegateTypeCode">
                      <span v-if="formData.gtDelegateTypeCodeStr"
                            :style="{'color':formData.gtDelegateTypeCodeStr.split(';')[1]}">{{formData.gtDelegateTypeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>

                  <!--<div class="p33">-->
                  <!--<el-form-item label="被授权机构 :" prop="gtDelegateTypeCode">-->
                  <!--<span v-if="formData.gtDelegateTypeCodeStr"-->
                  <!--:style="{'color':formData.gtDelegateTypeCodeStr.split(';')[1]}">{{formData.gtDelegateTypeCodeStr.split(';')[0]}}</span>-->
                  <!--</el-form-item>-->
                  <!--</div>-->

                  <div class="p33">
                    <el-form-item label="被授权人 :" prop="gtDelegateTypeCode">
                      <span v-if="formData.vgrantPeopleInfoTO">{{formData.vgrantPeopleInfoTO.peopleName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p33">
                    <el-form-item label="性别 :" prop="gtDelegateTypeCode">
                      <span v-if="formData.vgrantPeopleInfoTO">{{formData.vgrantPeopleInfoTO.gender}}</span>
                    </el-form-item>
                  </div>

                  <div class="p33">
                    <el-form-item label="联系电话 :" prop="publishedPhonenum">
                      <span v-if="formData.vgrantPeopleInfoTO">{{formData.vgrantPeopleInfoTO.peoplePhonenum}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100">
                    <el-form-item label="特征描述 :" prop="peopleRemark">
                      <span v-if="formData.vgrantPeopleInfoTO">{{formData.vgrantPeopleInfoTO.peopleRemark}}</span>
                    </el-form-item>
                  </div>

                </div>
              </div>
              <div class="p100" v-if="formData.updateby">
                <div class="detail-title-v2 ">
                  信息确认
                </div>
                <div class="detail-item-v2">

                  <div class="p33">
                    <el-form-item label="确认人 :" prop="updateby">
                      <span v-if="formData.updateby"> {{formData.updateby}}</span>
                    </el-form-item>
                  </div>

                  <div class="p33">
                    <el-form-item label="接送时间 :" prop="updateDt">
                      <span v-if="formData.updateDt"> {{formData.updateDt}}</span>
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
                  <router-link :to="`/safety/listGrantTranPeople?transferId=`+
                                    formData.transferId">
                    <i class="iconfont icon-icon_liebiao"></i>授权接送委托人信息
                  </router-link>

                </li>
                <li>
                  <router-link :to="`/safety/listGrantTranAgency?transferId=`+
                                    formData.transferId">
                    <i class="iconfont icon-icon_liebiao"></i>授权接送委托机构信息
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
  import api from "./studentgranttransferUrl";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'

  export default {
    components: {editor, upload, uploads},
    data() {
      return {
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        gtStatusCodeOptions: [{"label": "全部", "name": ""}], gtStatusCode: null,
        gtDelegateTypeCodeOptions: [{"label": "全部", "name": ""}], gtDelegateTypeCode: null,
        gtScheduleTypeCodeOptions: [{"label": "全部", "name": ""}], gtScheduleTypeCode: null,
        formData: {
          transferId: '',
          effectiveDt: "",
          gtStatusCode: "",
          gtDelegateTypeCode: "",
          gtScheduleTypeCode: "",
          publishedPhonenum: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          studentId: [
            {required: true, message: "请您输入学生id", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          studentName: [
            {required: true, message: "请您输入学生", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          studentUserId: [
            {required: true, message: "请您输入学生用户id", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          effectiveDt: [
            {required: true, message: "请您输入接送时间", trigger: "blur"},

          ],
          gtScheduleTypeCode: [
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
      commonApi.getCodeIntType("gtStatus").then(res => {
        let viewList = res.data.data || [];
        for (let gtStatusItem of viewList) {
          this.gtStatusCodeOptions.push({
            "label": gtStatusItem.codeDesc,
            "name": gtStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("gtDelegateType").then(res => {
        let viewList = res.data.data || [];
        for (let gtDelegateTypeItem of viewList) {
          this.gtDelegateTypeCodeOptions.push({
            "label": gtDelegateTypeItem.codeDesc,
            "name": gtDelegateTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("gtScheduleType").then(res => {
        let viewList = res.data.data || [];
        for (let gtScheduleTypeItem of viewList) {
          this.gtScheduleTypeCodeOptions.push({
            "label": gtScheduleTypeItem.codeDesc,
            "name": gtScheduleTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {

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
                //this.$message.error(res.data.message);
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
