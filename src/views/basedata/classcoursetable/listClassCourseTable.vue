<template>
  <div class="ClassCourseTable">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
          <el-form-item label="周别:" prop="weekTypeCode" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.weekTypeCode" placeholder="请您选择">
              <el-option v-for="weekTypeCodeItem in weekTypeCodeOptions"
                         :key="weekTypeCodeItem.name"
                         :label="weekTypeCodeItem.label" :value="weekTypeCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="周几:" prop="weekNum" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.weekNum" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="第几节课:" prop="weekSequnceNum" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.weekSequnceNum" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="班级:" prop="className" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.className" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="学科:" prop="subjectName" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.subjectName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="教师姓名:" prop="teacherName" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.teacherName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="教室:" prop="placeName" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.placeName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <!--            <el-button type="primary" @click="resetForm('searchForm')" class="button-v2-rao b93BF88">重置</el-button>-->
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
            <el-button type="primary" size="small" class="button-v2-rao bFA6557" @click="toDel"
                       :disabled="!multipleSelection.length > 0">
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
            <el-table-column prop="weekTypeCode" label="周别" align="center" sortable="custom">
              <template slot-scope="scope">
                            <span :style="{color:scope.row.weekTypeCodeStr.split(';')[1]}"
                                  v-if="scope.row.weekTypeCodeStr">{{scope.row.weekTypeCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="weekNum" align="center" label="周几" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.weekNum" class="one-line">{{scope.row.weekNum}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="weekSequnceNum" align="center" label="第几节课" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.weekSequnceNum" class="one-line">{{scope.row.weekSequnceNum}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="schoolYear" align="center" label="学年" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.schoolYear" class="one-line">{{scope.row.schoolYear}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="schoolTerm" align="center" label="学期" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.schoolTerm" class="one-line">{{scope.row.schoolTerm}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="beginTime" align="center" label="作息开始时间" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.beginTime" class="one-line">{{scope.row.beginTime}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="endTime" align="center" label="作息截止时间" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.endTime" class="one-line">{{scope.row.endTime}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="className" align="center" label="班级" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.className" class="one-line">{{scope.row.className}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="subjectName" align="center" label="学科" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.subjectName" class="one-line">{{scope.row.subjectName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="teacherName" align="center" label="教师姓名" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.teacherName" class="one-line">{{scope.row.teacherName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="placeName" align="center" label="教室" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.placeName" class="one-line">{{scope.row.placeName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" fixed="right">
              <template slot-scope="scope">

                <!--<el-popover placement="top-start" popper-class="popover-v2-rao" title="编辑" trigger="hover">-->
                    <!--<span slot="reference"-->
                          <!--@click.stop="toEdit(scope.row.courseTableId)"><i-->
                      <!--class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>-->
                <!--</el-popover>-->

                <!--<el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">-->
                    <!--<span slot="reference"-->
                          <!--@click.stop="toDetail(scope.row.courseTableId)"><i-->
                      <!--class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>-->
                <!--</el-popover>-->
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="排课设置" trigger="hover">
                    <span slot="reference"
                          @click.stop="toSetting(scope.row)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="删除" trigger="hover">
                  <span slot="reference"
                        @click.stop="rowDel(scope.row.courseTableId)"><i
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
  import api from "./classcoursetableUrl";
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
        weekTypeCodeOptions: [{"label": "全部", "name": ""}],
        form: {
          weekTypeCodeValue: null,
          weekNum: null,
          weekSequnceNum: null,
          className: null,
          subjectName: null,
          teacherName: null,
          placeName: null,
        },
        searchForm: {
          weekTypeCode: null,
          weekNum: null,
          weekSequnceNum: null,
          className: null,
          subjectName: null,
          teacherName: null,
          placeName: null,
        },
        data: "",
        multipleSelection: [],
        params: {
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          weekTypeCode: null,
          weekNum: null,
          weekSequnceNum: null,
          className: null,
          subjectName: null,
          teacherName: null,
          placeName: null,
        }
      }
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    activated() {
      //只刷新数据，不改变整体的缓存
      // console.log('重新活跃路由');
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.getList()
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

      commonApi.getCodeIntType("weekType").then(res => {
        let viewList = res.data.data || [];
        for (let weekTypeItem of viewList) {
          this.weekTypeCodeOptions.push({
            "label": weekTypeItem.codeDesc,
            "name": weekTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    beforeDestroy() {
      this.params = {
        page:1,
        limit:10
      }
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.courseTableId
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
        this.params.isAsc = obj.order == "ascending";
        this.setCurrentPage(this.$route.path, this.params)
        this.isLoaded = true;
        this.getList();
      },
      getList() {
        api.fetchList(this.params).then(res => {
          // console.log(res.data);
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
        let opath = '/basedata/detailClassCourseTable/add/' + 0;
        this.$router.push({path: opath})
      },
      toTotal() {
        let opath = '/basedata/ClassCourseTableTotal';
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/basedata/detailClassCourseTable/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {

        let opath = `/basedata/detailClassCourseTable/detail/${item.courseTableId}`;
        this.$router.push({path: opath})
      },
      toSetting(item) {
        let apath = `?schoolYear=${item.schoolYear}&schoolTerm=${item.schoolTerm}&classId=${item.classId}`;
        let opath = '/basedata/courseSetting'+apath;
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
</style>
