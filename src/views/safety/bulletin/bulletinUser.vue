<template>
  <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                style="min-height: 600px"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)" class="bF5F5F5">
    <el-main class="pt0">
      <div class="relative">
              <el-button type="primary" size="small" class="button-v2-rao b93BF88 ">
                <i class="iconfont icon-icon_xinjian f12 cfff"></i> 通知范围
              </el-button>
        </div>
      <div class="app-container bfff calendar-list-container">
        <div class="">
          <el-form ref="form" :model="selectForm" :inline="true" size="small">
            <el-form-item label="用户类型">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="selectForm.userTypeCode" placeholder="请选择" maxlength="32">
                <el-option
                  label="无"
                  value=""
                ></el-option>
                <el-option
                  v-for="item in bulletinTypeCodeList"
                  :key="item.codeId"
                  :label="item.codeDesc"
                  :value="item.codeId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="用户姓名" prop="userName">
              <el-input class="input-v2-rao" v-model="selectForm.userName" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="用户归属">
              <el-input class="input-v2-rao" v-model="selectForm.userBelongedName" maxlength="32"></el-input>
            </el-form-item>
            <el-form-item label="用户状态">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="selectForm.bulletinUsersStatusCode" placeholder="请选择" maxlength="32">
                <el-option
                  label="无"
                  value=""
                ></el-option>
                <el-option
                  v-for="item in bulletinUsersStatusList"
                  :key="item.codeId"
                  :label="item.codeDesc"
                  :value="item.codeId"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <!--<el-button class="filter-item" type="primary"  icon="search" @click="handleFilter" @keyup.enter.native="handleFilter">搜索</el-button>-->
              <el-button type="primary" class="button-v2-rao b93BF88" @click="handleFilter">查询</el-button>
              <!---->
            </el-form-item>
          </el-form>
          <!--<el-button class=" filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="edit" >添加</el-button>-->


        </div>



        <div class="bt border-color-e8e8e8 mt10 mb20"></div>

        <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557 mb15" @click="del">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 批量删除
              </el-button>
        <el-table ref="schooltable" :key='tableKey' border
                  :data="data.records" :table-loading="tableLloading"
                  highlight-current-row style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column align="center" type="selection"></el-table-column>
          <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>

          <el-table-column align="center" label="通知对象信息" v-if="false">
            <template slot-scope="scope">
              <span>{{ scope.row.bulletinUserId }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="通知" v-if="false">
            <template slot-scope="scope">
              <span>{{ scope.row.bulletinId }}</span>
            </template>
          </el-table-column>
          <!--      <el-table-column align="center" label="用户id">
                  <template slot-scope="scope">
                    <span>{{ scope.row.userId }}</span>
                  </template>
                </el-table-column>-->
          <el-table-column align="center" label="用户姓名">
            <template slot-scope="scope">
              <span>{{ scope.row.userName }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" label="用户类型">
            <template slot-scope="scope">
              <span v-if="scope.row.userTypeCodeStr">{{ scope.row.userTypeCodeStr.split(";")[0] }}</span>

            </template>
          </el-table-column>
          <el-table-column align="center" label="用户状态"><!--class-name="status-col"-->
            <template slot-scope="scope">
              <span v-if="scope.row.bulletinUsersStatusCodeStr"
                    :style="{color:scope.row.bulletinUsersStatusCodeStr.split(';')[1]}">{{ scope.row.bulletinUsersStatusCodeStr.split(';')[0] }}</span>
            </template>
          </el-table-column>
          <!--      <el-table-column align="center" label="用户归属id">
                  <template slot-scope="scope">
                    <span>{{ scope.row.userBelongedId }}</span>
                  </template>
                </el-table-column>-->
          <el-table-column align="center" label="用户归属">
            <template slot-scope="scope">
              <span>{{ scope.row.userBelongedName }}</span>
            </template>
          </el-table-column>


          <el-table-column align="center" width="80" label="操作"><!--class-name="status-col"-->
            <template slot-scope="scope">

              <el-popover placement="top-start" title="删除" popper-class="popover-v2-rao" trigger="hover">
                  <span slot="reference" @click="handleDelete(scope.row.bulletinUserId)"><i class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>

            </template>
          </el-table-column>

        </el-table>
        <div class="paging text-right mt20">
        <el-pagination class="pagination-v2-rao" popper-class="pagination-popper-v2-rao" :page-sizes="[10,20,30]" :page-size="data.size" :total="data.total"
                       :current-page="data.current" layout="total, sizes, prev, pager, next, jumper"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>


      </div>

      <div class="text-center">
        <el-button type="primary" size="small" class="button-v2-rao b93BF88 mt20" @click="goBack">返回</el-button>
        </div>
      <xx-dialog>
        <div class="text-center">
            <img src="~@/assets/img/dialog-delete.png" />
            <p class="text-center fs-16 color333 mt-20">是否确认删除?</p>
        </div>
        <div slot="footer" class="dialog-footer text-center mt20">
          <el-button @click="dialogDeleteComfireHandler" :loading="dialog.loading">是</el-button>
          <el-button type="primary" @click="dialogDeleteCancelHandler">否</el-button>
        </div>
      </xx-dialog>
    </el-main>
  </el-container>
</template>

<script>
  import {fetchList, addObj, putObj, delObj, batchDelObj} from '@/api/safety/bulletin/bulletinUser'
  import {mapGetters, mapMutations} from 'vuex'
  import commonApi from '@/api/common/common'
  import {
    bulletinUserAdPage,
    bulletinUserAdDel
  } from '@/api/safety/bulletin/bulletinInfo'

  export default {
    name: 'table_tbl_bulletin_user',
    directives: {},
    data() {
      return {
        bulletinTypeCodeList: [],
        tableLloading: false,
        list: null,
        total: null,
        data: [],
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10
        },
        selectForm: {
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          bulletinUsersStatusCode : "",
          userBelongedName : "",
          userName : null
        },
        rules: {
          userName: [
            {required: true, message: '请输入用户名', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ],
          userBelongedName: [
            {required: true, message: '请输入用户归属名', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          userTypeCode: [
            {required: true, message: '请输入用户类型', trigger: 'blur'},
            {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
          ]
        },
        form: {},
        multipleSelection: [],
        dialogFormVisible: false,
        dialogStatus: '',
        tbl_bulletin_user_add: false,
        tbl_bulletin_user_upd: false,
        tbl_bulletin_user_del: false,
        textMap: {
          update: '编辑',
          create: '创建'
        },
        tableKey: 0,
        userTypeCodeList: [
          {itemName: '1', itemAttribute: '校领导'},
          {itemName: '2', itemAttribute: '安全员'},
          {itemName: '3', itemAttribute: '教师'},
          {itemName: '4', itemAttribute: '班主任'},
          {itemName: '5', itemAttribute: '家长'}
        ],
        bulletinUsersStatusCodeList: [
          {itemName: '1', itemAttribute: '会议通知'},
          {itemName: '2', itemAttribute: '放假通知'},
          {itemName: '3', itemAttribute: '缴费通知'},
          {itemName: '4', itemAttribute: '活动通知'}
        ],
        bulletinStatusCodeListColor: [
          {itemName: '1', itemAttribute: 'success'},
          {itemName: '2', itemAttribute: 'info'},
          {itemName: '3', itemAttribute: 'warning'},
          {itemName: '4', itemAttribute: 'error'},
          {itemName: '5', itemAttribute: '撤  回'}
        ],
        bulletinUsersStatusList : []
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'isLoading',
        'dialog'
      ]),
      bulletinId() {
        return this.$route.query.bulletinId
      },
      tongzhizhuangtai() {
        return this.$route.query.type
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          1: '有效',
          2: '状态2',
          3: '状态3',
          4: '状态4'
        }
        return statusMap[status]
      }
    },
    created() {
      this.SET_IS_LOADING(false)
      commonApi.getCodeIntType('bulletinUsersStatus').then(item => {
          this.bulletinUsersStatusList  = item.data.data
        })
      this.getList();
      this.tongZhiLeiXing();
      this.tbl_bulletin_user_add = this.permissions['tbl_bulletin_user_add']
      this.tbl_bulletin_user_upd = this.permissions['tbl_bulletin_user_upd']
      this.tbl_bulletin_user_del = this.permissions['tbl_bulletin_user_del']
    },
    methods: {
      ...mapMutations(['SET_DIALOG_LOADING','SET_IS_LOADING','SET_DIALOG_VISIBLE']),
      dialogDeleteComfireHandler(){
          this.SET_DIALOG_LOADING(true)
          this.lotDel()
      },
      dialogDeleteCancelHandler(){
        this.SET_DIALOG_VISIBLE(false);
      },
      del() {
        if (this.$refs.schooltable.selection.length == 0) {
          this.$xxMsg({
            msg : "请至少选择一项内容!",
            css : {
              position: "absolute",
              top:"40%",
              left:"47%"
            }
          })
          return;
        }
        this.SET_DIALOG_VISIBLE(true);
      },
      goBack() {
        this.$router.go(-1);
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      comeback() {
        this.$router.push({path: '/safety/bulletin'})
      },
      tongZhiLeiXing() {
        commonApi.getCodeIntType('userType').then(item => {
          this.bulletinTypeCodeList = item.data.data
        })
      },
      getList() {
        this.listLoading = true
        this.listQuery['bulletinId'] = this.bulletinId
        bulletinUserAdPage(this.listQuery).then(response => {
          this.data = response.data.data
          this.total = response.data.total
          this.listLoading = false
        })
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;

        // console.log(val);
      },
      handleDelete(id) {

        this.SET_DIALOG_VISIBLE(true);
        this.multipleSelection = [{bulletinUserId : id}];

      },
      lotDel(){

        let arr = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
            arr.push(this.multipleSelection[i].bulletinUserId)
          }
          bulletinUserAdDel(arr)
            .then(response => {
              this.dialogFormVisible = false
              this.getList();
              this.SET_DIALOG_LOADING(false);
              this.SET_DIALOG_VISIBLE(false);
              this.$notify({
                type: 'success',
                message: '删除成功!'
              })
            })
      },
      //批量删除方法
      handleGroupDelete() {
        const arr = []
        if (this.multipleSelection.length <= 0) {
          alert('请至少选择一条数据！')
          return
        }
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            arr.push(this.multipleSelection[i].bulletinUserId)
          }
          bulletinUserAdDel(arr)
            .then(response => {
              this.dialogFormVisible = false
              this.getList()
            })
          this.$notify({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleCreate() {
        this.form = {};
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
      },
      handleEdit(row, index) {
        this.form = row;
        this.dialogFormVisible = true
      },
      handleFilter(val) {
        this.selectForm.limit = this.listQuery.limit
        this.selectForm.page = 1
        this.listQuery = this.selectForm
        this.getList()
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            addObj(this.form)
              .then(() => {
                this.dialogFormVisible = false
                this.getList()
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              })
          } else {
            return false
          }
        })
      },
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.password = undefined
            putObj(this.form).then(() => {
              this.dialogFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>
