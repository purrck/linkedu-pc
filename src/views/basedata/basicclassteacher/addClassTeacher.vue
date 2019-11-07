<template>
<el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
            <el-main>
    <div class="pa30">
        <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="学年:" prop="entityOrgId">
              <el-select size="small" popper-class="select-popper-v2-rao" class="select-v2-rao" style="width:100px" v-model="searchForm.schoolYear" placeholder="请选择">
                    <el-option
                      v-for="item in schoolYearList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      <div>{{item.name}}</div>
                    </el-option>
                  </el-select>
          </el-form-item>
          <el-form-item label="学期:">
            <el-select size="small" popper-class="select-popper-v2-rao" class="select-v2-rao" style="width:100px" v-model="searchForm.schoolTerm" placeholder="请选择">
                    <el-option
                      v-for="item in schoolTermList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      <div>{{item.name}}</div>
                    </el-option>
                  </el-select>
          </el-form-item>
          <el-form-item label="学段:">
            <el-select size="small" popper-class="select-popper-v2-rao" class="select-v2-rao" style="width:100px" v-model="segmentOptionsValue" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in segmentOptionList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      <div @click="sementClick(index,item)">{{item.name}}</div>
                    </el-option>
                  </el-select>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "duoxuan">
            多选
            </el-button>
          </el-form-item>
          <el-form-item label="">
            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "teacher">
            选择老师
            </el-button>
          </el-form-item>
        </el-form>
      </el-header>

            <!--<el-table :data="schedule" tooltip-effect="dark" style="width: 100%" border class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true">
                <span v-for="(data,key) in schedule" :key="key">
                    <el-table-column :label="data.columnTitle" width="55" align="center">
                        <template slot-scope="scope">
                            <el-switch v-model="scope.row.switch" active-color="#93BF88" inactive-color="#dcdfe6">
                            </el-switch>
                        </template>
                    </el-table-column>
                </span>
            </el-table>-->

            <div class="el-table table-v2-rao mt20 el-table--fit el-table--striped el-table--border el-table--enable-row-hover el-table--enable-row-transition">
                <table class="p100 addSubjectTable">
                    <tr class="table-header-v2-rao">
                        <th width="150">
                        <div class="cell">
                            <el-select size="small" popper-class="select-popper-v2-rao" class="select-v2-rao" style="width:150px" v-model="classOptionsValue" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in classList"
                      :key="item.id"
                      :label="item.name"
                      :value="item.id">
                      <div @click="classClick(index,item)">{{item.name}}</div>
                    </el-option>
                  </el-select>
                        </div>
                        </th>

                        <th v-for="(item,index) in subjectList" :key="index">
                            <div class="cell">
                                <input type="radio" @click="subjectSelect(index)" name="classType" :style="isClassShow" :value="index" />
                                <span>{{item.name}}</span>
                            </div>
                        </th>

                    </tr>
                    <tr class="el-table__row" v-for="(item,index) in dataList" :key="index">
                        <td><div class="cell" style="text-align:center">{{item.name}}</div></td>
                        <td v-for="(data,key) in item.sementSubject" :key="key">
                            <div class="cell" style="text-align:center">
                                <el-col :span="2">
                                <el-checkbox @change="switchChange(data)" :style="data.isShow" class="mt5"></el-checkbox>
                                </el-col>
                                <el-col :span="22">
                                <div class="relative">
                                    <el-input size="mini" v-model="data.teacherName" readonly="readonly" class="input-v2-rao" placeholder="请选择"></el-input>
                                    <i @click="selectTeacher(data)" class="iconfont icon-icon_xuanzeliebiao c93BF88 absolute top-5 right5"></i>
                                </div>
                                </el-col>
                                <!--<el-switch v-model="data.switch"
                                    active-color="#93BF88"
                                    inactive-color="#dcdfe6" @change="switchChange(data)">
                                </el-switch>-->
                                <!--<input type="checkbox" :checked="data.switch" @change="switchChange(data)" />-->
                                <!--<el-switch v-model="data.switch"
                                    active-color="#93BF88"
                                    inactive-color="#dcdfe6" @change="switchChange(data)">
                                </el-switch>-->
                                <!--<el-switch v-model="data[`a${currentSegmentIndex}${index}${key}`]"
                                    active-color="#93BF88"
                                    inactive-color="#dcdfe6" @change="switchChange(data)">
                                </el-switch>-->
                                <!--<el-switch v-model="data['a'+index+key]"
                                    active-color="#93BF88"
                                    inactive-color="#dcdfe6" @change="switchChange(data)">
                                </el-switch>-->
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
            <div class="text-center mt20">
                <el-button type="primary" size="small" :loading="isCreate" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "finishCreate">
                    完成创建
                </el-button>
            </div>
        </div>
        <!--<div v-for="(data,index) in dataList" :key="index">
            <div v-for="(data1,index1) in data.sementSubject" :key="index1">
            <input type="text" v-model="data1.name" /><span @click="sdfsfsdf23(data1)">{{index1}}</span>
            </div>
        </div>-->
        </el-main>
    </el-container>
