<template>
  <div>
    <div style="background:#f5f5f5">
      <el-container v-loading="listLoading" element-loading-custom-class="home-loading"
                    style="min-height: 600px"
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.1)">
        <el-main>
          <div class="bfff pb20">
            <div class="flex1 pt20 pl30 marginAuto ">
              <div class="border-right pr30 border-color-C3DBBE p60">
                <div class="f20 c707070">{{form1.bulletinTitle}}</div>
                <div class="c999999 f12 pt10">发布人: {{form1.userName}} &nbsp;&nbsp;&nbsp; 放假通知：{{form1.publishedDt}}
                </div>
                <div class="pt40" style="min-height:430px" v-html="form1.content"></div>
                <el-row class="c999999 pt30">
                  <el-col :span="2">
                    <div class="">
                      <i class="iconfont icon-icon_liulanshu"></i> {{form1.usersReadNum}}
                    </div>
                  </el-col>
                  <el-col :span="2">
                    <i class="iconfont icon-icon_huizhishu"></i> {{form1.hasReceiptNum}}
                  </el-col>
                  <el-col :span="2">
                    <i class="iconfont icon-icon_shoucang"></i> {{form1.favorNum}}
                  </el-col>
                  <el-col :span="2">
                    <i class="iconfont icon-icon_fenxiang"></i> {{form1.shareNum}}
                  </el-col>
                </el-row>
              </div>
              <div class="p40">
                <el-form :label-position="'right'" label-width="165px"
                         ref="formData" :inline="false" :model="form1" size="small">
                  <el-form-item label="通知类型 :" class="school-areaNum">
                    <span :style="{color:form1.bulletinTypeCodeStr && form1.bulletinTypeCodeStr.split(';')[1]}">{{form1.bulletinTypeCodeStr && form1.bulletinTypeCodeStr.split(";")[0]}}</span>
                  </el-form-item>
                  <el-form-item label="是否回执  :" v-if="form1.isNeedReceipt">
                    <span v-if="form1.isNeedReceipt">{{form1.isNeedReceipt == 'Y' ? '是' : '否'}}</span>
                  </el-form-item>
                  <el-form-item label="发起人 :">
                    {{form1.userName}}
                  </el-form-item>
                  <el-form-item label="对象用户数  :">
                    {{form1.usersNum}}
                  </el-form-item>
                  <el-form-item label="通知有效期 :" v-if="form1.effectiveDtStr||form1.expiryDtStr">
                    {{form1.effectiveDtStr}} 至 <br>
                    {{form1.expiryDtStr}}
                  </el-form-item>
                  <el-form-item label="通知时间 :">
                    {{form1.createdDt}}
                  </el-form-item>
                  <el-form-item label="通知状态 :">
                    <span>{{form1.bulletinStatusCode}}</span>
                  </el-form-item>
                  <el-form-item v-show="form1.approveTOList" label="审核详情 :" class="orgIntroduction">
                    <div>
                      <el-table
                        :data="form1.approveTOList"
                        style="width: 400px">
                        <el-table-column
                          prop="userName"
                          label="处理人"
                          width="180">
                        </el-table-column>
                        <el-table-column
                          prop="approveContent"
                          label="审批内容">
                        </el-table-column>
                        <el-table-column
                          prop="approvedDt"
                          label="审批时间">
                        </el-table-column>
                      </el-table>
                    </div>
                  </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary" size="small" class="button-v2-rao border-color-cccccc c000000 bfff">
                      <router-link :to="{path: '/safety/bulletinUser',query:{ bulletinId: id }}">
                        通知对象信息
                      </router-link>
                    </el-button>
                  </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary" size="small" class="button-v2-rao border-color-cccccc c000000 bfff">
                      <router-link
                        :to="{path: '/safety/objbulletin',query:{ title : form1.bulletinTitle, bulletinId: id }}">
                        通知对象范围
                      </router-link>
                    </el-button>
                  </el-form-item>
                  <el-form-item label="">
                    <el-button type="primary" size="small" class="button-v2-rao b93BF88 ">
                      <router-link
                        :to="{path: '/safety/bulletinUserReceipt',query:{ title : form1.bulletinTitle, bulletinId: id }}">
                        通知回执
                      </router-link>
                    </el-button>
                  </el-form-item>
                </el-form>
              </div>
            </div>


            <el-dialog title="通知审核" :visible.sync="bulletinCheckFormVisible">
              <el-form :model="form" :rules="rules" ref="form" label-width="100px">
                <el-form-item label="审核结果：" prop="booleanPass" style="width: 250px">
                  <el-select v-model="form.booleanPass" placeholder="请选择" maxlength="32">
                    <el-option
                      v-for="item in booleanPassList"
                      :key="item.itemAttribute"
                      :label="item.itemName"
                      :value="item.itemAttribute"
                    ></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="审核意见：" prop="rejectReason">
                  <el-input v-model="form.rejectReason" type="textarea" rows=8 placeholder="请输入审核意见"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer" align="center">
                <el-button class="newButton" type="success" @click="shenhe('form')" :loading="loading"
                           style="width: 110px;height: 45px">提交
                </el-button>
              </div>
            </el-dialog>
          </div>
        </el-main>
      </el-container>

      <div class="pa30 mt10 bfff" v-show="pageType == 'huizhi'">
        <div class="bF5F5F5 pt5 pb5 c707070">
          回执内容：
        </div>
        <div class="flex1 pa20">
          <div class="pr10">
            <img class="radius100" style="width:60px;height:60px;" src="/static/img/timg.jpg"/>
          </div>
          <div class="flex1 space-between flex-direction pt5 pb5">
            <div><span class="f16 c707070">{{form1.receiptUserName}}</span> &nbsp;&nbsp; <span class="f14 c707070">{{form1.receiptDtStr}}</span>
            </div>
            <div class="pt5 f14 c707070">{{form1.receiptContent}}</div>
          </div>
        </div>
      </div>

      <div class="pull-center mt-30 mb15">
        <el-button type="primary" v-show="pageType == 'check'" size="small" @click="chuli"
                   class="el-button--small-icon  button-v2-rao b93BF88 ">
          处理
        </el-button>
        <el-button type="primary" size="small" class="el-button--small-icon  button-v2-rao b93BF88 " @click="close">关闭
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import commonApi from '@/api/common/common'
  import {
    bulletinUserReceiptAd,
    bulletinVerifyPass,
    bulletinVerifyReject,
    getBulletinInfo
  } from '@/api/safety/bulletin/bulletinInfo'

  export default {
    name: 'viewBulletinInfo',
    created() {
      this.init()
    },
    data() {
      return {
        rules: {
          booleanPass: [
            {required: true, message: '请选择审核结果', trigger: 'blur'}
          ],
          rejectReason: [
            {required: true, message: '请输入审核意见', trigger: 'blur'}
          ]
        },
        booleanPassList: [
          {itemAttribute: 'Y', itemName: '确认通过'},
          {itemAttribute: 'N', itemName: '驳    回'}
        ],
        loading: false,
        listLoading: false,
        bulletinCheckFormVisible: false,
        form1: {},
        form: {
          booleanPass: "",
          rejectReason: ""
        }
      }
    },
    computed: {
      pageType() {
        return this.$route.query.type
      },
      id() {
        return this.$route.query.id
      },
      bulletinReceiptId() {
        return this.$route.query.bulletinReceiptId
      }
    },
    methods: {
      shenhe(formName) {
        const set = this.$refs
        set[formName].validate((valid) => {
          if (valid) {
            this.loading = true;
            if (this.form.booleanPass === 'Y') {
              bulletinVerifyPass({
                bulletinId: this.id,
                rejectReason: this.form.rejectReason
              }).then(response => {
                this.$notify({
                  title: '审核',
                  message: '审核通过！',
                  type: 'success',
                  duration: 2000,
                  onClose: () => {
                    this.bulletinCheckFormVisible = false;
                    this.loading = false;
                    this.$router.push({path: '/safety/bulletin'})
                  }
                })

              })
            } else if (this.form.booleanPass === 'N') {
              bulletinVerifyReject({
                bulletinId: this.id
              }).then(response => {
                this.$notify({
                  title: '审核',
                  message: '驳回!',
                  type: 'warning',
                  duration: 2000,
                  onClose: () => {
                    this.bulletinCheckFormVisible = false;
                    this.loading = false;
                    this.$router.push({path: '/safety/bulletin'})
                  }
                })
              })
            }
          } else {
            return false
          }
        })
      },
      chuli() {
        this.bulletinCheckFormVisible = true;
      },
      gotoDuixiang() {
        this.$router.push({path: '/safety/bulletinUser', query: {bulletinId: this.id}});

      },
      gotoHuiZhi() {
        this.$router.push({
          path: '/safety/bulletinUserReceipt',
          query: {title: this.form1.bulletinTitle, bulletinId: this.id}
        });

      },
      gotoPage() {
        this.$router.push({path: '/safety/objbulletin', query: {title: this.form1.bulletinTitle, bulletinId: this.id}});
      },
      init() {

        this.listLoading = true
        if (this.pageType == "huizhi") {
          bulletinUserReceiptAd({
            bulletinReceiptId: this.bulletinReceiptId
          }).then(response => {
            this.listLoading = false
            this.form1 = response.data.data
          })
        } else {
          getBulletinInfo({
            id: this.id
          }).then(response => {
            this.listLoading = false
            this.form1 = response.data.data

            commonApi.getCodeIntType('bulletinStatus').then(item => {
              item.data.data.map(item => {
                if (item.codeId.indexOf(this.form1.bulletinStatusCode) != -1) {
                  this.form1.bulletinStatusCode = item.codeDesc
                }
              })
            })
          })
        }

      },
      close() {
        this.$router.push({path: '/safety/bulletin'})
      }
    }
  }
</script>

<style scoped="scoped" lang="scss">

</style>
