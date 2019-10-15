<template>
  <div>
    <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="课程名称:" prop="organizedTitle">
            <el-input v-model="searchForm.organizedTitle" class="input-v2-rao" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="searchForm.entityOrgRuleStatusCode" placeholder="请您选择">
              <el-option v-for="entityOrgRuleStatusCodeItem in entityOrgRuleStatusCodeOptions"
                         :key="entityOrgRuleStatusCodeItem.name"
                         :label="entityOrgRuleStatusCodeItem.label" :value="entityOrgRuleStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="分类:">
            <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="searchForm.entityType" placeholder="请您选择">
              <el-option v-for="entityOrgRuleStatusCodeItem in entityOriginTypeCodeOptions"
                         :key="entityOrgRuleStatusCodeItem.name"
                         :label="entityOrgRuleStatusCodeItem.label" :value="entityOrgRuleStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item label="发布时间:">
            <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao" v-model="searchForm.effectiveDt" type="date"
                            placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间:">
            <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao" v-model="searchForm.expiryDt" type="date"
                            placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>


          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <!---->
          </el-form-item>
        </el-form>
      </el-header>

      <div class="bt border-color-e8e8e8 mt10 mb10"></div>


      <el-main style="overflow-x: hidden;">


        <div class="table" v-show="showTable">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true" @sort-change="sortChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
            <el-table-column prop="userName" label="姓名" sortable="custom"></el-table-column>
            <el-table-column prop="schoolName" label="学校" sortable="custom"></el-table-column>
            <el-table-column prop="className" label="班级" sortable="custom"></el-table-column>
            <el-table-column prop="telPhoneNum" label="联系方式" sortable="custom" ></el-table-column>
            <el-table-column prop="createdDt" label="观看时间" sortable="custom">
            </el-table-column>
            <el-table-column label="观看进度" sortable="custom">
              <template slot-scope="scope">
                  <!--{{scope.row.watchPercent*100}}%-->
              </template>
            </el-table-column>
          </el-table>
        </div>

        <el-row v-show="!showTable" class="card-box" style="" >
          <el-col :span="4"  v-for="(item,index) in data.records" :key="index"  class="spick">
            <el-card class="card" :body-style="{ padding: '0px'}">
              <div>
                <div class="img-box">
                  <img :src="item.imagePath"  ALT="."/>
                </div>
                <div class="card-content-box">
                  <div class="pl10 pr10">
                    <div class="card-title c707070">{{item.entityName}}</div>
                    <div class="card-other flex row space-between ">
                      <span class="card-time c93BF88 f14"><i class="iconfont icon-shijian f14"></i> {{item.organizedDt}}</span>
                      <span class="card-status f14" :style="{'color':item.entityOrgRuleStatusCodeStr&&item.entityOrgRuleStatusCodeStr.split(';')[1]}">{{item.entityOrgRuleStatusCodeStr && item.entityOrgRuleStatusCodeStr.split(';')[0]}}</span>
                    </div>
                    <div class="card-other flex row space-between ">
                      <span class="card-time f12">下架时间:{{item.expiryDt}}</span>
                      <span class="card-status f12">{{item.entityTypeName}}</span>
                    </div>

                  </div>
                  <div class="bottom bF5F5F5  clearfix">
                    <div class="pull-center">
                      <el-button @click="shenhe(item.entityOrgId)" v-show="item.entityOrgRuleStatusCode == 'approving'" type="primary" size="mini" class="mt10 mb10 button-v2-rao border-color-93BF88 c93BF88 bfff">审核</el-button>
                      <el-button @click="rowDel(item.entityOrgId)" v-show="item.entityOrgRuleStatusCode == 'finished' || item.entityOrgRuleStatusCode == 'rejected' || item.entityOrgRuleStatusCode == 'editing'" type="primary" size="mini" class="mt10 mb10 button-v2-rao border-color-93BF88 c93BF88 bfff">删除</el-button>
                      <el-button  @click="toEdit(item.entityOrgId)" v-show="item.entityOrgRuleStatusCode == 'rejected' || item.entityOrgRuleStatusCode == 'editing'" type="primary" size="mini" class="mt10 mb10 button-v2-rao border-color-93BF88 c93BF88 bfff">编辑</el-button>
                      <el-button @click="toTingyong(item.entityOrgId)" v-show="item.entityOrgRuleStatusCode == 'published' || item.entityOrgRuleStatusCode == 'opening'" type="primary" size="mini" class="mt10 mb10 button-v2-rao border-color-93BF88 c93BF88 bfff">停用</el-button>
                      <el-button @click="toDetail(item.entityOrgId)" v-show="item.entityOrgRuleStatusCode == 'published' || item.entityOrgRuleStatusCode == 'finished' || item.entityOrgRuleStatusCode == 'rejected' || item.entityOrgRuleStatusCode == 'opening' || item.entityOrgRuleStatusCode == 'editing' || item.entityOrgRuleStatusCode == 'approving'" type="primary" size="mini" class="mt10 mb10 button-v2-rao border-color-D8D8D8 cfff bD8D8D8">查看</el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-main>


      <div class="paging text-right mt10">
        <el-pagination class="pagination-v2-rao" popper-class="pagination-popper-v2-rao" :page-sizes="[10,20,30]" :page-size="data.size" :total="data.total"
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
          <el-button type="primary" class="border-color-cccccc c000000 bfff" @click="dialogDeleteComfireHandler" :loading="isDel">是</el-button>
          <el-button type="primary" class="b93BF88" @click="dialogDeleteCancelHandler">否</el-button>
        </div>
      </el-dialog>

      <el-dialog title="" :visible.sync="dialogqiyong" center width="22%">
        <div class="text-center">
          <i class="iconfont icon-icon_tc_shanchu_hong ml5 f30 cFA6557"></i>
          <p class="text-center fs-16 color333 mt-20">是否启用?</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" class="button-v2-rao border-color-cccccc c000000 bfff" @click="dialogQiyongComfireHandler" :loading="loadingQiyong">是</el-button>
          <el-button type="primary" class="button-v2-rao b93BF88" @click="dialogQiyongCancelHandler">否</el-button>
        </div>
      </el-dialog>

      <el-dialog title="" :visible.sync="dialogTingyong" center width="22%">
        <div class="text-center">
          <i class="iconfont icon-icon_tc_shanchu_hong ml5 f30 cFA6557"></i>
          <p class="text-center fs-16 color333 mt-20">是否停用?</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" class="button-v2-rao border-color-cccccc c000000 bfff" @click="dialogTingyongComfireHandler" :loading="loadingTingyong">是</el-button>
          <el-button type="primary" class="button-v2-rao b93BF88" @click="dialogTingyongCancelHandler">否</el-button>
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
  import { mapMutations,mapGetters } from 'vuex';
  export default {
    data() {
      return {
        loadingTingyong : false,
        loadingQiyong : false,
        dialogqiyong:false,
        showTable : true,
        dialogTingyong : false,
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
        entityOrgRuleStatusCodeOptions: [{"label": "无", "name": ""}],
        entityOrgRuleStatusCodeValue: null,
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
          entityOrgRuleStatusCode: null,
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
          entityOrgRuleStatusCode: null,
          entityType : null
        }
        ,
        data: {
          total:0
        },
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
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
          entityOrgRuleStatusCode:
            null,
        }
      }
    },
    computed:{
      ...mapGetters(["isLoading"]),
      entityOrgId(){
        return this.$route.query.entityOrgId
      }
    },
    mounted() {
      this.SET_IS_LOADING(false);
      // this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList();

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
          this.entityOrgRuleStatusCodeOptions.push({
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
      toTingyong(id){
        this.dialogTingyong = true;
        this.multipleSelection = [id];
      },
      dialogQiyongComfireHandler(){
        this.loadingQiyong = true;
        api.qiyong(this.multipleSelection).then(res => {
          if (res.data.resultCode === '000000') {
            this.$message.success("启用成功");
            this.getList();
            this.loadingQiyong = false;
          }

        }, res => {
          this.$message.error(res.message);
        });
      },
      dialogQiyongCancelHandler(){
        this.dialogqiyong = false;
        this.loadingQiyong = false;
      },
      qiyong(){
        if (this.$refs.schooltable.selection.length === 0) {
          this.msgShow = true;
          setTimeout(() => {
            this.msgShow = false;
          }, 800)
          return;
        }
        this.dialogqiyong = true;
      },
      toQie(){
        this.showTable = !this.showTable
      },
      changeToProduct(){
        this.$router.push({
          path : "/safety/schoolCourse/product"
        })
      },
      dialogTingyongComfireHandler(){
        this.loadingTingyong = true;
        let _a = {
          entityOrgIds : this.multipleSelection,
          entityOrgRuleStatusCode:"finished"
        };
        api.tingyong(_a).then(res => {
          if (res.data.resultCode === '000000') {
            this.$message.success("停用成功");
            this.getList();
            this.loadingTingyong = false;
          }
          this.dialogTingyong = false;
        }, res => {
          this.$message.error(res.message);
        });
      },
      dialogTingyongCancelHandler(){

        this.dialogTingyong = false;
        this.loadingTingyong = false;
      },
      tingyong(){
        if (this.$refs.schooltable.selection.length === 0) {
          this.msgShow = true;
          setTimeout(() => {
            this.msgShow = false;
          }, 800)
          return;
        }
        this.dialogTingyong = true;
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
        this.params['entityOrgId'] = this.entityOrgId
        api.getViewGuankan(this.params).then(res => {
          if(!res.data.hasOwnProperty("data")){
            res.data['data']= {"total":0,"size":10,"pages":0,"current":1,"records":[]}
            this.data = res.data.data;
          }else{
            this.data = res.data.data;
          }

          this.SET_IS_LOADING(false);
        }, res => {
          this.SET_IS_LOADING(false);
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
        //this.multipleSelection = [id];
        this.multipleSelection = [id];
      },
      //删除
      del() {
        if (this.$refs.schooltable.selection.length === 0) {
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
        });
        /*api.batchDelObj(this.multipleSelection).then(res => {
          this.isDel = false;
          this.dialogDelete = false;
          if (res.data.resultCode === '000000') {
            this.$message.success("删除成功");
            this.getList();
          }
        }, res => {
          this.isDel = false;
        });*/
      },
      dialogDeleteCancelHandler() {
        this.dialogDelete = false;
        this.isDel =false;
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
      toAdd() {
        let opath = `/safetyEdu/schoolCourseAdd?type=add`;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = `/safetyEdu/schoolCourseAdd?type=edit&entityOrgId=${id}`;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = `/safetyEdu/schoolCourseAdd?type=detail&entityOrgId=${id}`;
        this.$router.push({path: opath})
      },
      shenhe(id){
        let opath = `/safetyEdu/schoolCourseAdd?type=shenhe&entityOrgId=${id}`;
        this.$router.push({path: opath})
      },
      pushEntity(item) {
        let obj = {
          entityOrgId :item.entityOrgId,
          entityOrgRuleStatusCode :'opening',
        }

        api.putStatusObj(obj).then(res => {
          if (res.data.resultCode !== "000000") {
            this.$message.error(res.data.message);
          }else{
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
    margin: 0px 0 5px;
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
