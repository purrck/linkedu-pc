


<template>
  <div class="PersonalArticleRecommend">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
<!--                <el-form-item label="文章id:"  prop="articleId" class="w140">-->
<!--                  <el-input class="input-v2-rao" v-model="searchForm.articleId" maxlength="30"></el-input>-->
<!--                </el-form-item>-->
                <el-form-item label="标题:"  prop="articleTitle" class="w140">
                  <el-input class="input-v2-rao" v-model="searchForm.articleTitle" maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="推荐人:"  prop="userName" class="w140">
                  <el-input class="input-v2-rao" v-model="searchForm.userName" maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="推荐状态:" prop="articleRecommendStatusCode" class="w140">
                  <el-select class="select-v2-rao" v-model="searchForm.articleRecommendStatusCode" placeholder="请您选择">
                    <el-option v-for="articleRecommendStatusCodeItem in articleRecommendStatusCodeOptions"
                               :key="articleRecommendStatusCodeItem.name"
                               :label="articleRecommendStatusCodeItem.label" :value="articleRecommendStatusCodeItem.name">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="推荐时间:" prop="recommendDt" class="w140">
                  <el-date-picker class="date-v2-rao" v-model="searchForm.recommendDt" type="date"
                                  value-format="yyyy-MM-dd HH:mm" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="推荐机构:" prop="schoolName" class="w140">
                  <el-select class="select-v2-rao" v-model="searchForm.schoolId" placeholder="请您选择">
                    <el-option v-for="schoolNameItem in schoolNames"
                               :key="schoolNameItem.id"
                               :label="schoolNameItem.label" :value="schoolNameItem.id">
                    </el-option>
                  </el-select>
                </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <el-button type="primary" @click="resetForm('searchForm')" class="button-v2-rao b93BF88">重置</el-button>
          </el-form-item>
        </el-form>
      </el-header>

      <div class="bt border-color-e8e8e8 mt10 mb10"></div>

      <el-main class="pt-15">
        <el-row class="mb10">
          <el-col :span="24" class="text-left mb-10 flex row btns x-center space-between">

            <div class="flex space-between row btns-msg f12">
              <div>
                <i class="iconfont icon-icon_shanchu_p" style="color: #93BF88;"></i>
                <span class="c707070">已选择<span class="bold c93BF88"> {{multipleSelection.length}} </span>项</span>
              </div>
              <div>
                <span class="c707070">共搜索到<span class="bold c93BF88"> {{data.total}} </span>条数据</span>
                <i class="iconfont icon-icon_shuju" @click="toTotal" style="color: #93BF88;"></i>
              </div>
            </div>
              <el-button type="primary" size="small" class="button-v2-rao b93BF88 " @click="toAdd">
                <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
              </el-button>
              <el-button type="primary" size="small" class="button-v2-rao bFA6557" @click="toDel" :disabled="!multipleSelection.length > 0">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
              </el-button>
          </el-col>
        </el-row>

        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                    @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
                  <el-table-column prop="articleTitle" align="center" label="标题" sortable="custom">
                    <template slot-scope="scope">
                      <div v-if="scope.row.articleTitle" class="one-line" @click.stop="detailTo(scope.row.articleId)">{{scope.row.articleTitle}}</div>
                      <div v-else>无</div>
                    </template>
                  </el-table-column>
<!-- 标题 colName:article_title sqlType:VARCHAR notnull:false -->
                  <el-table-column prop="userName" align="center" label="推荐人" sortable="custom">
                    <template slot-scope="scope">
                      <div class="user-msg">
                      <div v-if="scope.row.userPreviewVO.headPicture" class="user-img">
                        <el-popover placement="top-start" title trigger="hover">
                          <img :src="scope.row.userPreviewVO.headPicture" alt="头像" style="width:300px;height:300px">
                          <img slot="reference" :src="scope.row.userPreviewVO.headPicture" style="border-radius:50%;width:60px;height:60px" alt="" class="scope-img">
                        </el-popover>
                        </div>
                      <div v-if="scope.row.userPreviewVO.firstName" class="user-name">{{scope.row.userPreviewVO.firstName}}</div>
                      <div v-if="scope.row.userPreviewVO.gender" class="user-sex">
                        {{ scope.row.userPreviewVO.gender == 'F' ? '男' : '女' }}
                        </div>
                      </div>
                    </template>
                  </el-table-column>
<!-- 推荐人 colName:user_name sqlType:VARCHAR notnull:false -->
                  <el-table-column prop="recommendDt" label="推荐时间" align="center" sortable="custom"></el-table-column>
<!-- 推荐时间 colName:recommend_dt sqlType:TIMESTAMP notnull:false -->
                  <el-table-column prop="articleRecommendStatusCode" label="推荐状态" align="center" sortable="custom">
                    <template slot-scope="scope">
                            <span :style="{color:scope.row.articleRecommendStatusCodeStr.split(';')[1]}"
                                  v-if="scope.row.articleRecommendStatusCodeStr">{{scope.row.articleRecommendStatusCodeStr.split(';')[0]}}</span>
                      <span v-else>无</span>
                    </template>
                  </el-table-column>
