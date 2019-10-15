<template>
  <div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="安全教育组织:">
            <el-input v-model="searchForm.entityOrgId" class="input-v2-rao" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="安全教育类型:">
            <el-input v-model="searchForm.entityTypeName" class="input-v2-rao" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="教育内容:">
            <el-input v-model="searchForm.entityName" class="input-v2-rao" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="组织标题:">
            <el-input v-model="searchForm.organizedTitle" class="input-v2-rao" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="开始时间:">
            <el-date-picker v-model="searchForm.effectiveDt" type="date"
                            placeholder="选择日期" class="date-v2-rao" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
          </el-form-item>
          <el-form-item label="状态:" v-if="!isPush">
            <el-select v-model="searchForm.entityOrgStatusCode" placeholder="请您选择">
              <el-option v-for="entityOrgStatusCodeItem in entityOrgStatusCodeOptions"
                         :key="entityOrgStatusCodeItem.name"
                         :label="entityOrgStatusCodeItem.label" :value="entityOrgStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询
            </el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main class="pt-15">
        <el-row class="mb10">
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
              <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toAdd" v-if="!isPush">
                <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
              </el-button>
              <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="del" v-show="fixWidth==='200'">
                <i class="iconfont icon-icon_qiyong_bai f12 cfff"></i> 删除
              </el-button>

            </div>




          </el-col>
        </el-row>


        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" header-row-class-name="table-header-v2-rao" ref="schooltable" :stripe="true" @sort-change="sortChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
            <el-table-column prop="schoolName" label="学校" sortable="custom"></el-table-column>
            <el-table-column prop="entityTypeName" label="教育类型" sortable="custom" ></el-table-column>
            <el-table-column prop="organizedTitle" label="教育标题" sortable="custom"></el-table-column>

            <el-table-column prop="entityName" label="教育内容" sortable="custom" ></el-table-column>
            <el-table-column prop="entityOrgStatusCodeStr" label="组织状态" sortable="custom" v-if="!isPush">
              <template slot-scope="scope">
                <span v-if="scope.row.entityOrgStatusCodeStr" :style="{color:scope.row.entityOrgStatusCodeStr.split(';')[1]}">{{scope.row.entityOrgStatusCodeStr.split(';')[0]}}</span>
              </template>
            </el-table-column>
            <!--<el-table-column prop="organizedTitle" label="组织标题" sortable="custom" width="200"></el-table-column>-->

            <el-table-column prop="organizedDt" label="组织时间" sortable="custom"
                             width="200"></el-table-column>
            <el-table-column label="操作" fixed="right"  :width="fixWidth">
              <template slot-scope="scope">
                <el-button size="small" class="el-button--small-icon " v-if="!isPush" :disabled="scope.row.entityOrgStatusCode !== 'editing'" type="primary"  @click="pushEntity(scope.row)">发布</el-button>
                <el-button size="small" v-if="!isPush" :disabled="scope.row.entityOrgStatusCode === 'opening'" type="primary" class="tableEditButton el-button--small-icon" @click.stop="toEdit(scope.row.entityOrgId)">编辑</el-button>
                <el-button size="small" class="el-button--small-icon "  type="primary" @click.stop="toDetail(scope.row.entityOrgId)">详情</el-button>
                <el-button size="small" class="el-button--small-icon " type="danger"  :disabled="scope.row.entityOrgStatusCode === 'opening'" @click.stop="rowDel(scope.row.entityOrgId)">删除</el-button>
                <el-button size="small" class="el-button--small-icon " v-if="!isPush" type="primary" @click.stop="toRange(scope.row.entityOrgId)"  >组织范围</el-button>
                <el-button size="small" class="el-button--small-icon " v-if="!isPush" type="primary" @click.stop="toObject(scope.row.entityOrgId)" >组织对象</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right">
        <el-pagination background :page-sizes="[10,20,30]" :page-size="data.size" :total="data.total"
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
  import api from "./entityorganizationUrl";
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
        entityOriginTypeCodeOptions: [{"label": "全部", "name": ""}],
        entityOriginTypeCodeValue: null,
        entityOrgStatusCodeOptions: [{"label": "全部", "name": ""}],
        entityOrgStatusCodeValue: null,
        fixWidth: '',
        form: {
          entityOrgId:
            null,
          entityTypeName:
            null,
          entityName:
            null,
          organizedTitle:
            null,
          effectiveDt:
            null,
          entityOrgStatusCode: null,
        },
        searchForm: {
          entityOrgId:
            null,
          entityTypeName:
            null,
          entityName:
            null,
          organizedTitle:
            null,
          effectiveDt:
            null,
          entityOrgStatusCode: null,
        }
        ,
        data: "",
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          entityOrgId:
            null,
          entityTypeName:
            null,
          entityName:
            null,
          organizedTitle:
            null,
          effectiveDt:
            null,
          entityOrgStatusCode:
            null,
        }
      }
    },
    computed:{
      isPush () {
        //已发布
        if(this.$route.params.type === 'opening') {
          this.params.entityOrgStatusCode = this.$route.params.type;
          this.fixWidth =  '200';
          this.getList();
          return true;
        }else{ //全部
          this.fixWidth =  '480';
          this.params.entityOrgStatusCode = null;
          this.getList();
          return false
        }
      }
    },
    mounted() {
      this.getCurrentPage(this.$route.fullPath, this.params)


      commonApi.getCodeIntType("entityOriginType").then(res => {
        let viewList = res.data.data || [];
        for (let entityOriginTypeItem of viewList) {
          this.entityOriginTypeCodeOptions.push({
            "label": entityOriginTypeItem.codeDesc,
            "name": entityOriginTypeItem.codeId
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
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.entityOrgId
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
          if (res.data.resultCode === '000000') {
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
              if (res.data.resultCode === '000000') {
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
        let opath = '/safety/detailEntityOrganization/add/' + 0;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/safety/detailEntityOrganization/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/safety/detailEntityOrganization/detail/' + id;
        this.$router.push({path: opath})
      },
      pushEntity(item) {
        let obj = {
          entityOrgId :item.entityOrgId,
          entityOrgStatusCode :'opening',
        }

        api.putStatusObj(obj).then(res => {
          if (res.data.resultCode !== "000000") {
            this.$message.error(res.data.message);
          }else{
            this.$message.success('发布成功!');
            this.getList();
          }
        }, res => {
          this.$message.error(res.message);
        });
      },
      toRange(id) {
        let opath = '/safety/listEntityOrganizationRange/' + id;
        this.$router.push({path: opath})
      },
      toObject(id) {
        let opath = '/safety/listEntityOrganizationObject/' + id;
        this.$router.push({path: opath})
      },

      getorganizedDtStr(row) {
        return row.organizedDtStr;
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
