

                                          
<template>
  <div class="SchoolStudentBodyabnormal">
    <el-container
      v-loading="isLoaded"
      element-loading-custom-class="home-loading"
      style="min-height: 600px"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.1)"
    >
      <el-header style="height: auto">
        <el-form
          ref="searchForm"
          :model="searchForm"
          :inline="true"
          size="small"
          class="select-form"
        >
          <el-form-item label="异常情况:" prop="title" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.title" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="身体异常类型:" prop="bodyabnormalTypeCode" class="w140">
            <el-select
              class="select-v2-rao"
              v-model="searchForm.bodyabnormalTypeCode"
              placeholder="请您选择"
            >
              <el-option
                v-for="bodyabnormalTypeCodeItem in bodyabnormalTypeCodeOptions"
                :key="bodyabnormalTypeCodeItem.name"
                :label="bodyabnormalTypeCodeItem.label"
                :value="bodyabnormalTypeCodeItem.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="学生:" prop="studentName" class="w140">
            <el-input class="input-v2-rao" v-model="searchForm.studentName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="已无异常:" prop="isClosed" class="w140">
            <el-select class="select-v2-rao" v-model="searchForm.isClosed" placeholder="请您选择">
              <el-option
                v-for="isClosedItem in ynOptions"
                :key="isClosedItem.name"
                :label="isClosedItem.label"
                :value="isClosedItem.name"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <el-button
              type="primary"
              @click="resetForm('searchForm')"
              class="button-v2-rao b93BF88"
            >重置</el-button>
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
                <span class="c707070">
                  已选择
                  <span class="bold c93BF88">{{multipleSelection.length}}</span>项
                </span>
              </div>
              <div>
                <span class="c707070">
                  共搜索到
                  <span class="bold c93BF88">{{data.total}}</span>条数据
                </span>
                <i class="iconfont icon-icon_shuju" @click="toTotal" style="color: #93BF88;"></i>
              </div>
            </div>
            <el-button type="primary" size="small" class="button-v2-rao b93BF88" @click="toAdd">
              <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
            </el-button>
            <el-button
              type="primary"
              size="small"
              class="button-v2-rao bFA6557"
              @click="toDel"
              :disabled="!multipleSelection.length > 0"
            >
              <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
            </el-button>
          </el-col>
        </el-row>

        <div class="table">
          <el-table
            :data="data.records"
            tooltip-effect="dark"
            style="width: 100%"
            border
            @selection-change="handleSelectionChange"
            class="table-v2-rao"
            ref="schooltable"
            header-row-class-name="table-header-v2-rao"
            :stripe="true"
            @sort-change="sortChange"
          >
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="title" align="center" label="异常情况" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.title" class="one-line">{{scope.row.title}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!-- 异常情况 colName:title sqlType:VARCHAR notnull:false -->
            <el-table-column prop="imagePath" align="center" label="图片">
              <template slot-scope="scope">
                <div v-if="scope.row.imagePath">
                  <img :src="scope.row.imagePath" alt height="100px" class="scope-img" />
                </div>
                <div v-if="!scope.row.imagePath">无</div>
              </template>
            </el-table-column>
            <!-- 图片 colName:image_path sqlType:VARCHAR notnull:false -->
            <el-table-column
              prop="bodyabnormalTypeCode"
              label="身体异常类型"
              align="center"
              sortable="custom"
              min-width="100"
            >
              <template slot-scope="scope">
                <bodyabnormalType :message=scope.row />
                <!-- <div v-if="scope.row.bodyabnormalTypeCodeStr">
                  <span
                    :style="{color:scope.row.bodyabnormalTypeCodeStr.split(',')[0].split(';')[1]}"
                    v-if="scope.row.bodyabnormalTypeCodeStr"
                  >{{scope.row.bodyabnormalTypeCodeStr.split(',')[0].split(';')[0]}}</span>
                  <span
                    :style="{color:scope.row.bodyabnormalTypeCodeStr.split(',')[1].split(';')[1]}"
                    v-if="scope.row.bodyabnormalTypeCodeStr.split(',')[1]"
                  >{{scope.row.bodyabnormalTypeCodeStr.split(',')[1].split(';')[0]}}</span>
                  <span
                    :style="{color:scope.row.bodyabnormalTypeCodeStr.split(',')[2].split(';')[1]}"
                    v-if="scope.row.bodyabnormalTypeCodeStr.split(',')[2]"
                  >{{scope.row.bodyabnormalTypeCodeStr.split(',')[2].split(';')[0]}}</span>
                </div>
                <span v-else>无</span> -->
              </template>
            </el-table-column>
            <!-- 身体异常类型 colName:bodyabnormal_type_code sqlType:VARCHAR notnull:false -->
            <el-table-column prop="studentName" align="center" label="学生" sortable="custom">
              <template slot-scope="scope">
                <pictureView :message="scope.row" />
                <!-- <div v-if="scope.row.studentName" class="one-line">
                  <div class="img_place">
                    <el-popover placement="top-start" title trigger="hover">
                      <img :src="scope.row.studentUserPreviewVO.headPicture" alt="头像" style="width: 150px;height: 150px" />
                      <img slot="reference" :src="scope.row.studentUserPreviewVO.headPicture" alt class="img_size" />
                    </el-popover>
                    <img v-if="scope.row.studentUserPreviewVO.gender == 'F'" src="../../../assets/img/boy.png" alt class="sex_img" />
                    <img v-else src="../../../assets/img/girl.png" alt class="sex_img" />
                    <span class="font_set">{{scope.row.studentName}}</span>
                  </div>
                </div>
                <div v-else>无</div> -->
              </template>
            </el-table-column>
            <!-- 学生 colName:student_name sqlType:VARCHAR notnull:false -->
            <el-table-column prop="bodyabnormalDt" label="上报时间" align="center" sortable="custom"></el-table-column>
            <!-- 上报时间 colName:bodyabnormal_dt sqlType:TIMESTAMP notnull:false -->
            <el-table-column prop="isClosed" label="已无异常" align="center" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.isClosed == 'Y'" style="color:red;">无</div>
                <div v-else style="color:green;">有</div>
              </template>
            </el-table-column>
            <!-- 已无异常 colName:is_closed sqlType:VARCHAR notnull:false -->
            <el-table-column prop="userName" align="center" label="上报人" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.userName" class="one-line">{{scope.row.userName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!-- 上报人 colName:user_name sqlType:VARCHAR notnull:false -->
            <!-- <el-table-column prop="gradeName" align="center" label="年级" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.gradeName" class="one-line">{{scope.row.gradeName}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column> -->
            <!-- 年级 colName:grade_name sqlType:VARCHAR notnull:false -->
            <el-table-column prop="className" align="center" label="班级" sortable="custom">
              <template slot-scope="scope">
                <div v-if="scope.row.className" class="one-line">{{scope.row.className}}</div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <!-- 班级 colName:class_name sqlType:VARCHAR notnull:false -->
            <el-table-column label="操作" fixed="right" min-width="120">
              <template slot-scope="scope">
                <el-popover
                  placement="top-start"
                  popper-class="popover-v2-rao"
                  title="编辑"
                  trigger="hover"
                >
                  <span slot="reference" @click.stop="toEdit(scope.row.bodyabnormalId)">
                    <i class="iconfont icon-icon_bianji ml5 f20 c999999"></i>
                  </span>
                </el-popover>

                <el-popover
                  placement="top-start"
                  popper-class="popover-v2-rao"
                  title="查看"
                  trigger="hover"
                >
                  <span slot="reference" @click.stop="toDetail(scope.row.bodyabnormalId)">
                    <i class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i>
                  </span>
                </el-popover>
                <el-popover
                  placement="top-start"
                  popper-class="popover-v2-rao"
                  title="删除"
                  trigger="hover"
                >
                  <span slot="reference" @click.stop="rowDel(scope.row.bodyabnormalId)">
                    <i class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i>
                  </span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right">
        <el-pagination
          class="pagination-v2-rao"
          :page-sizes="[10,20,30]"
          :page-size="data.size"
          :total="data.total"
          :current-page="data.current"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
      <el-dialog title :visible.sync="dialogDelete" center width="22%">
        <div class="text-center">
          <i class="iconfont icon-icon_tc_shanchu_hong ml5 f30 cFA6557"></i>
          <p class="text-center fs-16 color333 mt-20">是否确认删除?</p>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            class="border-color-cccccc c000000 bfff"
            @click="dialogDeleteComfireHandler"
            :loading="isDel"
          >是</el-button>
          <el-button type="primary" class="b93BF88" @click="dialogDeleteCancelHandler">否</el-button>
        </div>
      </el-dialog>

      <!-- 提示信息 -->
      <div class="tips-school tips-rao" v-if="msgShow">
        <img src="~@/assets/img/icon-warning.png" width="20" />
        请至少选择一项内容!
      </div>
    </el-container>
  </div>
