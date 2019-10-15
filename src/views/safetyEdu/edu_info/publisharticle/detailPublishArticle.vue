<template>
  <div class="detailPublishArticle-wrap">
    <div style="width: 100%;height: 100%;background-color: #F5F5F5;">
      <header class="header">
        <div class="module-name">
          {{state}}
        </div>
      </header>

      <section class="main-add" v-if="moduleType === 'add'">
        <PhoneModel class="phone-model" :data="formData"></PhoneModel>
        <div class="main--form">
          <el-form ref="form" :model="formData" label-width="80px" class="edit-form">
            <el-form-item label="类别">
              <el-select size="small" class="select-v2-rao" v-model="formData.columnId" @change="changeSelect"
                         placeholder="请您选择">
                <el-option v-for="(item, index) of classifications"
                           :key="index"
                           :label="item.columnName"
                           :value="item.columnId">
                </el-option>
              </el-select>
              <el-select size="small" class="select-v2-rao" v-model="formData.childColumnId" placeholder="请您选择">
                <el-option v-for="(item, index) of subjectClassifications"
                           :key="index"
                           :label="item.columnName"
                           :value="item.columnId">
                </el-option>
              </el-select>
              <!--<el-select size="small" v-model="formData.columnId" placeholder="请选择栏目" @change="changeSelect">-->
              <!--<el-option v-for="(item,index) of columnNames" :key="index" :label="item.columnName" :value="item.columnId"></el-option>-->
              <!--</el-select>-->
              <!---->
              <!--<el-select size="small" v-model="formData.childColumnId" placeholder="请选择子栏目">-->
              <!--<el-option v-for="(item,index) of childrenColumns" :key="index" :label="item.columnName" :value="item.columnId"></el-option>-->
              <!--</el-select>-->
            </el-form-item>

            <el-form-item label="标题">
              <el-input size="small" class="input-v2-rao" v-model="formData.title" placeholder="请输入标题"></el-input>
            </el-form-item>

            <el-form-item label="封面" class=orgIntroduction>
              <UploadFiles :many="3" :imagelist="formData.imagePathList" @uploadData="uploadData"></UploadFiles>
            </el-form-item>

            <el-form-item label="正文" class="orgIntroduction">
              <UEditor  ref="ue" :defaultMsg="formData.content" v-on:change="getChangeHtml" style="line-height: 1;"></UEditor>
            </el-form-item>

            <el-form-item label="作者">
              <el-input size="small" class="input-v2-rao" v-model="formData.author" placeholder="请输入作者"></el-input>
            </el-form-item>

            <el-form-item label="来源">
              <el-input size="small"  class="input-v2-rao" v-model="formData.origin" placeholder="请输入来源"></el-input>
            </el-form-item>

            <!--<el-form-item label="发送对象">-->
            <!--<el-checkbox-group size="small" v-model="formData.sendObj">-->
            <!--<el-checkbox v-for="(obj, index) of sendObjs" :label="obj.id" :key="index">{{obj.label}}</el-checkbox>-->
            <!--</el-checkbox-group>-->
            <!--</el-form-item>-->

            <el-form-item label="">
              <el-button size="small" type="primary" @click="submit">保存</el-button>
              <el-button size="small" type="primary" @click="submitCheck">提交审核</el-button>
              <el-button size="small" plain @click="$router.go(-1)">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </section>
      <section class="main-edit" v-if="moduleType === 'edit'">
        <PhoneModel class="phone-model" :data="formData"></PhoneModel>
        <div class="main--form">
          <el-form ref="form" :model="formData" label-width="80px" class="edit-form">

            <el-form-item label="类别">
              <el-select size="small" class="select-v2-rao" v-model="formData.columnId" @change="changeSelect"
                         placeholder="请您选择">
                <el-option v-for="(item, index) of classifications"
                           :key="index"
                           :label="item.columnName"
                           :value="item.columnId">
                </el-option>
              </el-select>
              <el-select size="small" class="select-v2-rao" v-model="formData.childColumnId" placeholder="请您选择">
                <el-option v-for="(item, index) of subjectClassifications"
                           :key="index"
                           :label="item.columnName"
                           :value="item.columnId">
                </el-option>
              </el-select>
              <!--<el-select size="small" v-model="formData.columnId" placeholder="请选择栏目" @change="changeSelect">-->
              <!--<el-option v-for="(item,index) of columnNames" :key="index" :label="item.columnName" :value="item.columnId"></el-option>-->
              <!--</el-select>-->
              <!---->
              <!--<el-select size="small" v-model="formData.childColumnId" placeholder="请选择子栏目">-->
              <!--<el-option v-for="(item,index) of childrenColumns" :key="index" :label="item.columnName" :value="item.columnId"></el-option>-->
              <!--</el-select>-->
            </el-form-item>

            <el-form-item label="标题">
              <el-input size="small" class="input-v2-rao" v-model="formData.title" placeholder="请输入标题"></el-input>
            </el-form-item>

            <el-form-item label="封面" class="orgIntroduction">
              <UploadFiles :many="3" :imagelist="formData.imagePathList" @uploadData="uploadData"></UploadFiles>
            </el-form-item>

            <el-form-item label="正文" class="orgIntroduction">
              <!--<Editor v-model="formData.content"></Editor>-->
              <UEditor  ref="ue" :defaultMsg="formData.content" v-on:change="getChangeHtml" style="line-height: 1;"></UEditor>
            </el-form-item>

            <el-form-item label="作者">
              <el-input size="small" class="input-v2-rao" v-model="formData.author" placeholder="请输入作者"></el-input>
            </el-form-item>

            <el-form-item label="来源">
              <el-input size="small" class="input-v2-rao" v-model="formData.origin" placeholder="请输入来源"></el-input>
            </el-form-item>

            <!--<el-form-item label="发送对象">-->
            <!--<el-checkbox-group size="small" v-model="formData.sendObj">-->
            <!--<el-checkbox v-for="(obj, index) of sendObjs" :label="obj.id" :key="index">{{obj.label}}</el-checkbox>-->
            <!--</el-checkbox-group>-->
            <!--</el-form-item>-->

            <el-form-item label="">
              <el-button size="small" type="primary" @click="submit">保存</el-button>
              <el-button size="small" type="primary" @click="submitCheck">提交审核</el-button>
              <el-button size="small" plain @click="$router.go(-1)">取消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </section>
      <section class="main-detail" v-if="moduleType === 'detail'">
        <div class="detail--preview">
          <div class="detail--preview--header">
            <h3 class="title">{{formData.title}}</h3>
            <div class="author">
              <span>发布人: {{formData.author}}</span>
              <span>{{formData.columnName}}</span>
              <span>{{formData.childColumnName}}</span>
              <span>{{formData.publishedDt}}</span>
            </div>
            <div class="topExpDate iconfont icon-icon_zhiding" v-if="formData.isToTop">
              {{formData.topStartTime}} 至 {{formData.topEndTime}}
            </div>
          </div>
          <div class="detail--preview--content">
            <div v-html="formData.content"></div>
          </div>
          <div class="detail--preview--handle">
            <div class="iconfont icon-icon_liulanshu">
              <span style="margin-left: 5px;">{{formData.allRead}}</span>
            </div>
            <div class="iconfont icon-icon_huizhishu">
              <span style="margin-left: 5px;">{{formData.commentNum}}</span>
            </div>
            <div class="iconfont icon-icon_dianzanshu">
              <span style="margin-left: 5px;">{{formData.praiseNum}}</span>
            </div>

            <div class="iconfont icon-icon_shoucang">
              <span style="margin-left: 5px;">{{formData.favorNum}}</span>
            </div>
            <div class="iconfont icon-icon_fenxiang">
              <span style="margin-left: 5px;">{{formData.shareNum}}</span>
            </div>
          </div>
        </div>
        <div class="detail--comment">
          <div class="main-detail--comment--item" v-for="(item,index) of formData.approveTOList" :key="index">
            <div class="main-detail--comment--item--title">操作备注:</div>
            <div class="main-detail--comment--item--content">{{item.approveContent}}</div>
          </div>
          <div class="comment-btn">
            <el-button size="small" type="primary" @click="$router.go(-1)">返回</el-button>
          </div>
        </div>
      </section>

      <section class="main-check" :class="{center: moduleType === 'check'}" v-if="moduleType === 'check'">
        <PhoneModel class="phone-model" :data="formData"></PhoneModel>
        <div class="btn">
          <el-button type="primary" @click="checkStatusDialogVisible = true">提交</el-button>
          <el-button type="primary" @click="$router.go(-1)">取消</el-button>
        </div>

        <el-dialog
          title="提示"
          :visible.sync="checkStatusDialogVisible"
          center
          width="25%">
          <el-input type="textarea" placeholder="请输入理由" v-model="rejectReason"></el-input>
          <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="pass">通过</el-button>
            <el-button size="small" type="primary" @click="reject">驳回</el-button>
          </span>
        </el-dialog>
      </section>
    </div>
  </div>
