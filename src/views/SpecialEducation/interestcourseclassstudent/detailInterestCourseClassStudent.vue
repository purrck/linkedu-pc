

<template>
  <div>
    <div class="edit-box">
        <div v-if="pageState === 'add'">

          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">
                  <el-col v-show="false" :span="24">
                    <el-form-item label="兴趣班id :" prop="interestCourseClassId">
                      <el-input class="input-v2-rao" v-model="formData.interestCourseClassId"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>
            <el-col :span="24">
              <el-form-item label="状态 :" prop="classStudentStatusCode">
                <el-select class="select-v2-rao" v-model="formData.classStudentStatusCode" placeholder="请您选择">
                  <el-option v-for="classStudentStatusCodeItem in classStudentStatusCodeOptions"
                             :key="classStudentStatusCodeItem.name"
                             :label="classStudentStatusCodeItem.label" :value="classStudentStatusCodeItem.name">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
                  <el-col :span="24">
                    <el-form-item label="兴趣班 :" prop="interestCourseClassName">
                      <el-input disabled class="input-v2-rao" v-model="formData.interestCourseClassName"
                                maxlength="32"></el-input>
                    </el-form-item>
                  </el-col>

            <!--<el-col :span="24">-->
              <!--<el-form-item label="兴趣班">-->
                <!--<el-select class="select-v2-rao p100" @change="getClassName()" popper-class="select-popper-v2-rao" v-model="formData.interestCourseClassId"-->
                           <!--placeholder="请您选择" >-->
                  <!--<el-option value="">-->
                    <!--请您选择-->
                  <!--</el-option>-->
                  <!--<el-option v-for="(item,index) in data" :key="item.interestCourseClassId"-->
                             <!--:label="item.interestCourseClassName"  :value="item.interestCourseClassId" >-->
<!--&lt;!&ndash;                    <div>{{item.interestCourseClassName}}</div>&ndash;&gt;-->
                  <!--</el-option>-->
                <!--</el-select>-->
              <!--</el-form-item>-->
            <!--</el-col>-->

<!--            <el-col :span="24">-->
<!--              <el-form-item label="学段">-->
<!--                <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao"-->
<!--                            placeholder="请您选择">-->
<!--                  <el-option value="">-->
<!--                    请您选择-->
<!--                  </el-option>-->
<!--                  <el-option v-for="(item,index) in data" :key="index"-->
<!--                             :label="item.interestCourseClassName" :value="item.id">-->
<!--                    <div @click="segmentClick(index,item)">{{item.interestCourseClassName}}</div>-->
<!--                  </el-option>-->
<!--                </el-select>-->
<!--              </el-form-item>-->
<!--            </el-col>-->


            <el-col :span="24">
              <el-form-item label="学生选择 :"  class="orgIntroduction">
                <send-object :header="header" @finish="finish" ></send-object>
              </el-form-item>
            </el-col>

            <el-col :span="24">
              <el-form-item label="已选择学生 :" prop="studentName">
                <el-input
                  type="textarea"
                  :rows="5"
                  placeholder="已选择的学生"
                  disabled
                  v-html="showNames">
                </el-input>

<!--                <el-input class="input-v2-rao" v-model="formData.studentName"-->
<!--                          disabled   maxlength="32"></el-input>-->
              </el-form-item>
            </el-col>

