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
                        <!--<div class="mt10">
                          <el-input class="input-v2-rao" size="mini" v-model="departSearch" placeholder="请输入内容"></el-input>
                        </div>-->
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
                        <div class="mt10">
                          <el-input class="input-v2-rao" size="mini" v-model="personSearch" placeholder="请输入内容"></el-input>
                        </div>
                      </div>
                      <div class="border1 border-color-D8D8D8 border-radius3 ml15 mt20" style="height: 350px;overflow-y: auto;">
                        <div class="pa10">
                          <el-checkbox-group v-model="selected" :disabled="isTeacherDisabled">
                            <div v-for="(data,index) in personFilterList" :key="index" class="mt10">
                              <el-checkbox class="radio-v2-rao" @change="personHandler($event,data)" :label="data.teacherId">
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
              <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click="fenpeiClick">
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
                      <span slot="reference" @click="rowDel(scope.row,scope.$index)"><i class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
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
    import api from "./basicschoolorgpositionUrl";
    import {mapGetters,mapMutations} from 'vuex'
    export default{
        data(){
            return {
              currentDepartId : "",
              currentTempPositionId : "",
              departSearch : "",
              personSearch : "",
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
              dataData:[
                {
                  departId : "",
                  tempPositionId : "",
                  selected : [],
                  userInfos : []
                }
              ],
              selected : [],
              selectedList : [],
              departName : "",
              tempPositionName : ""
            }
        },
        created(){
            this.selected = this.dataData[0].selected
            //this.teacherList = JSON.parse(decodeURIComponent(this.$route.query.teacherList));
            this.SET_IS_LOADING(true);
            api.getTeacher({}).then(res => {
              this.SET_IS_LOADING(false);

              this.teacherList = res.data.data.records
            })
            /*api.getOrgDepartDetail(this.schoolInfo.schoolOrgId).then(res => {
              this.SET_IS_LOADING(false);
              res.data.data.children.map(item => {
                item.isShow = false;
              })
            
              this.departs = res.data.data.children.filter(item => {
                return item.id == this.departId
              })
            })*/

            api.getOrgDepartDetail1({departId:this.departId}).then(res => {
              this.SET_IS_LOADING(false);
              res.data.data = [res.data.data]
              res.data.data.map(item => {
                item.isShow = false;
              })
            
              this.departs = res.data.data
            })

        },
        computed:{
            ...mapGetters(['isLoading','schoolInfo']),
            personFilterList(){
              return this.teacherList.filter(item => {
                return item.userName.indexOf(this.personSearch) != -1
              })
            },
            templateName(){
              return this.$route.query.templateName
            },
            templateId(){
              return this.$route.query.templateId
            },
            departId(){
              return this.$route.query.departId
            }
        },
        methods : {
            ...mapMutations(['SET_IS_LOADING']),
            departHandler(data){
              data.isShow = data.isShow ? false : true
              this.departData = data;
            },
            create(){

              if(!this.currentTempPositionId || !this.selectedList.length){
                this.$message.error("请先进行分配");
                return
              }


              this.dataData.splice(0,1);  //删除初始化 空值
              
              
              this.dataData.map(item => {
                delete item.selected
                item.userInfos.map(item => {
                  delete item.tempPositionId
                  delete item.isAdd
                })
              })
              console.log(this.dataData)

              this.createLoading = true;
              api.addPiLiangObj(this.dataData).then(res => {
                if (res.data.resultCode == "000000") {
                  this.$message.success("成功创建");
                  this.createLoading = false;
                  this.$router.push({path:`/basedata/listOrgPosition?departId=${this.departId}`})
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
              

              this.currentDepartId = data.id;
              this.departName = data.name;
              this.currentTempPositionId = data1.id;
              this.tempPositionName = data1.name;
              this.isTeacherDisabled = false;
              this.positionData = data;

              let _a = this.dataData.some(item => {
                return item.tempPositionId == this.currentTempPositionId
              })

              if(!_a){
                
                this.dataData.push({
                  departId : this.currentDepartId,
                  tempPositionId : this.currentTempPositionId,
                  selected : [],
                  userInfos : []
                })
              }
              
              this.dataData.forEach(item => {
                if(item.tempPositionId == this.currentTempPositionId){
                  this.selected = item.selected
                }
              })
              

            },
            personHandler(event,data){
              if(!this.currentTempPositionId){
                this.$message.error("请先选择部门");
                return
              }

              if(event == false){
                this.dataData.map(item => {
                  if(item.tempPositionId == this.currentTempPositionId){
                    item.selected = this.selected;
                    item.userInfos = item.userInfos.filter(item => {
                      return item.teacherId != data.teacherId
                    })
                  }
                  
                })
                
              }
              if(event == true){
                this.dataData.map(item => {
                  if(item.tempPositionId == this.currentTempPositionId){
                    item.selected = this.selected;
                    item.userInfos.push({
                      teacherId : data.teacherId,
                      userId : data.userId,
                      userName : data.userName,
                      telPhoneNum : data.telPhoneNum,
                      tempPositionId : this.currentTempPositionId
                    })
                  }
                  
                })
              }

              console.log(this.dataData)
              this.personData = data;
            },
            fenpeiClick(){
              let _item = null;
              this.dataData.forEach(item => {
                if(this.currentTempPositionId == item.tempPositionId){
                  _item = item.userInfos
                }
              })

              _item.map(item => {
                item.isAdd = "2";
              })

              this.selectedList.forEach(item => {
                let _a = _item.map(item1 => {
                  if(item.tempPositionId == this.currentTempPositionId && item1.teacherId == item.teacherId){
                    item1.isAdd = "1";
                  }
                })
              })

              _item.map(item => {
                if(item.isAdd == "2"){
                  this.selectedList.push({
                    departName : this.departName,
                    tempPositionName : this.tempPositionName,
                    tempPositionId : this.currentTempPositionId,
                    teacherId : item.teacherId,
                    teacherName : item.userName
                  })
                }
                
              })
              
/*
              this.dataData.userInfos.map(item => {
                item.isAdd = "2";
              })
              this.selectedList.forEach(item => {
                let _a = this.dataData.userInfos.map(item1 => {
                  
                  if(item.tempPositionId == this.dataData.tempPositionId && item1.teacherId == item.teacherId){
                    item1.isAdd = "1";
                  }
                })
              })

              this.dataData.userInfos.map(item => {
                if(item.isAdd == "2"){
                  this.selectedList.push({
                    departName : this.departName,
                    tempPositionName : this.tempPositionName,
                    tempPositionId : this.dataData.tempPositionId,
                    teacherId : item.teacherId,
                    teacherName : item.userName
                  })
                }
                
              })*/
console.log(this.dataData.userInfos)
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
            rowDel(item,index){
              
              this.selectedList.splice(index,1)
              this.dataData.map(item2 => {
                if(item.tempPositionId == item2.tempPositionId){
                  item2.userInfos = item2.userInfos.filter(item1 => {
                    return item.tempPositionId == item2.tempPositionId && item1.teacherId != item.teacherId
                  })
                }
                  
              })

              console.log(this.dataData)
              
              /*this.selectedList = this.selectedList.filter(res => {
                return item.teacherId != res.teacherId
              })*/

              /*this.dataData.userInfos = this.dataData.userInfos.filter(res => {
                return item.teacherId != res.teacherId
              })*/

              /*this.teacherCheckbox = this.teacherCheckbox.filter(res => {
                return item.teacherId != res
              })*/

              this.dataData.map(item1 => {
                  
                  if(item.tempPositionId == item1.tempPositionId){
                    item1.selected = item1.selected.filter(item2 => {
                      return item2 != item.teacherId
                    })
                  }
                })
              this.dataData.forEach(item1 => {
                if(this.currentTempPositionId == item1.tempPositionId){
                    this.selected = item1.selected
                  }
              })

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