</template>

<script>
    import api from "./basicclassteacherUrl";
    import { mapGetters, mapMutations } from 'vuex';
    export default {
        data(){
            return {
                searchForm : {
                    schoolTerm : "",
                    schoolYear : "",
                },
                schoolYearList : [
                ],
                isClassShow : {visibility:"hidden"},
                radio2 : "",
                isCreate : false,
                sdfsdfsdfsdf : "",
                asdfsdf : "",
                segmentOptionsValue : "",
                schedule : [
                    {
                        columnTitle : "sffsdf"
                    },{
                        columnTitle : "sffsdf"
                    },{
                        columnTitle : "sffsdf"
                    }
                ],
                gradeList : [],
                currentSegmentIndex : 0,
                currentClassIndex : 0,
                SegmentId: 1,
                getGradeAndSubject : [
                    {
                    sementSubject : [
                        {
                            switch: true
                        }
                    ]
                    }
                ],
                subjectIndex : 0,
                segmentOptionList : [],
                segmentList : [],
                gradeList : [],
                subjectList : [],
                allData : [],
                classList :[],
                classOptionsValue : "",
                dataList : [],
                sfsdfsf : [],
                schoolTermList : [
                    {
                        name : "上学期",
                        id : "1"
                    },
                    {
                        name : "下学期",
                        id : "2"
                    }
                ],
                dList:[]
            }
        },
        computed : {
            ...mapGetters(['isLoading','schoolInfo']),
        },
        created(){
            this.SET_IS_LOADING(false);
            for(let i=2000; i<new Date().getFullYear(); i++){
                this.schoolYearList.unshift({
                    id : i,
                    name : i
                })
            }
            // console.log(this.schoolYearList)
            this.getData();
        },
        mounted(){

        },
        methods : {
            ...mapMutations(["SET_IS_LOADING"]),
            sdfsfsdf23(data){
                // console.log(data)
                data.name = "445"
            },
            asdasdas(data){
               // console.log(data)
            },
            selectTeacher(obj){
                // console.log(obj)
                this.$callTeacherDialog({
                    callback : (msg) => {
                        // console.log(msg.userName)
                        obj.teacherName = msg.userName
                        obj.teacherId = msg.teacherId
                        this.dList = this.dList.filter(item => {
                            return item.uuid != obj.uuid
                        })
                        this.dList.push(obj)
                        // console.log(this.dList)
                    }
                })
            },
            teacher(){
                this.$callTeacherDialog({
                    callback : (msg) => {
                        this.dataList.map(item => {
                            item.sementSubject.map(item => {
                                if(item.id == this.subjectIndex && item.switch){
                                    item.teacherName = msg.userName
                                    item.teacherId = msg.teacherId
                                    this.dList = this.dList.filter(obj => {
                                        return item.uuid != obj.uuid
                                    })
                                    this.dList.push(item)
                                    // console.log(this.dList)
                                }
                            })

                        })
                    }
                })

            },
            duoxuan(){
                this.isClassShow = {visibility:"visible"}
            },
            subjectSelect(index){
                this.subjectIndex = index;
                // console.log(this.dataList)
                this.dataList.map(item => {
                    item.sementSubject.map(item => {
                        if(item.id == index){
                            item.isShow = {visibility:"visible"}
                        }else{
                            item.isShow = {visibility:"hidden"}
                        }
                    })

                })
            },
            getData(){
                this.dataList = []
                // console.log(this.currentSegmentIndex)
                this.SET_IS_LOADING(true);
                this.$store.dispatch("schoolTree",{ schoolId : this.schoolInfo.schoolOrgId }).then(res => {
                    if(res.data.resultCode == "390000"){
                        this.$message.error("该学校尚未设置学段信息,快去设置学段");
                        this.SET_IS_LOADING(false);
                        return
                    }

                    if(res.data.resultCode == "100000"){
                        this.$message.error(res.data.message);
                        this.SET_IS_LOADING(false);
                        return
                    }


                    if(!res.data.data.children.length){
                        this.$message.error("该学校尚未设置班级信息,快去设置班级信息");
                        this.SET_IS_LOADING(false);
                        return
                    }

                    this.allData = res.data.data.children;
                    this.segmentOptionList = res.data.data.children;
                    this.segmentList = res.data.data.children[this.currentSegmentIndex];
                    this.classList = this.segmentOptionList[this.currentSegmentIndex].children

                    this.classList1 = res.data.data.children[this.currentSegmentIndex].children[this.currentClassIndex];
                    this.classOptionsValue = this.classList1.id
                    this.classOptionsName = this.classList1.name

                    //this.classOptionsValue = this.classList[0].id
                    //this.classOptionsName = this.classList[0].name
                    this.segmentList.isSelected = true;
                    this.segmentOptionsValue = this.segmentList.id
                    this.$store.dispatch("segmentSubjectService1",[this.segmentList.id]).then(res => {
                        this.subjectList = res.data.data.children[0].children
                        // console.log(this.classList1)
                        this.classList1.children.map((item3,index3) => {

                                this.$set(item3,"sementSubject", []);
                                this.subjectList.map((item2,index2) => {
                                    item3.sementSubject.push({
                                        uuid : `${index3}${index2}`,
                                        id : index2,
                                        isShow : {visibility:"hidden"},
                                        teacherName : "",
                                        teacherId : "",
                                        subjectName : item2.name,
                                        subjectId : item2.id,
                                        switch : false,
                                        className : item3.name,
                                        classId : item3.id,
                                        gradeName : this.classOptionsName,
                                        gradeId : this.classOptionsValue,
                                        segmentName : this.segmentList.name,
                                        segmentId : this.segmentList.id
                                    })
                                });
                                this.dataList.push(item3)


                        })
                    /*this.$store.dispatch("segmentSubjectService1",[this.segmentList.id]).then(res => {
                        this.subjectList = res.data.data.children[0].children
                        // console.log(this.segmentList)
                        this.segmentList.children.map((item,index) => {
                            item.children.map((item3,index3) => {
                                this.$set(item3,"sementSubject", []);
                                this.subjectList.map((item2,index2) => {
                                    item3.sementSubject.push({
                                        uuid : `${index3}${index2}`,
                                        id : index2,
                                        isShow : {visibility:"hidden"},
                                        teacherName : "",
                                        teacherId : "",
                                        subjectName : item2.name,
                                        subjectId : item2.id,
                                        switch : false,
                                        className : item3.name,
                                        classId : item3.id,
                                        gradeName : this.classOptionsName,
                                        gradeId : this.classOptionsValue,
                                        segmentName : this.segmentList.name,
                                        segmentId : this.segmentList.id
                                    })
                                });
                                this.dataList.push(item3)
                            })

                        })*/
                        this.SET_IS_LOADING(false);
                        // console.log(this.segmentList)
                        // console.log(this.dataList)
                    })
                },res => {
                    this.SET_IS_LOADING(false);
                })

            },
            finishCreate(){

                /*let _a = [];
                this.segmentList.children.map((item) => {
                    item.sementSubject.map(item => {
                        if(item.switch){
                            _a.push(item)
                        }
                    })
                })
                if(!_a.length){
                    this.$message.error("至少选择一个");
                    return
                }*/
                if(!this.searchForm.schoolYear || !this.searchForm.schoolTerm){
                    this.$message.error("请输入学年与学期");
                    return;
                }
                if(!this.dList.length){
                    this.$message.error("请选择教师");
                    return;
                }
                this.isCreate = true;
                let _a = [];
                this.dList.map(item => {
                    _a.push({
                        classId : item.classId,
                        className : item.className,
                        teacherId : item.teacherId,
                        teacherName : item.teacherName,
                        subjectId : item.subjectId,
                        subjectName : item.subjectName,
                        gradeId : item.gradeId,
                        gradeName : item.gradeName,
                        schoolYear : this.searchForm.schoolYear,
                        schoolTerm : this.searchForm.schoolTerm
                    })
                })




                api.addTeacher(_a).then(res => {
                    if (res.data.resultCode == "000000") {
                        this.$message.success("新增成功");
                        //this.$router.push({path:"/basedata/listClassTeacher"})
                    }
                    this.isCreate = false;
                })

            },
            sementClick(index,item){
                this.currentClassIndex = 0;
                this.currentSegmentIndex = index;
                this.classList = this.segmentOptionList[index].children
                this.getData();

            },
            classClick(index,item){
                // console.log()
                this.currentClassIndex = index;
                this.getData();
            },
            goBack () {
                this.$router.go(-1)
            },
            switchChange(data){
                data.switch = data.switch ? false : true
            }
        }
    }
</script>

<style>
</style>
