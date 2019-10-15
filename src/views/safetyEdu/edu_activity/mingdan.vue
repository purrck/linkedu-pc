<template>
  <div class="bF5F5F5">
    <el-button type="primary" size="small" class="button-v2-rao b93BF88 mb10">
         参与名单
              </el-button>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" class="bfff" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="报名时间:">
            <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao" v-model="searchForm.enrollDt" type="date"
                            placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
          </el-form-item>

          <el-form-item label="姓名:" prop="entityOrgId">
            <el-input v-model="searchForm.entityOrgId" class="input-v2-rao" maxlength="30"></el-input>
          </el-form-item>

          <el-form-item label="班级:" prop="entityOrgId">
            <el-input v-model="searchForm.entityOrgId" class="input-v2-rao" maxlength="30"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <!---->
          </el-form-item>
        </el-form>
      </el-header>

      <el-main class="card-box">
        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border

                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
            <el-table-column prop="userName" label="姓名"></el-table-column>
            <el-table-column prop="className" label="班级" ></el-table-column>
            <el-table-column label="报名时间" >
              <template slot-scope="scope">
                  {{scope.row.enrollDt}}
              </template>
            </el-table-column>
            <el-table-column label="签到时间" >
              <template slot-scope="scope">
                  {{scope.row.checkinDt}}
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
    </el-container>

  </div>
</template>
<script>
  import editor from '../../../components/editor/editor'
  import api from "./activityinfoUrl";
  import commonApi from "@/api/common/common";
  export default {
    components: {
      editor
    },
    data() {
      return {
        data : {
          records : [
            {
              name : "张小小",
              iclass : "一年级一班",
              contact : "18868869988",
              baomingshijian : "2018-11-12 16：15：56",
              qiandaoshijian : "2018-11-12 16：15：56",
            }
          ]
        },
        showTable: true,
        isLoaded: false,
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
        actypeCodeOptions: [{"label": "全部", "name": ""}],
        actypeCodeValue: null,
        acstatusCodeOptions: [{"label": "全部", "name": ""}],
        acstatusCodeValue: null,
        ynOptions: [{"label": "全部", "name": ""}],
        ynValue: null,
        publicServiceCodeOptions: [{"label": "全部", "name": ""}],
        publicServiceCodeValue: null,
        virtualCurrencyCodeOptions: [{"label": "全部", "name": ""}],
        virtualCurrencyCodeValue: null,
        form: {},
        searchForm: {},
        entityOrgStatusCodeOptions: [{"label": "无", "name": ""}],

        multipleSelection: [],
        params: {
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          }
        },
      }
    },
    mounted() {
      //this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList();

    },
    computed: {
      entityOrgId(){
        return this.$route.query.entityOrgId
      }
    },

    methods: {
      toQie () {
        this.showTable = !this.showTable
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.id
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

        this.params['activityPlanId'] = this.entityOrgId
        api.mingdanListV1(this.params).then(res => {
          this.data = res.data.data;
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
        let opath = '/safetyEdu/edu_detailActivityDetailSchool?type=add';
        this.$router.push({path: opath})
      },
      shenhe(){
        let opath = '/safetyEdu/edu_detailActivityDetailSchool?type=shenhe';
        this.$router.push({path: opath})
      },
      toTotal() {
        let opath = '/safetyEdu/ActivityInfoTotal';
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/safetyEdu/edu_detailActivityDetailSchool?type=edit';
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/safetyEdu/edu_detailActivityDetailSchool?type=detail';
        this.$router.push({path: opath})
      },
      toWhere(id) {
        let opath = '/safetyEdu/edu_detailActivityDetail/detail/' + id;
        this.$router.push({path: opath})
      },
    }
  }
</script>
<style scoped="scoped" lang="scss">


</style>
