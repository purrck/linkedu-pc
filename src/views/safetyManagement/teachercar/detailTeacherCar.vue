
                                  
<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="教师id :" prop="teacherId">
                      <el-input class="input-v2-rao" v-model="formData.teacherId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 教师id colName:teacher_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="教师用户id :" prop="teacherUserId">
                      <el-input class="input-v2-rao" v-model="formData.teacherUserId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 教师用户id colName:teacher_user_id sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="教师 :" prop="teacherName">
                      <el-input class="input-v2-rao" v-model="formData.teacherName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 教师 colName:teacher_name sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="车牌号 *  :" prop="carNum">
                      <el-input class="input-v2-rao" v-model="formData.carNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 车牌号 colName:car_num sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="照片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
<!-- 照片 colName:image_path sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="品牌 :" prop="carBrand">
                      <el-input class="input-v2-rao" v-model="formData.carBrand"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 品牌 colName:car_brand sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="型号 :" prop="carModel">
                      <el-input class="input-v2-rao" v-model="formData.carModel"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 型号 colName:car_model sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="停车位号 :" prop="carParkingNum">
                      <el-input class="input-v2-rao" v-model="formData.carParkingNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 停车位号 colName:car_parking_num sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="状态 :" prop="teacherCarStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherCarStatusCode" placeholder="请您选择">
                        <el-option v-for="teacherCarStatusCodeItem in teacherCarStatusCodeOptions"
                                   :key="teacherCarStatusCodeItem.name"
                                   :label="teacherCarStatusCodeItem.label" :value="teacherCarStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 状态 colName:teacher_car_status_code sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="登记开始时间 :" prop="beginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.beginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime">
                      </el-date-picker>
                    </el-form-item>
                  </el-col>
<!-- 登记开始时间 colName:begin_dt sqlType:TIMESTAMP notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="归属学校 :" prop="isSchoolCar">
                      <el-select class="select-v2-rao" v-model="formData.isSchoolCar" placeholder="请您选择">
                        <el-option v-for="isSchoolCarItem in ynOptions" :key="isSchoolCarItem.name"
                                   :label="isSchoolCarItem.label" :value="isSchoolCarItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
<!-- 归属学校 colName:is_school_car sqlType:VARCHAR notnull:false -->
                  <el-col :span="24">
                    <el-form-item label="序号 :" prop="sequnceNum">
                      <el-input class="input-v2-rao" v-model="formData.sequnceNum"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
<!-- 序号 colName:sequnce_num sqlType:INTEGER notnull:false -->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="车牌号 *  :" prop="carNum">
                      <el-input class="input-v2-rao" v-model="formData.carNum"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="照片 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="品牌 :" prop="carBrand">
                      <el-input class="input-v2-rao" v-model="formData.carBrand"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="状态 :" prop="teacherCarStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.teacherCarStatusCode" placeholder="请您选择">
                        <el-option v-for="teacherCarStatusCodeItem in teacherCarStatusCodeOptions"
                                   :key="teacherCarStatusCodeItem.name"
                                   :label="teacherCarStatusCodeItem.label" :value="teacherCarStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="登记开始时间 :" prop="beginDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.beginDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="截止时间 :" prop="endDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.endDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="归属学校 :" prop="isSchoolCar">
                      <el-select class="select-v2-rao" v-model="formData.isSchoolCar" placeholder="请您选择">
                        <el-option v-for="isSchoolCarItem in ynOptions" :key="isSchoolCarItem.name"
                                   :label="isSchoolCarItem.label" :value="isSchoolCarItem.name">
                        </el-option>
                      </el-select>
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
                      {{formData.teacherName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.teacherName">
                          <el-form-item label="教师 :" prop="teacherName">
                            <span v-if="formData.teacherName">{{formData.teacherName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.carNum">
                          <el-form-item label="车牌号 :" prop="carNum">
                            <span v-if="formData.carNum">{{formData.carNum}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="照片 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.carBrand">
                          <el-form-item label="品牌 :" prop="carBrand">
                            <span v-if="formData.carBrand">{{formData.carBrand}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.carModel">
                          <el-form-item label="型号 :" prop="carModel">
                            <span v-if="formData.carModel">{{formData.carModel}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.carParkingNum">
                          <el-form-item label="停车位号 :" prop="carParkingNum">
                            <span v-if="formData.carParkingNum">{{formData.carParkingNum}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="状态 :" prop="teacherCarStatusCode">
                            <span v-if="formData.teacherCarStatusCodeStr"
                                  :style="{'color':formData.teacherCarStatusCodeStr.split(';')[1]}">{{formData.teacherCarStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="登记开始时间 :" prop="beginDt">
                            <span v-if="formData.beginDt"> {{formData.beginDt}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="截止时间 :" prop="endDt">
                            <span v-if="formData.endDt"> {{formData.endDt}}</span>
                          </el-form-item>
                        </div>

                        <div class="p50">
                          <el-form-item label="归属学校 :" prop="isSchoolCar">
                            <el-switch v-model="formData.isSchoolCar == 'Y'" disabled></el-switch>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.sequnceNum">
                          <el-form-item label="序号 :" prop="sequnceNum">
                            <span v-if="formData.sequnceNum">{{formData.sequnceNum}}</span>
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
                    <router-link :to="`/basedata/listTeacherCarInout?teacherCarId=`+
                                  formData.teacherCarId">
                      <i class="iconfont icon-icon_liebiao"></i>教师车辆进出历史
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
  import api from "./teachercarUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  //import preview from '@/util/preview';
  export default {
      components: {editor, upload, uploads},
    data() {
      return {
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        imagePathFileList :[],
        imagePathFileType:'',
        teacherCarStatusCodeOptions: [{"label": "全部", "name": ""}],
        teacherCarStatusCode : null,
        ynOptions :[{"label": "全部", "name": ""}],
        isSchoolCar : null,
        formData:{
              teacherCarId:'',
              carNum :"",
              imagePath :"",
              carBrand :"",
              teacherCarStatusCode :"",
              beginDt :"",
              endDt :"",
              isSchoolCar :"",
        },
        pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        rules : {
              teacherId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherUserId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              carNum :
              [
                  {required: true, message: "请您输入车牌号", trigger: "blur"},
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              imagePath :
              [
                  {max: 255, message: "最多能输入255个字", trigger: "blur"},

              ],
              carBrand :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              carModel :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              carParkingNum :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              teacherCarStatusCode :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              beginDt :
              [

              ],
              isSchoolCar :
              [
                  {max: 2, message: "最多能输入2个字", trigger: "blur"},

              ],
              sequnceNum :
              [
                  {validator: validation.number, trigger: "blur"},

              ],
        }
      }
    },
    computed: {
      pageState() {
        return this.$route.params.type;
      }
    },
   // directives: {preview},
    created() {
      this.getDetail(this.$route.params.id);
          commonApi.getCodeIntType("teacherCarStatus").then(res => {
            let viewList = res.data.data || [];
            for (let teacherCarStatusItem of viewList) {
              this.teacherCarStatusCodeOptions.push({
                "label": teacherCarStatusItem.codeDesc,
                "name": teacherCarStatusItem.codeId
              });
            }
          });
          commonApi.getCodeIntType("boolean_yn").then(res => {
            let viewList = res.data.data || [];
            for (let ynItem of viewList) {
              this.ynOptions.push({
                "label": ynItem.codeDesc,
                "name": ynItem.codeId
              });
            }
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
      //获取图片上传信息
      uploadData(res) {
        this.formData.imagePath = res;
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
