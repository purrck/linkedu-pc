<template>
  <div class="SchoolPlaceStudentCheck">
    <div class="one">
      <!--<el-button size="small" type="primary" @click="addChapter">打开来访记录</el-button>-->

      <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                    style="min-height: 600px"
                    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-header style="height: auto">

          <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
            <el-form-item label="学生:" prop="studentName" class="w140">
              <el-input class="input-v2-rao" v-model="searchForm.studentName" maxlength="30"></el-input>
            </el-form-item>
            <!--<el-form-item label="年级:"  prop="gradeName" class="w140">-->
            <!--<el-input class="input-v2-rao" v-model="searchForm.gradeName" maxlength="30"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="班级:"  prop="className" class="w140">-->
            <!--<el-input class="input-v2-rao" v-model="searchForm.className" maxlength="30"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="进出:"  prop="leaveEnter" class="w140">-->
            <!--<el-input class="input-v2-rao" v-model="searchForm.leaveEnter" maxlength="30"></el-input>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="时间:" prop="happenedDt" class="w140">-->
            <!--<el-date-picker class="date-v2-rao" v-model="searchForm.happenedDt" type="dateTime"-->
            <!--value-format="yyyy-MM-dd HH:mm" placeholder="选择日期"></el-date-picker>-->
            <!--</el-form-item>-->
            <el-form-item label="时间 :" prop="startDt">
              <el-date-picker class="date-v2-rao" v-model="searchForm.happenedDt" type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd"
              ></el-date-picker>
            </el-form-item>

            <el-form-item label="设备类型:" prop="isException" class="w140">


              <el-select class="select-v2-rao" v-model="searchForm.schoolDeviceTypeCode" placeholder="请您选择">
                <el-option v-for="schoolDeviceTypeCodeItem in schoolDeviceTypeCodeOptions"
                           :key="schoolDeviceTypeCodeItem.name"
                           :label="schoolDeviceTypeCodeItem.label" :value="schoolDeviceTypeCodeItem.name">
                </el-option>
              </el-select>


              <!--<el-select class="select-v2-rao" v-model="searchForm.isException" placeholder="请您选择">-->
              <!--<el-option v-for="isExceptionItem in ynOptions"-->
              <!--:key="isExceptionItem.name"-->
              <!--:label="isExceptionItem.label" :value="isExceptionItem.name">-->
              <!--</el-option>-->
              <!--</el-select>-->

            </el-form-item>

            <el-form-item label="场所 :" prop="placeName">
              <el-cascader :show-all-levels="false"
                           :options="palceTableDataList"
                           v-model="childrenPlaceId"
                           :props="props" @change="getPlaceNames">
              </el-cascader>
            </el-form-item>

            <!--<el-form-item label="场所:"  prop="placeName" class="w140">-->
            <!--<el-input class="input-v2-rao" v-model="searchForm.placeName" maxlength="30"></el-input>-->
            <!--</el-form-item>-->
            <el-form-item>
              <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
              <!--<el-button type="primary" @click="resetForm('searchForm')" class="button-v2-rao b93BF88">重置</el-button>-->
            </el-form-item>
          </el-form>
        </el-header>

        <div class="bt border-color-e8e8e8 mt10 mb10"></div>

        <el-main class="pt-15">
          <el-row class="mb10">
            <el-col :span="24" class="text-left mb-10 flex row btns x-center space-between">

              <div class="flex space-between row btns-msg f12">
                <div>
                  <i class="iconfont icon-icon_shanchu_p" style="color: #93BF88;"></i>
                  <span class="c707070">已选择<span class="bold c93BF88"> {{multipleSelection.length}} </span>项</span>
                </div>
                <div>
                  <span class="c707070">共搜索到<span class="bold c93BF88"> {{data.total}} </span>条数据</span>
                  <i class="iconfont icon-icon_shuju" @click="toTotal" style="color: #93BF88;"></i>
                </div>
              </div>
              <!--<el-button type="primary" size="small" class="button-v2-rao b93BF88 " @click="toAdd">-->
              <!--<i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增-->
              <!--</el-button>-->
              <el-button type="primary" size="small" class="button-v2-rao bFA6557" @click="toDel"
                         :disabled="!multipleSelection.length > 0">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
              </el-button>
            </el-col>
          </el-row>

          <div class="table">
            <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                      @selection-change="handleSelectionChange"
                      class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                      @sort-change="sortChange">
              <el-table-column type="selection" width="65" align="center"></el-table-column>
              <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
              <!--<el-table-column prop="studentName" align="center" label="学生" sortable="custom">-->
              <!--<template slot-scope="scope">-->
              <!--<div v-if="scope.row.studentName" class="one-line">{{scope.row.studentName}}</div>-->
              <!--<div v-else>无</div>-->
              <!--</template>-->
              <!--</el-table-column>-->
              <el-table-column prop="className" align="center" label="学生" sortable="custom">
                <template slot-scope="scope">
                  <div v-if="scope.row.studentName" class="one-line">{{scope.row.studentName}}</div>
                  <div v-else>无</div>
                </template>
              </el-table-column>

              <!--<el-table-column prop="userPreviewVO" align="center" label="学生" >-->
              <!--<template slot-scope="scope">-->
              <!--<div v-if="scope.row.studentUserPreviewVO" class="flex row center">-->
              <!--&lt;!&ndash;<div class="pr-10">&ndash;&gt;-->
              <!--&lt;!&ndash;<img :src="scope.row.studentUserPreviewVO.headPicture" alt="" v-preview height="64" width="64">&ndash;&gt;-->
              <!--&lt;!&ndash;</div>&ndash;&gt;-->
              <!--<div class="flex space-between" style="height: 50px">-->
              <!--<span>{{scope.row.studentUserPreviewVO.firstName}}</span>-->
              <!--&lt;!&ndash;<span v-if="scope.row.studentUserPreviewVO.gender==='M' ">男</span>&ndash;&gt;-->
              <!--&lt;!&ndash;<span v-else>女</span>&ndash;&gt;-->
              <!--</div>-->
              <!--</div>-->
              <!--<div v-else>无</div>-->
              <!--</template>-->
              <!--</el-table-column>-->


              <el-table-column prop="className" align="center" label="班级" sortable="custom">
                <template slot-scope="scope">
                  <div v-if="scope.row.className" class="one-line">{{scope.row.className}}</div>
                  <div v-else>无</div>
                </template>
              </el-table-column>
              <el-table-column prop="leaveEnter" align="center" label="进出" sortable="custom">
                <template slot-scope="scope">
                  <div v-if="scope.row.leaveEnter==='in'" class="one-line">进入</div>
                  <div v-if="scope.row.leaveEnter==='out'" class="one-line">离开</div>
                  <div v-if="scope.row.leaveEnter===''">无</div>
                </template>
              </el-table-column>
              <el-table-column prop="happenedDt" label="时间" align="center" sortable="custom"></el-table-column>
              <el-table-column prop="imagePath" align="center" label="摄影头截图">
                <template slot-scope="scope">
                  <div v-if="scope.row.imagePath">
                    <!--<img style="width: 100%;" :src="scope.row.imagePath" alt="" height="100px" class="scope-img">-->
                    <img :src="scope.row.imagePath" alt="" class="scope-img" v-preview
                         style="width: 100%;height: 100%;">
                  </div>
                  <div v-if="!scope.row.imagePath">无</div>
                </template>
              </el-table-column>
              <el-table-column prop="deviceTypeCode" label="设备类型" align="center" sortable="custom">
                <template slot-scope="scope">
                  <div v-if="scope.row.schoolDeviceTypeCode==='A'">摄像头</div>
                  <div v-if="scope.row.schoolDeviceTypeCode==='B'">RFID读写器</div>
                  <div v-if="scope.row.schoolDeviceTypeCode==='C'">IC卡读写器</div>
                  <div v-if="scope.row.schoolDeviceTypeCode==='D'">AP</div>
                </template>
              </el-table-column>
              <el-table-column prop="deviceNum" align="center" label="学校设备" sortable="custom">
                <template slot-scope="scope">
                  <div v-if="scope.row.deviceNum" class="one-line">{{scope.row.deviceNum}}</div>
                  <div v-else>无</div>
                </template>
              </el-table-column>
              <el-table-column prop="isException" label="是否异常" align="center" sortable="custom">
                <template slot-scope="scope">
                  <el-switch v-model="scope.row.isException == 'Y'" disabled></el-switch>
                </template>
              </el-table-column>
              <el-table-column prop="placeName" align="center" label="场所" sortable="custom">
                <template slot-scope="scope">
                  <div v-if="scope.row.placeName" class="one-line">{{scope.row.placeName}}</div>
                  <div v-else>无</div>
                </template>
              </el-table-column>
              <el-table-column label="操作" fixed="right">
                <template slot-scope="scope">

                  <!--<el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">-->
                  <!--<span slot="reference"-->
                  <!--@click.stop="toEdit(scope.row.studentHisId)"><i-->
                  <!--class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>-->
                  <!--</el-popover>-->

                  <!--<el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">-->
                  <!--<span slot="reference"-->
                  <!--@click.stop="toDetail(scope.row.studentHisId)"><i-->
                  <!--class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>-->
                  <!--</el-popover>-->
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.studentHisId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                  </el-popover>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </el-main>
        <div class="paging text-right">
          <el-pagination class="pagination-v2-rao" :page-sizes="[10,20,30]" :page-size="data.size" :total="data.total"
                         :current-page="data.current" layout="total, sizes, prev, pager, next, jumper"
                         @size-change="handleSizeChange" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
        <el-dialog title="" :visible.sync="dialogDelete" center width="22%">
          <div class="text-center">
            <i class="iconfont icon-icon_tc_shanchu_hong ml5 f30 cFA6557"></i>
            <p class="text-center fs-16 color333 mt-20">是否确认删除?</p>
          </div>
          <div slot="footer" class="dialog-footer">
            <el-button type="primary" class="border-color-cccccc c000000 bfff" @click="dialogDeleteComfireHandler"
                       :loading="isDel">是
            </el-button>
            <el-button type="primary" class="b93BF88" @click="dialogDeleteCancelHandler">否</el-button>
          </div>
        </el-dialog>

        <!-- 提示信息 -->
        <div class="tips-school tips-rao" v-if="msgShow">
          <img src="~@/assets/img/icon-warning.png" width="20"/>
          请至少选择一项内容!
        </div>
      </el-container>


    </div>


  </div>
