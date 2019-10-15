<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col :span="24">
            <el-form-item label="路线名称 *  :" prop="routeName">
              <el-input class="input-v2-rao" v-model="formData.routeName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24">
            <el-form-item label="巡检点 :" prop="placeNum">
              <el-button type="primary" class="button-v2-rao b93BF88" @click="searchPoint">添加巡检点</el-button>
              <ul class="point-box">
                <li class="point-box__item" v-for="(item, index) of  formData.point" :key="index">
                  <span>{{item.placeName}}</span>
                  <span class="iconfont icon-icon_tianjia fs-26" @click="handle('plus', item, index)"></span>
                  <span class="iconfont icon-icon_jianshao fs-26" @click="handle('less', item, index)"></span>
                  <span class="iconfont icon-icon_shagnyi fs-26" v-if="index !== 0" @click="handle('up', item, index)"></span>
                  <span class="iconfont icon-icon_xiayi fs-26" v-if="index !== formData.point.length - 1" @click="handle('down', item, index)"></span>
                </li>
              </ul>
            </el-form-item>
          </el-col>

          <!--<el-col :span="24">-->
          <!--<el-form-item label="是否启用 :" prop="sequnceNum">-->
          <!--<el-radio-group v-model="formData.isEnable">-->
          <!--<el-radio label="y">是</el-radio>-->
          <!--<el-radio label="n">否</el-radio>-->
          <!--</el-radio-group>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <el-col :span="24">
            <el-form-item label="描述 *  :" prop="routeRemark" class="orgIntroduction">
              <editor v-model="formData.routeRemark" :true-height="350"/>
            </el-form-item>
          </el-col>

        </el-form>
      </div>

      <div v-if="pageState === 'edit'">

        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="24">
            <el-form-item label="路线名称 *  :" prop="routeName">
              <el-input class="input-v2-rao" v-model="formData.routeName" maxlength="64"></el-input>
            </el-form-item>
          </el-col>

          <!--<el-col :span="24">-->
          <!--<el-form-item label="是否启用 :" prop="isEnable">-->
          <!--<el-radio-group v-model="formData.isEnable">-->
          <!--<el-radio label="y">是</el-radio>-->
          <!--<el-radio label="n">否</el-radio>-->
          <!--</el-radio-group>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="24">
            <el-form-item label="巡检点 :" prop="placeNum">
              <el-button type="primary" class="button-v2-rao b93BF88" @click="searchPoint">添加巡检点</el-button>
              <ul class="point-box">
                <li class="point-box__item" v-for="(item, index) of  formData.point" :key="index">
                  <span>{{item.placeName}}</span>
                  <span class="iconfont icon-icon_tianjia fs-26" @click="handle('plus', item, index)"></span>
                  <span class="iconfont icon-icon_jianshao fs-26" @click="handle('less', item, index)"></span>
                  <span class="iconfont icon-icon_shagnyi fs-26" v-if="index !== 0" @click="handle('up', item, index)"></span>
                  <span class="iconfont icon-icon_xiayi fs-26" v-if="index !== formData.point.length - 1" @click="handle('down', item, index)"></span>
                </li>
              </ul>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="描述 *  :" prop="routeRemark" class="orgIntroduction">
              <editor v-model="formData.routeRemark" :true-height="350"/>
            </el-form-item>
          </el-col>


          <!--<el-col :span="24">-->
          <!--<el-form-item label="巡检点数 :" prop="placeNum">-->
          <!--<el-input class="input-v2-rao" v-model="formData.placeNum" maxlength="11"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->
          <!---->
          <!---->


        </el-form>
      </div>

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small">
              <div class="p100">
                <div class="detail-title-v2 ">
                  路线信息
                </div>
                <div class="detail-item-v2">

                  <div class="p50" v-if="formData.routeName">
                    <el-form-item label="路线名称 :" prop="routeName">
                      <span v-if="formData.routeName">{{formData.routeName}}</span>
                    </el-form-item>
                  </div>


                  <div class="p50" v-if="formData.placeNum">
                    <el-form-item label="巡检点数 :" prop="placeNum">
                      <span v-if="formData.placeNum">{{formData.placeNum}}</span>
                    </el-form-item>
                  </div>


                </div>
              </div>
              <div class="p100">
                <div class="detail-title-v2 ">
                  路线描述
                </div>
                <div class="detail-item-v2">
                  <el-form-item label="描述 :" prop="routeRemark">
                    <span v-if="formData.routeRemark" v-html="formData.routeRemark"></span>
                  </el-form-item>
                </div>
              </div>

            </el-form>
          </el-col>

          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly">
              <ul>
                <li>
                  <router-link :to="`/safety/listSchoolSecurityCheckRouteItem?checkRouteId=`+
                                    formData.checkRouteId">
                    <i class="iconfont icon-icon_liebiao"></i>巡检路线的巡检点
                  </router-link>

                </li>
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
      <el-dialog
        align="center"
        title="选择巡检点"
        :visible.sync="dialogVisible"
        width="50%">
        <div>
          <div class="search-bar">
            <el-input v-model="placeName" placeholder="巡检点名称"></el-input>
            <el-button type="primary" @click="search">查询</el-button>
          </div>
          <div class="search-content">
            <el-table
              height="500"
              :data="tableData"
              @selection-change="selectionChange"
              border
              style="width: 100%">
              <el-table-column align="center" type="selection" width="80"></el-table-column>
              <el-table-column prop="placeName" label="巡检点名称"></el-table-column>
              <!--<el-table-column prop="date" label="级别" width="180"></el-table-column>-->
              <!--<el-table-column prop="" label="创建人" width="180"></el-table-column>-->
              <el-table-column prop="createdDt" label="创建时间" width="180"></el-table-column>
            </el-table>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button size="small" @click="dialogVisible = false">取 消</el-button>
          <el-button size="small" type="primary" class="button-v2-rao b93BF88" @click="enterPoint" :disabled="this.multipleSelection.length === 0">确 定</el-button>
        </span>
      </el-dialog>

      <div class="text-center mt-30">
        <el-button v-if="pageState === 'edit'" type="primary" class="fush-btn button-v2-rao b93BF88" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88" :loading="formLoading" size="small"
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
import api from './schoolsecuritycheckrouteUrl'
import validation from '@/util/validate2'
import commonApi from '@/api/common/common'
import editor from '@/components/editor/editor'
import upload from '@/components/upload/uploadFileV1'
import uploads from '@/components/upload/uploadFile'

