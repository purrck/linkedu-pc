<template>
  <div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">

          <el-form-item label="职位:">
            <el-input class="input-v2-rao" v-model="searchForm.positionName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input class="input-v2-rao" v-model="searchForm.userName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="手机号:">
            <el-input class="input-v2-rao" v-model="searchForm.telPhoneNum" maxlength="30"></el-input>
          </el-form-item>
          <!--<el-form-item label="人员状态:">
            <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="searchForm.positionStatusCodeValue" placeholder="请您选择">
              <el-option v-for="positionStatusCodeItem in positionStatusCodeOptions"
                         :key="positionStatusCodeItem.name"
                         :label="positionStatusCodeItem.label" :value="positionStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item>
            <el-button type="primary" @click="search">查询
            </el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="pt-15">

        <el-row class="select-all">
          <el-col :span="24" class="text-left mb-10 flex row btns x-center">
              <div style="" class="flex space-between row btns-msg f12">
              <div>
                <i class="iconfont icon-icon_shanchu_p" style="color: #93BF88;"></i>
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
              <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="del">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
              </el-button>
            </div>
          </el-col>

        </el-row>

        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true" @sort-change="sortChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
            <el-table-column prop="departName" label="部门" sortable="custom"></el-table-column>
            <el-table-column prop="positionName" label="职位" sortable="custom"></el-table-column>
            <el-table-column prop="userName" label="姓名" sortable="custom">
              <template slot-scope="scope">
                <div @click="titleClick(scope.row.teacherId)">{{scope.row.userName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="telPhoneNum" label="手机号" sortable="custom"></el-table-column>
            <!--<el-table-column label="人员状态">
              <template slot-scope="scope">
              </template>
            </el-table-column>-->
            <!--<el-table-column prop="effectiveDt" label="开始时间" sortable="custom"-->
            <!--width="200"></el-table-column>-->
            <!--<el-table-column prop="expiryDt" label="截止时间" sortable="custom"-->
            <!--width="200"></el-table-column>-->
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                  <span slot="reference" @click.stop="toDetail(scope.row.positionId)"><i class="iconfont icon-icon_chakan1 ml5 f20 c999999" ></i></span>
                </el-popover>
                <el-popover title="编辑" placement="top-start" popper-class="popover-v2-rao" trigger="hover"  >
               <span slot="reference" @click.stop="toEdit(scope.row.positionId)"> <i class="iconfont icon-icon_bianji ml5 f20 c999999" ></i></span>
                </el-popover>
                <el-popover placement="top-start" title="删除" popper-class="popover-v2-rao" trigger="hover">
                  <span slot="reference" @click.stop="rowDel(scope.row.positionId)"><i class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
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

      <!-- 提示信息 -->
      <div class="tips-school tips-rao" v-if="msgShow">
        <img src="~@/assets/img/icon-warning.png" width="20"/>
        请至少选择一项内容!
      </div>
    </el-container>

  </div>
</template>

<script>
  import api from "./basicschoolorgpositionUrl";
  import commonApi from "@/api/common/common";

  export default {
    data() {
      return {
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
        positionStatusCodeOptions: [{"label": "全部", "name": ""}],
        positionStatusCodeValue: null,
        form: {
          departId:
            null,
          departName:
            null,
          positionName:
            null,
          userName:
            null,
          telPhoneNum:
            null,
          positionStatusCodeValue: null,
          effectiveDt:
            null,
          expiryDt:
            null,
        },
        searchForm: {
          departId:
            null,
          departName:
            null,
          positionName:
            null,
          userName:
            null,
          telPhoneNum:
            null,
          positionStatusCodeValue: null,
          effectiveDt:
            null,
          expiryDt:
            null,
        }
        ,
        data: "",
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          departId:
            null,
          departName:
            null,
          positionName:
            null,
          userName:
            null,
          telPhoneNum:
            null,
          positionStatusCode:
            null,
          effectiveDt:
            null,
          expiryDt:
            null,
        }
      }
    },
    created() {
      let departId = this.$route.query.departId
      this.searchForm.departId = this.$route.query.departId
      this.params.departId = departId;
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
    mounted() {
      //this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList();

      commonApi.getCodeIntType("positionStatus").then(res => {
        let viewList = res.data.data || [];
        for (let positionStatusItem of viewList) {
          this.positionStatusCodeOptions.push({
            "label": positionStatusItem.codeDesc,
            "name": positionStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      titleClick(teacherId) {
        this.$detailDialog({
          title: "教师",
          url: `/user/teacherAd/${teacherId}`,
          items: [
            {
              key: "schoolName",
              name: "学校名"
            },
            {
              key: "userName",
              name: "教师"
            },
            {
              key: "telPhoneNum",
              name: "电话号码"
            },
            {
              key: "joinPartisanDt",
              name: "加入时间"
            },
            {
              key: "gender",
              name: "性别"
            },
            {
              key: "teachGradeName",
              name: "年级"
            },
            {
              key: "teachSegmentName",
              name: "学段"
            },
            {
              key: "teachSubjectName",
              name: "学科"
            }
          ]
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.positionId
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
      closeBox() {
        this.dialogFormVisible = false
        // this.getList()
      },
      //删除表格当前行
      rowDel(id) {
        this.dialogDelete = true;
        this.multipleSelection = [id];
      },
      //删除
      del() {
        if (this.multipleSelection.length == 0) {
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
        let opath = `/basedata/fenpeiOrgPosition?type=add&departId=${this.$route.query.departId}`;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = `/basedata/detailOrgPosition?type=edit&departId=${id}`;
        this.$router.push({path: opath})
      },
      toDetail(id) {

        let opath = `/basedata/detailOrgPosition?type=detail&departId=${id}`;
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