</template>
<script>

  import {mapState, mapGetters} from "vuex";
  import {fullscreenToggel, listenfullscreen} from "@/util/util";
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import routerSchool from "@/const/routerSchool";

  import api from "./studentAccessRecordsUrl";
  import commonApi from "@/api/common/common";
  import preview from '@/util/preview';
  import editor from '@/components/editor/editor'
  import {coverData} from '@/util/util'

  export default {
    components: {editor, upload, uploads},

    directives: {preview},
    data() {
      return {
        childrenPlaceId: [],
        palceTableDataList: [],

        props: {
          value: 'placeId',
          label: 'placeName',
          children: 'children'
        },
        studentVisitorLoginTable: false,
        VisitorDataTable: true,
        VisitorLoginTable: false,
        formData: {
          imagePath: null,
        },
        chapterVisible: false,
        visitorNumber: 10,
        showtow: true,
        isLoaded: true,
        dialogDelete: false,
        isDel: false,
        msgShow: false,
        schoolDeviceTypeCodeOptions: [{"label": "全部", "name": ""}],
        deviceTypeCodeOptions: [{"label": "全部", "name": ""}],
        ynOptions: [{"label": "全部", "name": ""}],
        form: {
          studentName: null,
          gradeName: null,
          className: null,
          leaveEnter: null,
          happenedDt: null,
          ynValue: null,
          placeName: null,
        },
        searchForm: {
          studentName: null,
          gradeName: null,
          className: null,
          leaveEnter: null,
          happenedDt: null,
          isException: null,
          placeName: null,
        },
        data: "",
        onSwitchStatus: true,
        offSwitchStatus: false,
        multipleSelection: [],
        params: {
           page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          studentName: null,
          gradeName: null,
          className: null,
          leaveEnter: null,
          happenedDt: null,
          isException: null,
          placeName: null,
        },
        showTimes: null,
        place: {
          schoolId: null,
        }

      }
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    created() {
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      commonApi.getCodeIntType("schoolDeviceType").then(res => {
        let viewList = res.data.data || [];
        for (let schoolDeviceTypeItem of viewList) {
          this.schoolDeviceTypeCodeOptions.push({
            "label": schoolDeviceTypeItem.codeDesc,
            "name": schoolDeviceTypeItem.codeId
          });
        }
      });
      this.showTime();
      this.getPalce();
    },
    mounted() {
      this.getCurrentPage(this.$route.path, this.params)
      this.getList();
      commonApi.getCodeIntType("deviceType").then(res => {
        let viewList = res.data.data || [];
        for (let deviceTypeItem of viewList) {
          this.deviceTypeCodeOptions.push({
            "label": deviceTypeItem.codeDesc,
            "name": deviceTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
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
    },
    activated() {
      //只刷新数据，不改变整体的缓存
      // console.log('重新活跃路由');
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.getList()
    },
    methods: {
      keepData() {
      },
      cancel() {
        this.formData = {}
        //初始化可能 有問題 -------------------------------------------------------------------------------------------------------------------------------------
        this.VisitorLoginTable = false
        this.VisitorDataTable = true
      },
      studentcancel() {
        this.formData = {}
        // ---------------------        //初始化可能 有問題 -------------------------------------------------------------------------------------------------------------------------------------
        this.VisitorDataTable = true
        this.VisitorLoginTable = false
        this.studentVisitorLoginTable = false
      },

      getPlaceNames() {
        // // console.log(this.childrenPlaceId)
        if (this.childrenPlaceId.length === 1) {   //选择主场所
          let placeId = this.childrenPlaceId[0]
          for (let i = 0; i < this.palceTableDataList.length; i++) {
            if (placeId === this.palceTableDataList[i].placeId) {

              this.searchForm.placeName = this.palceTableDataList[i].placeName
              // this.formData.placeId = this.palceTableDataList[i].placeId
              break
            }
          }
        } else {                                 //选择子场所
          let placeId = this.childrenPlaceId[1]
          for (let i = 0; i < this.palceTableDataList.length; i++) {
            for (let j = 0; j < this.palceTableDataList[i].children.length; j++) {
              if (placeId === this.palceTableDataList[i].children[j].placeId) {
                this.searchForm.placeName = this.palceTableDataList[i].children[j].placeName
                // this.formData.placeId = this.palceTableDataList[i].children[j].placeId
                break
              }
            }
          }
        }
      },
      getPalce() {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.place.schoolId = userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id
        api.getPlaceList(this.place).then(res => {
          let palceList = res.data.data
          this.hasChildrenPlace = res.data.data
          // // console.log(this.palceTableDataList);
          // this.palceTableData=res.data.data
          for (let i = 0; i < palceList.length; i++) {
            let num = 1
            if (palceList[i].children.length !== 0) {
              this.palceTableDataList.push({
                placeName: palceList[i].placeName,
                placeId: palceList[i].placeId,
                children: []
              });
              for (let j = 0; j < palceList[i].children.length; j++) {
                if (num === 1) {
                  this.palceTableDataList[i].children.push({
                    placeName: palceList[i].placeName,
                    placeId: palceList[i].placeId
                  });
                  num = 2
                }
                this.palceTableDataList[i].children.push({
                  placeName: palceList[i].children[j].placeName,
                  placeId: palceList[i].children[j].placeId
                });
              }
            } else {
              this.palceTableDataList.push({placeName: palceList[i].placeName, placeId: palceList[i].placeId});
              for (let j = 0; j < palceList[i].children.length; j++) {
                this.palceTableDataList[i].children.push({
                  placeName: palceList[i].children[j].placeName,
                  placeId: palceList[i].children[j].placeId
                });
              }
            }
          }
        })
      },
      showVisitorLoginTable() {
        this.VisitorDataTable = false
        this.studentVisitorLoginTable = false
        this.VisitorLoginTable = true
      },
      showStudentVisitorLoginTable() {
        this.VisitorDataTable = false
        this.VisitorLoginTable = false
        this.studentVisitorLoginTable = true
      },


      uploadData(res) {
        this.formData.imagePath = res;
      },
      showTime() {
        // var timeshow = document.getElementById("times")
        // setInterval(function () {
        //   let showTimes = new Date(+new Date() + 8 * 3600 * 1000).toISOString().replace(/T/g, ' ').replace(/\.[\d]{3}Z/, '');
        //   document.getElementById("times").innerHTML = showTimes
        //   // // console.log(document.getElementById("times").innerHTML)
        // },1000)
      },
      addChapter() {
        this.showTime();
        this.chapterVisible = true
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.studentHisId
        });
      },
      handleSizeChange(size) {
        this.params.limit = size;
        this.setCurrentPage(this.$route.path, this.params)
        this.isLoaded = true;
        this.getList();
      },
      handleCurrentChange(currentPage) {
        this.params.page = currentPage;
        this.setCurrentPage(this.$route.path, this.params)
        this.isLoaded = true;
        this.getList();
      },
      // 分页按找正常序列开始
      typeIndex(index) {
        return index + this.params.limit * (this.params.page - 1) + 1;
      },
      sortChange(obj) {
        this.params.orderByField = obj.prop;
        this.params.isAsc = obj.order == "ascending";
        this.setCurrentPage(this.$route.path, this.params)
        this.isLoaded = true;
        this.getList();
      },
      getList() {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.params.schoolId = userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id
        api.fetchList(this.params).then(res => {
          this.data = res.data.data;
          // this.data.records.push({studentName:"1313"})
          // // console.log(this.data)
          this.isLoaded = false;
        }, res => {
          this.$message.error(res.message);
        });
      },


      search() {
        this.params.page = 1;
        for (let key in this.searchForm) {
          this.params[key] = this.searchForm[key]
        }
        this.isLoaded = true;
        this.getList();
      },

      //删除表格当前行
      rowDel(id) {
        this.dialogDelete = true;
        this.multipleSelection = [id];
      },
      //删除
      toDel() {
        if (this.$refs.schooltable.selection.length == 0) {
          this.msgShow = true;
          setTimeout(() => {
            this.msgShow = false;
          }, 800)
          return;
        }
        this.dialogDelete = true;
      },
      dialogDeleteComfireHandler() {
        this.isDel = true;
        api.batchDelObj(this.multipleSelection).then(res => {
          this.isDel = false;
          this.dialogDelete = false;
          if (res.data.resultCode == "000000") {
            this.$message.success("删除成功");
            this.getList();
          }
        })
        this.isDel = false;

      },
      dialogDeleteCancelHandler() {
        this.dialogDelete = false;
      },
      toAdd() {
        //safety safetyEdu basedata
        let opath = '/dormitory/detailSchoolPlaceStudentCheck/add/' + 0;
        this.$router.push({path: opath})
      },
      toTotal() {
        let opath = '/dormitory/SchoolPlaceStudentCheckTotal';
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/dormitory/detailSchoolPlaceStudentCheck/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/dormitory/detailSchoolPlaceStudentCheck/detail/' + id;
        this.$router.push({path: opath})
      },
    }
  }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  /*.el-progress-circle{*/
  /*width: 96px!important;*/
  /*height: 96px!important;*/
  /*}*/
  .visitorLogin {
    clear: both;
  }

  .border {
    height: 100%;
    border-left: 1px solid #E8E8E8;
    border-right: 1px solid #E8E8E8;
  }

  .dataTop {
    width: 100%;
    height: auto;
  }

  .leftData {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(153, 153, 153, 1);
    line-height: 19px;
  }

  .rightData {
    font-size: 14px;
    font-family: MicrosoftYaHei;
    color: rgba(147, 191, 136, 1);
    line-height: 19px;
  }

  .clear {
    clear: both;
  }

  .inLeft {
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(53, 53, 53, 1);
    line-height: 24px;
  }

  .inRight {
    width: 90px;
    height: 24px;
    font-size: 18px;
    font-family: MicrosoftYaHei;
    color: rgba(153, 153, 153, 1);
    line-height: 24px;
    white-space: nowrap;

  }

  .data {
    overflow: hidden;
    width: 100%;
    height: auto;
    margin-top: 20px;
    border: 1px solid;
  }

  .pd10AndBoxSizing {
    padding: 10px 20px;
    box-sizing: border-box;
  }

  .three {
    background-color: #3c7373;
  }

  .four {
    background-color: #353535;

  }

  .video {
    width: 100%;
    display: flex;
    height: auto;
    border: 1px solid;
    margin-top: 10px;
  }

  .visitorData {
    border-radius: 10px;
    overflow: hidden;
  }

  .visitorData > img {
    width: 100%;
  }

  .videoLeft {
    width: 50%;
    height: auto;
    margin: 0 10px 0 0;
    position: relative;
  }

  .getinNumberBox {
    width: 100%;
    height: 80px;
    background-color: #353535;
    opacity: 0.3;
    position: absolute;
    left: 0;
    bottom: 5px;
  }

  .getOutpicture {
    width: 90%;
    height: 60px;
    background-color: #353535;
    opacity: 0.3;
    position: absolute;
    border-radius: 5px;
    margin: auto;
    top: 20px;
    left: 0;
    right: 0;
  }

  .getOutpictureList {
    width: 90%;
    height: 60px;
    position: absolute;
    border-radius: 5px;
    margin: auto;
    top: 20px;
    left: 0;
    right: 0;
  }

  .getOutpictureList .getOutVisitorList {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .getinNumber {
    padding: 10px;
    box-sizing: border-box;
    font-size: 24px;
    /*font-family:MicrosoftYaHei;*/
    color: rgba(255, 255, 255, 1);
    width: 100%;
    position: absolute;
    bottom: 20px;
    color: white;
  }

  .videoRight {
    width: 50%;
    height: auto;
    margin: 0 0 0 10px;
    position: relative;
  }

  .time {
    width: 134px;
    height: 22px;
    font-size: 18px;
    font-family: Impact;
    color: rgba(153, 153, 153, 1);
    line-height: 22px;
  }

  .left {
    float: left;
  }

  .right {
    float: right;
  }

  .rightcolor {
    color: rgba(147, 191, 136, 1);
  }

  .tips-school {
    position: absolute;
    top: 40%;
    left: 47%;

  }

  .select-all {
    margin: 0 0 5px;
  }

  .selected-box {
    background: #F0F0F0;
    border-radius: 5px;
    padding: 8px;
    font-size: 16px;

    img {
      vertical-align: -4px;
    }

  }
</style>