<!-- 推荐状态 colName:article_recommend_status_code sqlType:VARCHAR notnull:false -->
                  <el-table-column prop="schoolName" align="center" label="机构" sortable="custom">
                    <template slot-scope="scope">
                      <div v-if="scope.row.schoolName" class="one-line">{{scope.row.schoolName}}</div>
                      <div v-else>无</div>
                    </template>
                  </el-table-column>
<!-- 机构 colName:school_name sqlType:VARCHAR notnull:false -->
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">

                  <el-popover v-if="scope.row.articleRecommendStatusCode =='editing' || scope.row.articleRecommendStatusCode == 'reject'" placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">
                    <span slot="reference"
                          @click.stop="toEdit(scope.row.articleRecommendId)"><i
                        class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                  </el-popover>

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.articleRecommendId)"><i
                        class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                  </el-popover>
                <el-popover v-if="scope.row.articleRecommendStatusCode =='editing' || scope.row.articleRecommendStatusCode == 'reject'" placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.articleRecommendId)"><i
                      class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right">
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
  import api from "./personalarticlerecommendUrl";
  import commonApi from "@/api/common/common";
  import preview from '@/util/preview';
  export default {
    directives: {preview},
    data() {
      return {
        isLoaded: true,
        dialogDelete: false,
        isDel: false,
        msgShow: false,
        articleRecommendStatusCodeOptions: [{"label": "全部", "name": ""}],
        schoolNames: [{"label":"全部","id":""}],
        form : {
          articleId :null,
          articleTitle :null,
          userName :null,
          articleRecommendStatusCodeValue: null,
          recommendDt: null,
          schoolId: null
        },
        searchForm : {
          articleId :null,
          articleTitle :null,
          userName :null,
          articleRecommendStatusCode :null,
          recommendDt: null,
          schoolId: null
        },
        data : "",
        multipleSelection : [],
        params :{
          page : 1,
          limit:10,
          articleId :null,
          articleTitle :null,
          userName :null,
          articleRecommendStatusCode :null,
          recommendDt: null,
          schoolId: null
        }
      }
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    created() {
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
    },
    mounted() {
      this.getCurrentPage(this.$route.path, this.params)
      this.getList();

        commonApi.getCodeIntType("articleRecommendStatus").then(res => {
            let viewList = res.data.data || [];
            for (let articleRecommendStatusItem of viewList) {
              this.articleRecommendStatusCodeOptions.push({
                "label": articleRecommendStatusItem.codeDesc,
                "name": articleRecommendStatusItem.codeId
              });
            }
          }, res => {
            this.$message.error(res.data.message);
          });
        // 机构推荐
        commonApi.getAllSchool().then(res => {
            let viewListsl = res.data.data || [];
            for (let schoolNameItem of viewListsl.records) {
              this.schoolNames.push({
                "label": schoolNameItem.schoolOrgName,
                "id": schoolNameItem.schoolOrgId
              });
            }
          }, res => {
            this.$message.error(res.data.message);
          });
       },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
                                    return item.articleRecommendId
                                                                                                                                                                                                              });
      },
      handleSizeChange(size) {
        this.params.limit = size;
        this.setCurrentPage(this.$route.path, this.params)
        this.isLoaded = true;
        this.getList();
      },
      handleCurrentChange(currentPage) {
        this.params.page = currentPage;
        this.setCurrentPage(this.$route.path, this.params)
        this.isLoaded = true;
        this.getList();
      },
      // 分页按找正常序列开始
      typeIndex(index) {
        return index + this.params.limit * (this.params.page - 1) + 1;
      },
      sortChange(obj) {
        this.params.orderByField = obj.prop;
        this.params.isAsc = obj.order == "ascending" ;
        this.setCurrentPage(this.$route.path, this.params)
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
            toAdd() {
        //safety safetyEdu basedata
        let opath = '/newApplications/detailPersonalArticleRecommend/add/' + 0;
        this.$router.push({path: opath})
      },
            toTotal (){
        let opath = '/newApplications/PersonalArticleRecommendTotal';
        this.$router.push({path: opath})
      },
            toEdit(id) {
        let opath = '/newApplications/detailPersonalArticleRecommend/edit/' + id;
        this.$router.push({path: opath})
      },
                  toDetail(id) {
        let opath = '/newApplications/detailPersonalArticleRecommend/detail/' + id;
        this.$router.push({path: opath})
      },
      detailTo(id) {
        let opath = '/newApplications/detailPersonalArticle/detail/' + id;
        this.$router.push({path: opath})
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

  .user-msg{
    width: 150px;
    height: 100px;
    position: relative;
    margin: 0 auto;
  }
  .user-img{
    position: absolute;
    left: 5px;
    top: 20px;
  }
  .user-name{
    width: 30%;
    height: 30%;
    text-align: left;
    position: absolute;
    left: 70px;
    top: 25px;
  }
  .user-sex{
    width: 30%;
    height: 30%;
    text-align: left;
    position: absolute;
    color: gray;
    left: 70px;
    bottom: 15px;
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
