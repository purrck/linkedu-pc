<template>
<el-container v-loading="listLoading" element-loading-custom-class="home-loading" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)">
    <el-main>

    <div class="edit-box">


      <!--<div class="mb-20">基本信息
        <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
        <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
      </div>-->

      <!-- 编辑状态或者新增 -->
      <el-form :label-position="'right'" label-width="200px" ref="formData" :inline="false"
               :model="form1" :rules="rules" size="small">
        <el-col :span="24">
          <el-form-item label="通知类别：" prop="bulletinTypeCode">
            <el-select class="select-v2-rao" v-model="form1.bulletinTypeCode" placeholder="请选择">
              <el-option
                v-for="item in bulletinTypeCodeList"
                :key="item.codeId"
                :label="item.codeDesc"
                :value="item.codeId"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="是否回执：" prop="isNeedReceipt">
            <el-select class="select-v2-rao" v-model="form1.isNeedReceipt" placeholder="请选择">
              <el-option
                v-for="item in isNeedReceiptList"
                :key="item.itemAttribute"
                :label="item.itemName"
                :value="item.itemAttribute"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="有效日期：">
              <el-col :span="5">
              <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao" type="date" placeholder="开始日期" value-format="yyyy-MM-dd HH:mm" v-model="form1.effectiveDt"
                              ></el-date-picker>
              </el-col>
              <el-col :span="1" class="text-center">
            -
            </el-col>
            <el-col :span="5">
              <el-date-picker class="date-v2-rao" popper-class="date-popper-v2-rao" type="date" placeholder="结束日期" value-format="yyyy-MM-dd HH:mm" v-model="form1.expiryDt"
                              ></el-date-picker>
            </el-col>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="通知标题：" prop="bulletinTitle">
            <el-input v-model="form1.bulletinTitle" class="input-v2-rao" placeholder="通知标题"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="通知内容：" prop="content">
            <el-col :span="12">
            <editor v-model="form1.content" :true-height="350"/>
            </el-col>
            <!--<UEditor :config="config" ref="ue" :defaultMsg="form1.content" style="line-height: 1;"></UEditor>-->
          </el-form-item>
        </el-col>
        <el-col :span="24">
        <el-form-item>
          <!--<el-button v-if="dialogStatus==='create'" type="primary" class="button-v2-rao b93BF88" @click="handlerReview">预览</el-button>-->
          <el-button v-if="dialogStatus==='create'" type="primary" class="button-v2-rao b93BF88" @click="create('formData')">保存</el-button>
          <el-button v-if="dialogStatus==='create'" type="primary" class="button-v2-rao b93BF88" @click="nextPage('formData')">下一步</el-button>
          <el-button v-if="dialogStatus==='update'" type="primary" class="button-v2-rao b93BF88" @click="update('formData')">保存</el-button>
          <el-button type="primary" class="button-v2-rao border-color-cccccc c000000 bfff" @click="goBack">取消</el-button>
        </el-form-item>
        </el-col>
      </el-form>
    </div>
    <!--<review></review>-->

    </el-main>

  </el-container>
</template>