<!--                  <el-col :span="24">-->
<!--                    <el-form-item label="学生id :" prop="studentId">-->
<!--                      <el-input class="input-v2-rao" v-model="formData.studentId"-->
<!--                                maxlength="32"></el-input>-->
<!--                    </el-form-item>-->
<!--                  </el-col>-->
          </el-form>
        </div>

        <div v-if="pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

                  <el-col :span="24">
                    <el-form-item label="状态 :" prop="classStudentStatusCode">
                      <el-select class="select-v2-rao" v-model="formData.classStudentStatusCode" placeholder="请您选择">
                        <el-option v-for="classStudentStatusCodeItem in classStudentStatusCodeOptions"
                                   :key="classStudentStatusCodeItem.name"
                                   :label="classStudentStatusCodeItem.label" :value="classStudentStatusCodeItem.name">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="参与学习学时 :" prop="classHourStudyed">
                      <el-input class="input-v2-rao" v-model="formData.classHourStudyed"
                                maxlength="11"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="上次上课时间 :" prop="lastStudyDt">
                      <el-date-picker class="date-v2-rao" v-model="formData.lastStudyDt" type="datetime"
                                      placeholder="选择日期"
                                      value-format="yyyy-MM-dd HH:mm"
                                      :picker-options="pickTime"></el-date-picker>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="考核评价 :" prop="examEvaluation"
                                  class="orgIntroduction">
                      <editor v-model="formData.examEvaluation" :true-height="350"/>
                    </el-form-item>
                  </el-col>

                  <el-col :span="24">
                    <el-form-item label="考核分数 :" prop="examScore">
                      <el-input class="input-v2-rao" v-model="formData.examScore"
                                maxlength="9"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="24">
                    <el-form-item label="获取证书 :" prop="imagePath">
                      <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
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
                      {{formData.interestCourseClassName}}
                </div>
                <div class="detail-item-v2">
                        <div class="p50" v-if="formData.interestCourseClassName">
                          <el-form-item label="兴趣班 :" prop="interestCourseClassName">
                            <span v-if="formData.interestCourseClassName">{{formData.interestCourseClassName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.studentName">
                          <el-form-item label="学生 :" prop="studentName">
                            <span v-if="formData.studentName">{{formData.studentName}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.className">
                          <el-form-item label="班级 :" prop="className">
                            <span v-if="formData.className">{{formData.className}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="状态 :" prop="classStudentStatusCode">
                            <span v-if="formData.classStudentStatusCodeStr"
                                  :style="{'color':formData.classStudentStatusCodeStr.split(';')[1]}">{{formData.classStudentStatusCodeStr.split(';')[0]}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50" v-if="formData.classHourStudyed">
                          <el-form-item label="参与学习学时 :" prop="classHourStudyed">
                            <span v-if="formData.classHourStudyed">{{formData.classHourStudyed}}</span>
                          </el-form-item>
                        </div>
                        <div class="p50">
                          <el-form-item label="上次上课时间 :" prop="lastStudyDt">
                            <span v-if="formData.lastStudyDt"> {{formData.lastStudyDt}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100" v-if="formData.examEvaluation">
                          <el-form-item label="考核评价 :" prop="examEvaluation">
                            <span v-if="formData.examEvaluation" v-html="formData.examEvaluation"></span>
                          </el-form-item>
                        </div>

                        <div class="p50" v-if="formData.examScore">
                          <el-form-item label="考核分数 :" prop="examScore">
                            <span v-if="formData.examScore">{{formData.examScore}}</span>
                          </el-form-item>
                        </div>

                        <div class="p100">
                          <el-form-item label="获取证书 :" prop="imagePath">
                            <img :src="formData.imagePath" alt="" width="100px" v-show="formData.imagePath">
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
  import api from "./interestcourseclassstudentUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import {BaiduMap, BmGeolocation, BmInfoWindow, BmLocalSearch, BmMarker, BmNavigation,} from 'vue-baidu-map';
  import SendObject from "../../../components/sendObject/testSendObject";

  //import preview from '@/util/preview';
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
      uploads,
    },
      // components: {},
    data() {
      return {
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
                single: false,
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
                single: false,
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
                single: false,
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
                single: false,
                isActive: false,
                url: ''
              },
            ]
          },
        ],

        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        classStudentStatusCodeOptions: [{"label": "全部", "name": ""}],
        classStudentStatusCode : null,
        imagePathFileList :[],
        imagePathFileType:'',

        formData:{
              classStudentId:'',
              classStudentStatusCode :"",
              classHourStudyed :"",
              lastStudyDt :"",
              examEvaluation :"",
              examScore :"",
              imagePath :"",
              studentName: "",
          studentNames:'',
          studentUserIds:'',
          interestCourseClassName:'',
        },
        data:[],
        showNmae:[],

      pickTime : {
          disabledDate(time)
          {
            return time.getTime() < Date.now();
          }
        },
        params:{
            page : 1,
            limit:20,
        },
        showName:[],
        showNames:null,
        rules : {
          classStudentStatusCode: [{required: true, message: "请选择状态", trigger: "blur"},],

          interestCourseClassId :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              interestCourseClassName :
              [
                  {max: 32, message: "最多能输入32个字", trigger: "blur"},

              ],
              studentId :
              [
                {required: true, message: "请选择状态", trigger: "blur"},

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
      this.formData.interestCourseClassId = this.$route.params.id
      this.formData.interestCourseClassName = this.$route.query.interestCourseClassName

      this.getDetail(this.$route.params.id);
          commonApi.getCodeIntType("classStudentStatus").then(res => {
        let viewList = res.data.data || [];
        for (let classStudentStatusItem of viewList) {
          this.classStudentStatusCodeOptions.push({
            "label": classStudentStatusItem.codeDesc,
            "name": classStudentStatusItem.codeId
          });
        }
      });
          this.getList();
    },
    methods: {

      uploadData(res) {
        this.formData.imagePath = res;
      },
      getClassName(){
        this.data.map(item=>{
          if (item.interestCourseClassId=== this.formData.interestCourseClassId) {
            this.formData.interestCourseClassName   =item.interestCourseClassName
          }
        })
      console.log(this.formData.interestCourseClassName);
      },
      getList() {
        api.fetchClassList(this.params).then(res => {
          // console.log(res.data.data.records)
          this.data = res.data.data.records;
          this.isLoaded = false;
        }, res => {
          this.$message.error(res.message);
        });
      },
      studentChange(item){
        console.log(item)
      },
      finish(res) {
        // console.log(res);
        // console.log(res.header[3].children);
        // this.formData.className = res.header[3].children[0].subTitle;
        // // // this.formData.studentId = res.header[3].children[0].checked
        this.showNames=''
        this.showName=[];
        let arr = [];
        for (let item in res.header[3].children) {
          // console.log(res.header[3].children[item]);
          let ori = res.header[3].children[item].checked
          arr = arr.concat(ori)
        }
        this.formData.studentUserIds = arr;

        // console.log(res.header[3].children)

        for (let i=0;i<res.header[3].children.length;i++){
          for (let j=0;j<res.header[3].children[i].checked.length;j++){  //allchildren
            for (let k=0;k<res.header[3].children[i].children.length;k++){
              if (res.header[3].children[i].checked[j]===res.header[3].children[i].children[k].id){
                console.log(res.header[3].children[i].children[k].name)
                this.showName = this.showName.concat(res.header[3].children[i].children[k].name)
              }
            }
          }
        }
        this.showNames=this.showName.join()
        // console.log(this.showNames.join());
        //

        // this.showNames=this.showName.slice(',')
        // res.header[3].children[0].children.forEach(res => {
        //     this.showNmae.push(res.name);
        //     console.log(this.showNmae);
        // });


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
