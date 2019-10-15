<template>
  <div>
    <el-col :span="6">
        <el-button @click="open">选择</el-button>
        <el-dialog title="选择框" :visible.sync="visible" center width="60%">
          <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                        element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
            <el-header>
              <el-form :model="selectData" ref="searchForm"  :inline="true" size="small">
                <el-form-item label="姓名:">
                  <el-input v-model="selectData.userName"  class="input-v2-rao" ></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="search">查询
                  </el-button>
                </el-form-item>
              </el-form>
            </el-header>
            <el-main>
              <p class="text-center" v-show="state == '0'">暂无数据,谢谢</p>
              <p class="text-center" v-show="state == '1'"><strong>接口信息: </strong><span
                style="color:red">{{errorMsg}}</span></p>
              <div class="table">
                <el-table :data="list" style="width: 100%" border ref="schooltable">
                  <!--<el-table-column type="selection" width="40" align="center"></el-table-column>-->
                  <el-table-column label="" width="60">
                    <template slot-scope="scope">
                      <el-radio :label="scope.row.teacherId" v-model="radio"><span style="display:none">{{scope.row.teacherId}}</span></el-radio>
                      <!--<el-radio :label="scope.$index" v-model="radio" @change="getCurrentRow(scope.$index)"></el-radio>-->
                    </template>
                  </el-table-column>
                  <el-table-column prop="userName" label="姓名">
                    <template slot-scope="scope">
                      <div>{{scope.row.userName}}</div>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="paging text-right">
        <el-pagination class="pagination-v2-rao mt20" popper-class="pagination-popper-v2-rao" :page-sizes="[10,20,30]" :page-size="data.size" :total="data.total"
                       :current-page="data.current" layout="total, sizes, prev, pager, next, jumper"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
            </el-main>
          </el-container>
          <div slot="footer">
            <el-button @click="comfire">确认</el-button>
          </div>
        </el-dialog>
    </el-col>
  </div>
</template>
<script>
  import commonApi from "@/api/common/common";

  export default {
    data() {
      return {
        params : {
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
        },
        textName : "",
        data: {},
        visible: true,
        list: [],
        isLoaded: true,
        selectData: {
          userName:''
        },
        state: "",
        errorMsg: "",
        radio: "",
        selectIndex: ""
      }
    },
    created() {

      this.getRoleForDialog();
    },
    computed: {},
    methods: {
      search(e) {
        this.params.userName = this.selectData.userName;
        this.getRoleForDialog()
      },
      clearHandler(){

      },
      setRoleId(id,name){

          this.radio = id;
          this.textName = name;

      },
      getTeacher(){
        let _teacher = this.list.filter((item) => {

          return item.teacherId == this.radio
        })[0];
        this.textName = _teacher.userName;
        this.callback(_teacher)
      },
      comfire() {
          this.getTeacher()
        this.visible = false;
      },
      getCurrentRow(event) {

        this.selectIndex = event;

      },
      open() {
        this.visible = true;
      },
      handleSizeChange(size) {
        this.params.limit = size;
        this.isLoaded = true;
        this.getRoleForDialog();
      },
      handleCurrentChange(currentPage) {
       this.params.page = currentPage
        // this.setCurrentPage(this.$route.fullPath, this.params);
        this.isLoaded = true;
        this.getRoleForDialog();
      },
      getRoleForDialog() {
        commonApi.getRoleForDialog("/user/teacherAd/page", this.params).then((res) => {

          if (res.data.resultCode == "000000" ) {

            this.data = res.data.data;
            this.list = res.data.data.records;
            if (!this.list.length) {
              this.state = "0"
            }
            this.isLoaded = false;
          } else {
            this.isLoaded = false;
            this.errorMsg = res.data.message;
            this.state = "1"
          }

        }).catch((res) => {
          this.state = '1';
          this.errorMsg = "Code:500,非法错误";
          this.isLoaded = false;
        })
      }
    }
  }
</script>
<style>
</style>
