<template>
  <div class="SurveyMaster">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">

          <el-form-item label="问卷名称:" prop="surveyId" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.surveyName" maxlength="30" placeholder="请输入名称"></el-input>
          </el-form-item>

          <el-form-item label="问卷分类:" prop="surveyType" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.surveyType" maxlength="30" placeholder="请输入名称"></el-input>
          </el-form-item>

          <el-form-item label="发布时间:" prop="surveyId"  class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.startDt" maxlength="30" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="结束时间:" prop="surveyId" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.endDt" maxlength="30" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="发布分数:" prop="surveyId" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.publishCount" maxlength="30" placeholder="请输入发布份数"></el-input>
          </el-form-item>
          <el-form-item label="回收份数:" prop="surveyId" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.recycleCount" maxlength="30" placeholder="请输入回收份数"></el-input>
          </el-form-item>
          <el-form-item label="有效份数:" prop="surveyId" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.recycleCount" maxlength="30" placeholder="请输入有效份数"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary"  class="button-v2-rao b93BF88">调查结果</el-button>
          </el-form-item>
        </el-form>
      </el-header>

      <div class="bt border-color-e8e8e8 mt10 mb10"></div>

      <el-main style="overflow-x: hidden">

        <div  class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                    @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="studentName" align="center" label="姓名" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.studentName" class="one-line">{{scope.row.studentName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="className" align="center" label="班级" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.className" class="one-line">{{scope.row.className}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="mobile" label="联系方式" align="center" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.mobile" class="one-line">{{scope.row.mobile}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="createDt" label="填写时间" align="center" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.createDt" class="one-line">{{scope.row.createDt}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>

          </el-table>
        </div>
      </el-main>

      <div class="paging text-right mt10">
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
</template>

<script>
  import api from "./surveymasterUrl";
  import commonApi from '@/api/common/common'
  import {coverData} from "../../../util/util";
  export default {
    data() {
      return {
        optionsList1: [],
        optionsList2: [],
        isLoaded: true,
        showTable: true,
        dialogDelete: false,
        isDel: false,
        msgShow: false,
        dialogVisible: false,
        dialogFormVisible: false,
        dialogStatus: '',
        paramsId: '',

        form: {
          surveyId: null,
        },
        searchForm: {
          surveyId: null,
          timeEnd: null,
          timeStart: null,
        },
        data: "",
        multipleSelection: [],
        params: {
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          surveyId: null,
        }
      }
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    created() {
      //let schoolId = this.$route.query.schoolOrgId;
      //this.params.schoolId = schoolId;
      commonApi.getCodeIntType('surveyType').then(res => {
        this.optionsList1 = coverData(res.data.data, 'codeDesc', 'codeId')
      })
      // commonApi.getCodeIntType('marketStatus').then(res => {
      //   this.optionsList2 = coverData(res.data.data, 'codeDesc', 'codeId')
      // })
    },
    mounted() {
      this.getCurrentPage(this.$route.fullPath, this.params);
      this.getList();
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.surveyId
        });
      },
      handleSizeChange(size) {
        this.params.limit = size;
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.isLoaded = true;
        this.getList();
      },
      handleCurrentChange(currentPage) {
        this.params.page = currentPage;
        this.setCurrentPage(this.$route.fullPath, this.params)
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
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.isLoaded = true;
        this.getList();
      },
      getList() {
        this.params.entityOrgId = this.$route.params.id;
        api.getSearchList(this.params).then(res => {
          this.data = res.data.data.ansMasterVOPage;
          this.searchForm = res.data.data.vsurveyMasterTO;
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
