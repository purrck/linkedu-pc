<!--suppress ALL -->
<template>
  <el-container v-loading="listLoading" element-loading-custom-class="home-loading"
                style="min-height: 600px"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)">
    <el-header height="">

      <el-form :model="selectForm" ref="selectForm" :inline="true" size="small">
        <el-form-item label="标题" prop="bulletinTitle">
          <el-input v-model="selectForm.bulletinTitle" class="input-v2-rao" maxlength="32" placeholder="请输入..."></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="selectForm.bulletinTypeCode" placeholder="请选择" class="select-v2-rao" maxlength="32">
            <el-option
              label="----请选择----"
              value=""
            ></el-option>
            <el-option
              v-for="item in bulletinTypeCodeList"
              :key="item.codeId"
              :label="item.codeDesc"
              :value="item.codeId"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select class="select-v2-rao" v-model="selectForm.bulletinStatusCode" placeholder="请选择" maxlength="32">
            <el-option
              label="----请选择----"
              value=""
            ></el-option>
            <el-option
              v-for="item in bulletinStatusCodeList"
              :key="item.codeId"
              :label="item.codeDesc"
              :value="item.codeId"
            ></el-option>
          </el-select>
        </el-form-item>  <!--style="width: 25%"-->
        <el-form-item label="回执">
          <el-select class="select-v2-rao" v-model="selectForm.isNeedReceipt" placeholder="请选择" maxlength="32">
            <el-option
              label="----请选择----"
              value=""
            ></el-option>
            <el-option
              v-for="item in isNeedReceiptList"
              :key="item.itemAttribute"
              :label="item.itemName"
              :value="item.itemAttribute"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" class="button-hover-rao b93BF88 border-color-93BF88" @click="handleFilter">查询
            </el-button>
            <!--<el-button type="primary" @click="resetField" class="button-hover-rao b93BF88 border-color-93BF88">重置</el-button>-->
          </el-form-item>
      </el-form>
      <div class="clearfix"></div>

    </el-header>

    <div class="border1 border-color-e8e8e8 mt10 mb10"></div>
    <el-main class="pt-15">
      <el-row class="mb10">
          <el-col :span="24" class="text-left mb-10 flex row btns x-center">

              <div style="" class="flex space-between row btns-msg f12">
              <div>
                <i class="iconfont icon-icon_shanchu_p" style="color: #93BF88;"></i>
                <span class="c707070">已选择{{multipleSelection.length}}项</span>
              </div>
              <div>
                <span class="c707070">共搜索到{{total}}条数据</span>
                <router-link to="/safety/bulletinTotal"><i class="iconfont icon-icon_shuju f12" style="color: #93BF88;"></i></router-link>
              </div>
            </div>
            <div>
                <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao b93BF88 " @click="commitCheck">
                  <i class="iconfont icon-icon_xinjian f12 cfff"></i> 提交审核
                </el-button>
                <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao b93BF88 " @click="handleCreate">
                  <i class="iconfont icon-icon_xinjian f12 cfff"></i> 添加
                </el-button>
                <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="handleGroupDelete">
                  <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
                </el-button>
                <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao bFFB54C" @click="handleWithdraw">
                  <i class="iconfont icon-fenzu1 f12 cfff"></i> 撤销
                </el-button>
            </div>




          </el-col>
        </el-row>
      <el-table ref="bulletinTable" :key='tableKey' border fit
                :data="list" table-loading="tableLoading"
                element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)"
                :stripe="true" tooltip-effect="dark"
                class="table-v2-rao"
                header-row-class-name="table-header-v2-rao"
                highlight-current-row @selection-change="handleSelectionChange" @sort-change="sortChange">
        <el-table-column align="center" type="selection"></el-table-column>
        <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
        <el-table-column align="center" prop="bulletinTypeCode" sortable="custom" label="类别">
          <template slot-scope="scope">
            <span v-if="scope.row.bulletinTypeCodeStr">{{scope.row.bulletinTypeCodeStr.split(";")[0]}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="bulletinTitle" sortable="custom" label="通知标题">
          <template slot-scope="scope">
            <span @click="handleDetail(scope.row)">{{ scope.row.bulletinTitle }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" width="250" label="有效时间">
          <template slot-scope="scope">
            <span>{{ scope.row.effectiveDt }} - {{ scope.row.expiryDt }}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="isNeedReceipt" sortable="custom" label="是否需要回执">
          <template slot-scope="scope">
            <span v-if="scope.row.isNeedReceipt==='Y'">需要</span>
            <span v-else>不需要</span>
          </template>
        </el-table-column>
        <el-table-column label="回执详情" align="center">
          <template slot-scope="scope">
              <a href="javascript:void(0)" class="" @click="gotoHuiZhi(scope.row)">查看</a>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="bulletinStatusCode" sortable="custom" label="通知状态">
          <template slot-scope="scope">
          <span :style="{'color':scope.row.bulletinStatusCodeStr.split(';')[1]}">
            {{scope.row.bulletinStatusCodeStr&&scope.row.bulletinStatusCodeStr.split(";")[0]}}
          </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" fixed="right" align="center" width="250">
          <template slot-scope="scope">
            <div style="display: flex;flex-direction: row;">
              <el-popover style="margin: 0 5px" placement="top-start" title="查看" popper-class="popover-v2-rao" trigger="hover">
                <span slot="reference" @click="gotoView(scope.row)"><i class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
              </el-popover>

              <el-popover style="margin: 0 5px"   v-if="scope.row.bulletinStatusCode==='under_editing'" placement="top-start" title="编辑" popper-class="popover-v2-rao" trigger="hover">
                <span slot="reference" @click="handleEdit(scope.row)"><i class="iconfont icon-icon_bianji ml5 f20 c999999"></i></span>
              </el-popover>

              <el-popover style="margin: 0 5px" v-if="scope.row.bulletinStatusCode=='under_review'" placement="top-start" title="审批" popper-class="popover-v2-rao" trigger="hover">
                <span slot="reference" @click="handleCheck(scope.row)"><i class="iconfont icon-icon_shenhe1 ml5 f20 c999999"></i></span>
              </el-popover>

              <el-popover style="margin: 0 5px" v-show="scope.row.bulletinStatusCode=='under_editing'" placement="top-start" title="发送对象" popper-class="popover-v2-rao" trigger="hover">
                <span slot="reference" @click="fasong(scope.row)"><i class="iconfont icon-icon_fabu2-copy ml5 f20 c999999"></i></span>
              </el-popover>

              <el-popover style="margin: 0 5px" placement="top-start" title="查看范围" popper-class="popover-v2-rao" trigger="hover">
                <span slot="reference" @click="tongzhi(scope.row)"><i class="iconfont icon-icon_duixiang ml5 f20 c999999"></i></span>
              </el-popover>

              <el-popover style="margin: 0 5px" placement="top-start" title="查看对象" popper-class="popover-v2-rao" trigger="hover">
                <span slot="reference" @click="duixiang(scope.row)"><i class="iconfont icon-icon_fanwei1 ml5 f20 c999999"></i></span>
              </el-popover>

            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="paging text-right mt10">
        <el-pagination class="pagination-v2-rao" popper-class="pagination-popper-v2-rao" @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page"
                       :page-sizes="[10,20,30,50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </el-main>
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="125px">
        <el-form-item label="是否回执：" prop="isNeedReceipt">
          <el-select v-model="form.isNeedReceipt" placeholder="请选择" maxlength="32">
            <el-option
              v-for="item in isNeedReceiptList"
              :key="item.itemAttribute"
              :label="item.itemName"
              :value="item.itemAttribute"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="通知日期：">
          <el-col :span="11" prop="effectiveDt">
            <el-date-picker type="date" placeholder="开始日期" v-model="form.effectiveDt" style="width: 100%;"
                            value-format="yyyy-MM-dd HH:mm"         :picker-options="pickTime"></el-date-picker>
          </el-col>
          <el-col class="line" :span="1">-</el-col>
          <el-col :span="11" prop="expiryDt">
            <el-date-picker type="date" placeholder="结束日期" v-model="form.expiryDt" style="width: 100%;"
                            value-format="yyyy-MM-dd HH:mm"          :picker-options="pickTime"></el-date-picker>
          </el-col>
        </el-form-item>
        <el-form-item label="通知标题：" prop="bulletinTitle">
          <el-input v-model="form.bulletinTitle" placeholder="通知标题"></el-input>
        </el-form-item>
        <!--<el-form-item label="封面图片：" prop="username">-->
          <!--<el-upload-->
            <!--:limit="uploadLimit"-->
            <!--action="https://jsonplaceholder.typicode.com/posts/"-->
            <!--list-type="picture-card"-->
            <!--:on-preview="handlePictureCardPreview"-->
            <!--:on-remove="handleRemove">-->
            <!--<i class="el-icon-plus"></i>-->
          <!--</el-upload>-->
          <!--<el-dialog :visible.sync="dialogVisible">-->
            <!--<img width="100%" :src="dialogImageUrl" alt="">-->
          <!--</el-dialog>-->
        <!--</el-form-item>-->
        <el-form-item label="通知内容：" prop="content" style="height: 400px">
          <editor v-model="form.content" :true-height="350"/>
        </el-form-item>
        <el-form-item label="通知状态" prop="username" v-if="false">
          <el-input v-model="form.bulletinStatusCode" placeholder="通知状态"></el-input>
        </el-form-item>

        <el-form-item label="通知日期:" prop="username" v-if="false">
          <!--<el-input v-model="form.publishedDt" type="date" placeholder="通知日期"></el-input>-->
        </el-form-item>
        <el-form-item label="发起人id" prop="username" v-if="false">
          <el-input v-model="form.userId" placeholder="发起人"></el-input>
        </el-form-item>
        <el-form-item label="发起人" prop="username" v-if="false">
          <el-input v-model="form.userName" placeholder="发起人"></el-input>
        </el-form-item>
        <el-form-item label="周期" prop="username" v-if="false">
          <el-input v-model="form.periodInfo" placeholder="周期"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button v-if="dialogStatus=='create'" @click="create('form')">保存</el-button>
        <el-button v-if="dialogStatus=='update'" @click="update('form')">保存</el-button>
        <el-button @click="next('form')">确认</el-button>
        <el-button @click="cancel('form')">取 消</el-button>
      </div>
    </el-dialog>

    <!--    点击下一步，弹出 通知对象范围选择对话框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="bulletinUserRuleFormVisible">
      <el-form :model="bulletinUserRuleForm" :rules="rules" ref="form" label-width="100px">
        <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">角色：
        </el-checkbox>
        <div style="margin: 15px 0;"></div>
        <el-checkbox-group v-model="checkedroles" @change="handleCheckedrolesChange">
          <el-checkbox v-for="role in roles" :label="role" :key="role">{{role}}</el-checkbox>
        </el-checkbox-group>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <!--<el-button @click="back">上一步</el-button>-->
        <el-button @click="preview('bulletinUserRuleForm')">预览</el-button>
        <el-button @click="commitCheck('form')">审核</el-button>
      </div>
    </el-dialog>

  </el-container>
</template>

<script>
  import {
    bulletinList,
    fetchList,
    addObj,
    putObj,
    delObj,
    batchDelObj,
    fetchBulletinTypeCodeList,
    fetchBulletinStatusCodeList,
    commitCheck,
    withdrawInfo,
    bulletinLotDel,
    bulletinInfoCommitcheck,
    bulletinInfoWithdraw,
  } from '@/api/safety/bulletin/bulletinInfo'

  import commonApi from '@/api/common/common'
  import {mapGetters} from 'vuex'
  import editor from '@/components/editor/editor'

  const roleOptions = ['校领导', '班主任', '科任教师', '安检员', '家长']

  export default {
    name: 'table_tbl_bulletin_info',
    directives: {},
    components: {
      editor
    },
    data() {
      return {
        list: null,
        total: null,
        uploadLimit: 1,
        dialogImageUrl: '',
        dialogVisible: false,
        isLoaded: false,
        listLoading: true,
        tableLloading: true,
        listQuery: {
          page: 1,
          limit: 10
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          }
        },
        rules: {
          bulletinTitle: [
            {required: true, message: '请输入通知标题', trigger: 'blur'},
            {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
          ],
          isNeedReceipt: [
            {required: true, message: '请选择是否需要回执', trigger: 'blur'}
          ],
          bulletinTypeCode: [
            {required: true, message: '请选择通知类型', trigger: 'blur'}
          ],
          effectiveDt: [
            {type: 'date', required: true, message: '请选择通知日期', trigger: 'blur'}
          ],
          expiryDt: [
            {type: 'date', required: true, message: '请选择通知日期', trigger: 'blur'}
          ],
          content: [
            {required: true, message: '请输入通知内容', trigger: 'blur'}
          ]
        },
        selectForm: {
          page: '',
          limit: '',
          bulletinTitle: '',
          userName: '',
          publishedDt_start: '',
          publishedDt_end: ''
        },
        bulletinUserRuleForm: {},
        isNeedReceiptList: [
          {itemAttribute: 'Y', itemName: '是'},
          {itemAttribute: 'N', itemName: '否'}
        ],
        form: {},
        seachForm: {},
        // 复选框勾选
        multipleSelection: [],
        reverseSelection: false, //反选
        dialogFormVisible: false,
        bulletinUserRuleFormVisible: false,
        dialogStatus: '',
        tbl_bulletin_info_add: false,
        tbl_bulletin_info_upd: false,
        tbl_bulletin_info_del: false,
        textMap: {
          update: '编辑',
          create: '创建',
          bulletinrule: '选择通知对象'
        },
        tableKey: 0,
        bulletinTypeCodeList: [],
        bulletinStatusCodeList: [],
        bulletinStatusCodeListColor: [
          {itemAttribute: 'under_editing', itemName: 'info'},
          {itemAttribute: 'under_review', itemName: 'warning'},
          {itemAttribute: 'under_reject', itemName: 'danger'},
          {itemAttribute: 'under_publish', itemName: 'success'},
          {itemAttribute: 'under_withdraw', itemName: 'danger'}
        ],
        // { '1': 'info', '2': 'warning', '3': 'danger', '4': 'success', '5': 'danger' },
        checkAll: false,
        checkedroles: ['上海', '北京'],
        roles: roleOptions,
        isIndeterminate: true
      }
    },
    computed: {
      ...mapGetters([
        'permissions'
      ])
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          0: '有效',
          1: '无效'
        }
        return statusMap[status]
      }
    },
    created() {
      this.tongZhiZhuangTai();
      this.tongZhiLeiXing();
      //this.getSelectList()
      this.getList()
      this.tbl_bulletin_info_add = this.permissions['tbl_bulletin_info_add']
      this.tbl_bulletin_info_upd = this.permissions['tbl_bulletin_info_upd']
      this.tbl_bulletin_info_del = this.permissions['tbl_bulletin_info_del']
      //this.dealData();



    },
    methods: {

      fasong(event){
        this.$router.push({ path: `/safety/sendToObj?bulletinId=${event.bulletinId}` })
      },
      tongzhi(event){
        this.$router.push({path: '/safety/objbulletin',query:{ title : event.bulletinTitle, bulletinId:event.bulletinId,type: event.bulletinStatusCode}});

      },
      duixiang(event){
        this.$router.push({path: '/safety/bulletinUser',query:{ bulletinId:event.bulletinId,type: event.bulletinStatusCode }});

      },
      tongZhiZhuangTai(){
        commonApi.getCodeIntType('bulletinStatus').then(item => {
          this.bulletinStatusCodeList = item.data.data
        })
      },
      sortChange(obj) {
        this.listQuery.orderByField = obj.prop;
        this.listQuery.isAsc = obj.order == "ascending" ? true : false;
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.getList();
      },
      tongZhiLeiXing(){
        commonApi.getCodeIntType('bulletinType').then(item => {
          this.bulletinTypeCodeList = item.data.data
        })
      },
      getList() {
        this.listLoading = true
        bulletinList(this.listQuery).then(response => {
          console.log(response)
          response.data.data.records.map((item) => {

            if(item.hasOwnProperty("bulletinStatusCodeStr")){
              item['bulletinStatusName'] = item.bulletinStatusCodeStr.split(";")[0]
            }
            if(item.hasOwnProperty("expiryDt")){
              item['expiryDt'] = item.expiryDt.substr(0,10)
            }
            if(item.hasOwnProperty("effectiveDt")){
              item['effectiveDt'] = item.effectiveDt.substr(0,10)
            }
            if(item.hasOwnProperty("bulletinTypeCodeStr")){
              item['bulletinTypeName'] = item.bulletinTypeCodeStr.split(";")[0]
            }
          })
          this.list = response.data.data.records
          this.total = response.data.data.total
          this.listLoading = false
        })
      },
      dealData() {
        for (var item of this.bulletinStatusCodeList) {
          item.color = ''
          if (this.bulletinStatusCodeListColor[item.itemAttribute]) {
            item.color = this.bulletinStatusCodeListColor[item.itemAttribute]
          } else {
            item.color = 'success'
          }
        }
        return this.bulletinStatusCodeList
      },
      getSelectList() {
        this.listLoading = true
        fetchBulletinTypeCodeList().then(response => {
          this.bulletinTypeCodeList = response.data.data
        });
        fetchBulletinStatusCodeList().then(response => {
          this.bulletinStatusCodeList = response.data.data
        });
      },
      handleSizeChange(val) {
        this.listQuery.limit = val
        this.getList()
      },
      handleCurrentChange(val) {
        this.listQuery.page = val
        this.getList()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleFilter(val) {
        this.selectForm.limit = this.listQuery.limit
        this.selectForm.page = 1
        this.listQuery = this.selectForm
        this.getList()
      },
      resetField(val) {
        this.selectForm = {}
        this.$refs['selectForm'].resetFields()
      },
      handleCheckAllChange(val) {
        this.checkedroles = val ? roleOptions : []
        this.isIndeterminate = false
      },
      handleCheckedrolesChange(value) {
        const checkedCount = value.length
        this.checkAll = checkedCount === this.roles.length
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.roles.length
      },
      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url
        this.dialogVisible = true
      },
      handleRemove(file) {

      },
      handleDelete(deleteList) {
        bulletinLotDel(deleteList)
          .then(response => {
            this.dialogFormVisible = false
            this.getList()
            this.$notify({
              title: '成功',
              message: '删除成功',
              type: 'success',
              duration: 2000
            })
          })
      },
      getEditorValue(val) {
        this.form.content = val
      },
      // 批量删除方法
      handleGroupDelete() {
        let arr = []
        if (this.$refs.bulletinTable.selection.length <= 0) {
          this.$xxMsg({
            msg : '请至少选择一条数据！'
          })
          return
        }
        this.$confirm('此操作将永久删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          for (let i = 0; i < this.multipleSelection.length; i++) {
            arr.push(this.multipleSelection[i].bulletinId)
          }
          bulletinLotDel(arr)
            .then(response => {
              this.getList()
            })
          this.$notify({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消删除'
          })
        })
      },
      handleCreate() {
        // this.dialogStatus = 'create'
        // this.form = {}
        // this.$refs['form'].resetFields()
        // this.dialogFormVisible = true
        this.$router.push({path: '/safety/editbulletinInfo'})
      },
      handleEdit(row, index) {
        // this.form = row
        this.$router.push({path: '/safety/editbulletinInfo', query: {id: row.bulletinId}});
      },

      next(formName) {
        const set = this.$refs
        set[formName].validate((valid) => {
          if (valid) {
            this.bulletinUserRuleFormVisible = true
          } else {
            return false
          }
        })
      },
      back() {
        this.bulletinUserRuleFormVisible = false
      },
      toggleAllSelection() {
        this.$refs.schooltable.store.commit('toggleAllSelection');
      },
      //通知撤回
      handleWithdraw(row) {
        if (this.$refs.bulletinTable.selection.length <= 0) {
          this.$xxMsg({
            msg : '请至少选择一条数据！'
          })
          return
        }

        for(let i=0; i<this.multipleSelection.length; i++){
          if(this.multipleSelection[i].bulletinStatusCode != "under_publish"){
            this.$xxMsg({
              msg : '非法操作!已发布的才支持撤销'
            })
            return
          }
        }

        let arr = []
        this.$confirm('请确认是否撤回, 是否继续?','提示').then(() => {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            arr.push(this.multipleSelection[i].bulletinId)
          }

          bulletinInfoWithdraw(arr).then(() => {

            this.$notify({
              title: '成功',
              message: '已撤回！',
              type: 'success',
              duration: 2000,
              onClose: () => {
                this.getList()
              }
            })
          })
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消'
          })
        })

        /*this.$confirm('请确认是否撤回, 是否继续?').then(() => {
          for (let i = 0; i < this.multipleSelection.length; i++) {
            arr.push(this.multipleSelection[i].bulletinId)
          }

          bulletinInfoWithdraw(arr).then(() => {
            this.getList()
            this.$notify.info({
              title: '成功',
              message: '已撤回！',
              type: 'success',
              duration: 2000
            })
          })
        }).catch(() => {
          this.$notify({
            type: 'info',
            message: '已取消'
          })
        })*/

      },
      //提交审核
      commitCheck(formName) {
        if (this.$refs.bulletinTable.selection.length <= 0) {
          this.$xxMsg({
            msg : '请至少选择一条数据！'
          })
          return
        }
        if (this.$refs.bulletinTable.selection.length != 1) {
          this.$xxMsg({
            msg : '只能选择一条数据!'
          })
          return
        }

        if(this.$refs.bulletinTable.selection[0].bulletinStatusCode == "under_publish"){
            this.$xxMsg({
              msg : '非法操作!'
            })
            return
        }

        bulletinInfoCommitcheck({
          bulletinId : this.$refs.bulletinTable.selection[0].bulletinId
        }).then(item => {
          console.log(item)
          this.bulletinUserRuleFormVisible = false
          this.getList()
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
        })
      },
      gotoHuiZhi(row){
        this.$router.push({path: '/safety/bulletinUserReceipt', query: {bulletinId: row.bulletinId}})
      },
      gotoView(row){
        this.$router.push({path: '/safety/viewBulletinInfoDetail', query: {id: row.bulletinId,type:'view'}})
      },
      //点击标题跳转通知详情页
      handleDetail(row) {
        console.log(row);
        this.$router.push({path: '/safety/viewBulletinInfoDetail', query: {id: row.bulletinId}})
      },
      // 点击审批，跳转到详情页审批
      handleCheck(row) {
        this.$router.push({path: '/safety/viewBulletinInfoDetail', query: {id: row.bulletinId,type:'check'}});
        ;
      },
      // 点击回执，跳转到回执列表页，查看该通知收到的所有回执
      handleReceipt(row) {
        this.$router.push({path: '/safety/bulletinUserReceipt', query: {id: row.bulletinId}})
      },
      // 通知预览
      preview(formName) {
        const set = this.$refs
        var formrow = this.form

        // set[formName].validate(valid => {
        //   if (valid) {
        this.$router.push({path: '/bulletin/previewBulletinInfo', query: {row: formrow}})
        //   } else {
        //     return false
        //   }
        // })
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate((valid) => {
          if (valid) {
            addObj(this.form)
              .then(() => {
                this.dialogFormVisible = false

                this.getList()
                this.$notify({
                  title: '成功',
                  message: '创建成功',
                  type: 'success',
                  duration: 2000
                })
              })
          } else {
            return false
          }
        })
      },
      cancel(formName) {
        this.dialogFormVisible = false
        const set = this.$refs
        set[formName].resetFields()
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            this.dialogFormVisible = false
            this.form.password = undefined
            putObj(this.form).then(() => {
              this.dialogFormVisible = false
              this.bulletinUserRuleFormVisible = false
              this.getList()
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  .newButton {
    padding: 4px 6px;
    border-radius: 3px;
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

  .selected-num {
    color: #509A8F;
    font-weight: bold;
  }
</style>
