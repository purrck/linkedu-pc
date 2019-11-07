<template>
<el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  style="min-height: 600px" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)" class="bF5F5F5">
                <el-main>
                  <el-button v-if="pageState === 'add'" type="primary" class="button-v2-rao b93BF88 mb10">新增班级科任教师信息</el-button>
                  <el-button v-if="pageState === 'edit'" type="primary" class="button-v2-rao b93BF88 mb10">编辑班级科任教师信息</el-button>
                  <el-button v-if="pageState === 'detail'" type="primary" class="button-v2-rao b93BF88 mb10">详情班级科任教师信息</el-button>
  <div>
    <div class="edit-box bfff">
      <div v-if="pageState === 'add'">
<div class="clearfix" v-for="(item,index) in lotClassList" :key="index">

                  <el-form :label-position="'right'" ref="formData" :inline="true" :model="item" :rules="rules" size="small">


          <el-col :span="4">
            <el-form-item label="科任状态 :" prop="classTeacherStatusCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="item.classTeacherStatusCode" placeholder="请您选择">
                <el-option v-for="classTeacherStatusCodeItem in classTeacherStatusCodeOptions"
                           :key="classTeacherStatusCodeItem.name"
                           :label="classTeacherStatusCodeItem.label" :value="classTeacherStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="4">
            <el-form-item label="学年 *  :" prop="schoolYear">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="item.schoolYear" placeholder="请您选择">
                <el-option v-for="item in schoolYearList"
                           :key="item.value"
                           :label="item.name" :value="item.value">
                </el-option>
              </el-select>
              
            </el-form-item>
          </el-col>


          <el-col :span="4">
            <el-form-item label="学期 *  :" prop="schoolTerm">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="item.schoolTerm" placeholder="请您选择">
                <el-option v-for="data in schoolTermOptions" :key="data.name"
                           :label="data.name" :value="data.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">
                    <el-form-item label="年级">
                        <el-select v-model="item.gradeId" class="select-v2-rao p100" popper-class="select-popper-v2-rao" placeholder="请您选择" @change="gradeChange">
                            <el-option value="">
                                请您选择
                            </el-option>
                            <el-option v-for="(data,index) in gradeList" :key="index"
                                    :label="data.name" :value="data.id">
                                    <div @click="gradeClick(index,item)">{{data.name}}</div>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="4" v-show="item.classList.length">
                    <el-form-item label="班级">
                        <el-select v-model="item.classId" class="select-v2-rao p100" popper-class="select-popper-v2-rao" placeholder="请您选择" @change="classChange">
                            <el-option value="">
                                请您选择
                            </el-option>
                            <el-option v-for="(data,index) in item.classList" :key="index"
                                    :label="data.name" :value="data.id">
                                    <div @click="classClick(index,item)">{{data.name}}</div>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="4" v-show="item.subjectList.length">
                    <el-form-item label="学科">
                        <el-select v-model="item.subjectId" class="select-v2-rao p100" popper-class="select-popper-v2-rao" placeholder="请您选择" @change="subjectChange">
                            <el-option value="">
                                请您选择
                            </el-option>
                            <el-option v-for="(data,index) in item.subjectList" :key="index"
                                    :label="data.name" :value="data.id">
                                    <div @click="subjectClick(index,item)">{{data.name}}</div>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>



                <el-col :span="4">
                    <el-form-item label="教师 :" prop="teacherName">
                        <el-col :span="16">
                            <el-input v-model="item.teacherName" readonly="readonly" class="input-v2-rao" maxlength="11"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button @click="selectTeacher(item)" type="primary" size="small" class="button-v2-rao border-color-cccccc c000000 bfff">选择</el-button>
                        </el-col>
                    </el-form-item>
                </el-col>
          
          <div class="clearfix"></div>

        </el-form>
