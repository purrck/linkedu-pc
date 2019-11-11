

                                                              
<template>
  <div class="QuestionInfo">
    <div class="tree-one">
      <treeOne :treeData="dataType.records"></treeOne>
    </div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px;width:90%;float:right;"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
                <el-form-item label="问题:"  prop="questionId" class="w140">
                  <el-input class="input-v2-rao" v-model="searchForm.questionId" maxlength="30"></el-input>
                </el-form-item>
                <el-form-item label="标签:"  prop="tags" class="w140">
                  <el-input class="input-v2-rao" v-model="searchForm.tags" maxlength="30"></el-input>
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
                  <el-table-column prop="questionTitle" align="center" label="标题" sortable="custom">
                    <template slot-scope="scope">
                      <div v-if="scope.row.questionTitle" class="one-line">{{scope.row.questionTitle}}</div>
                      <div v-else>无</div>
                    </template>
                  </el-table-column>
<!-- 标题 colName:question_title sqlType:VARCHAR notnull:false -->
                  <el-table-column prop="imagePath" align="center" label="图片">
                    <template slot-scope="scope">
                      <div v-if="scope.row.imagePath">
                        <img :src="scope.row.imagePath" alt="" height="100px" class="scope-img">
                      </div>
                      <div v-if="!scope.row.imagePath">无</div>
                    </template>
                  </el-table-column>
<!-- 图片 colName:image_path sqlType:VARCHAR notnull:false -->
                  
<!-- 附件 colName:file_path sqlType:VARCHAR notnull:false -->
                  
<!-- 问题类型 colName:question_type_id sqlType:VARCHAR notnull:false -->
                  
<!-- 问题类型 colName:question_type_name sqlType:VARCHAR notnull:false -->
                  <el-table-column prop="questionStatusCode" label="问题状态" align="center" sortable="custom">
                    <template slot-scope="scope">
                            <span :style="{color:scope.row.questionStatusCodeStr.split(';')[1]}"
                                  v-if="scope.row.questionStatusCodeStr">{{scope.row.questionStatusCodeStr.split(';')[0]}}</span>
                      <span v-else>无</span>
                    </template>
                  </el-table-column>
<!-- 问题状态 colName:question_status_code sqlType:VARCHAR notnull:false -->
                  <el-table-column prop="publishedDt" label="发问时间" align="center" sortable="custom"></el-table-column>
<!-- 发问时间 colName:published_dt sqlType:TIMESTAMP notnull:false -->
                  <el-table-column prop="recentAnswerDt" label="最近回答时间" align="center" sortable="custom"></el-table-column>
<!-- 最近回答时间 colName:recent_answer_dt sqlType:TIMESTAMP notnull:false -->
                  
<!-- 学科 colName:subject_name sqlType:VARCHAR notnull:false -->
                  <el-table-column prop="studentName" align="center" label="学生" sortable="custom">
                    <template slot-scope="scope">
                      <div v-if="scope.row.studentName" class="user-msg">
                        <div v-if="scope.row.studentUserPreviewVO.headPicture" class="user-img">
                        <el-popover placement="top-start" title trigger="hover">
                          <img :src="scope.row.studentUserPreviewVO.headPicture" alt="头像" style="width:300px;height:300px">
                          <img slot="reference" :src="scope.row.studentUserPreviewVO.headPicture" style="border-radius:50%;width:60px;height:60px" alt="" class="scope-img">
                        </el-popover>
                        </div>
                      <div v-if="scope.row.studentUserPreviewVO.firstName" class="user-name">{{scope.row.studentUserPreviewVO.firstName}}</div>
                      <div v-if="scope.row.studentUserPreviewVO.gender" class="user-sex">
                        <img width="25" height="25" v-if="scope.row.studentUserPreviewVO.gender == 'F'" src="../../../assets/img/headerImg-nan.png">
                        <img width="25" height="25" v-else src="../../../assets/img/headerImg-nv.png">
                        </div>
                      </div>
                      <div v-else>无</div>
                    </template>
                  </el-table-column>
<!-- 学生 colName:student_name sqlType:VARCHAR notnull:false -->
                  <el-table-column prop="readNum" align="center" label="阅读" sortable="custom">
                    <template slot-scope="scope">
                      <div v-if="scope.row.readNum" class="one-line">{{scope.row.readNum}}</div>
                      <div v-else>无</div>
                    </template>
                  </el-table-column>
<!-- 阅读 colName:read_num sqlType:INTEGER notnull:false -->
                  <el-table-column prop="answerNum" align="center" label="回答" sortable="custom">
                    <template slot-scope="scope">
                      <div v-if="scope.row.answerNum" class="one-line">{{scope.row.answerNum}}</div>
                      <div v-else>无</div>
                    </template>
                  </el-table-column>
<!-- 回答 colName:answer_num sqlType:INTEGER notnull:false -->
                  
<!-- 悬赏来源 colName:reward_by_user_code sqlType:VARCHAR notnull:false -->
                  
