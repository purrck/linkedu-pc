<template>
  <div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="学段:">
            <el-input class="input-v2-rao" v-model="searchForm.segmentName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="年级:">
            <el-input class="input-v2-rao" v-model="searchForm.gradeName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="学科:">
            <el-input class="input-v2-rao" v-model="searchForm.subjectName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
          </el-form-item>
        </el-form>

      </el-header>
      <div class="bt border-color-e8e8e8 mt10 mb10"></div>
      <el-main class="pt-15">

        <el-row class="mb10">
          <el-col :span="24" class="text-left mb-10 flex row btns x-center">

              <div style="" class="flex space-between row btns-msg f12">
              <div>
                <i class="iconfont icon-icon_yixuanzhe" style="color: #93BF88;"></i>
                <span class="c707070">已选择{{multipleSelection.length}}项</span>
              </div>
              <div>
                <span class="c707070">共搜索到{{data.total}}条数据</span>
                <i class="iconfont icon-icon_shuju f12" style="color: #93BF88;"></i>
              </div>
            </div>
            <div>
              <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toAdd">
                <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
              </el-button>
              <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao b93BF88 " @click="del">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
              </el-button>
            </div>
          </el-col>
        </el-row>

        <div class="text-center" v-show="!data.records.length">
          <div>
            您的学校还未设置【<span class="c93BF88">学科信息</span>】哦，请点击“<span class="c93BF88">设置</span>”进行学科信息添加
          </div>
          <div class="pt15">
            <el-button type="primary" size="small" class="button-v2-rao b93BF88" @click="addSubject">
              设置
            </el-button>
          </div>
        </div>

        <div class="table" v-show="data.records.length">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true" @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="segmentName" label="学段名" sortable="custom">
              <template slot-scope="scope">
                <div @click="segmentClick(scope.row.schoolSegmentSubjectId)">{{scope.row.segmentName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="gradeName" label="年级名" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.gradeName">{{scope.row.gradeName}}</div>
                <div v-else>N/A</div>
              </template>
            </el-table-column>
            <el-table-column prop="subjectName" label="学科名" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.subjectName">{{scope.row.subjectName}}</div>
                <div v-else>N/A</div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                  <span slot="reference" @click.stop="toDetail(scope.row.schoolSegmentSubjectId)"><i class="iconfont icon-icon_chakan1 ml5 f20 c999999" ></i></span>
                </el-popover>
                <el-popover title="编辑" placement="top-start" popper-class="popover-v2-rao" trigger="hover"  >
                  <span slot="reference" @click.stop="toEdit(scope.row.schoolSegmentSubjectId)"> <i class="iconfont icon-icon_bianji ml5 f20 c999999" ></i></span>
                </el-popover>
                <el-popover placement="top-start" title="删除" popper-class="popover-v2-rao" trigger="hover">
                  <span slot="reference" @click.stop="rowDel(scope.row.schoolSegmentSubjectId)"><i class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right">
        <el-pagination class="pagination-v2-rao" popper-class="pagination-popper-v2-rao" :page-sizes="[10,20,30]" :page-size="data.size" :total="data.total"
                       :current-page="data.current" layout="total, sizes, prev, pager, next, jumper"
                       @size-change="handleSizeChange" @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <el-dialog title="提示" :visible.sync="dialogDelete" center width="22%">
        <div class="text-center">
          <img src="~@/assets/img/dialog-delete.png"/>
          <p class="text-center fs-16 color333 mt-20">是否确认删除?</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogDeleteComfireHandler" :loading="isDel">是</el-button>
          <el-button type="primary" @click="dialogDeleteCancelHandler">否</el-button>
        </div>
      </el-dialog>

      <el-dialog
        title="选择您要添加的学科信息"
        :visible.sync="dialogVisible"
        width="60%">
        <div>
          <el-select size="mini" style="width:100px" v-model="segmentOptionsValue" placeholder="请选择">
                    <el-option
                      v-for="item in segmentOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
          <table class="p100 mt10 addSubjectTable">
            <tr>
                <th>
                  年级
                </th>
                <th>语文</th>
                <th>数学</th>
                <th>英语</th>
                <th>政治</th>
                <th>体育</th>
                <th>地理</th>
            </tr>
            <tr>
                <td>一年级</td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
            </tr>
            <tr>
                <td>二年级</td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
            </tr>
            <tr>
                <td>三年级</td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
            </tr>
            <tr>
                <td>四年级</td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
            </tr>
            <tr>
                <td>五年级</td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
            </tr>
            <tr>
                <td>六年级</td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
                <td>
                  <el-switch
                    active-color="#93BF88"
                    inactive-color="#dcdfe6">
                  </el-switch>
                </td>
            </tr>
          </table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" class="button-v2-rao b93BF88" @click="dialogVisible = false">确 定</el-button>
        </span>
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
  import api from "./basicschoolsegmentsubjectUrl";
  import commonApi from "@/api/common/common";

  export default {
    data() {
      return {
        segmentOptionsValue : "",
        segmentOptions : [
          {
            value: '1',
            label: '小学'
          },
          {
            value: '2',
            label: '初中'
          },
          {
            value: '3',
            label: '高中'
          }
        ],
        checkedSubject : [],
        subjects : [
          {
            id : "1",
            name : "小学"
          },
          {
            id : "2",
            name : "初中"
          },
          {
            id : "3",
            name : "高中"
          }
        ],
        isLoaded: true,
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
        form: {
          schoolId: null,
          segmentId: null,
          gradeId: null,
          subjectId: null,
        },
        searchForm: {

          schoolId: null,
          segmentId: null,
          gradeId: null,
          subjectId: null,

        },
        data: "",
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          schoolId: null,
          segmentId: null,
          gradeId: null,
          subjectId: null,

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

    },
    mounted() {
      this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList();

    },
    methods: {
      addSubject(){
        let opath = `/basedata/listSchoolSegmentSubject/addSubject`;
        this.$router.push({path: opath})
        //this.dialogVisible = true;
      },
      segmentClick(schoolSegmentSubjectId) {
        this.$detailDialog({
          url: `/base/schoolSegmentSubjectAd/${schoolSegmentSubjectId}`,
          items: [
            {
              key: "segmentName",
              name: "学段"
            },
            {
              key: "gradeName",
              name: "年级"
            },
            {
              key: "subjectName",
              name: "学科"
            }
          ]
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.schoolSegmentSubjectId
        });
      },
      handleSizeChange(size) {
        this.params.limit = size;
        this.isLoaded = true;
        this.getList();
      },
      handleCurrentChange(currentPage) {
           this.params.page = currentPage
        this.setCurrentPage(this.$route.fullPath, this.params);
        this.isLoaded = true;
        this.getList();
      },
      // 分页按找正常序列开始
      typeIndex(index) {
        return index + this.params.limit * (this.params.page - 1) + 1;
      },
      sortChange(obj) {
        this.params.orderByField = obj.prop;
        this.params.isAsc = obj.order == "ascending" ? true : false;
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.isLoaded = true;
        this.getList();
      },
      getList() {
        api.fetchList(this.params).then(res => {
          //for (let i of res.data.records) {
          //i.isAudio = false;
          //}
          //res.data.data.records=[]
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
      del() {
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
        }, res => {
          this.isDel = false;
          //this.$message.error(res.data.message);
        });
      },
      dialogDeleteCancelHandler() {
        this.dialogDelete = false;
      },
      toDel() {
        if (this.multipleSelection.length == 0) {
          this.$message.error("请您选择要删除的数据");
        } else {
          this.$confirm("该操作将会删除x，是否继续?", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: 'warning'
          }).then(() => {
            this.isLoaded = true;
            api.batchDelObj(this.multipleSelection).then(res => {
              if (res.data.resultCode == "000000") {
                this.$message.success("删除成功");
                this.getList();
              }
            }, res => {
              this.$message.error(res.data.message);
            });
          });
        }
      },
      toAdd() {
        //safety safetyEdu basedata
        let opath = '/basedata/detailSchoolSegmentSubject/add/' + 0;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/basedata/detailSchoolSegmentSubject/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/basedata/detailSchoolSegmentSubject/detail/' + id;
        this.$router.push({path: opath})
      },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .addSubjectTable{
    th{
      text-align:left;
      padding: 10px;
      font-weight:bold;
      background: #F0F0F0
    }
    td{
      padding: 10px;
    }
  }
  .tips-school {
    position: absolute;
    top: 40%;
    left: 47%;

  }

  .select-all {
    margin: 0px 0 5px;
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
