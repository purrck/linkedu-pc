<template>
  <div>
    <div v-show="!showSend" class="edit-box ">

      <div class=" formFlex100 left-box br border-color-e8e8e8 pr-20">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="80px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">
          <el-form-item label="名称 *  :" prop="entityName">
            <el-select class="input-v2-rao" v-model="formData.entityId"
                       maxlength="1" @change="typeChange(formData.entityId)" :disabled="pageState!=='add'&&pageState!=='edit'">
              <el-option v-for="(item,index) in optionsList" :label="item.entityName" :value="item.entityId"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="分类 *  :" prop="entityTypeName">
            <el-input class="input-v2-rao" v-model="formData.entityTypeName" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="内容 *  :" prop="detail">
            <div style="height:500px;overflow-y:auto">
            <ResultPreview v-for="(item,index) in surDetail.SurveyItemAdTOList" :key="index" :index="index+1"
                           :data="item" :total="surDetail.SurveyItemAdTOList.length"></ResultPreview>
             </div>
          </el-form-item>

        </el-form>
      </div>

      <div class="right-box formFlex100">

        <div v-if="pageState === 'add' || pageState === 'edit'">
          <el-form :label-position="'right'" class="edit-form"
                   label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">
            <el-col :span="24">
              <el-form-item label="开始时间 :" prop="effectiveDt">
                <el-date-picker class="date-v2-rao" v-model="formData.effectiveDt" type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="24">
              <el-form-item label="截止时间 :" prop="expiryDt">
                <el-date-picker class="date-v2-rao" v-model="formData.expiryDt" type="date"
                                placeholder="选择日期"
                                value-format="yyyy-MM-dd HH:mm">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <!--<el-col :span="24">-->
              <!--<el-form-item label="发送对象 :" prop="sendObj">-->
                <!--&lt;!&ndash;<el-input v-model="formData.sendObj"> </el-input>&ndash;&gt;-->
                <!--&lt;!&ndash;<span>{{formData.sendObj}}</span>&ndash;&gt;-->
              <!--</el-form-item>-->
            <!--</el-col>-->
          </el-form>
        </div>

        <div v-if="pageState === 'detail'">
          <!-- 详细查看 -->
          <el-form :label-position="'right'" label-width="120px"
                   :inline="false" :model="formData" size="small" class="flex row wrap" :rules="rules">
            <div class="p100">
              <div class="detail-item-v2">

                <div class="p100">
                  <el-form-item label="发布时间 :" prop="effectiveDt">
                    <span v-if="formData.effectiveDt"> {{formData.effectiveDt}}</span>
                  </el-form-item>
                </div>
                <div class="p100">
                  <el-form-item label="结束时间 :" prop="expiryDt">
                    <span v-if="formData.expiryDt"> {{formData.expiryDt}}</span>
                  </el-form-item>
                </div>
                <!--<div class="p100">-->
                <!--<el-form-item label="发布对象 :" prop="expiryDt">-->
                <!--<span v-if="formData.belongName"> {{formData.belongName}}</span>-->
                <!--</el-form-item>-->
                <!--</div>-->
                <div class="p100" v-if="formData.entityOrgStatusCode==='reject'||formData.entityOrgStatusCode==='opening'">
                  <div class="p100">
                    <el-form-item label="审核结果 :">
                      <span v-if="formData.entityOrgStatusCodeStr"> {{formData.entityOrgStatusCodeStr.split(';')[0]}}</span>
                    </el-form-item>
                  </div>
                  <div class="p100">
                    <el-form-item label="审核说明 :" >
                      <span v-if="formData.rejectContent"> {{formData.rejectContent}}</span>
                    </el-form-item>
                  </div>
                </div>

                <!--<div class="p100" v-if="formData.allowViewResultInd">-->
                <!--<el-form-item label="显示问卷结果 :" prop="allowViewResultInd">-->
                <!--<span v-if="formData.allowViewResultInd">{{formData.allowViewResultInd}}</span>-->
                <!--</el-form-item>-->
                <!--</div>-->
              </div>
            </div>
          </el-form>
        </div>

        <div class="text-center mt-30">

          <el-button v-if="pageState === 'detail'&&formData.entityOrgStatusCode === 'opening'||formData.entityOrgStatusCode === 'finished'"
                     type="primary" class="fush-btn button-v2-rao b93BF88"
                     :loading="formLoading" size="small"
                     @click="toStatus(formData.entityOrgId)">调查状况
          </el-button>
          <el-button type="primary" class="fush-btn button-v2-rao border-color-e8e8e8 c707070 bfff" size="small"
                     @click="goBack">返回
          </el-button>

          <el-button v-if=" pageState === 'add'|| pageState === 'edit'" type="primary"
                     class="fush-btn button-v2-rao b93BF88"
                     :loading="formLoading" size="small"
                     @click="next('formData')">下一步
          </el-button>

          <el-button v-if="formData.entityOrgStatusCode === 'approving'" type="primary" class="fush-btn button-v2-rao b93BF88"
                     :loading="formLoading" size="small"
                     @click="shenhe(1)">通过审核
          </el-button>

          <el-button v-if="formData.entityOrgStatusCode === 'approving'" type="primary"
                     class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="small"
                     @click="shenhe(2)">驳回审核
          </el-button>


        </div>
      </div>
    </div>

    <div v-show="showSend" style="padding: 40px;">
      <SendObject :header="header" @finish="finish"></SendObject>
    </div>

    <div v-show="showSend" class="bF5F5F5" style="height: 90px;line-height: 90px;text-align: center ">
      <section style="margin-top: 30px;">
        <el-button size="mini" type="primary" @click="submit(1)">保存</el-button>
        <el-button size="mini" type="primary" @click="submit(2)">提交审核</el-button>
      </section>
    </div>

    <el-dialog title="驳回" :before-close="bohuiCancelHandler" width="22%" :center="true"
               :visible.sync="dialogTableVisiblebohui">
      <el-input
        type="textarea"
        :autosize="{ minRows: 2, maxRows: 4}"
        placeholder="请输入内容"
        v-model="textarea4" class="select-v2-rao">
      </el-input>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="bohui" :loading="bohuiLoading">确 定</el-button>
        <el-button @click="bohuiCancelHandler">取 消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="" :visible.sync="dialogShenhe" center width="22%">
      <div class="text-center">
        <i class="iconfont icon-mingdan ml5 f30 cFA6557"></i>
        <p class="text-center fs-16 color333 mt-20">是否通过审核?</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="border-color-cccccc c000000 bfff" @click="dialogShenheComfireHandler"
                   :loading="false">是
        </el-button>
        <el-button type="primary" class="b93BF88" @click="dialogShenheCancelHandler">否</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from "./surveymasterUrl";
  import api2 from "./surveymasterUrl";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import ResultPreview from "@/components/review/resultPreview";
  import SendObject from "@/components/sendObject/testSendObject";
  import {coverData} from '@/util/util'

  export default {
    components: {SendObject, ResultPreview, editor, upload, uploads},
    data() {
      return {
        formLoading: false,
        showSend: false,
        dialogTableVisiblebohui: false,
        dialogShenhe: false,
        bohuiLoading: false,
        entityOrgRuleId: null,
        isLoaded: true,
        textarea4: '',
        maxIndex: 3,
        index: 1,
        entityType: null,
        header: [
          {
            title: '1、通知角色/学段',
            isActive: true,
            code: 'segment',
            children: [
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '角色',
                subTitleType: 'role',
                nextType: 'grade',
                single:true,
                isActive: false,
                url: '/userapp/base/codeInt/list?codetypeId=userType'
              },
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '学段',
                subTitleType: 'segment',
                nextType: 'grade',
                isActive: false,
                url: '/sm/base/schoolSegmentAd/segmentGrade?type=1'
              }
            ]
          },
          {
            title: '2、选择年级',
            isActive: false,
            code: 'grade',
            children: [
              {
                checked: [],
                children: [],
                subTitleType: 'grade',
                nextType: 'grade',
                subTitle: '年级',
                isActive: false,
              },
            ]
          },
          {
            title: '3、选择班级',
            isActive: false,
            code: 'class',
            children: [
              {
                checked: [],
                children: [],
                subTitleType: 'class',
                nextType: 'none',
                subTitle: '人员',
                isActive: false,
              },
            ]
          },
        ],
        imagePath: [], //单独使用一个图片变量
        optionsList: [], //问卷列表
        surDetail: {}, //问卷列表
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),
        formData: {
          surveyId: '',
          entityOrgId: '',
          entityId: '',
          surveyName: "",
          entityType: "",
          entityOrgStatusCode: "",
          sendObj: null,
          status: "",
          effectiveDt: "",
          expiryDt: "",
          allowViewResultInd: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          expiryDt:
            [
              {required: true, message: "请您选择结束时间", trigger: "blur"},
            ],
          effectiveDt:
            [
              {required: true, message: "请您选择发布时间", trigger: "blur"},
            ],
        }
      }
    },
    computed: {
      pageState() {
        return this.$route.params.type;
      }
    },
    created() {
      this.entityOrgId = this.$route.params.id;
      this.getDetail(this.entityOrgId);

    },
    methods: {

      //sendObj回调
      finish(val) {
        this.index++
        // this.showSend = false;
        this.formData.scope = val.header;
        this.formData.roleId = 'D';
        this.formData.segmentIds = val.header[0].children[1].checked;
        let resData = val.header;
        let temp = [];

        resData[1].children.forEach(res => {
          temp = temp.concat(res.checked);
        })
        this.formData.gradeIds = temp;

        let claTem = [];
        resData[2].children.forEach(res => {
          claTem = claTem.concat(res.checked);
        });
        console.log('claTem');
        console.log(claTem);
        this.formData.classIds = claTem;
      },
      next(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        set['formData'].validate(valid => {
          if(valid){
            this.showSend = true;
          }
        })
        // this.maxIndex > this.index && this.index++
      },
      shenhe(index) {
        if (index === 1) {
          this.dialogShenhe = true;
        } else {
          this.dialogTableVisiblebohui = true;
        }
      },
      //确认提交审核
      dialogShenheComfireHandler() {
        let obj = {
          entityOrgIds: [this.entityOrgId],//对象范围ID
          entityOrgStatusCode: 'opening'//状态
        }
        api.changeStatus(obj).then(res => {
          if (res.data.resultCode === '000000') {
            this.$message.success("审核成功");
            this.goBack();
          }
        })
      },
      //取消提交审核
      dialogShenheCancelHandler() {
        this.dialogShenhe = false
      },
      bohuiCancelHandler() {
        this.bohuiLoading = false;
        this.dialogTableVisiblebohui = false;
      },
      bohui1() {
        this.dialogTableVisiblebohui = true;
      },
      bohui() {
        this.bohuiLoading = true;
        api.changeStatus({
          entityOrgIds: [this.entityOrgId],//对象范围ID
          entityOrgStatusCode: "rejected", //状态
          rejectContent: this.textarea4 //状态
        }).then(res => {
          if (res.data.resultCode === '000000') {
            this.$message.success("驳回成功");
            this.goBack();
          }
          this.bohuiLoading = false;
        }, res => {
          this.bohuiLoading = false;
          this.$message.error(res.message);
        });
      },
      toStatus(entityOrgId) {
        let opath = '/safetyEdu/surveySearch/' + entityOrgId;
        this.$router.push({path: opath})
      },
      submit(type) {
        let formName = 'formData';
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          if (type === 1 && valid) {
            this.formLoading = true;
            this.formData.entityOrgStatusCode = 'editing';
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("保存成功");
                // this.postShenhe();
                this.$router.push({path: '/safetyEdu/listSurveyMaster'})
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            })
          } else if (type === 2 && valid) {
            this.formLoading = true;
            this.formData.entityOrgStatusCode = 'approving';
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("提交成功");
                // this.postShenhe();
                this.$router.push({path: '/safetyEdu/listSurveyMaster'})
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            })
          }
        })
        this.isLoaded = false;
      },
      getDetail(entityOrgId) {
        if (this.pageState !== 'add') {
          api.getObj(entityOrgId).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data;
              this.init(this.formData.entityId);
            }
            this.isLoaded = false;
          })
        } else {
          let entityId = this.$route.query.entityId;
          if(entityId) {
            this.init(entityId);
          }else{
            this.init('0');
          }
        }
      },
      init(entityId) {
        api.getListSur({limit: 999}).then(res => {
          // this.optionsList = coverData(res.data.data.records,'entityName','entityId');
          this.optionsList = res.data.data.records;
          if (entityId === '0'){
            entityId = this.optionsList[0].entityId;
            this.formData.entityId = this.optionsList[0].entityId;
            this.formData.entityName = this.optionsList[0].entityName;
            this.formData.entityType = this.optionsList[0].entityType;
            this.formData.entityTypeName = this.optionsList[0].entityTypeName;
          }else{
            let obj = this.optionsList.find(res=>{
              if(res.entityId === entityId){
                return res;
              }
            });
            this.formData.entityId = obj.entityId;
            this.formData.entityName = obj.entityName;
            this.formData.entityType = obj.entityType;
            this.formData.entityTypeName = obj.entityTypeName;
          }
          this.typeChange(entityId);
        })
      },
      typeChange(entityId) {
        console.log(arguments);
        api.getObjSur(entityId).then(res => {
          this.surDetail = res.data.data;
        })
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>


<style lang="scss" scoped>
  .right-box {
    flex: 1;
  }

  .edit-box {
    padding: 40px;
    display: flex;
    flex: 1;
    flex-direction: row;

    .detail-title-v2 {
      background: #f5f5f5;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
      padding-left: 12px;
      margin-right: 40px;
      color: #707070;
      font-size: 14px;
    }

    .detail-item-v2 {
      display: flex;
      flex-wrap: wrap;
      padding: 0;
    }

  }

  .left-box {
    width: 50%;
  }


  .bm-view {
    width: 640px;
    height: 300px;
    margin-top: 10px;
  }

  .fush-btn {
    margin: 0 15px
  }
</style>
