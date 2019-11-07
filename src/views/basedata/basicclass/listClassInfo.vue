  <template>
  <div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
          <el-form-item>
            <el-form-item label="学段名称:" class="w140">
              <el-input class="input-v2-rao" v-model="searchForm.segmentName" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="年级名称:" class="w140">
              <el-input class="input-v2-rao" v-model="searchForm.gradeName" maxlength="30"></el-input>
            </el-form-item>
            <el-form-item label="班级名称:" class="w140">
              <el-input class="input-v2-rao" v-model="searchForm.className" maxlength="30"></el-input>
            </el-form-item>

            <el-form-item label="班级类型 :" class="w140">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="searchForm.classTypeCode"
                         placeholder="请您选择">
                <el-option v-for="classTypeCodeItem in classTypeCodeOptions"
                           :key="classTypeCodeItem.name"
                           :label="classTypeCodeItem.label" :value="classTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>


            <el-form-item label="学制类型 :" class="w140">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao"
                         v-model="searchForm.lengthSchoolingCode" placeholder="请您选择">
                <el-option v-for="lengthSchoolingCodeItem in lengthSchoolingCodeOptions"
                           :key="lengthSchoolingCodeItem.name"
                           :label="lengthSchoolingCodeItem.label" :value="lengthSchoolingCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="班主任 :" prop="classMasterTeacherName" class="w280">
                <role-dialog :url="'/user/teacherAd/page'" ref="teacher" :type="'teacher'" :params="{page:1,limit:10}"
                             @callback="jsCallback">选择
                </role-dialog>
            </el-form-item>
            <el-form-item class="w140">
              <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            </el-form-item>
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
              <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 "
                         @click="toAdd">
                <i class="iconfont icon-icon_xinjian f12 cfff"></i> 新增
              </el-button>
              <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557 " @click="del">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
              </el-button>
              <!--<el-button size="small" class="button-v2-rao border-color-cccccc c93BF88 bfff" @click="downEmpty" >下载表格模版
            </el-button>
              <el-button size="small" class="button-v2-rao border-color-cccccc c93BF88 bfff" @click="toImport" >导入表格
            </el-button>-->
            </div>
          </el-col>
        </el-row>

        <div class="text-center" v-show="isInitEmpty">
          <div>
            您的学校还未创建【<span class="c93BF88">班级信息</span>】哦，点击“<span class="c93BF88">创建</span>”进行班级信息添加吧!
          </div>
          <div class="pt20">
            <el-button type="primary" size="small" class="button-v2-rao b93BF88" @click="addClass">
              创建
            </el-button>
          </div>
        </div>

        <div class="table" v-show="!isInitEmpty">
          <el-table :data="data.records" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                    @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>

            <el-table-column prop="className" label="班级名称" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.className" @click="titleClick(scope.row.classId)">{{scope.row.className}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>

            <el-table-column prop="segmentName" label="所属学段" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.segmentName">{{scope.row.segmentName}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="gradeName" label="所属年级" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.gradeName">{{scope.row.gradeName}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column label="班级类型" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.classTypeCodeStr" :style="{color:scope.row.classTypeCodeStr.split(';')[1]}">{{scope.row.classTypeCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column label="学制类型" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.lengthSchoolingCodeStr"
                      :style="{color:scope.row.lengthSchoolingCodeStr.split(';')[1]}">{{scope.row.lengthSchoolingCodeStr.split(';')[0]}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>


            <el-table-column prop="entranceSchoolYear" label="入学年份" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.entranceSchoolYear">{{scope.row.entranceSchoolYear}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="graduatedSchoolYear" label="毕业年份" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.graduatedSchoolYear">{{scope.row.graduatedSchoolYear}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="classMasterTeacherName" label="班主任" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.classMasterTeacherName" @click="masterClick(scope.row.classMasterTeacherId)">{{scope.row.classMasterTeacherName}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="320" fixed="right">
              <template slot-scope="scope">

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" tri  gger="hover">
                  <span slot="reference" @click.stop="toDetail(scope.row.classId)"><i
                    class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover title="编辑" placement="top-start" popper-class="popover-v2-rao" trigger="hover">
                  <span slot="reference" @click.stop="toEdit(scope.row.classId)"> <i
                    class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
                </el-popover>
                <!--<el-popover placement="top-start" title="删除" popper-class="popover-v2-rao" trigger="hover">-->
                  <!--<span slot="reference" @click.stop="rowDel(scope.row.classId)"><i-->
                    <!--class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>-->
                <!--</el-popover>-->
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="班级文件" trigger="hover">
                  <span slot="reference"
                        @click.stop="toFlieCilent(scope.row.classId ,`WebTologin`)"><i
                    class="iconfont icon-icon_yingyonganzhuangyonghu ml5 f20 c999999"></i></span>
                </el-popover>
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="班委" trigger="hover">
                  <span slot="reference"
                        @click.stop="toAnother(scope.row.classId ,`listClassCommitteeMember`)"><i
                    class="iconfont icon-icon_yingyongguanlianwenan ml5 f20 c999999"></i></span>
                </el-popover>
                <!--<el-popover placement="top-start" popper-class="popover-v2-rao" title="家委会" trigger="hover">-->
                  <!--<span slot="reference"-->
                        <!--@click.stop="toAnother(scope.row.classId ,`listClassParentCommitteeMember`)"><i-->
                    <!--class="iconfont icon-icon_yingyongbanben ml5 f20 c999999"></i></span>-->
                <!--</el-popover>-->
                <!--<el-popover placement="top-start" popper-class="popover-v2-rao" title="家访" trigger="hover">-->
                  <!--<span slot="reference"-->
                        <!--@click.stop="toAnother(scope.row.classId ,`listStudentFamilyVisit`)"><i-->
                    <!--class="iconfont icon-icon_yingyongtuji ml5 f20 c999999"></i></span>-->
                <!--</el-popover>-->
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="班级学生" trigger="hover">
                  <span slot="reference"
                        @click.stop="toAnother2(scope.row.classId ,`listStudent`)"><i
                    class="iconfont icon-icon_gerenziliao_p ml5 f20 c999999"></i></span>
                </el-popover>
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

      <el-dialog
        title="选择您要添加的班级信息"
        :visible.sync="dialogVisible"
        width="70%">
        <el-col :span="14">
          <div v-for="(data1,index) in getSementGrade" :key="index">
            <p>{{data1.name}}</p>
            <el-row v-for="(data,index) in data1.children" :key="index">
              <el-col :span="5">
                <el-form ref="form" label-width="80px">
                  <el-form-item label="年级:">
                    {{data.name}}
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="6">
                <el-form ref="form" label-width="80px">
                  <el-form-item label="班级数量:">
                    <el-select v-model="data.number" size="mini" placeholder="请您选择" @change="addClassNum(data)">
                      <el-option v-for="item in classNumberList"
                                 :key="item.name"
                                 :label="item.name" :value="item.value">
                      </el-option>
                    </el-select>
                    <!--<el-input class="input-v2-rao" v-model="data[data.vmodel]" @change="addClassNum" size="mini"></el-input>-->
                  </el-form-item>
                </el-form>
              </el-col>
              <el-col :span="6">
                <el-form ref="form" label-width="80px">
                  <el-form-item label="入学年份:">
                    <el-date-picker
                      type="year"
                      placeholder="选择年" size="mini" value-format="yyyy" v-model="data.year" @change="addClassNum(data)">
                    </el-date-picker>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="table mt10">
            <el-table :data="classList" tooltip-effect="dark" style="width: 100%" border
                      @selection-change="handleSelectionChange"
                      class="table-v2-rao" ref="schooltable" header-row-class-name="table-header-v2-rao" :stripe="true"
                      @sort-change="sortChange">
              <el-table-column prop="className" align="center" label="班级名称"></el-table-column>
              <el-table-column prop="classId" align="center" label="班级编号"></el-table-column>

            </el-table>
            <div class="text-right mt10">
              <el-button type="primary" size="mini" @click="fenpei" class="button-v2-rao b93BF88">分配班主任</el-button>
            </div>
          </div>
        </el-col>
        <div class="clearfix"></div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="confirm" class="button-v2-rao b93BF88">确 定</el-button>
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
  import api from "./basicclassUrl";
  import commonApi from "@/api/common/common";
  import {mapGetters} from 'vuex';
  import {getStore, setStore} from '@/util/store'
  import {
    getToken
  } from '@/util/auth'
  export default {
    data() {
      return {
        loadingType: "init",
        isInitEmpty: false,
        classNumberList: [],
        classModels: {},
        ruleOptionsValue: "",
        ruleOptions: [
          {
            value: "1",
            label: "数字"
          },
          {
            value: "2",
            label: "(*)"
          },
          {
            value: "1",
            label: "中文"
          }
        ],
        classList: [],
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
        classTypeCodeOptions: [{"label": "请选择", "name": ""}],
        classTypeCodeValue: null,
        lengthSchoolingCodeOptions: [{"label": "请选择", "name": ""}],
        lengthSchoolingCodeValue: null,
        form: {},
        searchForm: {
          classMasterTeacherName: ""
        }
        ,
        data: "",
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
        }
      }
    },
    computed: {
      ...mapGetters(['schoolInfo']),
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      },
      getSementGrade() {
        return this.$store.getters.getSementGrade;
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
      // console.log('重新活跃路由');
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.getList()
    },
    mounted() {

      this.getCurrentPage(this.$route.fullPath, this.params)
      this.getList();


      commonApi.getCodeIntType("classType").then(res => {
        let viewList = res.data.data || [];
        for (let classTypeItem of viewList) {
          this.classTypeCodeOptions.push({
            "label": classTypeItem.codeDesc,
            "name": classTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("lengthSchooling").then(res => {
        let viewList = res.data.data || [];
        for (let lengthSchoolingItem of viewList) {
          this.lengthSchoolingCodeOptions.push({
            "label": lengthSchoolingItem.codeDesc,
            "name": lengthSchoolingItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      downEmpty() {
      },
      toImport() {
      },
      fenpei() {

      },
      confirm() {
        // console.log(this.getSementGrade);
        //this.dialogVisible = false
      },
      addClassNum(event) {
        if (!event.year) {
          this.$message.error("请选择年份");
          return;
        }
        if (!event.number) {
          this.$message.error("请选择数量");
          return;
        }
        this.classList = [];
        /*for(let i=0; i<event.number; i++){
              this.classList.push({
                className : `${event.name}${i+1}班`,
                classId : `${event.id}`
              })
        }*/
        this.getSementGrade.map(item => {
          item.children.map(item1 => {
            for (let i = 0; i < item1.number; i++) {
              this.classList.push({
                className: `${item1.name}${i + 1}班`,
                classId: `${item.id}0${item1.year}${item1.number}`
              })
            }

          })
        })

      },
      addClass() {
        //this.dialogVisible = true;
        let opath = `/basedata/classInitialize`;
        this.$router.push({path: opath})
      },
      jsCallback(event) {
        this.searchForm.classMasterTeacherName = event.userName;
      },
      masterClick(teacherId) {
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
      schoolClick(schoolOrgId) {
        this.$detailDialog({
          url: `/base/basicSchoolOrgAd/${schoolOrgId}`,
          items: [
            {
              key: "areaNum",
              name: "地区名称"
            },
            {
              key: "schoolOrgNum",
              name: "学校（机构）代码"
            },
            {
              key: "postNum",
              name: "邮政编码"
            },
            {
              key: "schoolShortName",
              name: "学校（机构）简称"
            },
            {
              key: "contactName",
              name: "联系人"
            },
            {
              key: "schoolOrgNameEn",
              name: "学校（机构）英文 名称"
            },
            {
              key: "contactPhoneNum",
              name: "联系电话"
            },
            {
              key: "orgTypeCodeName",
              name: "机构类型"
            },
            {
              key: "contactFaxNum",
              name: "传真电话"
            },
            {
              key: "schoolAdminOrgName",
              name: "学校主管部门"
            },
            {
              key: "contactEmail",
              name: "电子邮箱"
            },
            {
              key: "schoolRunTypeCodeName",
              name: "学校办学类型"
            },
            {
              key: "webUrl",
              name: "主页地址"
            },
            {
              key: "orgAddress",
              name: "学校（机构）地址"
            },
            {
              key: "segmentName",
              name: "学段"
            },
            {
              key: "orgIntroduction",
              name: "学校介绍"
            },
            {
              key: "organizationNum",
              name: "组织机构码"
            },
            {
              key: "partyCommitteeLeader",
              name: "党委负责人号"
            },
            {
              key: "adminAreaNum",
              name: "行政区划码"
            },
            {
              key: "legalRepresentativeNum",
              name: "法定代表人号"
            },
            {
              key: "schoolAdminOrgNum",
              name: "学校主管部门码"
            },
            {
              key: "legalPersonCertificateNum",
              name: "法人证书号"
            },
            {
              key: "schoolSinceYear",
              name: "建校年月"
            },
            {
              key: "principalTeacherNum",
              name: "校长工号"
            },
            {
              key: "schoolCelebrateDay",
              name: "校庆日"
            },
            {
              key: "principalTeacherName",
              name: "校长姓名"
            }
          ]
        })
      },
      titleClick(classId) {
        this.$detailDialog({
          title: "班级",
          url: `/base/classInfoAd/${classId}`,
          items: [
            {
              key: "schoolName",
              name: "学校名"
            },
            {
              key: "gradeName",
              name: "年级"
            },
            {
              key: "classNum",
              name: "班号"
            },
            {
              key: "classTypeCodeStr",
              name: "班级类型"
            },
            {
              key: "segmentName",
              name: "所属学段"
            },
            {
              key: "gradeName",
              name: "所属年级"
            },
            {
              key: "className",
              name: "班级名称"
            },
            {
              key: "graduatedSchoolYear",
              name: "毕业年份"
            },
            {
              key: "classMasterTeacherName",
              name: "班主任"
            }
          ]
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.classId
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
          if (this.loadingType == "init" && !this.data.records.length) {
            this.isInitEmpty = true;
          } else {
            this.isInitEmpty = false;
          }

          //this.data.records = [];
          this.isLoaded = false;
        }, res => {
          this.$message.error(res.message);
        });
      },
      search() {
        this.loadingType = "search"
        this.isInitEmpty = false;
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
        let opath = '/basedata/detailClassInfo/add/' + 0;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/basedata/detailClassInfo/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/basedata/detailClassInfo/detail/' + id;
        this.$router.push({path: opath})
      },
      toAnother(id, path) {
        let opath = '/homeSchLink/' + path + '?classId=' + id;
        this.$router.push({path: opath})
      },
      toAnother2(id, path) {
        let opath = '/basedata/' + path + '?classId=' + id;
        this.$router.push({path: opath})
      },
      toFlieCilent(id, path) {
        let userId =  getStore({name:'userInfo'}).id
        let username = getStore({name:'userInfo'}).username
        let b = 'http://192.168.2.60:3088';

        if(window.location.host == "47.106.35.119"){
          b = "http://47.106.35.119:5388"
        }
        //获取到班级老师的token
        let opath = b+'/#/' + path + '?classId=' + id+'&token='+ getToken() + '&userId=' + userId;

        //let opath = 'http://192.168.2.60:3088/#/' + path + '?classId=' + id+'&token='+ getToken() + '&userId=' + userId;
        //let opath = `http://192.168.2.194:9999/#/WebTologin?token=${getToken()}&userId=${userId}&username=${username}`
        // console.log(opath);
        window.open(opath,'_blank');
      },
      getclassTypeCodeStr(row) {
        return row.classTypeCodeStr;
      },
      getlengthSchoolingCodeStr(row) {
        return row.lengthSchoolingCodeStr;
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
