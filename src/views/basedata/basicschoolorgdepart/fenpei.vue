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
                        <div class="pl10 pt10 pb10 ">部门</div>
                      </div>
                      <div class="border1 border-color-D8D8D8 border-radius3 mt20 mr15">
                        <div class="pa10">
                          <div v-for="(data,index) in departs" :key="index" class="mb15">

                              <div class="f14" @click="departHandler(data)">{{data.name}} <i class="iconfont f12" :class="[data.isShow ? 'icon-icon_zuojiantoucopy' : 'icon-icon_zuojiantoucopy1']"></i></div>
                              <div v-show="data.isShow">
                                <el-radio-group v-model="positionRadio">
                                  <div v-for="(data1,index2) in data.children" :key="index2" class="mt10"><el-radio class="radio-v2-rao" :label="data1.id" @change="positionHandler(data,data1)">{{data1.name}}</el-radio></div>
                                </el-radio-group>
                              </div>
                          </div>
                        </div>
                      </div>
                  </el-col>
                  <el-col :span="12">
                      <div class=" bF5F5F5 ml15">
                        <div class="pl10 pt10 pb10">人员</div>
                      </div>
                      <div class="border1 border-color-D8D8D8 border-radius3 ml15 mt20" style="height: 350px; overflow-y: auto;">
                        <div class="pa10">
                          <el-checkbox-group v-model="teacherCheckbox" :disabled="isTeacherDisabled">
                            <div v-for="(data,index) in teacherList" :key="index" class="mt10">
                              <el-checkbox class="radio-v2-rao"  @change="personHandler($event,data)" :label="data.teacherId">
                                {{data.userName}}
                              </el-checkbox>
                            </div>
                          </el-checkbox-group>
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
              <el-table :data="selectedList" tooltip-effect="dark" style="width: 100%" border
                        class="table-v2-rao border-radius5" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true">
                <el-table-column align="center" label="职位名称">
                  <template slot-scope="scope">
                    {{scope.row.departName}}-{{scope.row.tempPositionName}}
                  </template>
                </el-table-column>
                <el-table-column prop="teacherName" align="center" label="人员"></el-table-column>
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
    import api from "./basicschoolorgdepartUrl";
    import {mapGetters,mapMutations} from 'vuex'
    export default{
        data(){
            return {
              isTeacherDisabled : true,
              teacherCheckbox : [],
              departVal : "",
              createLoading : false,
              teacherRadio : "",
              departRadio : "",
              departs : [],
              positionRadio : "",
              classTeacherList : [],
              teacherList : [],
              departData : null,
              positionData : null,
              personData : null,
              dataData:{
                  "departId": "",
                  "tempPositionId": "",
                  "userInfos": []
              },
              selectedList : [],
              departName : "",
              tempPositionName : "",
              oldItem : null
            }
        },
        created(){
            //this.teacherList = JSON.parse(decodeURIComponent(this.$route.query.teacherList));
            this.SET_IS_LOADING(true);
            api.getTeacher({}).then(res => {
              this.SET_IS_LOADING(false);

              this.teacherList = res.data.data.records
            })
            api.getOrgDepartDetail(this.schoolInfo.schoolOrgId).then(res => {
              this.SET_IS_LOADING(false);
              res.data.data.children.map(item => {
                item.isShow = false;
              })

              this.departs = res.data.data.children
            })

        },
        computed:{
            ...mapGetters(['isLoading','schoolInfo']),
            templateName(){
              return this.$route.query.templateName
            },
            templateId(){
              return this.$route.query.templateId
            }
        },
        methods : {
            ...mapMutations(['SET_IS_LOADING']),
            departHandler(data){
              if(this.oldItem){
                this.oldItem.isShow = false;
              }
              data.isShow = true;
              this.oldItem = data;
              //data.isShow = data.isShow ? false : true
              this.departData = data;
            },
            create(){

              if(!this.dataData.tempPositionId || !this.selectedList.length){
                this.$message.error("请先进行分配");
                return
              }

              console.log(this.dataData)
              this.createLoading = true;
              api.addPiLiangObj([this.dataData]).then(res => {
                if (res.data.resultCode == "000000") {
                  this.$message.success("成功创建");
                  this.createLoading = false;
                  this.$router.push({path:"/basedata/listOrgDepart"})
                }else{
                  this.$message.error("失败创建");
                  this.createLoading = false;
                }

              })

              console.log(this.classTeacherList)
            },
            teacherFilter(){
              return this.teacherList.filter(item => {
                return item.teacherId == this.teacherRadio
              })[0]
            },
            departFilter(){
              let _a = null;
              this.departs.map(item => {
                item.children.map(item => {
                  if(item.id == this.departData.id){
                    _a = item;
                  }
                })

              })
              return _a;
            },
            classItemMove(){
              this.teacherList =  this.teacherList.filter(item => {
                return item.classId != this.teacherRadio
              })
            },
            teacherItemMove(){
              this.departs = this.departs.filter(item => {
                return item.teacherId != this.departRadio
              })
            },
            positionHandler(data,data1){
              this.dataData.departId = data.id;
              this.departName = data.name;
              this.dataData.tempPositionId = data1.id;
              this.tempPositionName = data1.name;
              this.isTeacherDisabled = false;
              this.positionData = data;
            },
            personHandler(event,data){
              if(!this.dataData.tempPositionId){
                this.$message.error("请先选择部门");
                return
              }

              if(event == false){
                this.dataData.userInfos = this.dataData.userInfos.filter(item => {
                  return item.teacherId != data.teacherId
                })
              }
              if(event == true){
                this.dataData.userInfos.push({
                  teacherId : data.teacherId,
                  userId : data.userId,
                  userName : data.userName,
                  telPhoneNum : data.telPhoneNum
                })
              }



              console.log(this.dataData)
              this.personData = data;
            },
            fenpeiClick(){
              if(!this.dataData.userInfos.length){
                this.$message.error("请选择人员");
                return
              }
              this.selectedList = [];
              this.dataData.userInfos.map(item => {
                this.selectedList.push({
                  departName : this.departName,
                  tempPositionName : this.tempPositionName,
                  teacherId : item.teacherId,
                  teacherName : item.userName
                })
              })

              /*return ;
              if(!this.positionRadio){
                this.$message.error("请选择部门");
                return
              }

              if(!this.teacherRadio){
                this.$message.error("请选择班级");
                return
              }

              let teacherFilter = this.teacherFilter();
              let departFilter = this.departFilter();

              console.log(this.departData)
              console.log(this.positionData)

              this.classTeacherList.push({
                tempDepartId : this.departData.id,
                departName : this.departData.departName,
                tempPositionId : this.positionData.id,
                positionName : this.positionData.name,
                userName : this.personData.userName,
                teacherId : this.personData.teacherId,
                telPhoneNum : this.personData.telPhoneNum
              });*/
            },
            rowDel(item){
              this.selectedList = this.selectedList.filter(res => {
                return item.teacherId != res.teacherId
              })

              this.dataData.userInfos = this.dataData.userInfos.filter(res => {
                return item.teacherId != res.teacherId
              })


              this.teacherCheckbox = this.teacherCheckbox.filter(res => {
                return item.teacherId != res
              })
              console.log(this.teacherCheckbox)

              /*this.teacherList.push({
                className : item.className,
                classId : item.classNum,
                entranceSchoolYear : item.entranceSchoolYear,
                segmentName : item.segmentName,
                segmentId : item.segmentId,
                gradeName : item.gradeName,
                gradeId : item.gradeId,
              })

              this.departs.push({
                userName : item.classMasterTeacherName,
                teacherId : item.classMasterTeacherId
              })*/
            }
        }
    }
</script>

<style>

</style>