<script>
  import {
    fetchList,
    addObj,
    putObj,
    getRoles,
    getdepament,
    getSegment,
    getGrade,
    getClass,
    fetchBulletinTypeCodeList,
    commitCheck,
    getObj,
    withdrawInfo,

    bulletinAdd,
    getBulletinInfo,
    UpadteBulletinInfo,
    bulletinAddNew,
  } from '@/api/safety/bulletin/bulletinInfo'
  import { mapGetters } from 'vuex'
  import editor from '@/components/editor/editor'
  import commonApi from '@/api/common/common'
  import review from '@/components/review/main'

  export default {
    name: 'table_tbl_bulletin_info',
    directives: {
    },
    components: {
      editor,
      review,
    },
    computed: {
      ...mapGetters([
        'permissions','review'
      ]),
      rangeRule: function() {
        let rule = {}
        const val = this.form.bulletinUserRuleListVO.infoRoleId
        if (val === 'school_leader') {
          rule = {
            origanization: [
              { required: true, message: '请选择通知组织范围', trigger: 'blur' }
            ],
            infoRoleId: [
              { required: true, message: '请选择通知角色范围', trigger: 'blur' }
            ]
          }
        } else if (val === 'subject_teacher') {
          rule = {
            infoRoleId: [
              { required: true, message: '请选择通知角色范围', trigger: 'blur' }
            ],
            segmentOptions: [
              { required: true, message: '请选择通知学段范围', trigger: 'blur' }
            ],
            gradeOptions: [
              { required: true, message: '请选择通知学级范围', trigger: 'blur' }
            ]
          }
        } else {
          rule = {
            infoRoleId: [
              { required: true, message: '请选择通知角色范围', trigger: 'blur' }
            ],
            segmentOptions: [
              { required: true, message: '请选择通知学段范围', trigger: 'blur' }
            ],
            gradeOptions: [
              { required: true, message: '请选择通知学级范围', trigger: 'blur' }
            ],
            classOptions: [
              { required: true, message: '请选择通知班级范围', trigger: 'blur' }
            ]
          }
        }
        return rule
      }
    },
    data() {
      const checkContent = (rule, value, callback) => {
        if(value == ""){
          callback(new Error("请输入通知内容"))
        }else{
          callback()
        }
      }
      return {
        config: {
          initialFrameWidth: null,
          initialFrameHeight: 350
        },
        bulletinReviewVisible : false,
        uploadLimit: 1,
        dialogImageUrl: '',
        dialogVisible: false,
        dialogStatus: 'create',
        listLoading: false,

        pickTime: {
          disabledDate(time) {
            return time.getTime() <= Date.now()
          }
        },
        rules: {
          bulletinTitle: [
            { required: true, message: '请输入通知标题', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
          ],
          isNeedReceipt: [
            { required: true, message: '请选择是否需要回执', trigger: 'blur' }
          ],
          bulletinTypeCode: [
            { required: true, message: '请选择通知类型', trigger: 'blur' }
          ],
          effectiveDt: [
            { type: 'date', required: true, message: '请选择通知日期', trigger: 'blur' }
          ],
          expiryDt: [
            { type: 'date', required: true, message: '请选择通知日期', trigger: 'blur' }
          ],
          content: [
            { validator: checkContent, trigger: 'blur' }
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

        isNeedReceiptList: [
          { itemAttribute: 'Y', itemName: '是' },
          { itemAttribute: 'N', itemName: '否' }
        ],
        form1: {
          bulletinTitle: null,
          content: null,
          effectiveDt: null,
          expiryDt: null,
          isNeedReceipt: null,
          bulletinTypeCode: null
        },
        form: {
          content: null,
          bulletinTypeCode: null,
          expiryDt: null,
          effectiveDt: null,
          isNeedReceipt: null,
          bulletinTitle: null,
          periodInfo: null,
          infoRoleId: 'school_leader',
          bulletinUserRuleListVO: {
            infoRoleId: 'school_leader',
            classIdList: [],
            gradeIdList: [],
            segmentIdList: [],
            departmentIdList: []
          },

          userBelongedNames: []
        },
        // 复选框勾选
        bulletinUserRuleFormVisible: false,
        textMap: {
          update: '编辑',
          create: '创建',
          bulletinrule: '选择通知对象'
        },
        tableKey: 0,
        bulletinTypeCodeGroupId: 'BULLETIN_BULLETININFO_TYPE',
        bulletinStatusCodeGroupId: 'BULLETIN_BULLETININFO_STATUS',
        bulletinTypeCodeList: [],

        checkAll: false,
        checkedroles: ['上海', '北京'],
        bulletinUserRuleListVO: {
          infoRoleId: 'adviser_parent',
          classIdList: [],
          gradeIdList: [],
          segmentIdList: [],
          departmentIdList: []
        },
        roleOptions: [],	    // 部门
        origanizaOptions: [],  // 组织
        gradeOptions: [],       // 学级
        classOptions: [],      // 班级
        segmentOptions: [],    // 学段
        isIndeterminate: true
      }
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
      this.tongZhiLeiXing();
      //this.getSelectList();
      this.init();
    },
    methods: {
      nextPage(formName){

        const set = this.$refs
        set[formName].validate((valid) => {
          if (valid) {
            bulletinAddNew(this.form1)
              .then((res) => {
                this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.push({ path: `/safety/sendToObj?bulletinId=${res.data.data}` })
              })
          } else {
            return false
          }
        })

      },
      getUEContent() {
        let content = this.$refs.ue.getUEContent();
        this.$notify({
          title: '获取成功，可在控制台查看！',
          message: content,
          type: 'success'
        });
        console.log(content)
      },
      handlerReview(){
        //let content = this.$refs.ue.getUEContent();
        let content = this.form1.content;
        var storage=window.localStorage;
            storage.setItem("reviewContent",content);
        //this.review.visible = true;
        console.log(this.form1)
        this.$router.push({ path: `/safety/preview` , query : this.form1 })

      },
      init(){
        if (this.$route.query.id) { // 编辑状态
          this.dialogStatus = 'update'
          const rows = this.$route.query
          const id = rows.id
          this.listLoading = true
          getBulletinInfo({
            id : id
          }).then(response => {
            this.listLoading = false

            this.form1 = response.data.data


          })
          /*getObj(id).then(response => {
            this.form = response.data.data
            this.dealVO(this.form.bulletinUserRuleListVO)
            console.log(response.data.data)
          }).then(() => {
            if (this.form.bulletinUserRuleListVO.segmentIdList.length) {
              getGrade(this.form.bulletinUserRuleListVO.segmentIdList).then(res => {
                this.gradeOptions = res.data.data
              }).then(() => {
                const obj = {}
                obj.schoolId = '520'
                obj.gradeIds = this.form.bulletinUserRuleListVO.gradeIdList
                if (this.form.bulletinUserRuleListVO.gradeIdList.length) {
                  getClass(obj).then(res => {
                    this.classOptions = res.data.data
                  })
                }
              })
            }
          })
          if (this.form.bulletinUserRuleListVO === null) {
            this.form.bulletinUserRuleListVO = this.bulletinUserRuleListVO
          }*/
        } else if (this.$route.query.bulletinId) { // 复制模板状态
          const id = this.$route.query.bulletinId
          getObj(id).then(res => {
            this.form = res.data.data
            this.form.bulletinUserRuleListVO = this.bulletinUserRuleListVO
            this.form.bulletinId = ''
            console.log(res.data.data)
          })
        }
      },
      tongZhiLeiXing(){
        commonApi.getCodeIntType('bulletinType').then(item => {
          this.bulletinTypeCodeList = item.data.data
        })
      },
      dealVO(data) {
        for (const it in data) {
          if (!data[it]) {
            data[it] = []
            if (it === 'infoRoleId') {
              data[it] = 'adviser_parent'
            }
          }
        }
        this.form.bulletinUserRuleListVO = data
      },


      getSelectList() {
        this.listLoading = true
        fetchBulletinTypeCodeList(this.bulletinTypeCodeGroupId).then(response => {
          this.bulletinTypeCodeList = response.data.data
        })

        getRoles().then(response => {
          this.roleOptions = response.data.data
        })
        getdepament().then(response => {
          this.origanizaOptions = response.data.data
        })
        getSegment({ schoolOrgId: 1 }).then(response => {
          this.segmentOptions = response.data.data
        })
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
        return true
      },

      getEditorValue(val) {
        this.form1.content = val
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

      // 通知撤回
      handleWithdraw(row) {
        withdrawInfo(row).then(() => {
          // this.bulletinUserRuleFormVisible = false
          this.$notify.info({
            title: '成功',
            message: '已撤回！',
            type: 'success',
            duration: 2000
          })
        })
      },
      // 改变角色重置所有选项
      changeRole(val) {
        this.bulletinUserRuleListVO = {
          infoRoleId: val,
          segmentOptions: [],
          gradeOptions: [],
          classOptions: [],
          origanization: []
        }
        this.form.bulletinUserRuleListVO = this.bulletinUserRuleListVO
        const that = this
        // that.$refs['bulletinUserRuleForm'].clearValidate()
      },

      // 提交审核
      commit(formName) {
        const that = this
        const set = that.$refs
        console.log(this.form)
      // set[formName].validate(valid => {
        if (1) {
          commitCheck(this.form).then(() => {
            this.bulletinUserRuleFormVisible = false
            this.$notify({
              title: '成功',
              message: '提交成功',
              type: 'success',
              duration: 2000
            })
            this.$router.push({ path: '/bulletin/bulletinInfo' })
          })
        } else {
          return false
        }
        // })
      },
      // 点击标题跳转通知详情页
      handleDetail(row) {
        this.$router.push({ path: '/safety/viewBulletinInfoDetail', query: { row: row }})
      },
      // 点击审批，跳转到详情页审批
      handleCheck(row) {
        this.$router.push({ path: '/safety/viewBulletinInfoCheck', query: { row: row }})
      },
      // 点击回执，跳转到回执列表页，查看该通知收到的所有回执
      handleReceipt(row) {
        this.$router.push({ path: '/safety/bulletinUserReceipt', query: { row: row }})
      },
      // 通知预览
      preview(formName) {
        const set = this.$refs
        var formrow = this.form

        // set[formName].validate(valid => {
        //   if (valid) {
        this.$router.push({ path: '/bulletin/previewBulletinInfo', query: { row: formrow }})
        //   } else {
        //     return false
        //   }
        // })
      },
      create(formName) {
        const set = this.$refs
        set[formName].validate((valid) => {
          if (valid) {
            bulletinAddNew(this.form1)
              .then(() => {
                this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.push({ path: '/safety/bulletin' })
              })
          } else {
            return false
          }
        })
      },
      cancel(formName) {
        const set = this.$refs
        set[formName].resetFields();
        this.$router.push({ path: '/safety/bulletin' })
      },
      goBack () {
        this.$router.go(-1)
      },
      update(formName) {
        const set = this.$refs
        set[formName].validate(valid => {
          if (valid) {
            //this.form1.effectiveDt = new Date(this.form1.effectiveDt).toISOString().replace("T"," ")
            //this.form1.expiryDt = new Date(this.form1.expiryDt).toISOString().replace("T"," ")
            UpadteBulletinInfo(this.form1).then(() => {
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 1000,
                onClose : () => {
                  this.$router.push({ path: '/safety/bulletin' })
                }
              })
            })

            /*this.form.password = undefined
            putObj(this.form).then(() => {
              this.bulletinUserRuleFormVisible = false
              this.$notify({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 2000
              })
              this.$router.push({ path: '/bulletin/bulletinInfo' })
            })*/
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

  el-dialog {
    .el-dialog {
      height: 600px;
    }
  }

</style>