<!-- 悬赏 colName:reward_price sqlType:DECIMAL notnull:false -->
                  <el-table-column prop="followNum" align="center" label="关注" sortable="custom">
                    <template slot-scope="scope">
                      <div v-if="scope.row.followNum" class="one-line">{{scope.row.followNum}}</div>
                      <div v-else>无</div>
                    </template>
                  </el-table-column>
<!-- 关注 colName:follow_num sqlType:INTEGER notnull:false -->
                  <el-table-column prop="collectionNum" align="center" label="收藏" sortable="custom">
                    <template slot-scope="scope">
                      <div v-if="scope.row.collectionNum" class="one-line">{{scope.row.collectionNum}}</div>
                      <div v-else>无</div>
                    </template>
                  </el-table-column>
<!-- 收藏 colName:collection_num sqlType:INTEGER notnull:false -->
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">
                    <span slot="reference"
                          @click.stop="toEdit(scope.row.questionId)"><i
                        class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                  </el-popover>

                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference"
                          @click.stop="toDetail(scope.row.questionId)"><i
                        class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                  </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.questionId)"><i
                      class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>

                    <el-popover placement="top-start" popper-class="popover-v2-rao" title="回答" trigger="hover">
                      <span slot="reference" @click.stop="toAnother(scope.row.questionId ,`listQuestionAnswer`)"><i
                          class="iconfont icon-icon_tuichu_p ml5 f20 c999999"></i></span>
                    </el-popover>

                    <el-popover placement="top-start" popper-class="popover-v2-rao" title="邀请回答" trigger="hover">
                      <span slot="reference" @click.stop="toAnother(scope.row.questionId ,`listQuestionInvite`)"><i
                          class="iconfont icon-icon_tuichu_p ml5 f20 c999999"></i></span>
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
  import api from "./questioninfoUrl";
  import commonApi from "@/api/common/common";
  import preview from '@/util/preview';
  import treeOne from './tree-one';
  import apitype from '../questiontype/questiontypeUrl';
  import talk from '../questioninfo/talk'
  export default {
    directives: {preview},
    data() {
      return {
        isLoaded: true,
        dialogDelete: false,
        isDel: false,
        msgShow: false,
        libShow: false,
        questionStatusCodeOptions: [{"label": "全部", "name": ""}],
        rewardByUserCodeOptions: [{"label": "全部", "name": ""}],
        form : {
          questionId :null,
          tags :null,
        },
        searchForm : {
          questionId :null,
          tags :null,
        },
        data : "",
        dataType: "",
        multipleSelection : [],
        params :{
          page : 1,
          limit:10,
          questionId :null,
          tags :null,
        }
      }
    },
    components: {
      treeOne
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
      // 接收
      talk.$on('data',res=>{
        this.data = res;
      });
    },
    mounted() {
      this.getCurrentPage(this.$route.path, this.params)
      this.getList();
      this.getTypeList();

        commonApi.getCodeIntType("questionStatus").then(res => {
            let viewList = res.data.data || [];
            for (let questionStatusItem of viewList) {
              this.questionStatusCodeOptions.push({
                "label": questionStatusItem.codeDesc,
                "name": questionStatusItem.codeId
              });
            }
          }, res => {
            this.$message.error(res.data.message);
          });
                                                                                                                                                                                                                                                                                                                                                                                                                              commonApi.getCodeIntType("rewardByUser").then(res => {
            let viewList = res.data.data || [];
            for (let rewardByUserItem of viewList) {
              this.rewardByUserCodeOptions.push({
                "label": rewardByUserItem.codeDesc,
                "name": rewardByUserItem.codeId
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
                                    return item.questionId
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
      // get questionType 数据
      getTypeList(){
        apitype.fetchList(this.params).then(res => {
          this.dataType = res.data.data;
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
        let opath = '/questionAnswer/detailQuestionInfo/add/' + 0;
        this.$router.push({path: opath})
      },
            toTotal (){
        let opath = '/questionAnswer/QuestionInfoTotal';
        this.$router.push({path: opath})
      },
            toEdit(id) {
        let opath = '/questionAnswer/detailQuestionInfo/edit/' + id;
        this.$router.push({path: opath})
      },
                  toDetail(id) {
        let opath = '/questionAnswer/detailQuestionInfo/detail/' + id;
        this.$router.push({path: opath})
      },
                  toAnother(id, path) {
        let opath = '/questionAnswer/' + path + '?questionId=' + id;
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

  .selected-box {
    background: #F0F0F0;
    border-radius: 5px;
    padding: 8px;
    font-size: 16px;
  img {
    vertical-align: -4px;
  }

  }
  .QuestionInfo{
  position: relative;
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
    left: 80px;
    top: 48%;
  }
  .user-sex{
    width: 30%;
    height: 30%;
    text-align: left;
    position: absolute;
    color: gray;
    left: 40px;
    top: 55%;
    z-index: 999;
  }
  .tree-one{
    position: absolute;
    top: 10%;
    left: 0px;
    width: 10%;
    min-height: 100%;
    overflow: auto;
    border-right: 1px solid rgb(147, 212, 138); 
  }
</style>
