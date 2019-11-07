<template>
  <div>
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small">
          <el-form-item label="学号:">
            <el-input class="input-v2-rao" v-model="searchForm.studentNum" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="姓名:">
            <el-input class="input-v2-rao" v-model="searchForm.userName" maxlength="30"></el-input>
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
              <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toEditSome(1)">
                <i class="iconfont icon-icon_bianji f12 cfff"></i> 设置学生头像
              </el-button>
              <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toEditSome('C')">
                <i class="iconfont icon-icon_bianji f12 cfff"></i> 设置学生手环
              </el-button>
              <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toEditSome('B')">
                <i class="iconfont icon-icon_bianji f12 cfff"></i> 设置学生RFID
              </el-button>
              <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao b93BF88 " @click="del">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
              </el-button>
              <el-button size="small" class="button-v2-rao border-color-cccccc c93BF88 bfff" @click="downEmpty" >下载表格模版</el-button>
              <el-button size="small" class="button-v2-rao border-color-cccccc c93BF88 bfff" @click="toImport" >导入表格</el-button>
            </div>
          </el-col>
        </el-row>

        <el-row v-show="showSelFile">
          <el-form  :inline="true" size="small">
            <el-form-item label="批量修改:">
              <el-input class="input-v2-rao"  placeholder="选择文件" v-model="zipFileName" maxlength="30" disabled ></el-input>
            </el-form-item>
            <el-button size="small" class="button-v2-rao border-color-cccccc c93BF88 bfff " @click= "toUploadFile()">选择文件</el-button>

          </el-form>
        </el-row>


        <div class="table">
          <el-table :data="dataLists" tooltip-effect="dark" style="width: 100%" border
                    @selection-change="handleSelectionChange"
                    header-row-class-name="table-header-v2-rao" class="table-v2-rao" ref="schooltable" :stripe="true" @sort-change="sortChange">
            <el-table-column type="selection" width="65" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="65" align="center"></el-table-column>
            <el-table-column prop="studentNum" label="学号" sortable="custom" width="200">
              <template slot-scope="scope">
                <span v-if="scope.row.studentNum">{{scope.row.studentNum}}</span>
                <span v-else>无</span>
              </template>
            </el-table-column>
            <el-table-column prop="userName" label="姓名" sortable="custom" width="300">
                <!--<template slot-scope="scope">-->
                  <!--<span @click="studentClick(scope.row.studentId)">{{scope.row.userName}}</span>-->
                <!--</template>-->
              <template slot-scope="scope">
                <div v-if="scope.row.userPreviewVO" class="flex row center" @click="studentClick(scope.row.studentId)">
                  <div class="pr-10">
                    <img alt="" v-preview height="64" width="64"  v-show="scope.row.gender==='M'"
                         :src="scope.row.headPicture" >
                    <img alt="" v-preview height="64" width="64"   v-show="scope.row.gender==='F'"
                         :src="scope.row.headPicture " >
                  </div>
                  <div class="flex space-between" style="height: 50px">
                    <span>{{scope.row.userName}}</span>
                    <span v-if="scope.row.gender==='M' ">男</span>
                    <span v-else>女</span>
                  </div>
                </div>
                <div v-else>无</div>
              </template>
            </el-table-column>
            <el-table-column prop="userNameEn" label="英文名" sortable="custom"></el-table-column>
            <el-table-column label="操作" width="300">
              <template slot-scope="scope">
                <div v-show="!scope.row.showHeader&&!scope.row.showHand&&!scope.row.showRfid">
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                    <span slot="reference" @click.stop="toDetail(scope.row.studentId)"><i class="iconfont icon-icon_chakan1 ml5 f20 c999999" ></i></span>
                  </el-popover>
                  <el-popover title="编辑" placement="top-start" popper-class="popover-v2-rao" trigger="hover"  >
                    <span slot="reference" @click.stop="toEdit(scope.row.studentId)"> <i class="iconfont icon-icon_bianji ml5 f20 c999999" ></i></span>
                  </el-popover>
                  <el-popover placement="top-start" title="删除" popper-class="popover-v2-rao" trigger="hover">
                    <span slot="reference" @click.stop="rowDel(scope.row.studentId)"><i class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                  </el-popover>
                  <el-popover placement="top-start" popper-class="popover-v2-rao" title="学生设备" trigger="hover">
                      <span slot="reference" @click.stop="toStudentDevice(scope.row.studentId ,`listStudentDevice`,scope.row.userName,scope.row.userId)"><i
                        class="iconfont icon-icon_tuichu_p ml5 f20 c999999"></i></span>
                  </el-popover>
                </div>

                <div class="flex row"  v-show="scope.row.showHeader || scope.row.showHand || scope.row.showRfid || scope.row.showAddFile">
                  <div class="p80">
                    <div class="flex row " v-show="scope.row.showHeader">
                      <!--<span style="width: 100px">头像</span>-->
                      <div style="flex: 1;">
                        <div class="upload-demo" v-show="scope.row.showEdit">
                          <div tabindex="0" class="el-upload el-upload--text"  >
                            <button  type="button" class="el-button el-button--primary el-button--small" @click="files(scope.row.studentId)" ><span>点击上传</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div class="flex row " v-show="scope.row.showHand">
                      <div style="flex: 1;">
                        <el-input v-show="scope.row.showEdit"  size="mini" class="input-v2-rao" v-model="scope.row.handNum"  ></el-input>
                        <span v-show="!scope.row.showEdit">手环编号:{{scope.row.handNum}}</span>
                      </div>
                    </div>
                    <div class="flex row " v-show="scope.row.showRfid">
                      <div style="flex: 1;">
                        <el-input  v-show="scope.row.showEdit" size="mini" class="input-v2-rao" v-model="scope.row.rfNum" ></el-input>
                        <span v-show="!scope.row.showEdit">RFID卡号:{{scope.row.rfNum}}</span>
                      </div>
                    </div>
                  </div>

                  <div class="p20 flex center row">
                    <div  style="width: 80px;line-height: 28px;text-align: center"  v-show="scope.row.showEdit"
                          @click="sureEditItem(scope.row)">
                      <i class="iconfont icon-gouzi f20 c93BF88" ></i>
                    </div>
                    <div  style="width: 80px;line-height: 28px;text-align: center"  v-show="!scope.row.showEdit">
                      <i class="iconfont icon-icon_huizhishu" @click="showEditItem(scope.row)"></i>
                    </div>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </el-main>
      <div class="paging text-right">
        <el-pagination class="pagination-v2-rao" popper-class="pagination-popper-v2-rao" :page-sizes="[50,100,150]" :page-size="data.size" :total="data.total"
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
    <div><input type="file" ref="uploadFiles" @change="change" style="position: absolute; width: 1px; height: 1px; opacity: 0; z-index: -1;"/></div>
    <div><input type="file" ref="fileZip" @change="piliangChange" style="position: absolute; width: 1px; height: 1px; opacity: 0; z-index: -1;"/></div>
  </div>