</div>
        <div class="clearfix">
                <el-button type="primary" class="mt10" size="small"
                   @click="addItem"><i class="iconfont icon-icon_xinjian f12 cfff"></i>新增
        </el-button>
            </div>
      </div>

      <div v-if="pageState === 'edit'">
          <div class="clearfix" v-for="(item,index) in lotClassList" :key="index">

                  <el-form   :label-position="'right'"
                  ref="formData" :inline="true" :model="item" :rules="rules" size="small">


          <!--<pj-grade-class-subject :conf="conf" @callback="treeCall"></pj-grade-class-subject>-->
          

          


          <el-col :span="4">
            <el-form-item label="科任状态 :" prop="classTeacherStatusCode">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="item.classTeacherStatusCode" placeholder="请您选择">
                <el-option v-for="classTeacherStatusCodeItem in classTeacherStatusCodeOptions"
                           :key="classTeacherStatusCodeItem.name"
                           :label="classTeacherStatusCodeItem.label" :value="classTeacherStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="4">
            <el-form-item label="学年 *  :" prop="schoolYear">
              <el-input class="input-v2-rao " v-model="item.schoolYear" maxlength="11"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="4">
            <el-form-item label="学期 *  :" prop="schoolTerm">
              <el-select class="select-v2-rao p100" popper-class="select-popper-v2-rao" v-model="item.schoolTerm" placeholder="请您选择">
                <el-option v-for="data in schoolTermOptions" :key="data.name"
                           :label="data.name" :value="data.label">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="4">
                    <el-form-item label="年级">
                        <el-select v-model="item.gradeId" class="select-v2-rao p100" popper-class="select-popper-v2-rao" placeholder="请您选择" @change="gradeChange">
                            <el-option value="">
                                请您选择
                            </el-option>
                            <el-option v-for="(data,index) in gradeList" :key="index"
                                    :label="data.name" :value="data.id">
                                    <div @click="gradeClick(index,item)">{{data.name}}</div>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="4" v-show="item.classList.length">
                    <el-form-item label="班级">
                        <el-select v-model="item.classId" class="select-v2-rao p100" popper-class="select-popper-v2-rao" placeholder="请您选择" @change="classChange">
                            <el-option value="">
                                请您选择
                            </el-option>
                            <el-option v-for="(data,index) in item.classList" :key="index"
                                    :label="data.name" :value="data.id">
                                    <div @click="classClick(index,item)">{{data.name}}</div>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="4" v-show="item.subjectList.length">
                    <el-form-item label="学科">
                        <el-select v-model="item.subjectId" class="select-v2-rao p100" popper-class="select-popper-v2-rao" placeholder="请您选择" @change="subjectChange">
                            <el-option value="">
                                请您选择
                            </el-option>
                            <el-option v-for="(data,index) in item.subjectList" :key="index"
                                    :label="data.name" :value="data.id">
                                    <div @click="subjectClick(index,item)">{{data.name}}</div>
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>

                <el-col :span="4">
                    <el-form-item label="教师 :" prop="teacherName">
                        <el-col :span="16">
                            <el-input v-model="item.teacherName" readonly="readonly" class="input-v2-rao" maxlength="11"></el-input>
                        </el-col>
                        <el-col :span="4">
                            <el-button @click="selectTeacher(item)" type="primary" size="small" class="button-v2-rao border-color-cccccc c000000 bfff">选择</el-button>
                        </el-col>
                    </el-form-item>
                </el-col>

          <div class="clearfix"></div>

        </el-form>
