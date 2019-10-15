<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="150px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="分类名称:" prop="parentId">
              <el-input class="input-v2-rao" v-model="formData.columnName"
                        placeholder="请输入分类名称"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <!--<el-col :span="24">
            <el-form-item label="分类等级" prop="description"
                          class="orgIntroduction">
              <el-select v-model="model" placeholder="请选择上级分类">
                <el-option
                  v-for="item in optionsList1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <el-form-item label="上级分类" prop="description"
                          class="orgIntroduction">
              <el-select v-model="formData.parentId" disabled="disabled" placeholder="请选择上级分类">
                <el-option
                  v-for="item in optionsList2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="图标" prop="description"
                          class="orgIntroduction">
                  <UploadFiles :many="1" :imagelist="formData.imagePath" @uploadData="uploadData"></UploadFiles>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否显示在导航栏" prop="description"
                          class="orgIntroduction">
              <el-radio-group v-model="formData.publicClassCode">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="分类描述" prop="description"
                          class="orgIntroduction">
              <editor v-model="formData.remark" :true-height="350"/>
            </el-form-item>
          </el-col>
        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="150px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="分类名称:" prop="parentId">
              <el-input class="input-v2-rao" v-model="formData.columnName"
                        placeholder="请输入分类名称"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <!--<el-col :span="24">
            <el-form-item label="分类等级" prop="description"
                          class="orgIntroduction">
              <el-select v-model="model" placeholder="请选择上级分类">
                <el-option
                  v-for="item in optionsList1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <el-form-item label="上级分类" prop="description"
                          class="orgIntroduction">
              <el-select v-model="formData.parentId" disabled="disabled" placeholder="请选择上级分类">
                <el-option
                  v-for="item in optionsList2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="图标" prop="description"
                          class="orgIntroduction">
                  <UploadFiles :many="1" :imagelist="formData.imagePath" @uploadData="uploadData"></UploadFiles>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否显示在导航栏" prop="description"
                          class="orgIntroduction">
              <el-radio-group v-model="formData.publicClassCode">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="分类描述" prop="description"
                          class="orgIntroduction">
              <editor v-model="formData.remark" :true-height="350"/>
            </el-form-item>
          </el-col>
        </el-form>
        <!--<el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="栏目 *  :" prop="columnName">
              <el-input class="input-v2-rao" v-model="formData.columnName"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="描述 :" prop="description"
                          class="orgIntroduction">
              <editor v-model="formData.description" :true-height="350"/>
            </el-form-item>
          </el-col>


        </el-form>-->
      </div>

      <div v-if="pageState === 'detail'">
        <el-form :label-position="'right'" class="edit-form"
                 label-width="150px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="分类名称:" prop="parentId">
              {{formData.columnName}}
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="上级分类" prop="description"
                          class="orgIntroduction">
              <el-select v-model="formData.parentId" disabled="disabled" placeholder="请选择上级分类">
                <el-option
                  v-for="item in optionsList2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="图标" prop="description"
                          class="orgIntroduction">
                <img :src="formData.imagePath" />
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="是否显示在导航栏" prop="description"
                          class="orgIntroduction">
              <div v-show="formData.publicClassCode == 1">是</div>
              <div v-show="formData.publicClassCode == 0">否</div>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="分类描述" prop="description"
                          class="orgIntroduction">
              <div v-html="formData.remark"></div>
            </el-form-item>
          </el-col>
        </el-form>
        <!--<el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <div class="detail-title-v2 ">
                  {{formData.columnName}}
                </div>
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.columnName">
                    <el-form-item label="栏目 :" prop="columnName">
                      <span v-if="formData.columnName">{{formData.columnName}}</span>
                    </el-form-item>
                  </div>

                  <div class="p100" v-if="formData.description">
                    <el-form-item label="描述 :" prop="description">
                      <span v-if="formData.description" v-html="formData.description"></span>
                    </el-form-item>
                  </div>

                </div>
              </div>
            </el-form>

          </el-col>

        </el-row>-->
      </div>

      <div class="text-center mt-30">
        <el-button v-if="pageState === 'edit'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="small"
                   @click="goBack">返回
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import api from './publishcolumnUrl'
import validation from '@/util/validate2'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import uploads from '@/components/upload/uploadFile'
import {coverData} from '@/util/util'
  import UploadFiles from '@/components/upload/uploadFileV1'