</template>

<script>
import api from "./schoolstudentbodyabnormalUrl";
import commonApi from "@/api/common/common";
import preview from "@/util/preview";
import pictureView from "./pictureView"
import bodyabnormalType from "./bodyabnormalType"
export default {
  directives: { preview },
  components:{
    pictureView
  },
  data() {
    return {
      isLoaded: true,
      dialogDelete: false,
      isDel: false,
      msgShow: false,
      bodyabnormalTypeCodeOptions: [{ label: "全部", name: "" }],
      ynOptions: [{ label: "全部", name: "" }],
      form: {
        title: null,
        bodyabnormalTypeCodeValue: null,
        studentName: null,
        ynValue: null
      },
      searchForm: {
        title: null,
        bodyabnormalTypeCode: null,
        studentName: null,
        isClosed: null
      },
      data: "",
      onSwitchStatus: true,
      offSwitchStatus: false,
      multipleSelection: [],
      params: {
        page: 1,
        limit: 10,
        title: null,
        bodyabnormalTypeCode: null,
        studentName: null,
        isClosed: null
      }
    };
  },
  computed: {
    indexMethod() {
      return this.params.limit * (this.params.page - 1) + 1;
    }
  },
  created() {
    let query = this.$route.query;
    for (let item in query) {
      this.params[item] = query[item];
    }
  },
  mounted() {
    this.getCurrentPage(this.$route.path, this.params);
    this.getList();

    commonApi.getCodeIntType("bodyabnormalType").then(
      res => {
        let viewList = res.data.data || [];
        for (let bodyabnormalTypeItem of viewList) {
          this.bodyabnormalTypeCodeOptions.push({
            label: bodyabnormalTypeItem.codeDesc,
            name: bodyabnormalTypeItem.codeId
          });
        }
      },
      res => {
        this.$message.error(res.data.message);
      }
    );
    commonApi.getCodeIntType("boolean_yn").then(
      res => {
        let viewList = res.data.data || [];
        for (let ynItem of viewList) {
          this.ynOptions.push({
            label: ynItem.codeDesc,
            name: ynItem.codeId
          });
        }
      },
      res => {
        this.$message.error(res.data.message);
      }
    );
  },
  methods: {
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    handleSelectionChange(val) {
      this.multipleSelection = val.map(item => {
        return item.bodyabnormalId;
      });
    },
    handleSizeChange(size) {
      this.params.limit = size;
      this.setCurrentPage(this.$route.path, this.params);
      this.isLoaded = true;
      this.getList();
    },
    handleCurrentChange(currentPage) {
      this.params.page = currentPage;
      this.setCurrentPage(this.$route.path, this.params);
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
      this.setCurrentPage(this.$route.path, this.params);
      this.isLoaded = true;
      this.getList();
    },
    getList() {
      api.fetchList(this.params).then(
        res => {
          this.data = res.data.data;
          this.isLoaded = false;
        },
        res => {
          this.$message.error(res.message);
        }
      );
    },

    search() {
      this.params.page = 1;
      for (let key in this.searchForm) {
        this.params[key] = this.searchForm[key];
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
        }, 800);
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
      });
      this.isDel = false;
    },
    dialogDeleteCancelHandler() {
      this.dialogDelete = false;
    },
    toAdd() {
      //safety safetyEdu basedata
      let opath = "/vueCloud/detailSchoolStudentBodyabnormal/add/" + 0;
      this.$router.push({ path: opath });
    },
    toTotal() {
      let opath = "/vueCloud/SchoolStudentBodyabnormalTotal";
      this.$router.push({ path: opath });
    },
    toEdit(id) {
      let opath = "/vueCloud/detailSchoolStudentBodyabnormal/edit/" + id;
      this.$router.push({ path: opath });
    },
    toDetail(id) {
      let opath = "/vueCloud/detailSchoolStudentBodyabnormal/detail/" + id;
      this.$router.push({ path: opath });
    }
  }
};
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
  background: #f0f0f0;
  border-radius: 5px;
  padding: 8px;
  font-size: 16px;
  line- img {
    vertical-align: -4px;
  }
}

</style>
