<template>
  <div class="SurveyMaster">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">

          <el-form-item label="名称:" prop="surveyId" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.entityName" maxlength="30"
                      placeholder="请输入名称"></el-input>
          </el-form-item>


          <!--<el-form-item label="分类:" prop="surveyId" class="w140">-->
            <!--<el-select v-model="searchForm.surveyType" placeholder="请选择分类">-->
              <!--<el-option-->
                <!--v-for="item in optionsList1"-->
                <!--:key="item.value"-->
                <!--:label="item.label"-->
                <!--:value="item.value">-->
              <!--</el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="学段:" prop="segmentId" class="w140">
            <el-select v-model="searchForm.segmentId" placeholder="请选择学段" @change="changeSeg">
              <el-option
                v-for="item in optionsList2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级:" prop="gradeId" class="w140">
            <el-select v-model="searchForm.gradeId" placeholder="请选择年级">
              <el-option
                v-for="item in optionsList3"
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

          <!--<el-form-item label="发布时间:" prop="timeStart" class="w140">-->
            <!--<el-date-picker class="date-v2-rao" v-model="searchForm.timeStart" value-format="yyyy-MM-dd HH:mm"-->
                            <!--type="date"-->
                            <!--placeholder="请输入日期"></el-date-picker>-->
          <!--</el-form-item>-->
          <!--<el-form-item label="结束时间:" prop="timeEnd" class="w140">-->
            <!--<el-date-picker class="date-v2-rao" v-model="searchForm.timeEnd" value-format="yyyy-MM-dd HH:mm" type="date"-->
                            <!--placeholder="请输入日期"></el-date-picker>-->
          <!--</el-form-item>-->

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


            <!--<el-button type="primary" size="small" class="el-button&#45;&#45;small-icon  button-v2-rao b93BF88 " @click= "toAdd">-->
            <!--<i class="iconfont icon-icon_tianjia f12 cfff"></i> 新建-->
            <!--</el-button>-->

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
                    <div class="card-title c93BF88">{{item.organizedTitle}}</div>
                    <div class="card-other flex row space-between">
                      <span class="card-time c93BF88"><i class="iconfont icon-icon_time1"></i>{{item.updatedDt}}</span>
                      <span class="card-status"><span v-if="item.entityTypeName"></span>{{item.entityTypeName}}</span>
                    </div>
                    <div class="card-other flex row space-between f12">
                      <span class="card-type">年级:{{item.updatedDt}}</span>
                      <span class="card-type">学段:{{item.entityTypeName}}</span>
                    </div>

                  </div>
                  <div class="bottom clearfix">
                    <div class="pull-center">
                      <el-button type="" size="mini" class="mt10" @click="toDetail(item.entityId)">查看</el-button>
                      <!--<el-button type="" size="mini" class="mt10" @click="rowJingyong(item.entityId)">停用</el-button>-->
                      <el-button type="" size="mini" class="mt10" @click.stop="fabu(item.entityId)">>发布</el-button>
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
            <el-table-column prop="surveyName" align="center" label="问卷标题" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.entityName" class="one-line">{{scope.row.entityName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="问卷类型" sortable="custom">
              <template slot-scope="scope">
              <span :style="{'color':scope.row.securityEducationTypeCodeStr&&scope.row.securityEducationTypeCodeStr.split(';')[1]}">{{scope.row.securityEducationTypeCodeStr&&scope.row.securityEducationTypeCodeStr.split(";")[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="createdDt" label="发布时间" align="center" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.createdDt" class="one-line">{{scope.row.createdDt}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="gradeNames" label="适用班级" align="center" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.gradeNames" class="one-line">{{scope.row.gradeNames}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right" width="120">
              <template slot-scope="scope">
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.entityId)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="发布" trigger="hover">
                    <span slot="reference"
                          @click.stop="fabu(scope.row.entityId)"><i
                      class="iconfont icon-icon_fabu2-copy ml5 f20 c999999"></i></span>
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

      <!-- 提示信息 -->
      <div class="tips-school tips-rao" v-if="msgShow">
        <img src="~@/assets/img/icon-warning.png" width="20"/>
        请至少选择一项内容!
      </div>
    </el-container>

  </div>
</template>

<script>
  import api from "./surveySourseUrl";
  import commonApi from '@/api/common/common'
  import {coverData} from "../../../util/util";

  export default {
    data() {
      return {
        optionsList1: [],
        optionsList2: [],
        optionsList3: [],
        isLoaded: true,
        showTable: true,
        msgShow: false,
        form: {
          surveyId: null,
        },
        searchForm: {
          entityName: null,
          surveyId: null,
          segmentId: null,
          gradeId: null,
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
          segmentId: null,
          gradeId: null,
        }
      }
    },

    computed: {


      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    created() {
      let params = this.$route.query;
      for(let it in params) {
        this.params[it] = params[it];
      }
      //let schoolId = this.$route.query.schoolOrgId;
      //this.params.schoolId = schoolId;
      commonApi.getCodeIntType('surveyType').then(res => {
        this.optionsList1 = coverData(res.data.data, 'codeDesc', 'codeId')
      })
      commonApi.commonRequest('/userapp/base/segmentGrade?type=1','get',).then(res => {
        let arr = [{value:'',label:'全部'}];
        this.optionsList2 = arr.concat(coverData(res.data.data, 'name', 'id'))
      })
      commonApi.commonRequest('/userapp/base/segmentGrade?type=2','get',{id:this.params.segmentId}).then(res => {
        let arr = [{value:'',label:'全部'}];
        this.optionsList3 = arr.concat(coverData(res.data.data, 'name', 'id'))
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
      changeSeg(formName) {
        this.searchForm.gradeId = null;
        commonApi.commonRequest('/userapp/base/segmentGrade?type=2','get',{id:this.searchForm.segmentId}).then(res => {
          let arr = [{value:'',label:'全部'}];
          this.optionsList3 = arr.concat(coverData(res.data.data, 'name', 'id'));
        })
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()

      },
      handleSelectionChange(val) {
        console.log(val);
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
      toAdd() {
        //safety safetyEdu basedata
        let opath = '/safetyEdu/detailSurveySourse/add/' + 0;
        this.$router.push({path: opath})
      },
      fabu(entityId) {
        //safety safetyEdu basedata
        let opath = '/safetyEdu/detailSurveyMaster/add/0?entityId='+entityId;
        this.$router.push({path: opath})
      },
      toTotal() {
        let opath = '/safetyEdu/SurveyMasterTotal';
        this.$router.push({path: opath})
      },

      toDetail(id) {
        let opath = '/safetyEdu/detailSurveySourse/detail/' + id;
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