export default {
  components: {editor, UploadFiles, uploads},
  data () {
    return {
      model: '1',
      optionsList1: [
        {label: '一级', value: '1'},
        {label: '二级', value: '2'}
      ],
      optionsList2: [],
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      publicClassCodeOptions: [{'label': '全部', 'name': ''}], publicClassCode: null,
      defaultTemplateCodeOptions: [{'label': '全部', 'name': ''}], defaultTemplateCode: null,
      ynOptions: [{'label': '全部', 'name': ''}], isOnlyone: null,
      imagePathFileList: [],
      imagePathFileType: '',
      formData: {
        publicClassCode: '',
        remark: '',
        parentName: '',
        parentId: '',
        columnId: '',
        columnName: '',
        description: '',
        imagePath : []
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        parentId:
          [
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},

          ],
        columnName:
          [
            {required: true, message: '请您输入栏目', trigger: 'blur'},
            {max: 255, message: '最多能输入255个字', trigger: 'blur'},

          ],
        description:
          [
            {max: 2000, message: '最多能输入2000个字', trigger: 'blur'},

          ],
      }
    }
  },
  computed: {
    pageState () {
      return this.$route.query.type
    },
    columnId(){
      return this.$route.query.columnId
    },
    childColumnId(){
      return this.$route.query.childColumnId
    }
  },
  created () {
    this.formData.parentId = this.columnId
    api.getColumnSelect().then(res => {
      this.optionsList2 = coverData(res.data.data, 'columnName', 'columnId')
    })
    this.getDetail(this.childColumnId)
    commonApi.getCodeIntType('publicClass').then(res => {
      let viewList = res.data.data || []
      for (let publicClassItem of viewList) {
        this.publicClassCodeOptions.push({
          'label': publicClassItem.codeDesc,
          'name': publicClassItem.codeId
        })
      }
    })
    commonApi.getCodeIntType('defaultTemplate').then(res => {
      let viewList = res.data.data || []
      for (let defaultTemplateItem of viewList) {
        this.defaultTemplateCodeOptions.push({
          'label': defaultTemplateItem.codeDesc,
          'name': defaultTemplateItem.codeId
        })
      }
    })
    commonApi.getCodeIntType('boolean_yn').then(res => {
      let viewList = res.data.data || []
      for (let ynItem of viewList) {
        this.ynOptions.push({
          'label': ynItem.codeDesc,
          'name': ynItem.codeId
        })
      }
    })
  },
  methods: {
    uploadData(val){
      this.formData.imagePath = val
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
              this.goBack()
            } else {
              this.$message.error(res.data.message)
              this.formLoading = false
            }
          })
        } else if (this.pageState === 'add' && valid) {
          this.formLoading = true
          api.addObj(this.formData).then(res => {
            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('新增成功')
              this.goBack()
            } else {
              this.$message.error(res.data.message)
              this.formLoading = false
            }
          })
        }
      })
      this.isLoaded = false
    },
    getDetail (paramsId) {
      if (this.pageState !== 'add') {
        api.getObj(paramsId).then(res => {
          if (res.data.resultCode === '000000') {
            res.data.data.publicClassCode = Number(res.data.data.publicClassCode)
            this.formData = res.data.data
          }
          this.isLoaded = false
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>
<style lang="scss" scoped>
  .edit-box {
    padding: 40px;
    width: auto;

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
      padding: 25px 25px 0 25px;
    }

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