export default {
  components: {editor, upload, uploads},
  data () {
    return {
      placeName: '',
      dialogVisible: false,
      tableData: [],
      multipleSelection: [],
      formLoading: false,
      isLoaded: true,
      imagePath: [], //单独使用一个图片变量
      //getFileUrl: commonApi.getFileUrl(),
      //getImageUrl: commonApi.getImageUrl(),

      formData: {
        checkRouteId: '',
        routeName: '',
        routeRemark: '',
        placeNum: '',
        sequnceNum: '',
        point: []
      },
      pickTime: {
        disabledDate (time) {
          return time.getTime() < Date.now()
        }
      },
      rules: {
        routeName: [
          {required: true, message: '请您输入路线名称', trigger: 'blur'},
          {max: 64, message: '最多能输入64个字', trigger: 'blur'},

        ],
        routeRemark: [
          {required: true, message: '请您输入描述', trigger: 'blur'},
          {max: 1000, message: '最多能输入1000个字', trigger: 'blur'},

        ],
        placeNum: [
          {validator: validation.number, trigger: 'blur'},

        ],
        sequnceNum: [
          {validator: validation.number, trigger: 'blur'},

        ],
      }
    }
  },
  computed: {

    pageState () {
      return this.$route.params.type
    }
  },
  created () {
    this.getDetail(this.$route.params.id)
  },
  methods: {

    submit (formName) {
      const set = this.$refs
      this.isLoaded = true
      set[formName].validate(valid => {
        if (this.pageState === 'edit' && valid) {
          this.formLoading = true
          this.formData.placeIdList = this.formData.point.map(item => {
            return item.securityPlaceId
          })
          delete this.formData.point
          delete this.formData.securityCheckRouteItemVOList
          api.putObj(this.formData).then(res => {

            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('修改成功')
              this.goBack()
            } else {
              //this.$message.error(res.data.message);
              this.formLoading = false
            }
          })
        } else if (this.pageState === 'add' && valid) {
          this.formLoading = true
          this.formData.placeIdList = this.formData.point.map(item => {
            return item.securityPlaceId
          })
          delete this.formData.point
          api.addObj(this.formData).then(res => {
            if (res.data.resultCode === '000000') {
              this.formLoading = false
              this.$message.success('修改成功')
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
            this.formData = res.data.data
            this.formData.point = this.formData.securityCheckRouteItemVOList
          }
          this.isLoaded = false
        })
      }
    },
    goBack () {
      this.$router.go(-1)
    },
    searchPoint () {
      this.dialogVisible = true
      api.getPoint({placeName: this.placeName}).then(res => {
        this.tableData = res.data.data.records || []
      })
    },
    selectionChange (val) {
      this.multipleSelection = val
    },
    search () {
      this.searchPoint()
    },
    enterPoint () {
      console.log(1)
      // this.formData.point = this.uniqueFn([...this.formData.point, ...this.multipleSelection], 'securityPlaceId')
      this.formData.point = this.formData.point.concat(...this.multipleSelection)
      this.dialogVisible = false
    },
    uniqueFn (arr, key) {
      arr = arr || []
      let hash = {}
      let result = []
      arr.reduce((item, next) => {
        if (!hash[next[key]]) {
          hash[next[key]] = true
          item.push(next)
        }
        return item
      }, result)
      return result
    },
    handle (type, item, index) {
      switch (type) {
        case 'plus':
          this.formData.point.splice(index, 0, item)
          break
        case 'less':
          this.formData.point.splice(index, 1)
          break
        case 'up':
          if (index === 0) {
            return
          }
          this.formData.point.splice(index, 1)
          this.formData.point.splice(--index || 0, 0, item)
          break
        case 'down':
          if (index === this.formData.point.length - 1) {
            return
          }
          this.formData.point.splice(index, 1)
          this.formData.point.splice(++index || this.formData.point.length - 1, 0, item)
      }
      this.$forceUpdate()
    }
  }
}
</script>
<style lang="scss" scoped>
  .point-box {
    box-sizing: border-box;

    &__item {
      margin: 10px 0;
      display: flex;
      align-items: center;

      span {
        margin-left: 8px;

        &:not(:first-child) {
          cursor: pointer;
        }

        &:nth-child(1) {
          align-items: center;
          justify-content: center;
          display: inline-block;
          text-align: center;
          width: 88px;
          height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border: 1px solid #ccc;
          color: #93BF88;
          margin-left: 0;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
      }
    }
  }

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

  .search-bar {
    display: flex;
    margin-bottom: 20px;
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
