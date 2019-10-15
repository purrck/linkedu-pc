<template>
  <div class="ActivityInfo">
    <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
          <el-form-item label="活动标题:">
            <el-input v-model="searchForm.organizedTitle" class="input-v2-rao" placeholder="请输入活动标题" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="状态:">
            <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="searchForm.entityOrgStatusCode" placeholder="请您选择">
              <el-option v-for="entityOrgStatusCodeItem in entityOrgStatusCodeOptions"
                         :key="entityOrgStatusCodeItem.name"
                         :label="entityOrgStatusCodeItem.label" :value="entityOrgStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
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
            <el-date-picker
              class="date-v2-rao"
              v-model="searchForm.effectiveDt"
              type="date"
              placeholder="选择日期" value-format="yyyy-MM-dd">
            </el-date-picker>
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
                       >
              <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
            </el-button>
            <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="tingyong"
                       >
              <i class="iconfont icon-icon_tc_tingyong f12 cfff"></i> 停用
            </el-button>

            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toAdd">
              <i class="iconfont icon-icon_tianjia f12 cfff"></i> 新建
            </el-button>
            <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toQie">
              <i class="iconfont icon-icon_liebiao f12 cfff"></i> 切换
            </el-button>

          </el-col>
        </el-row>
        <el-row v-show="!showTable" class="card-box"  >
          <el-col :span="4"  v-for="(item,index) in data.records" :key="index"  class="spick">
            <el-card class="card" :body-style="{ padding: '0px'}">
              <div class="img-box">
                <img :src="item.imagePath"  ALT="."/>
              </div>
              <div class="card-content-box">
                <div style="padding:  0 15px">
                  <div class="card-title c93BF88">{{item.organizedTitle}}</div>
                  <div class="card-other flex row space-between">
                    <span class="card-time c93BF88"><i class="iconfont icon-icon_time1"></i>{{item.effectiveDt}}</span>
                    <span class="card-status">{{item.entityOrgStatusCodeStr&&item.entityOrgStatusCodeStr.split(';')[0]}}</span>
                  </div>
                  <!--<div class="card-other flex row space-between f12">-->
                    <!--<span class="card-time c93BF88">发布时间:{{item.organizedDt}}</span>-->
                    <!--<span class="card-status">{{item.entityTypeName}}</span>-->
                  <!--</div>-->
                  <div class="card-type">
                    <span>活动分类：<span  v-if="item.acstatusCodeStr">{{item.acstatusCodeStr.split(';')[0]}}</span></span>
                  </div>
                </div>
                <div class="bottom clearfix">
                  <div class="pull-center">
                    <el-button v-show="item.entityOrgStatusCode == 'published' || item.entityOrgStatusCode == 'finished' || item.entityOrgStatusCode == 'rejected' || item.entityOrgStatusCode == 'opening' || item.entityOrgStatusCode == 'editing' || item.entityOrgStatusCode == 'approving'" type="" size="mini" class="mt10" @click="toDetail(item.entityOrgId)">查看</el-button>
                    <el-button v-show="item.entityOrgStatusCode == 'published' || item.entityOrgStatusCode == 'opening'" type="" size="mini" class="mt10" @click="rowJingyong(item.entityOrgId)">停用</el-button>
                    <el-button v-show="item.entityOrgStatusCode == 'rejected' || item.entityOrgStatusCode == 'editing'" type="" size="mini" class="mt10" @click="toEdit(item.entityOrgId)">编辑</el-button>
                    <el-button v-show="item.entityOrgStatusCode == 'approving'" type="" size="mini" class="mt10" @click="shenhe(item.entityOrgId)">审核</el-button>
                    <el-button v-show="item.entityOrgStatusCode == 'finished' || item.entityOrgStatusCode == 'rejected' || item.entityOrgStatusCode == 'editing'" type="" size="mini" class="mt10" @click="rowDel(item.entityOrgId)">删除</el-button>
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
            <el-table-column prop="entityName" align="center" label="活动标题" sortable="custom">
            </el-table-column>
            <!--<el-table-column prop="entityTypeName" label="活动类型" align="center" sortable="custom">
            </el-table-column>-->
            <el-table-column prop="effectiveDt" label="发布时间" align="center" sortable="custom"></el-table-column>
            <el-table-column prop="expiryDt" label="结束时间" align="center" sortable="custom"></el-table-column>
            <el-table-column label="分类" sortable="custom">
              <template slot-scope="scope">
                <span :style="{'color':scope.row.securityEducationTypeCodeStr&&scope.row.securityEducationTypeCodeStr.split(';')[1]}">{{scope.row.securityEducationTypeCodeStr&&scope.row.securityEducationTypeCodeStr.split(";")[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="actypeCode" label="状态" align="center" sortable="custom">
              <template slot-scope="scope">
                            <span   v-if="scope.row.entityOrgStatusCodeStr" :style="{color:scope.row.entityOrgStatusCodeStr.split(';')[1]}"
                                 >{{scope.row.entityOrgStatusCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" :width="120">
              <template slot-scope="scope">
                <div class="flex  row">
                  <el-popover v-show="scope.row.entityOrgStatusCode == 'published' || scope.row.entityOrgStatusCode == 'finished' || scope.row.entityOrgStatusCode == 'rejected' || scope.row.entityOrgStatusCode == 'opening' || scope.row.entityOrgStatusCode == 'editing' || scope.row.entityOrgStatusCode == 'approving'" placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.entityOrgId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover v-show="scope.row.entityOrgStatusCode == 'editing'" placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">
                    <span slot="reference"
                          @click.stop="toEdit(scope.row.entityOrgId)"><i
                      class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover v-show="scope.row.entityOrgStatusCode == 'finished' || scope.row.entityOrgStatusCode == 'rejected' || scope.row.entityOrgStatusCode == 'editing'" placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.entityOrgId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover v-show="scope.row.entityOrgStatusCode == 'approving'" placement="top-start" popper-class="popover-v2-rao" title="审核" trigger="hover">
                  <span slot="reference"
                        @click.stop="shenhe(scope.row.entityOrgId)"><i
                    class="iconfont icon-mingdan ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover v-show="scope.row.entityOrgStatusCode == 'published' || scope.row.entityOrgStatusCode == 'opening'" placement="top-start" popper-class="popover-v2-rao" title="停用" trigger="hover">
                    <span slot="reference"
                          @click.stop="rowJingyong(scope.row.entityOrgId)"><i
                      class="iconfont icon-icon_tingyong_caozuo ml5 f20 c999999"></i></span>
                  </el-popover>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>

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

      <div class="paging text-right mt10">
        <el-pagination class="pagination-v2-rao" :page-sizes="[10,20,30]" :page-size="data.size" :total="data.total"
                       :current-page="data.current" layout="total, sizes, prev, pager, next, jumper"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>

      <!-- 提示信息 -->
      <div class="tips-school tips-rao" v-if="msgShow">
        <img src="~@/assets/img/icon-warning.png" width="20"/>
        请至少选择一项内容!
      </div>
    </el-container>

  </div>
</template>
<script>
  import editor from '../../../components/editor/editor'
  import api from "./activityinfoUrl";
  import commonApi from "@/api/common/common";
  import {coverData} from "../../../util/util";
import { mapMutations,mapGetters } from 'vuex';
  export default {
    name: 'adminIndex',
    components: {
      editor
    },
    data() {
      return {
        optionsList1 : [{"label": "全部", "value": ""}],
        showTable: true,
        clientWidth: document.documentElement.clientWidth,
        clientHeight: document.documentElement.clientHeight,
        isLoaded: false,
        dialogDelete: false,
        isDel: false,
        dialogTingyong : false,
        msgShow: false,
        dialogVisible: false,
        dialogFormVisible: false,
        loadingTingyong : false,
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
        entityOriginTypeCodeOptions: [{"label": "无", "name": ""}],
        acstatusCodeValue: null,
        ynOptions: [{"label": "全部", "name": ""}],
        ynValue: null,
        publicServiceCodeOptions: [{"label": "全部", "name": ""}],
        publicServiceCodeValue: null,
        virtualCurrencyCodeOptions: [{"label": "全部", "name": ""}],
        virtualCurrencyCodeValue: null,
        form: {},
        searchForm: {},
        entityOrgStatusCodeOptions: [{"label": "全部", "name": ""}],
        data:{
          records: [
          // {topic:'好吃的汉堡好吃的汉堡好吃的汉大萨达按时打算啊堡大萨达是大师的阿斯顿按时打收到撒的撒的撒大',actypeCodeStr:'活动中;red;git.png'
          //   ,imagePath:require('../../../assets/img/gakki.jpg'),publishedDt:'2010.10.18 - 2018.10.19',},{topic:'好吃的汉堡好吃的汉堡好吃的汉大萨达按时打算啊堡大萨达是大师的阿斯顿按时打收到撒的撒的撒大',actypeCodeStr:'活动中;red;git.png'
          //   ,imagePath:require('../../../assets/img/gakki.jpg'),publishedDt:'2010.10.18 - 2018.10.19',},{topic:'好吃的汉堡好吃的汉堡好吃的汉大萨达按时打算啊堡大萨达是大师的阿斯顿按时打收到撒的撒的撒大',actypeCodeStr:'活动中;red;git.png'
          //   ,imagePath:require('../../../assets/img/gakki.jpg'),publishedDt:'2010.10.18 - 2018.10.19',},{topic:'好吃的汉堡好吃的汉堡好吃的汉大萨达按时打算啊堡大萨达是大师的阿斯顿按时打收到撒的撒的撒大',actypeCodeStr:'活动中;red;git.png'
          //   ,imagePath:require('../../../assets/img/gakki.jpg'),publishedDt:'2010.10.18 - 2018.10.19',},{topic:'好吃的汉堡好吃的汉堡好吃的汉大萨达按时打算啊堡大萨达是大师的阿斯顿按时打收到撒的撒的撒大',actypeCodeStr:'活动中;red;git.png'
          //   ,imagePath:require('../../../assets/img/gakki.jpg'),publishedDt:'2010.10.18 - 2018.10.19',},{topic:'好吃的汉堡好吃的汉堡好吃的汉大萨达按时打算啊堡大萨达是大师的阿斯顿按时打收到撒的撒的撒大',actypeCodeStr:'活动中;red;git.png'
          //   ,imagePath:require('../../../assets/img/gakki.jpg'),publishedDt:'2010.10.18 - 2018.10.19',},{topic:'好吃的汉堡好吃的汉堡好吃的汉大萨达按时打算啊堡大萨达是大师的阿斯顿按时打收到撒的撒的撒大',actypeCodeStr:'活动中;red;git.png'
          //   ,imagePath:require('../../../assets/img/gakki.jpg'),publishedDt:'2010.10.18 - 2018.10.19',},{topic:'好吃的汉堡好吃的汉堡好吃的汉大萨达按时打算啊堡大萨达是大师的阿斯顿按时打收到撒的撒的撒大',actypeCodeStr:'活动中;red;git.png'
          //   ,imagePath:require('../../../assets/img/gakki.jpg'),publishedDt:'2010.10.18 - 2018.10.19',},{topic:'好吃的汉堡好吃的汉堡好吃的汉大萨达按时打算啊堡大萨达是大师的阿斯顿按时打收到撒的撒的撒大',actypeCodeStr:'活动中;red;git.png'
          //   ,imagePath:require('../../../assets/img/gakki.jpg'),publishedDt:'2010.10.18 - 2018.10.19',},{topic:'好吃的汉堡好吃的汉堡好吃的汉大萨达按时打算啊堡大萨达是大师的阿斯顿按时打收到撒的撒的撒大',actypeCodeStr:'活动中;red;git.png'
          //   ,imagePath:require('../../../assets/img/gakki.jpg'),publishedDt:'2010.10.18 - 2018.10.19',},
        ]
        },
        multipleSelection: [],
        params: {
          page: 1,
          limit: 10,
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          }
        },
      }
    },
    mounted() {
      this.SET_IS_LOADING(false);
      //this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList();
      commonApi.getCodeIntType('surveyType').then(res => {
        this.optionsList1 = this.optionsList1.concat(coverData(res.data.data, 'codeDesc', 'codeId'))
      })
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
      commonApi.getCodeIntType("actype").then(res => {
        let viewList = res.data.data || [];
        for (let actypeItem of viewList) {
          this.actypeCodeOptions.push({
            "label": actypeItem.codeDesc,
            "name": actypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("acstatus").then(res => {
        let viewList = res.data.data || [];
        for (let acstatusItem of viewList) {
          this.acstatusCodeOptions.push({
            "label": acstatusItem.codeDesc,
            "name": acstatusItem.codeId
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
      commonApi.getCodeIntType("publicService").then(res => {
        let viewList = res.data.data || [];
        for (let publicServiceItem of viewList) {
          this.publicServiceCodeOptions.push({
            "label": publicServiceItem.codeDesc,
            "name": publicServiceItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("virtualCurrency").then(res => {
        let viewList = res.data.data || [];
        for (let virtualCurrencyItem of viewList) {
          this.virtualCurrencyCodeOptions.push({
            "label": virtualCurrencyItem.codeDesc,
            "name": virtualCurrencyItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
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
    computed: {
      ...mapGetters(["isLoading"]),
      getCardWidth: function () {
        let width = 0;
        if (this.clientWidth < 1400) {
          width = (this.clientWidth - 110) / 5
        } else {
          width = (this.clientWidth - 172) / 6
        }
        return width
      },
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },

    methods: {
      ...mapMutations(['SET_IS_LOADING']),
      rowJingyong(id){
        this.dialogTingyong = true;
        this.multipleSelection = [id];

      },
      dialogTingyongComfireHandler(){
        if(this.$refs.schooltable.selection.some(item => {
          return item.entityOrgStatusCode != "opening"
        })){
          this.$message.error("只有已发布才可以停用");
          return
        }

        this.loadingTingyong = true;
        api.updateStatus({
              entityOrgIds : this.multipleSelection,
              entityOrgStatusCode : "finished"
            }).then(res => {
          this.isDel = false;
          this.dialogDelete = false;
          if (res.data.resultCode == "000000") {
            this.$message.success("停用成功");
            this.getList();
            this.dialogTingyong = false;
          }
          this.loadingTingyong = false;
        }, res => {
                this.SET_IS_LOADING(false);

                this.$message.error(res.message);
              })
      },
      dialogTingyongCancelHandler(){
        this.dialogTingyong = false;
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
      toQie () {
        this.showTable = !this.showTable
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
        this.SET_IS_LOADING(true);
        api.fetchActivityinfoList(this.params).then(res => {
          if (res.data.resultCode !== "000000") {
            this.$message.error(res.data.message);
          }
          this.data = res.data.data;
          this.isLoaded = false;
          this.SET_IS_LOADING(false);
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
        api.ActivityPlanIdDel(this.multipleSelection).then(res => {
          this.isDel = false;
          this.dialogDelete = false;
          if (res.data.resultCode == "000000") {
            this.$message.success("删除成功");
            this.getList();
          }
        })


      },
      dialogDeleteCancelHandler() {
        this.dialogDelete = false;
      },
      toAdd() {
        //safety safetyEdu basedata
        let opath = '/safetyEdu/edu_detailActivityDetailSchool?type=add';
        this.$router.push({path: opath})
      },
      shenhe(entityOrgId){
        let opath = `/safetyEdu/edu_detailActivityDetailSchool?type=shenhe&entityOrgId=${entityOrgId}`;
        this.$router.push({path: opath})
      },
      toTotal() {
        let opath = '/safetyEdu/ActivityInfoTotal';
        this.$router.push({path: opath})
      },
      toEdit(entityOrgId) {
        let opath = `/safetyEdu/edu_detailActivityDetailSchool?type=edit&entityOrgId=${entityOrgId}`;
        this.$router.push({path: opath})
      },
      toDetail(entityOrgId) {
        let opath = `/safetyEdu/edu_detailActivityDetailSchool?type=detail&entityOrgId=${entityOrgId}`;
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

    .tips-school {
    position: absolute;
    top: 40%;
    left: 47%;

  }

</style>
