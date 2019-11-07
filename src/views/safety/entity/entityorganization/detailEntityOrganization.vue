<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false"   :model="formData"  :rules="rules" size="small">


          <!--<el-col :span="12">-->
          <!--<el-form-item label="学校id :" prop="schoolId">-->
          <!--<el-input v-model="formData.schoolId" maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
          <!--<el-form-item label="学校 :" prop="schoolName">-->
          <!--<el-input v-model="formData.schoolName" maxlength="255"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
          <!--<el-form-item label="安全教育类型 :" prop="entityType">-->
          <!--<el-input v-model="formData.entityType" maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <el-col :span="12">
            <el-form-item label="安全教育类型 :" prop="entityType">
              <el-select v-model="formData.entityType" @change="change">
                <el-option label="课程" value="courseinfo"></el-option>
                <el-option label="问卷" value="surveyinfo"></el-option>
                <el-option label="活动" value="activityinfo"></el-option>
                <!--<el-option v-for="(item, index) of entityTypeNames"  :key="index"-->
                           <!--:label="item.entityCnName" :value="item.entityEnName"></el-option>-->
              </el-select>
            </el-form-item>
          </el-col>


          <!--<el-col :span="12">-->
          <!--<el-form-item label="教育内容 :" prop="entityId">-->
          <!--<el-input v-model="formData.entityId" maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <el-col :span="12">
            <el-form-item label="教育内容 :" prop="entityId">
              <!--<el-input v-model="formData.entityName" maxlength="32"></el-input>-->
              <el-select  v-model="formData.entityId">
                <el-option v-for="(item, index) of entityNames" :label="item.entityName" :value="item.entityId" :key="index"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <hr>
          <label >内容详情：</label> <br>

          <!--<el-col :span="12">-->
          <!--<el-form-item label="内容来源 :" prop="entityOriginTypeCode">-->
          <!--<el-select v-model="formData.entityOriginTypeCode" placeholder="请您选择">-->
          <!--<el-option v-for="entityOriginTypeCodeItem in entityOriginTypeCodeOptions"-->
          <!--:key="entityOriginTypeCodeItem.name"-->
          <!--:label="entityOriginTypeCodeItem.label" :value="entityOriginTypeCodeItem.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
          <!--<el-form-item label="组织时间 :" prop="organizedDt">-->
          <!--<el-date-picker v-model="formData.organizedDt" type="datetime" placeholder="选择日期"-->

          <!--:picker-options="pickTime"></el-date-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <el-col :span="24">
            <el-form-item label="组织标题 :" prop="organizedTitle">
              <el-input v-model="formData.organizedTitle" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="发布时间 :" prop="effectiveDt">
              <el-date-picker v-model="formData.effectiveDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="下架时间 :" prop="expiryDt">
              <el-date-picker v-model="formData.expiryDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <!--<el-col :span="12">-->
          <!--<el-form-item label="组织用户数 :" prop="organizedUserNum">-->
          <!--<el-input v-model="formData.organizedUserNum" maxlength="11"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
          <!--<el-form-item label="参与用户数 :" prop="participatedUserNum">-->
          <!--<el-input v-model="formData.participatedUserNum" maxlength="11"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
          <!--<el-form-item label="完成用户数 :" prop="completedUserNum">-->
          <!--<el-input v-model="formData.completedUserNum" maxlength="11"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
          <!--<el-form-item label="描述 :" prop="description">-->
          <!--<el-input v-model="formData.description" maxlength="2000"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
          <!--<el-form-item label="状态 :" prop="entityOrgStatusCode">-->
          <!--<el-select v-model="formData.entityOrgStatusCode" placeholder="请您选择">-->
          <!--<el-option v-for="entityOrgStatusCodeItem in entityOrgStatusCodeOptions"-->
          <!--:key="entityOrgStatusCodeItem.name"-->
          <!--:label="entityOrgStatusCodeItem.label" :value="entityOrgStatusCodeItem.name">-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <div class="mb-20">基本信息
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="组织时间 :" prop="organizedDt">
              <el-date-picker v-model="formData.organizedDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="组织标题 :" prop="organizedTitle">
              <el-input v-model="formData.organizedTitle" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="发布时间 :" prop="effectiveDt">
              <el-date-picker v-model="formData.effectiveDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="下架时间 :" prop="expiryDt">
              <el-date-picker v-model="formData.expiryDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <!--<el-col :span="12">-->
          <!--<el-form-item label="组织用户数 :" prop="organizedUserNum">-->
          <!--<el-input v-model="formData.organizedUserNum" maxlength="11"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
          <!--<el-form-item label="参与用户数 :" prop="participatedUserNum">-->
          <!--<el-input v-model="formData.participatedUserNum" maxlength="11"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
          <!--<el-form-item label="完成用户数 :" prop="completedUserNum">-->
          <!--<el-input v-model="formData.completedUserNum" maxlength="11"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="12">-->
          <!--<el-form-item label="描述 :" prop="description">-->
          <!--<el-input v-model="formData.description" maxlength="2000"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <el-col :span="12">
            <el-form-item label="状态 :" prop="entityOrgStatusCode">
              <el-select v-model="formData.entityOrgStatusCode" placeholder="请您选择">
                <el-option v-for="entityOrgStatusCodeItem in entityOrgStatusCodeOptions"
                           :key="entityOrgStatusCodeItem.name"
                           :label="entityOrgStatusCodeItem.label" :value="entityOrgStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
            <div class="mb-20">基本信息
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="schoolForm-rao schoolForm-detail-rao" label-width="165px"
                     :inline="true" :model="formData" size="small">


              <el-col :span="12">
                <!--<el-form-item label="内容来源 :" prop="entityOriginTypeCode"-->
                <!--:style="{'color':formData.entityOriginTypeCodeStr.split(';')[1]}">-->
                <!--{{formData.entityOriginTypeCodeStr.split(';')[0]}}-->
                <!--</el-form-item>-->
              </el-col>

              <el-col :span="12">
                <el-form-item label="组织时间 :" prop="organizedDt">
                  {{formData.organizedDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <el-form-item label="发布时间 :" prop="effectiveDt">
                  {{formData.effectiveDt}}
                </el-form-item>
              </el-col>

              <el-col :span="12">
                <el-form-item label="下架时间 :" prop="expiryDt">
                  {{formData.expiryDt}}
                </el-form-item>
              </el-col>


              <el-col :span="12">
                <!--<el-form-item label="状态 :" prop="entityOrgStatusCode"-->
                <!--:style="{'color':formData.entityOrgStatusCodeStr.split(';')[1]}">-->
                <!--{{formData.entityOrgStatusCodeStr.split(';')[0]}}-->
                <!--</el-form-item>-->
              </el-col>

            </el-form>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly">
              <ul>
                <li>
                  <router-link :to="{path: `/safety/listEntityOrganizationRange/${formData.entityOrgId}`}">
                    <img src="~@/assets/img/menu_quickly/icon_classinfo.png"/>安全教育组织范围
                  </router-link>
                </li>
                <li>
                  <router-link :to="`/safety/listEntityOrganizationObject/${formData.entityOrgId}`">
                    <img src="~@/assets/img/menu_quickly/icon_classinfo.png"/>安全教育组织对象
                  </router-link>
                </li>
              </ul>
            </div>
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
import api from './entityorganizationUrl'
import validation from '@/util/validate2'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import upload from '@/components/upload/uploadFileV1'

export default {
  data () {
    return {
      entityNames: [],
      entityTypeNames: [
        {entityCnName: '课程', entityEnName: 'courseinfo'},
        {entityCnName: '问卷', entityEnName: 'surveyinfo'},
        {entityCnName: '活动', entityEnName: 'activityinfo'}
      ],
      xuantian: false, //选填信息
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      entityOriginTypeCodeOptions: [{'label': '全部', 'name': ''}], entityOriginTypeCode: null,
      entityOrgStatusCodeOptions: [{'label': '全部', 'name': ''}], entityOrgStatusCode: null,
      data: '',
      formData: {
        entityType: '',
        entityOrgId: '',
        entityId: '',
        organizedDt: '',
        organizedTitle: '',
        effectiveDt: '',
        expiryDt: '',
        organizedUserNum: '',
        participatedUserNum: '',
        completedUserNum: '',
        description: '',
        entityOrgStatusCode: '',
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        entityType :[
          {max: 1000, message: "只能输入1000个字", trigger: "blur"},
          {required: true, message: "请您选择教育类型", trigger: "blur"},
        ],
        organizedTitle :[
          {max: 1000, message: "只能输入32个字", trigger: "blur"},
          {required: true, message: "请您输入组织标题", trigger: "blur"},
        ],
        expiryDt :[
          {required: true, message: "请您输入下架时间", trigger: "blur"},
        ],
        effectiveDt :[
          {required: true, message: "请您输入发布时间", trigger: "blur"},
        ],
        entityId :[
          {max: 1000, message: "只能输入1000个字", trigger: "blur"},
          {required: true, message: "请您选择教育内容", trigger: "blur"},
        ]
      }
    }
  },
  computed: {

    pageState () {
      return this.$route.params.type
    }
  },
  components: {editor, upload},
  created () {
    this.getDetail(this.$route.params.id)
    commonApi.getCodeIntType('entityOriginType').then(res => {
      let viewList = res.data.data || []
      for (let entityOriginTypeItem of viewList) {
        this.entityOriginTypeCodeOptions.push({
          'label': entityOriginTypeItem.codeDesc,
          'name': entityOriginTypeItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
    commonApi.getCodeIntType('entityOrgStatus').then(res => {
      let viewList = res.data.data || []
      for (let entityOrgStatusItem of viewList) {
        this.entityOrgStatusCodeOptions.push({
          'label': entityOrgStatusItem.codeDesc,
          'name': entityOrgStatusItem.codeId
        })
      }
    }, res => {
      this.$message.error(res.data.message)
    })
  },
  methods: {
    //图片上传
    uploadData (res) {
      this.formData.imagePath = res
    },
    //编辑器
    getEditorValue (val) {
      this.formData.content = val
    },
    //选填信息
    xuantianHandler () {
      this.xuantian = this.xuantian ? false : true
    },
    submit (formName) {
      const set = this.$refs
      this.isLoaded = true
      set[formName].validate(valid => {
        if (this.pageState === 'edit' && valid) {
            this.formLoading = true
          api.putObj(this.formData).then(res => {
            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('修改成功')
              this.$router.go(-1)
            } else {
              //this.$message.error(res.data.message);
              this.formLoading = false
            }
          }, res => {
            this.$message.error('加载失败')
            this.formLoading = false
          })
        } else if (this.pageState === 'add' && valid) {
        this.formLoading = true
          api.addObj(this.formData).then(res => {
            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('修改成功')
              this.$router.go(-1)
            } else {
              this.$message.error(res.data.message)
              this.formLoading = false
            }
          }, res => {
            this.$message.error('加载失败')
            this.formLoading = false
          })
        }
      })
      this.isLoaded = false

    },


    getDetail (paramsId) {
      if (this.pageState !== 'add') {
        api.getObj(paramsId).then(res => {
          if (res.data.resultCode === '000000') {
            this.data = res.data.data
            this.formData = res.data.data

          }
          this.isLoaded = false
        }, res => {
          this.$message.error(res.message)
        })
      } else {
        // 获取组织类型(课程/问卷/活动...)
        api.getOrganizationType().then(res => {
          this.entityTypeNames = res.data.data
        })
      }
    },
    change (e) {
      // console.log(e)
      this.entityNames = [];
      this.formData.entityId = '';
      api.getContentByEntityType(e).then(res => {
        this.entityNames = res.data.data
      })
      // this.entityNames = [
      //   {entityName: 'eee', entityId: 111},
      //   {entityName: 'qqq', entityId: 222},
      //   {entityName: 'rrr', entityId: 333},
      // ]
    }
  }
}
</script>
<style lang="scss" scoped>
  .menu-quickly {
    width: 196px;
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

  .el-form-item--small.el-form-item {
    margin-bottom: 25px;
  }

  .schoolForm-detail-rao {

    .el-form-item {
      margin-bottom: 5px;
    }

  }

  .ml80 {
    margin-left: 80px;
  }


</style>
