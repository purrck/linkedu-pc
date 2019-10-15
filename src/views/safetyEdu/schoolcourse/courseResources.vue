<template>
  <div>
    <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="课程标题:" prop="entityName">
            <el-input v-model="searchForm.entityName" class="input-v2-rao" maxlength="30"></el-input>
          </el-form-item>
          <!--<el-form-item label="分类:" prop="surveyId" class="w140">
            <el-select v-model="searchForm.securityEducationTypeCode" placeholder="请选择分类">
              <el-option
                v-for="item in optionsList1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>-->
          <!--<el-form-item label="状态:">
            <el-select class="select-v2-rao" popper-class="select-popper-v2-rao"
                       v-model="searchForm.entityOrgStatusCode" placeholder="请您选择">
              <el-option v-for="entityOrgStatusCodeItem in entityOrgStatusCodeOptions"
                         :key="entityOrgStatusCodeItem.name"
                         :label="entityOrgStatusCodeItem.label" :value="entityOrgStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>-->

          <!--<el-form-item label="学段:" prop="segment">
            <el-input v-model="searchForm.segment" class="input-v2-rao" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="年级:" prop="grade">
            <el-input v-model="searchForm.grade" class="input-v2-rao" maxlength="30"></el-input>
          </el-form-item>-->
          <el-form-item label="分类:" prop="surveyId" class="w140">
            <el-select v-model="searchForm.securityEducationTypeCode" placeholder="请选择分类">
              <el-option
                v-for="item in optionsList1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发布时间:">
            <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao" v-model="searchForm.createdDt"
                            type="date"
                            placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <!--<el-form-item label="结束时间:">
            <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao" v-model="searchForm.endDt" type="date"
                            placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>-->


          <el-form-item>
            <span v-show="false">{{courseType}}</span>

            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <!---->
          </el-form-item>
        </el-form>
      </el-header>

      <div class="bt border-color-e8e8e8 mt10 mb10"></div>


      <el-main class="pt-15" style="overflow-x: hidden">

        <el-row class="mb10">
          <el-col :span="24" class="text-left mb-10 flex row btns x-center">
            <div style="" class="flex space-between row btns-msg f12">
              <div>
                <i class="iconfont icon-icon_shanchu_p" style="color: #93BF88;"></i>
                <span class="c707070">已选择{{multipleSelection.length}}项</span>
              </div>
              <div>
                <span class="c707070">共搜索到{{data.total}}条数据</span>
                <i class="iconfont icon-icon_shuju f12" style="color: #93BF88;"></i>
              </div>
            </div>
            <div>

              <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toQie">
                <i class="iconfont icon-qiapian f12 cfff"></i> 切换
              </el-button>

            </div>

          </el-col>
        </el-row>

        <div class="table" v-show="showTable">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                    @sort-change="sortChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
            <el-table-column prop="entityName" label="课程标题" sortable="custom"></el-table-column>
            <el-table-column label="课程类型" sortable="custom">
              <template slot-scope="scope">
                <span :style="{'color':scope.row.securityEducationTypeCodeStr&&scope.row.securityEducationTypeCodeStr.split(';')[1]}">{{scope.row.securityEducationTypeCodeStr&&scope.row.securityEducationTypeCodeStr.split(";")[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createdDt" label="发布时间" sortable="custom"></el-table-column>
            <!--<el-table-column label="适用学段" sortable="custom"></el-table-column>
            <el-table-column label="适用年级" sortable="custom"></el-table-column>-->

            <el-table-column label="操作" width="100" fixed="right">
              <template slot-scope="scope">
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                  <span slot="reference" @click="review"><i
                    class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="组织" trigger="hover" v-show="courseType==='courseType4AQ'">
                  <span slot="reference" @click="toAdd(scope.row.entityId)"><i class="iconfont icon-icon_fabu2-copy ml5 f20 c999999"></i></span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-row v-show="!showTable" class="card-box" style="margin-right: -20px;">
          <el-col :span="4" v-for="(item,index) in data.records" :key="index" class="spick">
            <el-card class="card" :body-style="{ padding: '0px'}">
              <!--<img src="../../../assets/img/gakki.jpg" style="width:100%;height:150px" />-->
              <div class="img-box">
                <img :src="item.imagePath" ALT="."/>
              </div>
              <div class="card-content-box">
                <div class="pl10 pr10">
                  <div class="card-title c707070 ">{{item.entityName}}</div>
                  <div class="card-other flex row space-between ">
                    <span class="card-time c93BF88 f14"><i
                      class="iconfont icon-shijian f14"></i> {{item.organizedDt}}</span>
                    <span class="card-status f14"
                          :style="{'color':item.entityOrgStatusCodeStr&&item.entityOrgStatusCodeStr.split(';')[1]}">{{item.entityOrgStatusCodeStr && item.entityOrgStatusCodeStr.split(';')[0]}}</span>
                  </div>
                  <div class="card-other flex row space-between ">
                    <span class="card-time f12">年级:</span>
                    <span class="card-status f12">学段:</span>
                  </div>

                </div>
                <div class="bottom bF5F5F5  clearfix">
                  <div class="pull-center">
                    <el-button @click="toAdd(scope.row.entityId)" type="primary" size="mini"
                               class="mt10 mb10 button-v2-rao border-color-D8D8D8 cfff bD8D8D8">组织
                    </el-button>
                    <el-button @click="review(scope.row.entityId)" type="primary" size="mini"
                               class="mt10 mb10 button-v2-rao border-color-D8D8D8 cfff bD8D8D8">查看
                    </el-button>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>
      <div class="paging text-right">
        <el-pagination class="pagination-v2-rao" popper-class="pagination-popper-v2-rao" :page-sizes="[10,20,30]"
                       :page-size="data.size" :total="data.total"
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

      <el-dialog title="" :visible.sync="dialogtingyong" center width="22%">
        <div class="text-center">
          <i class="iconfont icon-icon_tc_shanchu_hong ml5 f30 cFA6557"></i>
          <p class="text-center fs-16 color333 mt-20">是否停用?</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" class="button-v2-rao border-color-cccccc c000000 bfff" :loading="isDel">是
          </el-button>
          <el-button type="primary" class="button-v2-rao b93BF88">否</el-button>
        </div>
      </el-dialog>
      <!-- 提示信息 -->
      <div class="tips-school tips-rao" v-if="msgShow">
        <img src="~@/assets/img/icon-warning.png" width="20"/>
        请至少选择一项内容!
      </div>
    </el-container>

  </div>
</template>

<script>
  import api from "./entityorganizationUrl";
  import commonApi from "@/api/common/common";
  import {coverData} from "../../../util/util";
  import { mapMutations,mapGetters } from 'vuex';
  export default {
    data() {
      return {
        optionsList1: [{"label": "全部", "value": ""}],
        showTable: true,
        dialogtingyong: false,
        isLoaded: true,
        dialogDelete: false,
        isDel: false,
        msgShow: false,
        dialogVisible: false,
        dialogFormVisible: false,
        dialogStatus: '',
        paramsId: '',
        textMap: {
          update: '编辑',
          detail: '详情',
          create: '创建'
        },
        entityOriginTypeCodeOptions: [{"label": "无", "name": ""}],
        entityOriginTypeCodeValue: null,
        entityOrgStatusCodeOptions: [{"label": "无", "name": ""}],
        entityOrgStatusCodeValue: null,
        fixWidth: '',
        form: {
          entityOrgId:
            null,
          entityTypeName:
            null,
          entityName:
            null,
          organizedTitle:
            null,
          effectiveDt:
            null,
          entityOrgStatusCode: null,
        },
        searchForm: {
          entityOrgId:
            null,
          entityTypeName:
            null,
          entityName:
            null,
          organizedTitle:
            null,
          effectiveDt:
            null,
          entityOrgStatusCode: null,
          securityEducationTypeCode : null
        }
        ,
        data: {
          total: 0
        },
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          entityType : "courseinfo",
          courseType : "",
          entityOrgId:
            null,
          entityTypeName:
            null,
          entityName:
            null,
          organizedTitle:
            null,
          effectiveDt:
            null,
          entityOrgStatusCode:
            null,
        }
      }
    },
    computed: {
      ...mapGetters(["isLoading"]),
      courseType (){
        let type = this.$route .params.type
        if(type==1) {
          this.params.courseType =  'courseType4AQ'
          this.getList();
          this.getTypes('courseType4AQ');
          return 'courseType4AQ';
        }else{
          this.params.courseType =  'courseType4XQB'
          this.getList();
          this.getTypes('courseType4XQB');
          return 'courseType4XQB';
        }
      }
    },
    mounted() {
      //this.getCurrentPage(this.$route.fullPath, this.params)
      // this.params.courseType =  this.$router.query.type
      // this.getList();

      // commonApi.getCodeIntType('surveyType').then(res => {
      //   this.optionsList1 = this.optionsList1.concat(coverData(res.data.data, 'codeDesc', 'codeId'))
      // })
      api.entityType().then(res => {
        let viewList = res.data.data || [];
        for (let entityOriginTypeItem of viewList) {
          this.entityOriginTypeCodeOptions.push({
            "label": entityOriginTypeItem.entityCnName,
            "name": entityOriginTypeItem.entityEnName
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("entityOrgStatus").then(res => {
        let viewList = res.data.data || [];
        for (let entityOrgStatusItem of viewList) {
          this.entityOrgStatusCodeOptions.push({
            "label": entityOrgStatusItem.codeDesc,
            "name": entityOrgStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      ...mapMutations(['SET_IS_LOADING']),
      getTypes(courseType){
        commonApi.getCourseType(courseType).then(res=>{
          let arr = [{"label": "全部", "value": ""}];
          this.optionsList1 = arr.concat(coverData(res.data.data, 'name', 'id'))
        })
      },
      toAdd(entityId) {
        let opath = `/safetyEdu/schoolCourseAdd?type=add&entityId=${entityId}`;
        this.$router.push({path: opath})
      },
      review(id) {
        this.$router.push({
          path: "/safetyEdu/schoolCourseReview"
        })
      },
      toQie() {
        this.showTable = !this.showTable
      },
      changeToProduct() {
        this.$router.push({
          path: "/safety/schoolCourse/product"
        })
      },
      tingyong() {
        this.dialogtingyong = true;
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.entityOrgId
        });
      },
      handleSizeChange(size) {
        this.params.limit = size;
        this.isLoaded = true;
        this.getList();
      },
      handleCurrentChange(currentPage) {
        this.params.page = currentPage
        this.setCurrentPage(this.$route.fullPath, this.params);
        this.isLoaded = true;
        this.getList();
      },
      // 分页按找正常序列开始
      typeIndex(index) {
        return index + this.params.limit * (this.params.page - 1) + 1;
      },
      sortChange(obj) {
        this.params.orderByField = obj.prop;
        this.params.isAsc = obj.order == "ascending" ? true : false;
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.isLoaded = true;
        this.getList();
      },
      getList() {
        this.SET_IS_LOADING(true);
        console.log(this.params)
        api.getSystemList(this.params).then(res => {
          if (res.data.resultCode !== "000000") {
            this.$message.error(res.data.message);
          }
          //for (let i of res.data.records) {
          //i.isAudio = false;
          //}
          this.data = res.data.data;
          this.SET_IS_LOADING(false);
        }, res => {
          this.$message.error(res.message);
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      search() {
        this.params.page = 1;

        for (let key in this.searchForm) {
          this.params[key] = this.searchForm[key]
        }
        this.isLoaded = true;
        this.getList();
      },
      closeBox() {
        this.dialogFormVisible = false
        // this.getList()
      },
      //删除表格当前行
      rowDel(id) {
        this.dialogDelete = true;
        this.multipleSelection = [id];
      },
      //删除
      del() {
        if (this.multipleSelection.length == 0) {
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
          if (res.data.resultCode === '000000') {
            this.$message.success("删除成功");
            this.getList();
          }
        }, res => {
          this.isDel = false;
          //this.$message.error(res.data.message);
        });
      },
      dialogDeleteCancelHandler() {
        this.dialogDelete = false;
      },
      toDel() {
        if (this.multipleSelection.length == 0) {
          this.$message.error("请您选择要删除的数据");
        } else {
          this.$confirm("该操作将会删除x，是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: 'warning'
          }).then(() => {
            this.isLoaded = true;
            api.batchDelObj(this.multipleSelection).then(res => {
              if (res.data.resultCode === '000000') {
                this.$message.success("删除成功");
                this.getList();
              }
            }, res => {
              this.$message.error(res.data.message);
            });
          });
        }
      },
      pushEntity(item) {
        let obj = {
          entityOrgId: item.entityOrgId,
          entityOrgStatusCode: 'opening',
        }

        api.putStatusObj(obj).then(res => {
          if (res.data.resultCode !== "000000") {
            this.$message.error(res.data.message);
          } else {
            this.$message.success('发布成功!');
            this.getList();
          }
        }, res => {
          this.$message.error(res.message);
        });
      },
      toRange(id) {
        let opath = '/safety/listEntityOrganizationRange/' + id;
        this.$router.push({path: opath})
      },
      toObject(id) {
        let opath = '/safety/listEntityOrganizationObject/' + id;
        this.$router.push({path: opath})
      },

      getorganizedDtStr(row) {
        return row.organizedDtStr;
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

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
