<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="24">
            <el-form-item label="消息模板 :" prop="templateName">
              <el-input v-model="formData.templateName" maxlength="100"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24" class="orgIntroduction">
            <el-form-item label="消息标题 :" prop="messageSubject">
              <el-input v-model="formData.messageSubject" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12" class="orgIntroduction">
            <el-form-item label="消息内容 :" prop="messageContent">
              <editor v-model="formData.messageContent" :true-height="350"></editor>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="头部内容 :" prop="messageHeaderTextId">
              <el-select v-model="formData.messageHeaderTextId"
                         @change="changeHeader(formData.messageHeaderTextId)">
                <el-option v-for="item in headerTp" :label="item.textLabel" :value="item.textId"
                           :key="item.textId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="底部内容 :" prop="messageFooterTextId">
              <el-select v-model="formData.messageFooterTextId"
                         @change="changeFooter(formData.messageFooterTextId)">
                <el-option v-for="item in footerTp" :label="item.textLabel" :value="item.textId"
                           :key="item.textId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>
          <div class="mb-20 cursor" @click="xuantianHandler">
            选填信息
            <img v-if="xuantian" src="~@/assets/img/icon-school-toggle.png" class="vm-1"/>
            <img v-if="!xuantian" src="~@/assets/img/icon-school-show.png" class="vm-1"/>
            <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
          </div>
          <div v-if="xuantian">
            <el-col :span="12" v-if="data.messageFromName">
              <el-form-item label="发送人 :" prop="messageFromName">
                {{data.messageFromName}}
              </el-form-item>
            </el-col>

            <el-col :span="12" v-if="data.messageFromAddr">
              <el-form-item label="发送地址 :" prop="messageFromAddr">
                {{data.messageFromAddr}}
              </el-form-item>
            </el-col>
          </div>
        </el-form>
      </div>
      <div v-if="pageState === 'edit'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="24">
            <el-form-item label="消息模板 :" prop="templateName">
              <el-input v-model="formData.templateName" maxlength="100"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24" class="orgIntroduction">
            <el-form-item label="消息标题 :" prop="messageSubject">
              <el-input v-model="formData.messageSubject" maxlength="255"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12" class="orgIntroduction">
            <el-form-item label="消息内容 :" prop="messageContent">
              <editor v-model="formData.messageContent" :true-height="350"></editor>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="头部内容 :" prop="messageHeaderTextId">
              <el-select v-model="formData.messageHeaderTextId"
                         @change="changeHeader(formData.messageHeaderTextId)">
                <el-option v-for="item in headerTp" :label="item.textLabel" :value="item.textId"
                           :key="item.textId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="底部内容 :" prop="messageFooterTextId">
              <el-select v-model="formData.messageFooterTextId"
                         @change="changeFooter(formData.messageFooterTextId)">
                <el-option v-for="item in footerTp" :label="item.textLabel" :value="item.textId"
                           :key="item.textId"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>
          <div class="mb-20 cursor" @click="xuantianHandler">
            选填信息
            <img v-if="xuantian" src="~@/assets/img/icon-school-toggle.png" class="vm-1"/>
            <img v-if="!xuantian" src="~@/assets/img/icon-school-show.png" class="vm-1"/>
            <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
          </div>
          <div v-if="xuantian">
            <el-col :span="12" v-if="data.messageFromName">
              <el-form-item label="发送人 :" prop="messageFromName">
                {{data.messageFromName}}
              </el-form-item>
            </el-col>

            <el-col :span="12" v-if="data.messageFromAddr">
              <el-form-item label="发送地址 :" prop="messageFromAddr">
                {{data.messageFromAddr}}
              </el-form-item>
            </el-col>
          </div>
        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="schoolForm-rao schoolForm-detail-rao" label-width="165px"
                     ref="formData" :inline="true" :model="formData" :rules="rules" size="small">

              <el-col :span="12" v-if="data.templateName">
                <el-form-item label="消息模板 :" prop="templateName">
                  {{data.templateName}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="data.messageSubject">
                <el-form-item label="消息标题 :" prop="messageSubject">
                  {{data.messageSubject}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="data.messageHeaderTextId">
                <el-form-item label="头部内容 :" prop="messageHeaderTextId">
                  {{data.messageHeaderTextId}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="data.messageFooterTextId">
                <el-form-item label="底部内容 :" prop="messageFooterTextId">
                  {{data.messageFooterTextId}}
                </el-form-item>
              </el-col>

              <el-col :span="24" v-if="data.messageContent" class="orgIntroduction">
                <el-form-item label="消息内容 :" prop="messageContent">
                   <span v-html="data.messageContent"></span>
                </el-form-item>
              </el-col>

            </el-form>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">

          </el-col>
        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center">
        <el-button v-if="pageState === 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
  import api from "./messagetpUrl";
  import api2 from "../messagetptxt/messagetptxtUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'

  export default {
    data() {
      return {
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        data: "",
        tpOption: [],
        headerTp: [],
        footerTp: [],
        topTypeCode: null,
        formData: {
          templateId: null,

          templateName: "",
          messageFromName: "",
          messageFromAddr: "",
          messageSubject: "",
          messageContent: "",
          messageHeaderTextId: "",
          messageFooterTextId: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          templateName: [
            {max: 100, message: "只能输入100个字", trigger: "blur"},
          ],
          messageFromName: [
            {max: 100, message: "只能输入100个字", trigger: "blur"},
          ],
          messageFromAddr: [
            {max: 100, message: "只能输入100个字", trigger: "blur"},
          ],
          messageSubject: [
            {max: 255, message: "只能输入255个字", trigger: "blur"},
          ],
          messageContent: [
            {max: 4000, message: "只能输入4000个字", trigger: "blur"},
          ],
          messageHeaderTextId: [
            {max: 32, message: "只能输入32个字", trigger: "blur"},
          ],
          messageFooterTextId: [
            {max: 32, message: "只能输入32个字", trigger: "blur"},
          ],
        }
      }
    },
    computed: {
      // headerTp() {
      //   let res = this.tpOption.filter(function (item) {
      //     return item.textType === 'H'
      //   });
      //   return res
      // },
      // footerTp() {
      //   let res = this.tpOption.filter(function (item) {
      //     return item.textType === 'F'
      //   });
      //   return res
      // },
      pageState() {
        return this.$route.params.type;
      }
    },
    components: {editor},
    created() {
      this.getDetail(this.$route.params.id);
      this.getTpOption();
    },
    methods: {
      //获取模板下拉
      getTpOption() {
        api2.fetchList().then(res => {
          this.tpOption = res.data.data.records
          for (let i = 0; i < this.tpOption.length; i++) {
            if (this.tpOption[i].textType === 'H') {
              this.headerTp.push(this.tpOption[i])
            } else if (this.tpOption[i].textType === 'F') {
              this.footerTp.push(this.tpOption[i])
            }
          }

        }, res => {
          this.$message.error(res.message)
        })
      },

      getTpDetail(paramsId,callback) {
        api2.getObj(paramsId).then(res => {
          if (res.data.resultCode === "000000") {
            callback(res.data.data.textContent.toString())
          }
        }, res => {
          this.$message.error(res.message);
        });
      },
      changeHeader(id) {
        let that = this;
        that.getTpDetail(id,function (res) {
          that.formData.messageContent = res + that.formData.messageContent
        })
      },
      changeFooter(id) {
        let that = this;
        that.getTpDetail(id,function (res) {
          that.formData.messageContent =  that.formData.messageContent + res
        })
      },
      //图片上传
      uploadData(res) {
        this.formData.imagePath = res;
      },
      //编辑器
      getEditorValue(val) {
        this.formData.content = val
      },
      //选填信息
      xuantianHandler() {
        this.xuantian = this.xuantian ? false : true;
      },
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          if (this.pageState === 'edit' && valid) {
        this.formLoading = true;
            api.putObj(this.formData).then(res => {

              if (res.data.resultCode === '000000') {
                this.formLoading = false;
                this.$message.success("添加成功");
                this.$router.go(-1)
              } else {
                //this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          } else if (this.pageState === 'add' && valid) {
                this.formLoading = true;
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode === '000000') {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          }
        })
        this.isLoaded = false;

      },

      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === '000000') {
              this.data = res.data.data;
              this.formData = this.data;
            }
            this.isLoaded = false;
          }, res => {
            this.$message.error(res.message);
          });
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .menu-quickly {
    width: 166px;
    border: 1px solid #d8d8d8;

    a.current {
      background: #4A9388;
      color: #fff
    }

    a {
      padding: 10px 0 10px 15px;
      font-size: 14px;
      display: block;

      img {
        padding-right: 8px;
        vertical-align: -4px;
      }

    }

    a:hover {
      text-decoration: none;
    }

  }





  .ml80 {
    margin-left: 80px;
  }


</style>
