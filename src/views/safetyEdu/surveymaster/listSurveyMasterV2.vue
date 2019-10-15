<template>
  <div class="SurveyMaster">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">

          <el-form-item label="名称:" prop="entityName" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.entityName" maxlength="30"
                      placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="状态:" prop="surveyId" class="w140">
            <el-select v-model="searchForm.entityOrgStatusCode" placeholder="请选择状态">
              <el-option
                v-for="item in optionsList2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类:" prop="securityEducationTypeCode" class="w140">
            <el-select v-model="searchForm.securityEducationTypeCode" placeholder="请选择分类">
              <el-option
                v-for="item in optionsList1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="发布时间:" prop="surveyId" class="w140">
            <el-date-picker class="date-v2-rao" v-model="searchForm.effectiveDt" value-format="yyyy-MM-dd"
                            type="date"
                            placeholder="请输入日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间:" prop="surveyId" class="w140">
            <el-date-picker class="date-v2-rao" v-model="searchForm.expiryDt" value-format="yyyy-MM-dd" type="date"
                            placeholder="请输入日期"></el-date-picker>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <!---->
          </el-form-item>
        </el-form>
      </el-header>

      <div class="bt border-color-e8e8e8 mt10 mb10"></div>

      <el-main style="overflow-x: hidden">
        <el-row class="mb10">
          <el-col :span="24" class="text-left mb-10 flex row btns x-center space-between">

            <div class="flex space-between row btns-msg f12">
              <div>
                <i class="iconfont icon-icon_shanchu_p f12" style="color: #93BF88;"></i>
                <span class="c707070">已选择<span class="bold c93BF88"> {{multipleSelection.length}} </span>项</span>
              </div>
              <div>
                <span class="c707070">共搜索到<span class="bold c93BF88"> {{data.total}} </span>条数据</span>
                <i class="iconfont icon-icon_shuju f12" @click="toTotal" style="color: #93BF88;"></i>
              </div>
            </div>

            <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="toDel"
                       :disabled="!multipleSelection.length > 0">
              <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
            </el-button>

            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao bFFB54C"
                       @click="tingyong" :disabled="!multipleSelection.length">
              <i class="iconfont icon-icon_tc_tingyong f12 cfff"></i> 停用
            </el-button>

            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click="toAdd">
              <i class="iconfont icon-icon_tianjia f12 cfff"></i> 新建
            </el-button>

            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click="toQie">
              <i class="iconfont icon-icon_liebiao f12 cfff"></i> 切换
            </el-button>
          </el-col>
        </el-row>

        <el-row v-show="!showTable" class="card-box" style="margin-right: -20px;">
          <el-col :span="4" v-for="(item,index) in data.records" :key="index" class="spick">
            <el-card class="card" :body-style="{ padding: '0px'}">
              <div>
                <!--<img src="../../../assets/img/gakki.jpg"  ALT="."/>-->
                <div class="img-box">
                  <img :src="item.imagePath" ALT="."/>
                </div>
                <div class="card-content-box">
                  <div style="padding:  0 15px">
                    <div class="card-title c93BF88">{{item.entityName}}</div>
                    <div class="card-other flex row space-between">
                      <span class="card-time c93BF88"><i class="iconfont icon-icon_time1"></i>{{item.expiryDt}}</span>
                      <span class="card-status"><span v-if="item.entityTypeName"></span>{{item.entityTypeName}}</span>
                    </div>
                    <div class="card-other flex row space-between f12">
                      <span class="card-type">结束时间:{{item.effectiveDt}}</span>
                      <span class="card-type" v-if="item.belongName">{{item.belongName}}</span>
                    </div>

                  </div>
                  <div class="bottom clearfix">
                    <div class="pull-center">
                      <el-button type="" size="mini" class="mt10" @click="toDetail(item.entityOrgId)">查看</el-button>
                      <el-button type="" size="mini" class="mt10" v-if="item.entityOrgStatusCode==='approving'"
                                 @click.stop="Shenhe(item.entityOrgId)">停用
                      </el-button>
                      <el-button type="" size="mini" class="mt10" v-if="item.entityOrgStatusCode==='editing'"
                                 @click.stop="toEdit(item.entityOrgId)">编辑
                      </el-button>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <div v-show="showTable" class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                    @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="entityName" align="center" label="问卷标题" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.entityName" class="one-line">{{scope.row.entityName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="securityEducationTypeCodeStr" align="center" label="问卷类型" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.securityEducationTypeCodeStr" class="one-line">{{scope.row.securityEducationTypeCodeStr.split(';')[0]}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>

            <el-table-column prop="effectiveDt"  label="发布时间" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="expiryDt" label="结束时间" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="entityOrgStatusCodeStr" align="center" label="状态" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.entityOrgStatusCodeStr" class="one-line"
                     :style="{'color':scope.row.entityOrgStatusCodeStr.split(';')[1]}">
                  {{scope.row.entityOrgStatusCodeStr.split(';')[0]}}
                </div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="200">
              <template slot-scope="scope">
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference" style="padding: 0 5px"
                          @click.stop="toDetail(scope.row.entityOrgId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover v-if="scope.row.entityOrgStatusCode==='editing'" placement="top-start"
                            popper-class="popover-v2-rao" title="编辑" trigger="hover">
                    <span slot="reference" style="padding: 0 5px"
                          @click.stop="toEdit(scope.row.entityOrgId)">
                      <i class="iconfont icon-icon_bianji ml5 f20 c999999"></i>
                    </span>
                </el-popover>

                <el-popover v-if="scope.row.entityOrgStatusCode==='approving'" placement="top-start"
                            popper-class="popover-v2-rao" title="审核" trigger="hover">
                    <span slot="reference" style="padding: 0 5px"
                          @click.stop="Shenhe(scope.row.entityOrgId)"><i
                      class="iconfont icon-icon_shenhe1 ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference" style="padding: 0 5px"
                        @click.stop="rowDel(scope.row.entityOrgId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>
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
        optionsList1: [{value:'',label:'全部'}],
        optionsList2: [{value:'',label:'全部'}],
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
          organizedEndDt: null,
          organizedStartDt: null,
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
        this.optionsList1 = this.optionsList1.concat(coverData(res.data.data, 'codeDesc', 'codeId'))
      })
      commonApi.getCodeIntType('entityOrgStatus').then(res => {
        this.optionsList2 =this.optionsList2.concat(coverData(res.data.data, 'codeDesc', 'codeId'))
      })
    },
    mounted() {
      this.getCurrentPage(this.$route.fullPath, this.params);
      this.getList();
    },
    activated() {
      //只刷新数据，不改变整体的缓存
      console.log('重新活跃路由');
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.getList()
    },
    methods: {
      rowJingyong(id) {
        let obj = {
          entityOrgIds: [id],//对象范围ID
          entityOrgStatusCode: 'finished'//状态
        }
        // this.dialogDelete = true;
        api.changeStatus(obj).then(res => {
          if (res.data.resultCode === '000000') {
            this.$message.success("停用成功");
          }
        })
      },
      tingyong() {
        if(this.$refs.schooltable.selection.some(item => {
          return item.entityOrgStatusCode != "opening"
        })){
          this.$message.error("只有已发布才可以停用");
          return
        }
        let obj = {
          entityOrgIds: this.multipleSelection,//对象范围ID
          entityOrgStatusCode: 'finished'//状态
        }
        // this.dialogDelete = true;
        api.changeStatus(obj).then(res => {
          if (res.data.resultCode === '000000') {
            this.$message.success("停用成功");
          }
          this.getList()
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.entityOrgId
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
        api.fetchList(this.params).then(res => {

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
      toAdd(id) {
        //safety safetyEdu basedata
        let opath = '/safetyEdu/detailSurveyMaster/add/' + 0;
        this.$router.push({path: opath})
      },
      toTotal() {
        let opath = '/safetyEdu/SurveyMasterTotal';
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/safetyEdu/detailSurveyMaster/edit/' + id;
        this.$router.push({path: opath})
      },

      Shenhe(id) {
        let opath = '/safetyEdu/detailSurveyMaster/shenhe/' + id;
        this.$router.push({path: opath})
      },
      toDetail(entityOrgId) {
        let opath = '/safetyEdu/detailSurveyMaster/detail/' + entityOrgId;
        this.$router.push({path: opath})
      },
      toQie() {
        this.showTable = !this.showTable
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