</template>

<script>
  import PhoneModel from '../../../../components/phoneModel'
  import UploadFiles from '../../../../components/upload/uploadFileV1'
  import Editor from '../../../../components/editor/editor'
  import api from './publisharticleUrl'
  import UEditor from "../../../../components/editor/ueditor";

  /**
   * userName: 'DengShen'
   * createTime: '2019/2/21 16:41'
   */
  export default {
    name: 'detailPublishArticle',
    props: {},
    components: {UEditor, Editor, UploadFiles, PhoneModel},
    computed: {
      moduleType() {
        return this.$route.params.type
      },
      state() {
        let moduleName = '资讯'
        let type = ''
        switch (this.$route.params.type) {
          case 'add':
            type = '新增'
            break
          case 'edit':
            type = '编辑'
            break
          case 'detail':
            type = '详情'
            break
          case 'check':
            type = '审核'
        }
        return type + moduleName
      }
    },
    data() {
      return {
        sendObjects: [],
        status: [],
        classifications: [],
        subjectClassifications: [],
        rejectReason: '',
        checkStatusDialogVisible: false,
        type: '',
        articleId: '',
        columnNames: [],
        childrenColumns: [],
        sendObjs: [
          {label: '家长端', id: '1'},
          {label: '教师端', id: '2'},
          {label: '安防端', id: '3'},
        ],
        formData: {
          author: '作者名',
          childColumnId: null,
          columnId: null,
          columnName: null,
          content: null,
          imagePathList: null,
          origin: null,
          title: '标题',
          viewNum: 0,
          time: new Date().toLocaleDateString()
        }
      }
    },
    mounted() {
      this.articleId = this.$route.params.id
      api.getColumnSelect().then(res => {
        this.classifications = res.data.data
      })
      this.init()
      this.$nextTick(() => {
      })
    },
    methods: {
      async init() {
        console.log(`detailPublishArticle is running...`)
        await api.getColumnSelect().then(res => {
          this.columnNames = res.data.data
        })
        if (this.moduleType === 'add') {
          return
        }
        api.getObj(this.articleId).then(res => {
          console.log(res)
          this.formData = Object.assign({}, this.formData, res.data.data)
          if (this.formData.parentId) {
            this.formData.childColumnId = this.formData.columnId
            this.formData.columnId = this.formData.parentId
            this.formData.imagePathList = this.formData.imagePathList.join(',')
            this.subjectClassifications = this.columnNames.find(item => {
              return item.columnId === this.formData.columnId
            }).childrenColumns
            this.childrenColumns.push({
              columnName: this.formData.columnName,
              columnId: this.formData.childColumnId
            })
          }
        })
      },
      uploadData(val) {
        this.formData.imagePathList = val
      },
      getChangeHtml (val) {
        console.log(val)
        this.formData.content = val
      },
      changeSelect(id) {
        this.subjectClassifications = this.columnNames.find(item => {
          return item.columnId === id
        }).childrenColumns
        this.formData.columnName = this.columnNames.find(item => {
          return item.columnId === id
        }).columnName
        this.formData.childColumnId = ''
      },
      editData() {
        this.formData.content = this.$refs.ue.getUEContent()
        return new Promise(resolve => {
          if (this.formData.childColumnId) {
            this.formData.parentId = this.formData.columnId
            this.formData.columnId = this.formData.childColumnId
            delete this.formData.childColumnId
          } else {
            delete this.formData.parentId
          }
          // alert(typeof (this.formData.imagePathList));
          if (typeof (this.formData.imagePathList) === 'string') {
            this.formData.imagePathList = this.formData.imagePathList.split(',')
          }
          if (this.moduleType === 'add' && this.articleId === '0') {
            api.addObj(this.formData).then(res => {
              this.$message.success('新增成功')
              this.articleId = res.data.data;
              resolve(res.data.data)
            })
          } else {
            this.formData.articleId = this.articleId;
            this.formData.status = 'editing'
            api.putObj(this.formData).then(res => {
              this.$message.success('修改成功');
              resolve(this.articleId)
            })
          }
        })
      },

      submit (){

        this.editData()
      },
      submitCheck() {
        this.editData().then(res => {
          let articleId = res
          api.commit({articleId}).then(res => {
            this.$router.go(-1)
          })
        })

      },
      pass() {
        api.pass({articleId: this.articleId, rejectReason: this.rejectReason}).then(res => {
          this.checkStatusDialogVisible = false
          if (res.data.resultCode === '000000') {
            this.$message.success(res.data.message)
            this.$router.go(-1)
          } else {
            this.$message.error(res.data.message)
          }
        })
      },
      reject() {
        api.reject({articleId: this.articleId, rejectReason: this.rejectReason}).then(res => {
          this.checkStatusDialogVisible = false
          if (res.data.resultCode === '000000') {
            this.$message.success(res.data.message)
            this.$router.go(-1)
          } else {
            this.$message.error(res.data.message)
          }
        })
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .detailPublishArticle-wrap {
    background-color: #f5f5f5;

    > div {
      padding: 30px;
      box-sizing: border-box;
    }

    .header {
      .module-name {
        width: 76px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        font-size: 14px;
        background-color: #93BF88;
        color: #fff;
        margin-bottom: 40px;
      }
    }

    .main-add {
      display: flex;
      border-radius: 4px;

      .phone-model {
        margin-left: 20px;
      }

      .main--form {
        padding: 10px;
        margin-left: 77px;
        flex: 1;
        background-color: #fff;
      }
    }

    .main-detail {
      padding: 30px;
      display: flex;
      background-color: #fff;

      .detail--preview {
        flex: 1;
        border-right: 1px solid #e8e8e8;
        padding-right: 60px;

        .detail--preview--header {
          .title {
            font-size: 18px;
            color: #707070;
            margin-bottom: 10px;
          }

          .author {
            font-size: 12px;
            color: #999999;

            span {
              display: inline-flex;
              align-items: center;

              &:not(:last-child) {
                margin-right: 10px;
              }
            }
          }

          .topExpDate {
            font-size: 12px;
            color: #999999;
          }
        }

        .detail--preview--content {
          padding: 10px 0;
        }

        .detail--preview--handle {
          display: flex;
          align-items: center;
          color: #999;
          font-size: 12px;

          > div {
            margin-right: 10px;
          }
        }
      }

      .detail--comment {
        flex: 1;
        padding-left: 60px;
        box-sizing: border-box;

        .main-detail--comment--item {
          border: 1px solid #F5F5F5;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;

          .main-detail--comment--item--title {
            height: 40px;
            display: flex;
            align-items: center;
            padding-left: 20px;
            background-color: #f5f5f5;
            border-radius: 4px 4px 0 0;
          }

          .main-detail--comment--item--content {
            padding: 20px;
            font-size: 14px;
            color: #707070;
          }
        }

        .comment-btn {
          margin-top: 30px;
        }
      }
    }

    .main-edit {
      display: flex;
      border-radius: 4px;

      .center {
        /*display: flex;*/
        /*flex-direction: column;*/
        /*justify-content: center;*/
      }

      .phone-model {
        margin: 0 auto;
      }

      .main--form {
        padding: 10px;
        margin-left: 77px;
        flex: 1;
        background-color: #fff;
      }
    }

    .main-check {
      border-radius: 4px;

      .phone-model {
        margin: 0 auto;
      }

      .btn {
        margin-top: 20px;
      }
    }
  }
</style>