</template>

<script>
  import api from "./basicstudentUrl";
  import apiDevice from "../studentdevice/studentdeviceUrl";
  import commonApi from "@/api/common/common";
  import { mapMutations, mapGetters } from 'vuex';
  import preview from '@/util/preview';
  import {findArrayToObj} from  '@/util/util';
  import UploadFile from "../../../components/upload/upload";
  import {getFile, uploadFile} from "@/api/admin/upload";
  export default {
    components: {UploadFile},
    directives:{preview},
    data() {
      return {
        listcolumn:[
          {
            column : "name",
            title : "姓名"
          }
        ],
        listRao:[
          {
            name : "raowensheng"
          }
        ],
        isLoaded: true,
        dialogDelete: false,
        isDel: false,
        activeId: false,
        activeImg: false,
        msgShow: false,
        dialogVisible: false,
        changeByHand: true,
        zipFileName: '',
        typeOfPiLiang: false,
        dialogFormVisible: false,
        dialogStatus: '',
        typeCode: '',
        paramsId: '',
        textMap: {
          update: '编辑',
          detail: '详情',
          create: '创建'
        },
        personNationCodeOptions: [{"label": "全部", "name": ""}],
        personNationCodeValue: null,
        idCardTypeCodeOptions: [{"label": "全部", "name": ""}],
        idCardTypeCodeValue: null,
        politicalAffiliationCodeOptions: [{"label": "全部", "name": ""}],
        politicalAffiliationCodeValue: null,
        healthCodeOptions: [{"label": "全部", "name": ""}],
        healthCodeValue: null,
        religionCodeOptions: [{"label": "全部", "name": ""}],
        religionCodeValue: null,
        bloodTypeCodeOptions: [{"label": "全部", "name": ""}],
        bloodTypeCodeValue: null,
        ynOptions: [{"label": "全部", "name": ""}],
        ynValue: null,
        studentStatusCodeOptions: [{"label": "全部", "name": ""}],
        studentStatusCodeValue: null,
        studentSourceCodeOptions: [{"label": "全部", "name": ""}],
        studentSourceCodeValue: null,
        form: {
          studentNum:
            null,
          userName:
            null,
        },
        searchForm: {
          studentNum:
            null,
          userName:
            null,
        }
        ,
        data: {records:[]},
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 50,
          studentNum:
            null,
          userName:
            null,
        }
      }
    },
    computed: {
      ...mapGetters(['tagList']),
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      },
      dataLists() {
        return this.data.records
      },
      showSelFile () {
        let res = this.data.records.some(res=>{
          return res.showHeader || res.showHand || res.showRfid
        })
        if (res) {
          return true
        }else {
          return false
        }
      }
    },
    watch: {

    },
    activated() {
      //只刷新数据，不改变整体的缓存
      // console.log('重新活跃路由');
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.isLoaded = true;
      this.getList()
    },
    created() {
      let schoolId = this.$route.query.schoolOrgId;
      let classId = this.$route.query.classId;
      this.params.schoolId = schoolId;
      this.params.classId = classId;
    },
    mounted() {
      this.initCode();
      this.getList();
    },
    methods: {
      ...mapMutations(['SET_IMPORT_URL','SET_IMPORT_TEMPLATE']),
      studentClick(studentId){
          this.$detailDialog({
              url : `/user/studentAd/${studentId}`,
              items : [
                {
                  key:"studentNum",
                  name : "学号"
                },
                {
                  key:"studentNationalSetNum",
                  name : "国家统一学籍编码"
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
                  key:"userNamePinyin",
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
                  key:"personNationCode",
                  name : "民族"
                },
                {
                  key:"regionArea",
                  name : "国籍/地区"
                },
                {
                  key:"idCardTypeCode",
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
                  key : "politicalAffiliationCodeStr",
                  name : "政治面貌"
                },
                {
                  key : "healthCodeStr",
                  name : "健康状况"
                },
                {
                  key : "religionCodeStr",
                  name : "信仰宗教"
                },
                {
                  key : "bloodTypeCodeStr",
                  name : "血型"
                },
                {
                  key : "isOnlyChild",
                  name : "是否独生"
                },
                {
                  key : "schoolName",
                  name : "现就读学校名称"
                },
                {
                  key : "className",
                  name : "所属班级的班级名称"
                },
                {
                  key : "contactPhoneNum",
                  name : "联系电话"
                },
                {
                  key : "telPhoneNum",
                  name : "手机号"
                },
                {
                  key : "contactAddress",
                  name : "通讯地址"
                },
                {
                  key : "postNum",
                  name : "邮政编码"
                },
                {
                  key : "postNum",
                  name : "邮政编码"
                },
                {
                  key : "contactEmail",
                  name : "电子信箱"
                },
                {
                  key : "studentStatusCodeStr",
                  name : "在校状态"
                },
                {
                  key : "studentSourceCodeStr",
                  name : "学生来源"
                }

              ]
          })
      },
      downEmpty(){
        window.location.href="/static/excel/学生数据导入.xls";
      },
      toImport () {
        this.$router.push({ name : 'importFile' , query: {
          roleType : "student"
        } })
      },
      toUploadFile () {
        this.typeOfPiLiang = true;
        this.$refs.fileZip.click();
      },
      handleSelectionChange(val) {
        this.multipleSelection = val.map(item => {
          return item.studentId
        });
      },
      handleSizeChange(size) {
        this.params.limit = size;
        this.isLoaded = true;
        this.getList();
      },
      handleCurrentChange(currentPage) {
        this.params.page = currentPage;
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
        this.params.isAsc = obj.order === "ascending" ? true : false;
        // console.log(this.$route)
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.isLoaded = true;
        this.getList();
      },
      getList() {
        api.fetchList(this.params).then(res => {
          if (res.data.resultCode === '000000') {
            for (let i of res.data.data.records) {
              i.showEdit = false;
              i.deviceNum = 0;
              i.gender = i.hasOwnProperty('userPreviewVO')&&i.userPreviewVO.gender || 'M'
              if(i.gender === 'F') {
                i.headPicture = i.hasOwnProperty('userPreviewVO')&&i.userPreviewVO.headPicture || require('../../../assets/img/headerImg-nv.png')
              }else {
                i.headPicture = i.hasOwnProperty('userPreviewVO')&&i.userPreviewVO.headPicture || require('../../../assets/img/headerImg-nan.png')
              }
              i.handId = this.getItemValue('studentDeviceTypeCode','C',i.studentDevices,'studentDeviceId') || '';
              i.handNum = this.getItemValue('studentDeviceTypeCode','C',i.studentDevices,'deviceNum') || '';
              i.rfId = this.getItemValue('studentDeviceTypeCode','B',i.studentDevices,'studentDeviceId') || '';
              i.rfNum = this.getItemValue('studentDeviceTypeCode','B',i.studentDevices,'deviceNum') || '';
              i.icId = this.getItemValue('studentDeviceTypeCode','A',i.studentDevices,'studentDeviceId') || '';
              i.icNum = this.getItemValue('studentDeviceTypeCode','A',i.studentDevices,'deviceNum') || '';
              i.showHeader = false;
              i.showHand = false;
              i.showRfid = false;
            }
            this.data = res.data.data;
          }
          this.isLoaded = false;
        }, res => {
          this.isLoaded = false;
          this.$message.error(res.message);
        });
      },
      files(id) {
        this.activeId = id
        this.$refs.uploadFiles.click();
      },
      piliangChange (event) {
        debugger
        let formData = new FormData();
        this.$message.error('功能待开发');
        formData.append('file', event);
        formData.append('classId', this.$route.query.classId);
        if (this.typeCode === 1) {
          // uploadFile(formData).then(res=>{
          //   // console.log(res);
          // })
          api.uploadClassStudentHeader(formData).then(res=>{
            if (res.data.resultCode === "000000"&&res.data.data === true) {
              this.$message.success("头像修改成功");
            }else {
              this.$message.error('出错了');
            }
          })
        }else  if (this.typeCode === 'B') {

        }else  if (this.typeCode === 'C') {

        }
      },
      change(event) {
          this.uploadFile(event.target.files[0], res => {
            this.activeImg = res
            for (let i = 0; i < this.data.records.length; i++) {
              if (this.data.records[i].studentId === this.activeId) {
                this.data.records[i].headPicture = res
              }
            }
            event.target.value = ''
          })
          //  api调用 批量
      },
      getItemValue (dic,value,arr,backStr) {
        let resD =  findArrayToObj(dic,value,arr)
        if(resD !== '-1') {
          return resD[backStr]
        } else {
          return false
        }
      },
      deviceEdit (obj){
        apiDevice.putObj(obj).then(res=>{
          if (res.data.resultCode === "000000") {
            this.$message.success("修改成功");
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      deviceAdd (obj){
        apiDevice.addObj(obj).then(res=>{
          if (res.data.resultCode === "000000") {
            this.$message.success("新增设备成功");
          } else {
            this.$message.error(res.data.message);
          }
        })
      },
      sureEditItem (event){
        // res.showEdit = !res.showEdit
        // 1 为修改头像
        if(this.typeCode!==1){
          let obj = {
            studentUserId: event.userId,
            studentId: event.studentId,
            studentName: event.userName,
            isDisabled: 'N',
            studentDeviceTypeCode: this.typeCode
          };

          if (this.typeCode === 'B') {
            //有Id编辑 无就新增
            // console.log(event.rfId)
            obj.deviceNum = event.rfNum
            if(event.rfId) {
              // console.log('编辑')
              obj.studentDeviceId = event.rfId
              this.deviceEdit(obj)
            }else {
              // console.log('新增')
              this.deviceAdd(obj)
            }
          }else if (this.typeCode === 'C') {
            //有Id编辑 无就新增
            // console.log(event.handId)
            obj.deviceNum = event.handNum
            if(event.handId) {
              // console.log('编辑')
              obj.studentDeviceId = event.handId
              this.deviceEdit(obj)
            }else {
              // console.log('新增')
              this.deviceAdd(obj)
            }
          }
        }else {
          let obj2 = {
            studentUserId: event.userPreviewVO.subjectId,
            studentId: event.studentId,
            userPreviewVO: {
              headPicture: this.activeImg
            }
          }
          api.putObj(obj2).then(res=>{
            if (res.data.resultCode === "000000") {
              this.$message.success("修改成功");
            } else {
              this.$message.error(res.data.message);
            }
          })
        }
        this.reSetAll(event)
      },
      reSetAll(event) {
        event.showEdit = !event.showEdit
      },
      showEditItem (event){
        event.showEdit = !event.showEdit
      },
      toEditSome (type) {
        this.typeCode = type
        this.data.records.map(res=>{
          res.showEdit = false
          if(type===1){
            res.showHeader= !res.showHeader
            res.showHand= false
            res.showRfid= false
          }else if(type==='C'){
            res.showHand= !res.showHand
            res.showHeader= false
            res.showRfid= false
          }else if(type==='B'){
            res.showRfid= !res.showRfid
            res.showHeader= false
            res.showHand= false
          }
        })
        // console.log(this.data)
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
        if (this.$refs.schooltable.selection.length === 0) {
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
        let opath = '/basedata/detailStudent/add/' + 0;
        this.$router.push({path: opath})
      },
      toEdit(id) {
        let opath = '/basedata/detailStudent/edit/' + id;
        this.$router.push({path: opath})
      },
      toDetail(id) {
        let opath = '/basedata/detailStudent/detail/' + id;
        this.$router.push({path: opath})
      },
      toStudentDevice(id, path,name,userId) {
        let opath = '/basedata/' + path + '?studentId=' + id+'&userName='+name+'&userId='+userId;
        this.$router.push({path: opath})
      },
      initCode () {
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
        commonApi.getCodeIntType("boolean_yn").then(res => {
          let viewList = res.data.data || [];
          for (let ynItem of viewList) {
            this.ynOptions.push({
              "label": ynItem.codeDesc,
              "name": ynItem.codeId
            });
          }
        }, res => {
          this.$message.error(res.data.message);
        });
        commonApi.getCodeIntType("studentStatus").then(res => {
          let viewList = res.data.data || [];
          for (let studentStatusItem of viewList) {
            this.studentStatusCodeOptions.push({
              "label": studentStatusItem.codeDesc,
              "name": studentStatusItem.codeId
            });
          }
        }, res => {
          this.$message.error(res.data.message);
        });
        commonApi.getCodeIntType("studentSource").then(res => {
          let viewList = res.data.data || [];
          for (let studentSourceItem of viewList) {
            this.studentSourceCodeOptions.push({
              "label": studentSourceItem.codeDesc,
              "name": studentSourceItem.codeId
            });
          }
        }, res => {
          this.$message.error(res.data.message);
        });
      }
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
