<template>
  <div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"

                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="教师工号:">
            <el-input class="input-v2-rao" v-model="searchForm.teacherNum" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input class="input-v2-rao" v-model="searchForm.userName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="英文姓名:">
            <el-input class="input-v2-rao" v-model="searchForm.userNameEn" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="性别:">
            <!--<el-input v-model="searchForm.gender" maxlength="30"></el-input>-->
            <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="searchForm.gender"
                       placeholder="请您选择">
              <el-option v-for="item in genderOptions"
                         :key="item.name"
                         :label="item.label" :value="item.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="人员状态:">
            <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="searchForm.teacherStatusCode"
                       placeholder="请您选择">
              <el-option v-for="teacherStatusCodeItem in teacherStatusCodeOptions"
                         :key="teacherStatusCodeItem.name"
                         :label="teacherStatusCodeItem.label" :value="teacherStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询
            </el-button>

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
              <el-button size="small" class="button-v2-rao border-color-cccccc c93BF88 bfff" @click="downEmpty">下载表格模版
              </el-button>
              <el-button size="small" class="button-v2-rao border-color-cccccc c93BF88 bfff" @click="toImport">导入表格
              </el-button>
            </div>
          </el-col>
        </el-row>

        <div class="table">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" header-row-class-name="table-header-v2-rao" ref="schooltable" :stripe="true"
                    @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="teacherNum" label="教师工号" sortable="custom" width="200">
              <template slot-scope="scope">
                <div @click="titleClick(scope.row.teacherId)">{{scope.row.teacherNum}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="姓名" sortable="custom" width="200">
              <template slot-scope="scope">
                <div @click="titleClick(scope.row.teacherId)">{{scope.row.userName}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="userNameEn" label="英文姓名" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.userNameEn">{{scope.row.userNameEn}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="gender" label="性别" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-show="scope.row.gender == 'M'">男</span>
                <span v-show="scope.row.gender == 'F'">女</span>
              </template>
            </el-table-column>
            <el-table-column prop="birthDt" label="出生日期" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.birthDt">{{scope.row.birthDt}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>

            <el-table-column label="人员状态" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.teacherStatusCodeStr">{{scope.row.teacherStatusCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                  <span slot="reference" @click.stop="toDetail(scope.row.teacherId)"><i
                    class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover title="编辑" placement="top-start" popper-class="popover-v2-rao" trigger="hover">
                  <span slot="reference" @click.stop="toEdit(scope.row.teacherId)"> <i
                    class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" title="删除" popper-class="popover-v2-rao" trigger="hover">
                  <span slot="reference" @click.stop="rowDel(scope.row.teacherId)"><i
                    class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right">
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
  import api from "./basicteacherUrl";
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
        genderOptions: [{"label": "请选择", "name": ""}],
        personNationCodeOptions: [{"label": "请选择", "name": ""}],
        personNationCodeValue: null,
        idCardTypeCodeOptions: [{"label": "请选择", "name": ""}],
        idCardTypeCodeValue: null,
        politicalAffiliationCodeOptions: [{"label": "请选择", "name": ""}],
        politicalAffiliationCodeValue: null,
        healthCodeOptions: [{"label": "请选择", "name": ""}],
        healthCodeValue: null,
        religionCodeOptions: [{"label": "请选择", "name": ""}],
        religionCodeValue: null,
        bloodTypeCodeOptions: [{"label": "请选择", "name": ""}],
        bloodTypeCodeValue: null,
        teachStatusCodeOptions: [{"label": "请选择", "name": ""}],
        teachStatusCodeValue: null,
        teacherStatusCodeOptions: [{"label": "请选择", "name": ""}],
        teacherStatusCodeValue: null,
        form: {
          teacherNum:
            null,
          userName:
            null,
          userNameEn:
            null,
          gender:
            null,
          teacherStatusCodeValue: null,
        },
        searchForm: {
          teacherNum:
            null,
          userName:
            null,
          userNameEn:
            null,
          gender:
            null,
          teacherStatusCodeValue: null,
        }
        ,
        data: "",
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          teacherNum:
            null,
          userName:
            null,
          userNameEn:
            null,
          gender:
            null,
          teacherStatusCode:
            null,
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
      console.log('重新活跃路由');
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.getList()
    },
    created() {
      let schoolId = this.$route.query.schoolOrgId;
      let classId = this.$route.query.classId;
      this.params.schoolId = schoolId;
      this.params.classId = classId;
      this.getList();
    },
    mounted() {
      //this.getCurrentPage(this.$route.fullPath, this.params)


      commonApi.getCodeIntType("gender").then(res => {
        let viewList = res.data.data || [];
        for (let item of viewList) {
          this.genderOptions.push({
            "label": item.codeDesc,
            "name": item.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });

      commonApi.getCodeIntType("personNation").then(res => {
        let viewList = res.data.data || [];
        for (let personNationItem of viewList) {
          this.personNationCodeOptions.push({
            "label": personNationItem.codeDesc,
            "name": personNationItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("idCardType").then(res => {
        let viewList = res.data.data || [];
        for (let idCardTypeItem of viewList) {
          this.idCardTypeCodeOptions.push({
            "label": idCardTypeItem.codeDesc,
            "name": idCardTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("politicalAffiliation").then(res => {
        let viewList = res.data.data || [];
        for (let politicalAffiliationItem of viewList) {
          this.politicalAffiliationCodeOptions.push({
            "label": politicalAffiliationItem.codeDesc,
            "name": politicalAffiliationItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("health").then(res => {
        let viewList = res.data.data || [];
        for (let healthItem of viewList) {
          this.healthCodeOptions.push({
            "label": healthItem.codeDesc,
            "name": healthItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("religion").then(res => {
        let viewList = res.data.data || [];
        for (let religionItem of viewList) {
          this.religionCodeOptions.push({
            "label": religionItem.codeDesc,
            "name": religionItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("bloodType").then(res => {
        let viewList = res.data.data || [];
        for (let bloodTypeItem of viewList) {
          this.bloodTypeCodeOptions.push({
            "label": bloodTypeItem.codeDesc,
            "name": bloodTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("teachStatus").then(res => {
        let viewList = res.data.data || [];
        for (let teachStatusItem of viewList) {
          this.teachStatusCodeOptions.push({
            "label": teachStatusItem.codeDesc,
            "name": teachStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("teacherStatus").then(res => {
        let viewList = res.data.data || [];
        for (let teacherStatusItem of viewList) {
          this.teacherStatusCodeOptions.push({
            "label": teacherStatusItem.codeDesc,
            "name": teacherStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      titleClick(teacherId) {
        this.$detailDialog({
          title: "班主任",
          url: `/user/teacherAd/${teacherId}`,
          items: [
            {
              key: "teacherNum",
              name: "教师工号"
            },
            {
              key: "teacherNationalUnityNum",
              name: "教师统一编号"
            },
            {
              key: "userName",
              name: "姓名"
            },
            {
              key: "userNameEn",
              name: "英文姓名"
            },
            {
              key: "userNameEn",
              name: "姓名拼音"
            },
            {
              key: "userNameBefore",
              name: "曾用名"
            },
            {
              key: "gender",
              name: "性别"
            },
            {
              key: "birthDt",
              name: "出生日期"
            },
            {
              key: "birthArea",
              name: "出生地"
            },
            {
              key: "placeOriginArea",
              name: "籍贯"
            },
            {
              key: "personNationCodeStr",
              name: "民族"
            },
            {
              key: "regionArea",
              name: "国籍/地区"
            },
            {
              key: "idCardTypeCodeStr",
              name: "身份证件类型"
            },
            {
              key: "idCardNum",
              name: "身份证件号"
            },
            {
              key: "idCardValidDt",
              name: "身份证件有效期"
            },
            {
              key: "politicalAffiliationCodeStr",
              name: "政治面貌"
            },
            {
              key: "joinPartisanDt",
              name: "入党日期"
            },
            {
              key: "bloodTypeCodeStr",
              name: "血型"
            },
            {
              key: "schoolName",
              name: "所属学校"
            },
            {
              key: "telPhoneNum",
              name: "手机号码"
            },
            {
              key: "contactPhoneNum",
              name: "办公电话"
            },
            {
              key: "contactAddress",
              name: "办公地址"
            },
            {
              key: "contactEmail",
              name: "电子邮箱"
            },
            {
              key: "qqNum",
              name: "qq 号码"
            },
            {
              key: "continueEducationNum",
              name: "教师继续教育号"
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
            },

            {
              key: "joinPartisanDt",
              name: "入党日期"
            },
            {
              key: "teacherStatusCodeStr",
              name: "人员状态"
            },
            {
              key: "teachStatusCodeStr",
              name: "任教状态"
            }
          ]
        })
      },
      downEmpty() {
        window.location.href = "/static/excel/教师数据导入.xls";
      },
      toImport() {
        this.$router.push({
          name: 'importFile', query: {
            roleType: "teacher"
          }
        })
      },
      importCallback() {
      },
      beforeUpload() {
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.teacherId
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
        let opath = '/basedata/detailTeacher/add/' + 0;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/basedata/detailTeacher/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/basedata/detailTeacher/detail/' + id;
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
