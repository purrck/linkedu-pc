<template>
    <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-main>
          <div class="pa30 flex1">
            <div class="p40">
                <el-row>
                  <el-col :span="12">
                      <div class=" bF5F5F5 mr15">
                        <div class="pl10 pt10 pb10 ">老师</div>
                        <div class="mt10">
                          <el-input class="input-v2-rao" size="mini" v-model="teacherSearch" placeholder="请输入内容"></el-input>
                        </div>
                      </div>
                      <div class="border1 border-color-D8D8D8 border-radius3 mt10 mr15" style="overflow-y: auto;height: 600px;">
                        <div class="pa10">
                          <el-radio-group v-model="teacherRadio">
                            <div v-for="(data,index) in teacherFilterList" :key="index" class="mt10"><el-radio class="radio-v2-rao" :label="data.teacherId">{{data.userName}}</el-radio></div>
                          </el-radio-group>
                        </div>
                      </div>
                  </el-col>
                  <el-col :span="12">
                      <div class=" bF5F5F5 ml15">
                        <div class="pl10 pt10 pb10">班级</div>
                        <div class="mt10">
                          <el-input class="input-v2-rao" size="mini" v-model="classSearch" placeholder="请输入内容"></el-input>
                        </div>
                      </div>

                      <div class="border1 border-color-D8D8D8 border-radius3 ml15 mt10" style="overflow-y: auto;height: 600px;">
                        <div class="pa10">
                          <el-radio-group v-model="classRadio">
                            <div v-for="(data,index) in classFilterList" :key="index" class="mt10"><el-radio class="radio-v2-rao" :label="data.classId">{{data.className}}</el-radio></div>
                          </el-radio-group>
                        </div>
                      </div>
                  </el-col>
                </el-row>
            </div>
            <div class="p20 flex1 align-items-center justify-content-center">
              <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "fenpeiClick">
                    分配
                  </el-button>
            </div>
            <div class="p40">
              <el-table :data="classTeacherList" tooltip-effect="dark" style="width: 100%;height: 600px;
    overflow-y: auto;" border
                        class="table-v2-rao border-radius5" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true">
                <el-table-column prop="className" align="center" label="班级名称"></el-table-column>
                <el-table-column prop="classMasterTeacherName" align="center" label="班主任"></el-table-column>
                <el-table-column label="操作" width="60" fixed="right">
                  <template slot-scope="scope">
                    <el-popover placement="top-start" title="删除" popper-class="popover-v2-rao" trigger="hover">
                      <span slot="reference" @click="rowDel(scope.row)"><i class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                    </el-popover>
                  </template>
                </el-table-column>
              </el-table>
              <div class="mt10 text-right">
                <el-button type="primary" size="small" :loading="createLoading" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "create">
                    完成创建
                  </el-button>
              </div>
            </div>
          </div>

        </el-main>
    </el-container>
</template>

<script>
    import api from "./basicclassUrl";
    import {mapGetters,mapMutations} from 'vuex'
    export default{
        data(){
            return {
              teacherSearch : "",
              classSearch : "",
              createLoading : false,
              classRadio : "",
              teacherRadio : "",
              teachers : [],
              classTeacherList : [],
              classList : []
            }
        },
        created(){
            this.classList = JSON.parse(decodeURIComponent(this.$route.query.classList));
            console.log(this.classList)
            this.SET_IS_LOADING(true);
            api.getTeacher().then(res => {
              this.SET_IS_LOADING(false);
              this.teachers = res.data.data.records
            })

        },
        computed:{
            ...mapGetters(['isLoading']),
            teacherFilterList(){
              return this.teachers.filter(item => {
                return item.userName.indexOf(this.teacherSearch) != -1
              })
            },
            classFilterList(){
              return this.classList.filter(item => {
                return item.className.indexOf(this.classSearch) != -1
              })
            }
        },
        methods : {
            ...mapMutations(['SET_IS_LOADING']),
            create(){

              if(!this.classTeacherList.length){
                this.$message.error("请先进行分配");
                return
              }
              this.createLoading = true;
              api.addBatch(this.classTeacherList).then(res => {
                if (res.data.resultCode == "000000") {
                  this.$message.success("成功创建");
                  this.createLoading = false;
                  this.$router.push({path:"/basedata/classInitialize"})
                }else{
                  this.$message.error("失败创建");
                  this.createLoading = false;
                }

              }, res => {
                  this.$message.error("加载失败");
                  this.createLoading = false;
              })

              console.log(this.classTeacherList)
            },
            classFilter(){
              return this.classList.filter(item => {
                return item.classId == this.classRadio
              })[0]
            },
            teacherFilter(){
              return this.teachers.filter(item => {
                return item.teacherId == this.teacherRadio
              })[0]
            },
            classItemMove(){
              this.classList =  this.classList.filter(item => {
                return item.classId != this.classRadio
              })
            },
            teacherItemMove(){
              this.teachers = this.teachers.filter(item => {
                return item.teacherId != this.teacherRadio
              })
            },
            fenpeiClick(){
              if(!this.teacherRadio){
                this.$message.error("请选择老师");
                return
              }

              if(!this.classRadio){
                this.$message.error("请选择班级");
                return
              }

              let classFilter = this.classFilter();
              let teacherFilter = this.teacherFilter();

              this.classTeacherList.push({
                className : classFilter.className,
                classNum : classFilter.classId,
                entranceSchoolYear : classFilter.entranceSchoolYear,
                segmentName : classFilter.segmentName,
                segmentId : classFilter.segmentId,
                gradeName : classFilter.gradeName,
                gradeId : classFilter.gradeId,
                classMasterTeacherName : teacherFilter.userName,
                classMasterTeacherId : teacherFilter.teacherId
              });
              this.classItemMove();
              this.teacherItemMove();
              this.teacherRadio = ""
              this.classRadio = ""
            },
            rowDel(item){
              this.classTeacherList = this.classTeacherList.filter(res => {
                return item.classMasterTeacherId != res.classMasterTeacherId
              })

              this.classList.push({
                className : item.className,
                classId : item.classNum,
                entranceSchoolYear : item.entranceSchoolYear,
                segmentName : item.segmentName,
                segmentId : item.segmentId,
                gradeName : item.gradeName,
                gradeId : item.gradeId,
              })

              this.teachers.push({
                userName : item.classMasterTeacherName,
                teacherId : item.classMasterTeacherId
              })
            }
        }
    }
</script>

<style>

</style>
