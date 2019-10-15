<template>
<el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  style="min-height: 600px" element-loading-spinner="el-icon-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)" class="bF5F5F5">
                <el-main>
                  <el-button v-if="pageState === 'add'" type="primary" class="button-v2-rao b93BF88 mb10">新增学段信息</el-button>
                  <el-button v-if="pageState === 'edit'" type="primary" class="button-v2-rao b93BF88 mb10">编辑学段信息</el-button>
                  <el-button v-if="pageState === 'detail'" type="primary" class="button-v2-rao b93BF88 mb10">详情学段信息</el-button>
  <div>
    <div class="edit-box bfff">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

            <el-form-item label="学段: " prop="segmentId">
              <el-select v-model="formData.segmentId" placeholder="请选择">
                <el-option
                  v-for="(item,index) in segmentList"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                  <div @click="segmentClick(index)">{{item.name}}</div>
                </el-option>
              </el-select>
            </el-form-item>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'edit'">

        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

            <el-form-item label="学段: " prop="segmentId">
              <el-select v-model="formData.segmentId" placeholder="请选择">
                <el-option
                  v-for="(item,index) in segmentList"
                  :key="index"
                  :label="item.name"
                  :value="item.id">
                  <div @click="segmentClick(index)">{{item.name}}</div>
                </el-option>
              </el-select>
            </el-form-item>

          <div class="clearfix"></div>

        </el-form>
      </div>


      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">

            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="" label-width="165px"
                     :inline="true" :model="formData" size="small">



              <el-col :span="12">
                <el-form-item label="学段名 :" prop="segmentName">
                  {{formData.segmentName}}
                </el-form-item>
              </el-col>





            </el-form>
          </el-col>

        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center">
        <el-button type="primary" class="mr80" size="small"
                   @click="goBack">返回
        </el-button>
        <el-button v-if="pageState === 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>

      </div>

    </div>
  </div>
  </el-main>
</el-container>
</template>

<script>
  import api from "./basicschoolsegmentUrl";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
import { mapGetters,mapMutations } from 'vuex';

  export default {
    data() {
      return {
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),
        segmentList : [],
        formData: {
          schoolOrgId: "",
          schoolOrgName: "",
          segmentId: "",
          segmentName: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          schoolOrgId: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          schoolOrgName: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          segmentId: [
            {required: true, message: "请选择学段", trigger: "blur"},

          ],
          segmentName: [
            {max: 32, message: "最多能输入32个字", trigger: "blur"},

          ],
          sequnceNum: [
            {validator: validation.number, trigger: "blur"},

          ],
        }
      }
    },
    computed: {
      ...mapGetters(['schoolInfo','isLoading']),
      pageState() {
        return this.$route.query.type;
      },
      segmentId(){
        return this.$route.query.segmentId;
      }
    },
    components: {editor, upload},
    created() {
      this.SET_IS_LOADING(false);
      this.getDetail(this.segmentId);
      this.getSegment()
    },
    methods: {
      segmentClick(index){
        this.formData.segmentId = this.segmentList[index].id
        this.formData.segmentName = this.segmentList[index].name
      },
      getSegment(){
        api.getSegment().then((res) => {
          this.segmentList = res.data.data.children
        })
      },
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        this.formData.schoolOrgId=this.schoolInfo.schoolOrgId;
        this.formData.schoolOrgName=this.schoolInfo.schoolOrgName;
        set[formName].validate(valid => {
          if (this.pageState === "edit" && valid) {
        this.formLoading = true;
            api.putObj(this.formData).then(res => {

              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
              } else {
                //this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          } else if (this.pageState === "add" && valid) {
                this.formLoading = true;
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("添加成功");
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

      ...mapMutations(['SET_IS_LOADING']),
      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          this.SET_IS_LOADING(true);
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data


            }
            this.SET_IS_LOADING(false);
          }, res => {
            this.$message.error(res.message);
          });
        }
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
<style lang="scss" scoped>



</style>
