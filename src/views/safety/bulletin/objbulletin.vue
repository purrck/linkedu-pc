<template>
  <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                style="min-height: 600px"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)" class="bF5F5F5">
    <el-main class="pt0">
      <div class="relative">
              <el-button type="primary" size="small" class="button-v2-rao b93BF88 ">
                <i class="iconfont icon-icon_xinjian f12 cfff"></i> 通知对象范围
              </el-button>
        </div>
      <div class="app-container bfff calendar-list-container">




        <div v-show="tabsItemType == 'A'">
          <el-row>
            <el-col :span="2">
              用户类型:
            </el-col>
            <el-col :span="22">
              发送给{{tabsName}}
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="2">
              用户归属:
            </el-col>
            <el-col :span="22">
              <el-checkbox :indeterminate="isIndeterminate" v-model="checked" @change="handleCheckLingDaoChange">全选
              </el-checkbox>
              <el-checkbox-group v-model="checkedLingDao" @change="handleCheckedLingDaoChange">
                <el-checkbox v-for="(data,index) in userBelongedTOList" :label="data.departId" :key="index">
                  {{data.departName}}
                </el-checkbox>
              </el-checkbox-group>
            </el-col>
          </el-row>

        </div>
        <div v-show="tabsItemType == 'B'">
          <el-row>
            <el-col :span="2">
              用户类型:
            </el-col>
            <el-col :span="22">
              发送给{{tabsName}}
            </el-col>
          </el-row>
          <el-row class="mt20">
            <el-col :span="2">
              用户归属:
            </el-col>
            <el-col :span="22">
              <el-row>
                <el-col :span="2">
                  <div v-for="(data,index) in classList" class="mb20" :key="index">
                    <el-checkbox :indeterminate="classVal['c'+index]" v-model="classVal['d'+index]"
                                 @change="handleCheckAllChange(index)">{{data.name}}
                    </el-checkbox>
                  </div>
                </el-col>
                <el-col :span="22">

                  <div class="mb20" v-for="(data,index) in classList" :key="index"
                       @click="handleCheckedClassListClick(index)">
                    <el-checkbox-group v-model="classVal['a'+index]" @change="handleCheckedClassListChange">
                      <el-checkbox class="mb10" v-for="(data,index) in data.children" :label="data.id" :key="index">
                        {{data.name}}
                      </el-checkbox>
                    </el-checkbox-group>
                  </div>


                </el-col>
              </el-row>


            </el-col>
          </el-row>

        </div>

        <el-button v-show="tabsItemType == 'A' || tabsItemType == 'B'" class=" filter-item" size="mini"
                   @click="handleSave" type="primary" icon="edit">保存
        </el-button>

        <div v-show="tabsItemType == 'default'">
          <el-form :model="selectForm" ref="selectForm" :inline="true" size="small" label-width="85px">

            <el-form-item label="用户类型">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="selectForm.userTypeCode" placeholder="请选择" maxlength="32">
                <el-option
                  label="----请选择----"
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
            <el-form-item label="用户归属">
              <el-input class="input-v2-rao" v-model="selectForm.userBelongedNames" maxlength="32" placeholder=""></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "handleFilter">查询
              </el-button>
            </el-form-item>
          </el-form>


          <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="del">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 批量删除
              </el-button>

          <div class="bt border-color-e8e8e8 mt10 mb10"></div>

          <el-table ref="schooltable" :key='tableKey' border
                    :data="data.records" highlight-current-row style="width: 100%"
                    @selection-change="handleSelectionChange" class="table-v2-rao" header-row-class-name="table-header-v2-rao">
            <el-table-column align="center" type="selection"></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>


            <el-table-column align="center" label="用户类型">
              <template slot-scope="scope">
                <span v-if="scope.row.userTypeCodeStr">{{scope.row.userTypeCodeStr.split(";")[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column align="center" label="用户归属">
              <template slot-scope="scope">
                <span>{{ scope.row.userBelongedNames }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="usersNum" align="center" label="对象人数">
            </el-table-column>
            <el-table-column prop="usersReadNum" align="center" label="已读数">
            </el-table-column>

          </el-table>
          <div class="paging text-right mt10">
            <el-pagination class="pagination-v2-rao" popper-class="pagination-popper-v2-rao" :page-sizes="[10,20,30]" :page-size="data.size" :total="data.total"
                          :current-page="data.current" layout="total, sizes, prev, pager, next, jumper"
                          @size-change="handleSizeChange" @current-change="handleCurrentChange">
            </el-pagination>
          </div>
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
  import {
    bulletinUserRuleAdPage,
    bulletinUserRuleAdLotDel,
    bulletinUserRuleAdDepInfoBySchoolId,
    bulletinUserRuleAdSchoolInfoWithOutSegment,
    bulletinUserRuleAdAdd,
  } from '@/api/safety/bulletin/bulletinInfo'
  import commonApi from '@/api/common/common'
  import {mapGetters, mapMutations} from 'vuex'

  export default {
    name: 'objbulletin',
    directives: {},
    data() {
      return {
        msgShow : false,
        isIndeterminate: true,
        classVal: null,
        classList: [],
        classListNum: [],
        checkedTongZhi: [],
        userBelongedTOList: [],
        xiaolingdaoItemList: [],
        tongzhiData: {
          bulletinId: "",
          bulletinTitle: "",
          userTypeCode: "",
          userBelongedTOList: [
            {}
          ]
        },
        tabsType: "default",
        tabsName: "",
        classVal: {},
        checked: false,
        tabsList: [],
        checkedLingDao: [],
        classListIndex: 0,
        bulletinTypeCodeList: [],
        selectForm: {},
        list: null,
        data: null,
        total: null,
        listLoading: true,
        listQuery: {
          page: 1,
          limit: 10
        },
        selectForm: {
          page: 1,
          limit: 10
        },
        form: {},
        multipleSelection: [],
        tableKey: 0
      }
    },
    computed: {
      ...mapGetters([
        'permissions',
        'isLoading',
        'dialog'
      ]),
      title() {
        return this.$route.query.title
      },
      bulletinId() {
        return this.$route.query.bulletinId
      },
      tabsItemType() {
        if (this.tabsType == "A") {
          return "A"
        } else if (this.tabsType == 'A' || this.tabsType == 'B' || this.tabsType == 'D' || this.tabsType == 'C') {
          return "B"
        } else if (this.tabsType == 'default') {
          return "default"
        }
      },
      tongzhizhuangtai() {
        return this.$route.query.type
      }
    },
    created() {
      this.SET_IS_LOADING(false)
      this.getList();
      this.getUserType();
      this.tongZhiLeiXing();
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
      /* 校领导 */
      handleCheckedLingDaoChange(value) {
        this.checked = value.length === this.userBelongedTOList.length;
        this.isIndeterminate = value.length > 0 && value.length < this.userBelongedTOList.length;
        this.xiaolingdaoItemList = [];
        this.xiaolingdaoItemList = this.userBelongedTOList.filter(item => {
          return value.indexOf(item.departId) != -1
        })
      },
      handleCheckLingDaoChange(event) {
        // console.log(event)
        this.checkedLingDao = event ? this.userBelongedTOList.map(item => {
          return item.departId
        }) : [];

        this.xiaolingdaoItemList = [];
        this.xiaolingdaoItemList = this.userBelongedTOList.filter(item => {
          return this.checkedLingDao.indexOf(item.departId) != -1
        })
        this.isIndeterminate = false;
      },
      /* 家长教师 */
      handleCheckedClassListClick(index) {
        this.classListIndex = index;
      },
      selectedItem(value) {
        this.classVal[`selectedList${this.classListIndex}`] = []
        this.classVal[`selectedList${this.classListIndex}`] = this.classList[this.classListIndex].children.filter(item => {
          return value.indexOf(item.id) != -1
        })

      },
      handleCheckedClassListChange(value) {
        this.selectedItem(value)
        this.classVal[`c${this.classListIndex}`] = value.length > 0 && value.length < this.classList[this.classListIndex].children.length
        this.classVal[`d${this.classListIndex}`] = value.length == this.classList[this.classListIndex].children.length
      },
      handleCheckAllChange(index) {
        this.classListIndex = index;
        this.classVal[`c${index}`] = false;
        //this.classVal[`b${index}`] = this.classVal[`b${index}`] ? false : true;

        if (this.classVal[`a${index}`].length != this.classList[this.classListIndex].children.length) {
          this.classVal[`a${index}`] = this.classList[index].children.map(item => {
            return item.id
          });
        } else {
          this.classVal[`a${index}`] = [];
        }
        // console.log(this.classVal[`a${index}`])
        this.selectedItem(this.classVal[`a${index}`])

      },
      tongZhiLeiXing() {
        commonApi.getCodeIntType('userType').then(item => {
          this.bulletinTypeCodeList = item.data.data
        })
      },
      handleSave() {

        this.tongzhiData.bulletinId = this.bulletinId;
        this.tongzhiData.bulletinTitle = this.title;
        this.tongzhiData.userTypeCode = this.tabsType;
        if (this.tabsItemType == "A") {
          this.tongzhiData.userBelongedTOList = this.xiaolingdaoItemList.map(item => {
            return {
              userBelongedId: item.departId,
              userBelongedName: item.departName
            }
          })
        }
        if (this.tabsItemType == "B") {
          let _classList = []
          for (let i = 0; i < this.classList.length; i++) {
            if (this.classVal[`selectedList${i}`].length) {
              _classList = _classList.concat(this.classVal[`selectedList${i}`])
            }
          }
          this.tongzhiData.userBelongedTOList = _classList.map(item => {
            return {
              userBelongedId: item.id,
              userBelongedName: item.name
            }
          })
        }
        bulletinUserRuleAdAdd(this.tongzhiData).then(item => {
          this.$notify({
            title: '成功',
            message: '发布成功',
            type: 'success',
            duration: 2000,
            onClose: () => {
              this.tabsType = 'default'
              this.getList();
            }
          })

        })
      },
      handleCheckedTongZhiChange(event) {
        // console.log(event)
      },
      handlerClass(index) {
        this.classListNum = this.classList[index].children
      },
      objTab(event) {
        this.tabsName = event.label;
        this.tabsType = event.name;
        if (event.name == 'A') {
          bulletinUserRuleAdDepInfoBySchoolId().then(data => {
            this.userBelongedTOList = data.data.data
            // console.log(data)
          })
        }
        if (event.name == 'B' || event.name == 'D' || event.name == 'C') {
          bulletinUserRuleAdSchoolInfoWithOutSegment().then(data => {
            this.classList = data.data.data.children;
            for (let i = 0; i < this.classList.length; i++) {
              this.$set(this.classVal, `a${i}`, [])
              //this.$set(this.classVal, `b${i}`,false)
              this.$set(this.classVal, `c${i}`, true)
              this.$set(this.classVal, `d${i}`, false)
              this.$set(this.classVal, `selectedList${i}`, [])
            }
            this.classListNum = this.classList[0].children
            // console.log(data.data.data.children)
          })
        }
        // console.log(event)
      },
      getUserType() {
        commonApi.getCodeIntType('userType').then(item => {
          this.tabsList = item.data.data
        })
      },
      goBack() {
        this.$router.go(-1);
      },
      getList() {
       this.SET_IS_LOADING(true)
        this.listQuery['bulletinId'] = this.bulletinId
        bulletinUserRuleAdPage(this.listQuery).then(response => {
          this.data = response.data.data
          this.total = response.data.total
          this.SET_IS_LOADING(false)
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

        bulletinUserRuleAdLotDel([id])
          .then(response => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
      },
      handleFilter(val) {
        this.selectForm.limit = this.listQuery.limit
        this.selectForm.page = 1
        this.listQuery = this.selectForm
        this.getList()
      },
      lotDel(){

        let arr = []
        for (let i = 0; i < this.multipleSelection.length; i++) {
            arr.push(this.multipleSelection[i].bulletinRuleId)
          }
          bulletinUserRuleAdLotDel(arr)
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
            arr.push(this.multipleSelection[i].bulletinRuleId)
          }
          bulletinUserRuleAdLotDel(arr)
            .then(response => {
              this.dialogFormVisible = false
              this.getList();
              this.dialog.loading = false
              this.$notify({
                type: 'success',
                message: '删除成功!'
              })
            })

        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
    }
  }
</script>

<style scoped="scoped" lang="scss">
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
