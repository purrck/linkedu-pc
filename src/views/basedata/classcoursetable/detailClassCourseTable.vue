<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="开始年次 :" prop="">
              <el-select v-model="formData.schoolYearStart" placeholder="开始年次">
                <el-option
                  v-for="(item,index) of yearList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="结束年次 :" prop="">
              <el-select v-model="formData.schoolYearEnd" placeholder="结束年次">
                <el-option
                  v-for="(item,index) of yearList"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="学期 :" prop="schoolTerm">
              <el-select v-model="formData.schoolTerm" placeholder="请选择学期">
                <el-option
                  v-for="(item ,index) of optionsList2"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!--<el-col :span="24">-->
          <!--<el-form-item label="周别 :" prop="weekTypeCode">-->
          <!--<el-select class="select-v2-rao" v-model="formData.weekTypeCode" placeholder="请您选择">-->
          <!--<el-option v-for="weekTypeCodeItem in weekTypeCodeOptions"-->
          <!--:key="weekTypeCodeItem.name"-->
          <!--:label="weekTypeCodeItem.label" :value="weekTypeCodeItem.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
          <!--<el-form-item label="周几 :" prop="weekNum">-->
          <!--<el-input class="input-v2-rao" v-model="formData.weekNum"-->
          <!--maxlength="11"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
          <!--<el-form-item label="第几节课 :" prop="weekSequnceNum">-->
          <!--<el-input class="input-v2-rao" v-model="formData.weekSequnceNum"-->
          <!--maxlength="11"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
          <!--<el-form-item label="校历id :" prop="calendarId">-->
          <!--<el-input class="input-v2-rao" v-model="formData.calendarId"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
          <!--<el-form-item label="校历名称 :" prop="calendarName">-->
          <!--<el-input class="input-v2-rao" v-model="formData.calendarName"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="24">-->
          <!--<el-form-item label="校历日期 :" prop="calendarDt">-->
          <!--<el-date-picker class="date-v2-rao" v-model="formData.calendarDt" type="datetime"-->
          <!--placeholder="选择日期"-->
          <!--value-format="yyyy-MM-dd HH:mm"-->
          <!--:picker-options="pickTime">-->
          <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
          <!--<el-form-item label="作息id :" prop="timelineDetailId">-->
          <!--<el-input class="input-v2-rao" v-model="formData.timelineDetailId"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
          <!--<el-form-item label="作息名称 :" prop="timelineDetailName">-->
          <!--<el-input class="input-v2-rao" v-model="formData.timelineDetailName"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
          <!--<el-form-item label="作息开始时间 :" prop="beginTime">-->
          <!--<el-input class="input-v2-rao" v-model="formData.beginTime"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!--<el-col :span="24">-->
          <!--<el-form-item label="作息截止时间 :" prop="endTime">-->
          <!--<el-input class="input-v2-rao" v-model="formData.endTime"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="学科id :" prop="subjectId">
              <el-input class="input-v2-rao" v-model="formData.subjectId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="学科 :" prop="subjectName">
              <el-input class="input-v2-rao" v-model="formData.subjectName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="教师id :" prop="teacherId">
              <el-input class="input-v2-rao" v-model="formData.teacherId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="教师姓名 :" prop="teacherName">
              <el-input class="input-v2-rao" v-model="formData.teacherName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="教师用户id :" prop="teacherUserId">
              <el-input class="input-v2-rao" v-model="formData.teacherUserId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="教室d :" prop="placeId">
              <el-input class="input-v2-rao" v-model="formData.placeId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="教室 :" prop="placeName">
              <el-input class="input-v2-rao" v-model="formData.placeName"
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
                  {{formData.weekTypeCode}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50">
                    <el-form-item label="周别 :" prop="weekTypeCode">
                            <span v-if="formData.weekTypeCodeStr"
                                  :style="{'color':formData.weekTypeCodeStr.split(';')[1]}">{{formData.weekTypeCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.weekNum">
                    <el-form-item label="周几 :" prop="weekNum">
                      <span v-if="formData.weekNum">{{formData.weekNum}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.weekSequnceNum">
                    <el-form-item label="第几节课 :" prop="weekSequnceNum">
                      <span v-if="formData.weekSequnceNum">{{formData.weekSequnceNum}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.beginTime">
                    <el-form-item label="作息开始时间 :" prop="beginTime">
                      <span v-if="formData.beginTime">{{formData.beginTime}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.endTime">
                    <el-form-item label="作息截止时间 :" prop="endTime">
                      <span v-if="formData.endTime">{{formData.endTime}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.className">
                    <el-form-item label="班级 :" prop="className">
                      <span v-if="formData.className">{{formData.className}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.subjectName">
                    <el-form-item label="学科 :" prop="subjectName">
                      <span v-if="formData.subjectName">{{formData.subjectName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.teacherName">
                    <el-form-item label="教师姓名 :" prop="teacherName">
                      <span v-if="formData.teacherName">{{formData.teacherName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.placeName">
                    <el-form-item label="教室 :" prop="placeName">
                      <span v-if="formData.placeName">{{formData.placeName}}</span>
                    </el-form-item>
                  </div>
                </div>
              </div>
            </el-form>
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
  import api from "./classcoursetableUrl";
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
        optionsList2: [
          {label: '第一学期', value: '1'},
          {label: '第二学期', value: '2'}
        ],
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        yearList: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        weekTypeCodeOptions: [{"label": "全部", "name": ""}],
        weekTypeCode: null,
        formData: {
          courseTableId: '',
          subjectId: "",
          subjectName: "",
          teacherId: "",
          teacherName: "",
          teacherUserId: "",
          placeId: "",
          placeName: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          weekTypeCode:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          weekNum:
            [
              {validator: validation.number, trigger: "blur"},

            ],
          weekSequnceNum:
            [
              {validator: validation.number, trigger: "blur"},

            ],
          calendarId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          calendarName:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          schoolYear:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          schoolTerm:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          calendarDt:
            [],
          timelineDetailId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          timelineDetailName:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          beginTime:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          endTime:
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
    // directives: {preview},
    created() {
      for (let i = 0; i < 10; i++) {
        this.yearList.push({
          label: `${2018 + i}年`,
          value: `${2018 + i}`,
        })
      }
      this.getDetail(this.$route.params.id);
      commonApi.getCodeIntType("weekType").then(res => {
        let viewList = res.data.data || [];
        for (let weekTypeItem of viewList) {
          this.weekTypeCodeOptions.push({
            "label": weekTypeItem.codeDesc,
            "name": weekTypeItem.codeId
          });
        }
      });
    },
    methods: {
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        let obj = {
          schoolYear: `${this.formData.schoolYearStart}-${this.formData.schoolYearEnd}`,
          schoolTerm: this.formData.schoolTerm,
        }
        set[formName].validate(valid => {
          if (this.pageState === 'add' && valid) {
            this.formLoading = true;
            api.addObj(obj).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("自动新增课表成功");
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