</div>
      </div>


      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">

            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="" label-width="165px"
                     :inline="true" :model="formData" size="small">

              <el-col :span="8" v-if="formData.schoolName">
                <el-form-item label="学校 :" prop="schoolName">
                  {{formData.schoolName}}
                </el-form-item>
              </el-col>
              <el-col :span="8" v-if="formData.className">
                <el-form-item label="班级 :" prop="className">
                  {{formData.className}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.teacherName">
                <el-form-item label="教师 :" prop="teacherName">
                  {{formData.teacherName}}
                </el-form-item>
              </el-col>

              <el-col :span="8" v-if="formData.subjectName">
                <el-form-item label="科目 :" prop="subjectName">
                  {{formData.subjectName}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.classTeacherStatusCode">
                <el-form-item label="科任状态 :" prop="classTeacherStatusCode"
                              v-if="formData.classTeacherStatusCodeStr"
                              :style="{'color':formData.classTeacherStatusCodeStr.split(';')[1]}">
                  {{formData.classTeacherStatusCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.gradeName">
                <el-form-item label="年级 :" prop="gradeName">
                  {{formData.gradeName}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.schoolYear">
                <el-form-item label="学年 :" prop="schoolYear">
                  {{formData.schoolYear}}
                </el-form-item>
              </el-col>


              <el-col :span="8" v-if="formData.schoolTerm">
                <el-form-item label="学期 :" prop="schoolTerm">
                  <span v-show="formData.schoolTerm == '1'">上学期</span>
                  <span v-show="formData.schoolTerm == '2'">下学期</span>
                </el-form-item>
              </el-col>


            </el-form>
          </el-col>

        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center">
        <el-button type="primary" class="ml80 mt20" size="small"
                   @click="goBack">返回
        </el-button>
        <el-button v-if="pageState === 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>

      </div>

    </div>
  </div>
  </el-main>
</el-container>
</template>

<script>
  import api from "./basicclassteacherUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import { mapGetters,mapMutations } from 'vuex';

  export default {
    data() {
      return {
        schoolYearList : [{
            "name": "请选择",
            "value": ""
          }],
        lotClassList : [
                {
    "teacherId": "", 
    "classTeacherStatusCode": "", 
    "schoolYear": "", 
    "schoolTerm": "", 
    "teacherName": "", 
    "subjectId": "", 
    "classId": "", 
    "gradeId": "", 
    "subjectName": "", 
    "className": "", 
    "gradeName": "", 
    "schoolId": "", 
    "schoolName": "",
    "segmentId" : "",
    "gradeList" : [],
    "subjectList" : [],
    "classList" : []
}

            ],
        watcher : null,
            data : {
                    segment : {},
                    grade : {},
                    subject : {},
                    class:""
                },
                msg : {
                    segmentId :"",
                    segmentName :"",
                    gradeId :"",
                    gradeName :"",
                    subjectId :"",
                    subjectName :""
                },
                segmentList : [],
                gradeList : [],
                subjectList : [],
            conf : {
                segmentId : "",
                gradeId : "",
                subjectId : ""
            },
        conf: {
          gradeId: "",
          classId: "",
          subjectId: ""
        },
        schoolTermOptions : [
          {
            "label": "请选择",
            "name": ""
          },
          {
            "label": "1",
            "name": "上学期"
          },
          {
            "label": "2",
            "name": "下学期"
          }
        ],
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        classTeacherStatusCodeOptions: [{"label": "请选择", "name": ""}], classTeacherStatusCode: null,
        formData: {
          teacherId: null,
          classTeacherStatusCode: "",
          schoolYear: "",
          schoolTerm: "",
          teacherName: ""
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          classId: [
            {required: true, message: "请您输入班级id", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          className: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          teacherId: [
            {required: true, message: "请您输入教师id", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          teacherName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          subjectId: [
            {required: true, message: "请您输入科目id", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          subjectName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          classTeacherStatusCode: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          schoolYear: [
            {required: true, message: "请您输入学年", trigger: "blur"},
            {validator: validation.number, trigger: "blur"},

          ],
          schoolTerm: [
            {required: true, message: "请您输入学期", trigger: "blur"},
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
        }
      }
    },
    computed: {
      ...mapGetters(['schoolInfo','isLoading']),
      pageState() {
        return this.$route.query.type;
      },
      classId() {
        return this.$route.query.classId
      },
      gradeId() {
        return this.$route.query.gradeId
      }
    },

    components: {editor, upload},
    created() {
      this.SET_IS_LOADING(false);
      if (this.pageState == "add") {
        if (this.classId == "" || this.classId == null || this.classId == "undefined") {
          this.conf.classId = ""
        }else{
          this.conf.classId = this.classId
        }
        if (this.gradeId == "" || this.gradeId == null || this.gradeId == "undefined") {
          this.conf.gradeId = ""
        }else{
          this.conf.gradeId = this.gradeId
        }
      } else {
        this.getDetail(this.classId);
      }

      for(let i=2000; i<=2050; i++){
        this.schoolYearList.push({
          name : `${i}-${i+1}`,
          value : i
        })
      }


      commonApi.getCodeIntType("classTeacherStatus").then(res => {
        let viewList = res.data.data || [];
        for (let classTeacherStatusItem of viewList) {
          this.classTeacherStatusCodeOptions.push({
            "label": classTeacherStatusItem.codeDesc,
            "name": classTeacherStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      this.getPJGradeClassSubject()
    },
    methods: {
      ...mapMutations(['SET_IS_LOADING']),
      selectTeacher(data){
                this.$callTeacherDialog({
                    callback : (msg) => {
                      
                        data.teacherName = msg.userName
                        data.teacherId = msg.teacherId
                    }
                })
            },
      addItem(){
                    this.lotClassList.push({
    "teacherId": "", 
    "classTeacherStatusCode": "", 
    "schoolYear": "", 
    "schoolTerm": "", 
    "teacherName": "", 
    "subjectId": "", 
    "classId": "", 
    "gradeId": "", 
    "subjectName": "", 
    "className": "", 
    "gradeName": "", 
    "schoolId": "", 
    "schoolName": "",
    "segmentId" : "",
    "gradeList" : [],
    "subjectList" : [],
    "classList" : []
})
            },
      treeCall(event) {
        // console.log(event)

        this.formData.subjectId = event.subject.id
        this.formData.classId = event.class.id
        this.formData.gradeId = event.grade.id
        this.formData.subjectName = event.subject.name
        this.formData.className = event.class.name
        this.formData.gradeName = event.grade.name
      },
      jsCallback(event) {
        // console.log(event)
        this.formData.teacherId = event.teacherId
        this.formData.teacherName = event.userName;
      },
      //图片上传
      uploadData(res) {
        this.formData.imagePath = res;
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


        this.formData.schoolId = this.schoolInfo.schoolOrgId
        this.formData.schoolName = this.schoolInfo.schoolOrgName

          if (this.pageState === "edit") {
          this.formLoading = true;
          this.lotClassList.map(item => {
                this.formData.gradeId = item.gradeId;
                this.formData.gradeName = item.gradeName;
                this.formData.classId = item.classId;
                this.formData.className = item.className;
                this.formData.subjectId = item.subjectId;
                this.formData.subjectName = item.subjectName;
                this.formData.schoolYear = item.schoolYear;
                this.formData.schoolTerm = item.schoolTerm;
                this.formData.teacherId = item.teacherId;
                this.formData.teacherName = item.teacherName;
            })
            api.putObj(this.formData).then(res => {

              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
              } else {
                //this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          } else if (this.pageState === "add") {
                this.formLoading = true;
                let _a = [];
                  this.lotClassList.map(item => {
                      _a.push({
                          gradeId : item.gradeId,
                          gradeName: item.gradeName,
                          classId: item.classId,
                          className: item.className,
                          subjectId: item.subjectId,
                          subjectName: item.subjectName,
                          schoolYear : item.schoolYear,
                          schoolTerm : item.schoolTerm,
                          teacherId : item.teacherId,
                          teacherName : item.teacherName
                      })
                  })
            api.addTeacherNew(_a).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          }

        this.isLoaded = false;

      },


      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          this.SET_IS_LOADING(true);
          api.getObj(paramsId).then(res => {

            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
              this.conf.classId = this.formData.classId
              this.conf.gradeId = this.formData.gradeId
              this.conf.subjectId = this.formData.subjectId
              this.SET_IS_LOADING(false);
              //this.pageState == 'edit' && this.$refs.teacher.setRoleId(this.formData.teacherId,this.formData.teacherName)

              for(let key in res.data.data){
                this.lotClassList[0][key] = res.data.data[key]
              }
              
            }
            this.isLoaded = false;
            
          }, res => {
            this.$message.error(res.message);
          });
        }
      },
      goBack() {
        this.$router.go(-1);
      },
      getPJGradeClassSubject(){
                commonApi.getPJGradeClassSubject().then((res) => {
                    /*res.data.data.children.map((item,index) => {
                        item['pid'] = `${index}`;
                        item.children.map((item1,index1) => {
                            item1['pid'] = `${index1}`;
                            item1.children.map((item2,index2) => {
                                item2['pid'] = `${index2}`;
                            })
                        })
                    })*/
                    let a=[];
                    for(let i=0; i<res.data.data.children.length; i++){
                        for(let j=0; j<res.data.data.children[i].children.length; j++){
                            a.push(res.data.data.children[i].children[j])
                        }
                    }
                    this.gradeList = a

                    this.gradeList.map((item,index) => {
                        if(item.id == this.conf.gradeId){
                          
                            //this.conf.gradeName = item.name
                            this.data.grade['name'] = item.name
                            this.data.grade['id'] = item.id
                            
                            item.children.map((item1,index1) => {
                                if(item1.name == "class"){
                                    //this.classList = item1.children
                                    this.lotClassList[0].classList = item1.children
                                }
                                if(item1.name == "subject"){
                                    //this.subjectList = item1.children
                                    this.lotClassList[0].subjectList = item1.children
                                }
                            });
                            this.lotClassList[0].classList.map((item1,index1) => {
                                if(item1.id == this.conf.classId){
                                    this.lotClassList[0].classId = item1.id
                                    this.lotClassList[0].className = item1.name
                                    //this.conf.className = item1.name
                                    //this.data.class['name'] = item1.name
                                    //this.data.class['id'] = item1.id

                                }
                            })
                            this.lotClassList[0].subjectList.map((item1,index1) => {
                                if(item1.id == this.conf.subjectId){
                                    this.lotClassList[0].subjectId = item1.id
                                    this.lotClassList[0].subjectName = item1.name
                                    //this.conf.subjectName = item1.name

                                    //this.data.subject['name'] = item1.name
                                    //this.data.subject['id'] = item1.id
                                    
                                }
                            })
                            //this.$emit("callback",this.data)
                        }
                    })
                })
            },
            classChange(event){
                if(event == ""){
                    //this.conf.className = "";
                    //this.conf.classId = "";
                    //this.data.class['name'] = ""
                    //this.data.class['id'] = ""
                    //this.$emit("callback",this.data)
                }
            },
            classClick(index,data){
              data.className = data.classList[index].name
                this.conf.className = data.classList[index].name
                this.conf.classId = data.classList[index].id
                //this.data.class['name'] = data.classList[index].name
                //this.data.class['id'] = data.classList[index].id
                //this.$emit("callback",this.data)
            },
            subjectChange(event){
                if(event == ""){
                    //this.conf.subjectId = "";
                    //this.conf.subjectName = "";
                    //this.data.subject['name'] = ""
                    //this.data.subject['id'] = ""
                    //this.$emit("callback",this.data)
                }
            },
            subjectClick(index,data){
              data.subjectName = data.subjectList[index].name
                //this.conf.subjectName = this.subjectList[index].name
                //this.conf.subjectId = this.subjectList[index].id

                //this.data.subject['name'] = data.subjectList[index].name
                //this.data.subject['id'] = data.subjectList[index].id
                //this.$emit("callback",this.data)
            },
            gradeChange(event){
                //this.conf.subjectId = "";
                //this.conf.subjectName = "";
                //this.conf.className = "";
                //this.conf.classId = ""
                if(event == ""){
                    /*this.classList = [];
                    this.subjectList = [];
                    this.data.class['name'] = ''
                    this.data.class['id'] = ''
                    this.data.subject['name'] = ''
                    this.data.subject['id'] = ''
                    this.data.grade['name'] = ''
                    this.data.grade['id'] = ''*/
                    //this.$emit("callback",this.data)
                }
            },
            gradeClick(index,data){
              
                data.gradeName = this.gradeList[index].name
                //this.conf.gradeName = this.gradeList[index].name
                //this.conf.gradeId = this.gradeList[index].id
                data.classId = ""
                data.subjectId = ""
                this.gradeList[index].children.map((item,index) => {

                    if(item.name == "class"){
                        data.classList = item.children
                    }
                    if(item.name == "subject"){
                        data.subjectList = item.children
                    }
                });
                //this.data.grade['name'] = this.gradeList[index].name
                //this.data.grade['id'] = this.gradeList[index].id
                /*this.data.class['name'] = ''
                this.data.class['id'] = ''
                this.data.subject['name'] = ''
                this.data.subject['id'] = ''*/
                //this.$emit("callback",this.data)
            }
        }
    }

</script>
<style lang="scss" scoped>
  .menu-quickly {
    width: 166px;
    border: 1px solid #d8d8d8;

    a.current {
      background: #4A9388;
      color: #fff
    }

    a {
      padding: 10px 0 10px 15px;
      font-size: 14px;
      display: block;

      img {
        padding-right: 8px;
        vertical-align: -4px;
      }

    }

    a:hover {
      text-decoration: none;
    }

  }

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
