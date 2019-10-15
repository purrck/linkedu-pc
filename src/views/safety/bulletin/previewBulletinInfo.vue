<template>
  <div class="content">
    <review></review>
    <div class="text-center pb20">
      <el-button type="primary" size="small" @click="goBack" class="button-v2-rao border-color-cccccc c000000 bfff">返回</el-button>
    <el-button type="primary" size="small"  class="el-button--small-icon  button-v2-rao b93BF88 " @click= "toAdd">
      保存
    </el-button>

    </div>
  </div>
</template>
<script>
  import { commitCheck,bulletinAdd } from '@/api/safety/bulletin/bulletinInfo'
  import review from '@/components/review/main'

  export default {
    name: 'viewBulletinInfo',
    components : {
      review
    },
    computed : {
      data(){
        return this.$route.query;
      }
    },
    created() {
      console.log(this.$route)

      this.getSelectList()
      this.getBulletinInfoReceiptNum()
    },
    data() {
      return {
        form: {},
        booleanPassList: [
          { itemAttribute: 'Y', itemName: '确认通过' },
          { itemAttribute: 'N', itemName: '驳    回' }
        ],
        bulletinTypeCodeGroupId:"BULLETIN_BULLETININFO_TYPE",
        bulletinTypeCodeList: [],
        bulletinCheckFormVisible: false,
        bulletinInfoContent: this.$route.query.row,
        bulletinInfoReceiptNum: null
      }
    },
    methods: {
      toAdd(){

            //this.form1.effectiveDt = new Date(this.form1.effectiveDt).toISOString().replace("T"," ")
            //this.form1.expiryDt = new Date(this.form1.expiryDt).toISOString().replace("T"," ")
            //this.form1.content = this.$refs.ue.getUEContent();
            bulletinAdd(this.data)
              .then(() => {
                this.$notify({
                  title: '成功',
                  message: '保存成功',
                  type: 'success',
                  duration: 1000
                })
                this.$router.push({ path: '/safety/bulletin' })
              })
      },
      goBack () {
        this.$router.go(-1)
      },
/*      getSelectList() {
        this.listLoading = true
        fetchBulletinTypeCodeList(this.bulletinTypeCodeGroupId).then(response => {
          this.bulletinTypeCodeList = response.data.data
        })
      }*/
      //提交审核
      handleCommitCheck(){
        // const set = this.$refs
        // this.dialogFormVisible = false
        // this.form.password = undefined
        commitCheck(this.bulletinInfoContent).then(() => {
          // this.dialogFormVisible = false
          // this.bulletinUserRuleFormVisible = false
          // this.getList()
          this.$router.push( { path: '/bulletin/bulletinInfo'} )
          this.$notify({
            title: '成功',
            message: '修改成功',
            type: 'success',
            duration: 2000
          })
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
