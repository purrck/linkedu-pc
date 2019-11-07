<template>
  <div class="content" style="width:60%;margin:0 auto">
    <h1 class="mb30">{{bulletinInfoContent.bulletinTitle}}</h1>
    <div  style="display: flex;flex-direction: row">
      <div style="width: 75%;">

        <div style="width:373px;height:682px;border:1px solid #ccc;margin:0 auto"></div>

        <div class="text-center mb20 mt20">
            <el-button class="newButton" type="success" @click="chuli" style="width: 110px;height: 45px">处理</el-button>
            <!--<el-button class="newButton" type="success" @click="handleCheck('form')" style="width: 110px;height: 45px">驳回</el-button>-->
        </div>
      </div>
      <div style="width: 25%;">
          <div class="pa30">
          <p class="mb15">通知类型：{{bulletinInfoContent.bulletinTypeCode}}</p>
          <p class="mb15">是否回执：{{bulletinInfoContent.isNeedReceipt}}</p>
          <p class="mb15">发起人：{{bulletinInfoContent.userName}}</p>
          <p class="mb15">对象用户数：{{bulletinInfoContent.usersNum}}</p>
          <p class="mb15">通知有效期：{{bulletinInfoContent.effectiveDtStr}} 至  {{bulletinInfoContent.expiryDtStr}}</p>
          <p class="mb15">通知时间：{{bulletinInfoContent.publishedDt}}</p>
          <p class="mb15">通知状态：{{bulletinInfoContent.bulletinStatusCode}}</p>
          <p class="mb15">审核详情：内容完整，发布通过</p>
          <p class="mb15"><el-button @click="gotoPage">通知对象范围</el-button></p>
          <p class="mb15"><el-button  @click="gotoDuixiang">通知对象信息</el-button></p>
          <p class="mb15"><el-button @click="gotoHuiZhi">通知回执</el-button></p>
          </div>
      </div>
    </div>
    <el-dialog title="通知审核" :visible.sync="bulletinCheckFormVisible">
      <el-form :model="form" :rules="rules" ref="form" label-width="100px">
        <el-form-item label="审核结果：" prop="booleanPass" style="width: 250px">
          <el-select  v-model="form.booleanPass" placeholder="请选择" maxlength="32">
            <el-option
              v-for="item in booleanPassList"
              :key="item.itemAttribute"
              :label="item.itemName"
              :value="item.itemAttribute"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="审核意见：" prop="rejectReason">
          <el-input  v-model="form.rejectReason" type="textarea" rows=8 placeholder="请输入审核意见"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer" align="center">
        <el-button class="newButton" type="success" @click="submitForm('form')" :loading="loading" style="width: 110px;height: 45px">提交</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
  //import { pass, reject, fetchBulletinTypeCodeList, getObj } from '@/api/safety/bulletin/veiwBulletinInfo'
  import{
    getBulletinInfo,
    bulletinVerifyPass,
    bulletinVerifyReject,
  } from '@/api/safety/bulletin/bulletinInfo'
  export default {
    name: 'viewBulletinInfo',
    created() {
      this.loading = false;
      this.init();
      /*if (this.$route.query) {
        const rows = this.$route.query.row
        getObj(rows).then(response => {
          this.bulletinInfoContent = response.data.data
        })
      }*/
      //this.getSelectList()
    },
    data() {
      return {
        isLoading : false,
        rules: {
          booleanPass: [
            { required: true, message: '请选择审核结果', trigger: 'blur' }
          ],
          rejectReason: [
            { required: true, message: '请输入审核意见', trigger: 'blur' }
          ]
        },
        form: {
          bulletinId: this.$route.query.row,
          rejectReason: ''
        },
        booleanPassList: [
          { itemAttribute: 'Y', itemName: '确认通过' },
          { itemAttribute: 'N', itemName: '驳    回' }
        ],
        bulletinTypeCodeList: [],
        bulletinCheckFormVisible: false,
        bulletinInfoContent: null,
        bulletinInfoReceiptNum: null
      }
    },
    computed:{
      id(){
        return this.$route.query.id;
      },
      loading : {
        get(){
          return this.$store.state.common.isLoading
        },
        set(val){
          this.$store.state.common.isLoading = val;
        }
      }
    },
    methods: {
      gotoDuixiang(){
        this.$router.push({path: '/safety/bulletinUser',query:{ bulletinId: this.id }});

      },
      gotoHuiZhi(){
        this.$router.push({path: '/safety/bulletinUserReceipt',query:{ title : this.bulletinInfoContent.bulletinTitle, bulletinId: this.id }});

      },
      gotoPage(){
        this.$router.push({path: '/safety/objbulletin',query:{ title : this.bulletinInfoContent.bulletinTitle, bulletinId: this.id }});
      },
      init(){

        getBulletinInfo({
          id : this.id
        }).then(response => {
          this.listLoading = false
          this.bulletinInfoContent = response.data.data
        })
      },
      chuli(){
        this.bulletinCheckFormVisible = true;
      },
      tongguo(){
        this.bulletinCheckFormVisible = true;
        /*const h = this.$createElement;
        this.$msgbox({
          title: '消息',
          showInput : true,
          inputType : "textarea",
          inputPlaceholder: "请输入审核结果...",
          showCancelButton: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          beforeClose: (action, instance, done) => {

            if (action === 'confirm') {
              instance.confirmButtonLoading = true;
              instance.confirmButtonText = '执行中...';
              setTimeout(() => {
                done();
                setTimeout(() => {
                  instance.confirmButtonLoading = false;
                }, 300);
              }, 3000);
            } else {
              done();
            }
          }
        }).then(action => {
          // console.log(action)
          this.$message({
            type: 'info',
            message: 'action: ' + action
          });
        });*/
      },
      getSelectList() {
        this.listLoading = true
        fetchBulletinTypeCodeList().then(response => {
          this.bulletinTypeCodeList = response.data.data
        })
      },
      handleCheck() {
        this.bulletinCheckFormVisible = true
      },
      submitForm(formName) {
        const set = this.$refs
        // console.log(this.form)
        // console.log(this.form.booleanPass)
        set[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            if (this.form.booleanPass === 'Y') {
              bulletinVerifyPass({
                bulletinId : this.id,
                rejectReason : this.form.rejectReason
              }).then(response => {
                this.$notify({
                  title: '审核',
                  message: '审核通过！',
                  type: 'success',
                  duration: 2000,
                  onClose:() => {
                    this.bulletinCheckFormVisible = false;
                    this.loading = false;
                    this.$router.push({ path: '/safety/bulletin' })
                  }
                })

              })
            } else if (this.form.booleanPass === 'N') {
              bulletinVerifyReject({
                bulletinId : this.id
              }).then(response => {
                this.$notify({
                  title: '审核',
                  message: '驳回!',
                  type: 'warning',
                  duration: 2000,
                  onClose : () => {
                    this.bulletinCheckFormVisible = false;
                    this.loading = false;
                    this.$router.push({ path: '/safety/bulletin' })
                  }
                })
              })
            }
          } else {
            return false
          }
        })
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">
  h1{
    text-align: center;
    margin-top:50px;
  }
  .content {
    width: 100%;
    overflow-y: auto;
  }
  .receipt-title {
    width: auto;
    height: 40px;
    margin: 50px 100px;
    line-height: 40px;
    font-size: 14px;
    border-bottom: 1px solid #ccc;
  }
  span{
    padding:0  10px ;
  }

  .title-header{
    width: 40px;
    height: 40px;
  }
  .title-two{
    display: flex;
    flex-direction: row;
    height: 40px;
    align-items: center;
  }
  .title-one{
    display: flex;
    flex-direction: row;
    height: 40px;
    align-items: center;
  }
  .receipt-content{
    margin-top: 100px;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

  }
  .receipt-footer{
    margin-top: 200px;
    height: 100px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
  }
  .foot-inner{
    width: 300px;
    flex-direction: row;
    display: flex;
    justify-content: space-around;
  }
</style>
