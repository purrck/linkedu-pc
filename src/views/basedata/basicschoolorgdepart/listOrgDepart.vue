<template>
  <div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="部门名称:">
            <el-input v-model="searchForm.departName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
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
            <!--<div>
              <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toAdd">
                <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
              </el-button>
              <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="del">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
              </el-button>
            </div>-->
          </el-col>

        </el-row>

        <div class="text-center" v-show="!data.records.length">
          <div>
            您的学校还未创建【<span class="c93BF88">部门信息</span>】哦，请点击“<span class="c93BF88">设置</span>”进行部门信息添加吧!
          </div>
          <div class="pt20">
            <el-button type="primary" size="small" class="button-v2-rao b93BF88" @click="addOrgDepart">
              设置
            </el-button>
          </div>
        </div>


        <div class="table" v-show="data.records.length">
          <el-table :data="data.records"
                    style="width: 100%"
                    border
                    row-key="departId"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <!--<el-table-column type="index" label="序号" width="55" align="center"></el-table-column>-->

            <el-table-column prop="departName" label="部门名称" sortable="custom" align="center">
              <template slot-scope="scope">
                <div @click="titleClick(scope.row.departId)">{{scope.row.departName}}</div>
              </template>
            </el-table-column>
            <!--<el-table-column prop="parentName" label="上级部门" sortable="custom" width="200"></el-table-column>-->
            <!--<el-table-column label="部门状态">-->
            <!--<template slot-scope="scope">-->
            <!--<span :class="scope.row.departStatusCode" :style="{color:scope.row.departStatusCodeStr.split(';')[1]}">{{scope.row.departStatusCodeStr.split(';')[0]}}</span>-->
            <!--</template>-->
            <!--</el-table-column>-->
            <el-table-column label="" type="expand">
              <template slot-scope="props">
                <el-table :data="props.row.children"  v-show="props.row.children.length"  style="width: 100%" border label-position="left"  class="demo-table-expand table-v2-rao" header-row-class-name="table-header-v2-rao">
                  <el-table-column prop="positionName" label="职位" align="center"></el-table-column>
                  <el-table-column prop="userName" label="姓名" align="center" ></el-table-column>
                  <el-table-column prop="telPhoneNum" label="手机号" align="center"></el-table-column>
                  <el-table-column label="操作" width="120" fixed="right">
                    <template slot-scope="scope">
                      <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                        <span slot="reference" @click.stop="toDetail2(scope.row.positionId)"><i class="iconfont icon-icon_chakan1 ml5 f20 c999999" ></i></span>
                      </el-popover>
                      <el-popover title="编辑" placement="top-start" popper-class="popover-v2-rao" trigger="hover"  >
                        <span slot="reference" @click.stop="toEdit2(scope.row.positionId)"> <i class="iconfont icon-icon_bianji ml5 f20 c999999" ></i></span>
                      </el-popover>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="text-center" v-show="!props.row.children.length">
                  <div>
                    您的学校还未创建【<span class="c93BF88">{{props.row.departName}}部门人员信息</span>】哦，请点击“<span class="c93BF88">设置</span>”进行部门人员信息添加吧!
                  </div>
                  <div class="pt20">
                    <el-button type="primary" size="small" class="button-v2-rao b93BF88" @click="toAdd(props.row.departId)">
                      设置
                    </el-button>
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="120" fixed="right">
              <template slot-scope="scope">

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="添加" trigger="hover">
                  <span slot="reference" @click.stop="toAdd(scope.row.departId)"><i
                    class="iconfont icon-icon_xinjian ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="相关查看" trigger="hover">
                  <span slot="reference" @click.stop="toDetail(scope.row.departId)"><i
                    class="iconfont icon-icon_tuichu_p ml5 f20 c999999"></i></span>
                </el-popover>
                <!--<el-popover title="编辑" placement="top-start" popper-class="popover-v2-rao" trigger="hover"  >
                  <span slot="reference" @click.stop="toEdit(scope.row.departId)"> <i class="iconfont icon-icon_bianji ml5 f20 c999999" ></i></span>
                </el-popover>
                <el-popover placement="top-start" title="删除" popper-class="popover-v2-rao" trigger="hover">
                  <span slot="reference" @click.stop="rowDel(scope.row.departId)"><i class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right" v-show="data.records.length">
        <el-pagination class="pagination-v2-rao" popper-class="pagination-popper-v2-rao" :page-sizes="[10,20,30]"
                       :page-size="data.size" :total="data.total"
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
  import api from "./basicschoolorgdepartUrl";
  import apiPst from "../basicschoolorgposition/basicschoolorgpositionUrl";
  import commonApi from "@/api/common/common";
  import {mapGetters} from 'vuex';

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
        childList: [],
        mainList: [],
        textMap: {
          update: '编辑',
          detail: '详情',
          create: '创建'
        },
        departStatusCodeOptions: [{"label": "全部", "name": ""}],
        departStatusCodeValue: null,
        form: {
          departId:
            null,
          departName:
            null,
          parentName:
            null,
        },
        searchForm: {
          departId:
            null,
          departName:
            null,
          parentName:
            null,
        }
        ,
        data: {
          records: []
        },
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          departId:
            null,
          departName:
            null,
          parentName:
            null,
        }
      }
    },
    created() {
      let schoolId = this.$route.query.schoolOrgId;
      this.params.schoolOrgId = schoolId;
    },
    computed: {
      ...mapGetters(['schoolId'])
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
      this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList();

      commonApi.getCodeIntType("departStatus").then(res => {
        let viewList = res.data.data || [];
        for (let departStatusItem of viewList) {
          this.departStatusCodeOptions.push({
            "label": departStatusItem.codeDesc,
            "name": departStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      addOrgDepart() {
        let opath = `/basedata/addOrgDepart/`;
        this.$router.push({path: opath})
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.departId
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
        apiPst.fetchList({page: 1, limit: 999}).then(res => {
          this.childList = res.data.data.records
        }).then(res => {
          api.fetchList(this.params).then(res => {
            if (res.data.data.records.length) {
              let resD = res.data.data
              for (let i of resD.records) {
                let children = [];
                let hasChildren = false;
                for (let j of this.childList) {
                  i.hasChildren = false;
                  if (i.departId === j.departId) {
                    children.push(j)
                    hasChildren = true
                  }
                  i.children = children;
                  i.hasChildren = true;
                }
              }
            }
            // debugger
            console.log(res.data.data)
            this.data = res.data.data;
            this.isLoaded = false;
          }, res => {
            this.$message.error(res.message);
          });
        })

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
      titleClick(departId) {
        this.$detailDialog({
          title: "部门",
          url: `/base/orgDepartAd/${departId}`,
          items: [
            {
              key: "departName",
              name: "部门名称"
            },
            {
              key: "parentName",
              name: "上级部门"
            },
            {
              key: "departStatusCodeStr",
              name: "部门状态"
            },
            {
              key: "description",
              name: "描述"
            }
          ]
        })
      },

      toAdd(departId) {
        let opath = `/basedata/fenpeiOrgPosition?type=add&departId=${departId}`;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/basedata/detailOrgDepart/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = `/basedata/listOrgPosition?departId=${id}`
        this.$router.push({path: opath})
      },
      toEdit2(id) {
        let opath = `/basedata/detailOrgPosition?type=edit&departId=${id}`;
        this.$router.push({path: opath})
      },
      toDetail2(id) {
        let opath = `/basedata/detailOrgPosition?type=detail&departId=${id}`;
        this.$router.push({path: opath})
      },
      getdepartStatusCodeStr(row) {
        return row.departStatusCodeStr;
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
