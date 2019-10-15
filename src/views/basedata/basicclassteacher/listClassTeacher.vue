<template>
  <div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
          <el-form-item label="班级:">
            <el-input class="input-v2-rao" v-model="searchForm.className" maxlength="30"></el-input>
          </el-form-item>

          <el-form-item label="教师 :" prop="teacherName">
              <el-col :span="24">
                  <role-dialog :url="'/user/teacherAd/page'" ref="teacher" :type="'teacher'" :params="{page:1,limit:10}"  @callback="jsCallback">选择</role-dialog>
              </el-col>
          </el-form-item>
          <el-form-item label="科目:">
            <el-input class="input-v2-rao" v-model="searchForm.subjectName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="科任状态:">
            <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="searchForm.classTeacherStatusCode" placeholder="请您选择">
              <el-option v-for="classTeacherStatusCodeItem in classTeacherStatusCodeOptions"
                         :key="classTeacherStatusCodeItem.name"
                         :label="classTeacherStatusCodeItem.label" :value="classTeacherStatusCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级:">
            <el-input class="input-v2-rao" v-model="searchForm.gradeName" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="学年:">
            <el-input class="input-v2-rao" v-model="searchForm.schoolYear" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="学期:">
            <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="searchForm.schoolTerm" placeholder="请您选择">
                <el-option v-for="data in schoolTermOptions" :key="data.name"
                           :label="data.name" :value="data.label">
                </el-option>
              </el-select>
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
              <el-button type="primary" size="small" class="button-v2-rao bFA6557" @click="del">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
              </el-button>
              <el-button size="small" class="button-v2-rao border-color-cccccc c93BF88 bfff" @click="downEmpty" >下载表格模版
            </el-button>
              <el-button size="small" class="button-v2-rao border-color-cccccc c93BF88 bfff" @click="toImport" >导入表格
            </el-button>
            </div>
          </el-col>
        </el-row>

        <div class="text-center"  v-show="isInitEmpty">
          <div>
            您的学校还未创建【<span class="c93BF88">科任教师信息</span>】哦，点击“<span class="c93BF88">分配</span>”进行班级科任教师分配吧!
          </div>
          <div class="pt20">
            <el-button type="primary" size="small" class="button-v2-rao b93BF88" @click="addClassTeacher">
              创建
            </el-button>
          </div>
        </div>

        <div class="table" v-show="!isInitEmpty">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true" @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="className" label="班级" sortable="custom">
              <template slot-scope="scope">
                <div @click="classClick(scope.row.classId)">{{scope.row.className}}</div>
              </template>
            </el-table-column>
            <el-table-column prop="schoolName" label="学校" sortable="custom">
                <template slot-scope="scope">
                  <div @click="titleClick(scope.row.schoolId)">{{scope.row.schoolName}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="teacherName" label="教师" sortable="custom">
                <template slot-scope="scope">
                  <div @click="teacherClick(scope.row.teacherId)">{{scope.row.teacherName}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="subjectName" label="科目" sortable="custom"></el-table-column>
            <el-table-column label="科任状态">
              <template slot-scope="scope">
                <span>{{scope.row.classTeacherStatusCodeStr && scope.row.classTeacherStatusCodeStr.split(";")[0]}}</span>
              </template>
            </el-table-column>
            <el-table-column prop="gradeName" label="年级" sortable="custom"></el-table-column>
            <el-table-column prop="schoolYear" label="学年" sortable="custom"></el-table-column>
            <el-table-column prop="schoolTerm" label="学期" sortable="custom">
              <template slot-scope="scope">
                <span v-show="scope.row.schoolTerm == '1'">上学期</span>
                <span v-show="scope.row.schoolTerm == '2'">下学期</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="150" fixed="right">
              <template slot-scope="scope">

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                  <span slot="reference" @click.stop="toDetail(scope.row.classTeacherId)"><i class="iconfont icon-icon_chakan1 ml5 f20 c999999" ></i></span>
                </el-popover>
                <el-popover title="编辑" placement="top-start" popper-class="popover-v2-rao" trigger="hover"  >
                  <span slot="reference" @click.stop="toEdit(scope.row.classTeacherId)"> <i class="iconfont icon-icon_bianji ml5 f20 c999999" ></i></span>
                </el-popover>
                <el-popover placement="top-start" title="删除" popper-class="popover-v2-rao" trigger="hover">
                  <span slot="reference" @click.stop="rowDel(scope.row.classTeacherId)"><i class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right" v-show="data.records.length">
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
  import api from "./basicclassteacherUrl";
  import commonApi from "@/api/common/common";

  export default {
    data() {
      return {
        isInitEmpty:false,
        loadingType : "init",
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
        schoolTermOptions : [
          {
            "label": "请选择",
            "name": ""
          },
          {
            "label": "1",
            "name": "上学期"
          },
          {
            "label": "2",
            "name": "下学期"
          }
        ],
        classTeacherStatusCodeOptions: [{"label": "请选择", "name": ""}],
        classTeacherStatusCodeValue: null,
        form: {
          className:
            null,
          teacherName:
            null,
          subjectName:
            null,
          classTeacherStatusCodeValue: null,
          gradeName:
            null,
          schoolYear:
            null,
          schoolTerm:
            null,
        },
        searchForm: {
          className:
            null,
          teacherName:
            null,
          subjectName:
            null,
          classTeacherStatusCodeValue: null,
          gradeName:
            null,
          schoolYear:
            null,
          schoolTerm:
            null,
        }
        ,
        data: {},
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          className:
            null,
          teacherName:
            null,
          subjectName:
            null,
          classTeacherStatusCode:
            null,
          gradeName:
            null,
          schoolYear:
            null,
          schoolTerm:
            null,
        }
      }
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      },
      classId(){
        return this.$route.query.classId
      },
      gradeId(){
        return this.$route.query.gradeId
      }
    },
    created() {

      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
    },
    activated() {
      //只刷新数据，不改变整体的缓存
      console.log('重新活跃路由');
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.isLoaded = true;
      this.getList()
    },
    mounted() {
      this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList();

      commonApi.getCodeIntType("classTeacherStatus").then(res => {
        let viewList = res.data.data || [];
        for (let classTeacherStatusItem of viewList) {
          this.classTeacherStatusCodeOptions.push({
            "label": classTeacherStatusItem.codeDesc,
            "name": classTeacherStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      addClassTeacher(){

        let opath = `/basedata/listClassTeacher/addClassTeacher`;
        this.$router.push({path: opath})
      },
      downEmpty(){

      },
      toImport(){

      },
      teacherClick(teacherId){
          this.$detailDialog({
              title : "班主任",
              url : `/user/teacherAd/${teacherId}`,
              items : [
                {
                  key:"teacherNum",
                  name : "教师工号"
                },
                {
                  key:"teacherNationalUnityNum",
                  name : "教师统一编号"
                },
                {
                  key:"userName",
                  name : "姓名"
                },
                {
                  key:"userNameEn",
                  name : "英文姓名"
                },
                {
                  key:"userNameEn",
                  name : "姓名拼音"
                },
                {
                  key:"userNameBefore",
                  name : "曾用名"
                },
                {
                  key:"gender",
                  name : "性别"
                },
                {
                  key:"birthDt",
                  name : "出生日期"
                },
                {
                  key:"birthArea",
                  name : "出生地"
                },
                {
                  key:"placeOriginArea",
                  name : "籍贯"
                },
                {
                  key:"personNationCodeStr",
                  name : "民族"
                },
                {
                  key:"regionArea",
                  name : "国籍/地区"
                },
                {
                  key:"idCardTypeCodeStr",
                  name : "身份证件类型"
                },
                {
                  key:"idCardNum",
                  name : "身份证件号"
                },
                {
                  key:"idCardValidDt",
                  name : "身份证件有效期"
                },
                {
                  key:"politicalAffiliationCodeStr",
                  name : "政治面貌"
                },
                {
                  key:"joinPartisanDt",
                  name : "入党日期"
                },
                {
                  key:"bloodTypeCodeStr",
                  name : "血型"
                },
                {
                  key:"schoolName",
                  name : "所属学校"
                },
                {
                  key:"telPhoneNum",
                  name : "手机号码"
                },
                {
                  key:"contactPhoneNum",
                  name : "办公电话"
                },
                {
                  key:"contactAddress",
                  name : "办公地址"
                },
                {
                  key:"contactEmail",
                  name : "电子邮箱"
                },
                {
                  key:"qqNum",
                  name : "qq 号码"
                },
                {
                  key:"continueEducationNum",
                  name : "教师继续教育号"
                },
                {
                  key:"teachGradeName",
                  name : "年级"
                },
                {
                  key:"teachSegmentName",
                  name : "学段"
                },
                {
                  key:"teachSubjectName",
                  name : "学科"
                },

                {
                  key:"joinPartisanDt",
                  name : "入党日期"
                },
                {
                  key:"teacherStatusCodeStr",
                  name : "人员状态"
                },
                {
                  key:"teachStatusCodeStr",
                  name : "任教状态"
                }
              ]
          })
      },
      titleClick(schoolOrgId){
          this.$detailDialog({
              url : `/base/basicSchoolOrgAd/${schoolOrgId}`,
              items : [
                {
                  key:"areaNum",
                  name : "地区名称"
                },
                {
                  key:"schoolOrgNum",
                  name : "学校（机构）代码"
                },
                {
                  key:"postNum",
                  name : "邮政编码"
                },
                {
                  key:"schoolShortName",
                  name : "学校（机构）简称"
                },
                {
                  key:"contactName",
                  name : "联系人"
                },
                {
                  key:"schoolOrgNameEn",
                  name : "学校（机构）英文 名称"
                },
                {
                  key:"contactPhoneNum",
                  name : "联系电话"
                },
                {
                  key:"orgTypeCodeName",
                  name : "机构类型"
                },
                {
                  key:"contactFaxNum",
                  name : "传真电话"
                },
                {
                  key:"schoolAdminOrgName",
                  name : "学校主管部门"
                },
                {
                  key:"contactEmail",
                  name : "电子邮箱"
                },
                {
                  key:"schoolRunTypeCodeName",
                  name : "学校办学类型"
                },
                {
                  key:"webUrl",
                  name : "主页地址"
                },
                {
                  key:"orgAddress",
                  name : "学校（机构）地址"
                },
                {
                  key:"segmentName",
                  name : "学段"
                },
                {
                  key:"orgIntroduction",
                  name : "学校介绍"
                },
                {
                  key:"organizationNum",
                  name : "组织机构码"
                },
                {
                  key:"partyCommitteeLeader",
                  name : "党委负责人号"
                },
                {
                  key:"adminAreaNum",
                  name : "行政区划码"
                },
                {
                  key:"legalRepresentativeNum",
                  name : "法定代表人号"
                },
                {
                  key:"schoolAdminOrgNum",
                  name : "学校主管部门码"
                },
                {
                  key:"legalPersonCertificateNum",
                  name : "法人证书号"
                },
                {
                  key:"schoolSinceYear",
                  name : "建校年月"
                },
                {
                  key:"principalTeacherNum",
                  name : "校长工号"
                },
                {
                  key:"schoolCelebrateDay",
                  name : "校庆日"
                },
                {
                  key:"principalTeacherName",
                  name : "校长姓名"
                }
              ]
          })
      },
      classClick(classId){
          this.$detailDialog({
              title : "班级",
              url : `/base/classInfoAd/${classId}`,
              items : [
                {
                  key:"schoolName",
                  name : "学校名"
                },
                {
                  key:"gradeName",
                  name : "年级"
                },
                {
                  key:"classNum",
                  name : "班号"
                },
                {
                  key:"classTypeCodeStr",
                  name : "班级类型"
                },
                {
                  key:"segmentName",
                  name : "所属学段"
                },
                {
                  key:"gradeName",
                  name : "所属年级"
                },
                {
                  key:"className",
                  name : "班级名称"
                },
                {
                  key:"graduatedSchoolYear",
                  name : "毕业年份"
                },
                {
                  key:"classMasterTeacherName",
                  name : "班主任"
                }
              ]
          })
      },
      jsCallback(event){
            this.searchForm.teacherName = event.userName;
        },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.classTeacherId
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
          if(this.loadingType == "init" && !this.data.records.length){
            this.isInitEmpty = true;
          }else{
            this.isInitEmpty = false;
          }


          this.isLoaded = false;
        }, res => {
          this.$message.error(res.message);
        });
      },
      search() {
        this.loadingType = "search"
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
        let opath = `/basedata/detailClassTeacher?type=add&classId=${this.classId}&gradeId=${this.gradeId}`;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = `/basedata/detailClassTeacher?type=edit&classId=${id}&gradeId=${this.gradeId}`;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = `/basedata/detailClassTeacher?type=detail&classId=${id}&gradeId=${this.gradeId}`;
        this.$router.push({path: opath})
      },
      getclassTeacherStatusCodeStr(row) {
        return row.classTeacherStatusCodeStr;
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
