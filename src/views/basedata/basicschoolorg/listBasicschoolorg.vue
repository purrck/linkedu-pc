<template>
  <div>
    <el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  style="min-height: 600px" element-loading-spinner="el-icon-loading"
                  element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header height="">

        <el-form ref="searchForm" :model="searchForm" :rules="rules" :inline="true" size="small" class="schoolForm select-form" >
          <el-form-item label="学校（机构）代码 :" prop="schoolOrgNum">
            <el-input v-model="searchForm.schoolOrgNum" maxlength="8" class=" input-v2-rao"></el-input>
          </el-form-item>
          <el-form-item label="学校（机构）名称 :" prop="schoolOrgName">
            <el-input v-model="searchForm.schoolOrgName" maxlength="8" class="input-v2-rao"></el-input>
          </el-form-item>
          <el-form-item label="学校（机构）简称 :" prop="schoolShortName">
            <el-input v-model="searchForm.schoolShortName" maxlength="8" class="input-v2-rao"></el-input>
          </el-form-item>
          <el-form-item label="校长姓名 :" prop="principalTeacherName">
            <el-input v-model="searchForm.principalTeacherName" maxlength="8" class="input-v2-rao"></el-input>
          </el-form-item>
          <el-form-item label="机构类型 :" prop="orgTypeCode">
            <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="searchForm.orgTypeCode" placeholder="请您选择">
              <el-option v-for="orgTypeCodeItem in orgTypeCodeOptions" :key="orgTypeCodeItem.name" :label="orgTypeCodeItem.label" :value="orgTypeCodeItem.name">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <!---->
          </el-form-item>
        </el-form>
        <div class="clearfix"></div>
      </el-header>

      <div class="line"></div>
      <el-main class="pt-15">


        <el-row class="mb10">
          <el-col :span="24" class="text-left mb-10 flex row btns x-center">

              <div style="" class="flex space-between row btns-msg f12">
              <div>
                <i class="iconfont icon-icon_yixuanzhe" style="color: #93BF88;"></i>
                <span class="c707070">已选择{{multipleSelection.length}}项</span>
              </div>
              <div>
                <span class="c707070">共搜索到{{data.total}}条数据</span>
                <i class="iconfont icon-icon_shuju f12" style="color: #93BF88;"></i>
              </div>
            </div>
            <!--<div>

              <el-button type="primary" size="small" class="el-button--small-icon button-v2-rao bFA6557" @click="lotDel">
                <i class="iconfont icon-icon_shanchu_caozuo f12 cfff"></i> 删除
              </el-button>

            </div>-->
          </el-col>
        </el-row>



        <div class="table" ref="ppp">
          <el-table :data="data.records" class="table-v2-rao" header-row-class-name="table-header-v2-rao" ref="schooltable" :stripe="true" tooltip-effect="dark" style="width: 100%" border @selection-change="handleSelectionChange" @sort-change="sortChange">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column type="index" :index="indexMethod" label="序号" width="55" align="center"></el-table-column>
            <el-table-column prop="schoolOrgNum" label="学校（机构）代码 " align="center">
                <template slot-scope="scope">
                  <div @click="titleClick(scope.row.schoolOrgId)">{{scope.row.schoolOrgNum}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="schoolOrgName" label="学校（机构）名称 " align="center">
              <template slot-scope="scope">
                  <div @click="titleClick(scope.row.schoolOrgId)">{{scope.row.schoolOrgName}}</div>
                </template>
            </el-table-column>
            <el-table-column prop="schoolShortName" label="学校（机构）简称 " align="center"></el-table-column>
            <el-table-column prop="orgTypeCodeName" label="机构类型" align="center"></el-table-column>
            <el-table-column prop="principalTeacherName" label="校长姓名" align="center"></el-table-column>
            <el-table-column prop="contactName" label="联系人" align="center"></el-table-column>
            <el-table-column prop="contactPhoneNum" label="联系电话" align="center"></el-table-column>
            <el-table-column label="操作"  align="center" fixed="right" width="150">
              <template slot-scope="scope">
                <el-popover placement="top-start" popper-class="popover-v2-rao" title="查看" trigger="hover">
                  <span slot="reference" @click.stop="toDetail(scope.row.schoolOrgId)"><i class="iconfont icon-icon_chakan1 ml5 f20 c999999" ></i></span>
                </el-popover>
                <el-popover title="编辑" placement="top-start" popper-class="popover-v2-rao" trigger="hover"  >
               <span slot="reference" @click.stop="toEdit(scope.row.schoolOrgId)"> <i class="iconfont icon-icon_bianji ml5 f20 c999999" ></i></span>
                </el-popover>

                <el-popover placement="top-start" popper-class="popover-v2-rao" title="学校场所" trigger="hover">
                    <span slot="reference"
                          @click.stop="toPlace(scope.row.schoolOrgId,`listBasicSchoolPlace`,scope.row.schoolOrgName)"><i
                      class="iconfont icon-icon_chakan1 ml5 f20 c999999"></i></span>
                </el-popover>
                <!--<el-popover placement="top-start" title="删除" popper-class="popover-v2-rao" trigger="hover">
                  <span slot="reference" @click.stop="rowDel(scope.row)"><i class="iconfont icon-icon_shanchu_caozuo ml5 f20 c999999"></i></span>
                </el-popover>-->
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="paging text-right mt10">
          <el-pagination class="pagination-v2-rao" popper-class="pagination-popper-v2-rao" :page-sizes="[10,20,30]" :page-size="data.size" :total="data.total"
                        :current-page="data.current" layout="total, sizes, prev, pager, next, jumper"
                        @size-change="handleSizeChange" @current-change="handleCurrentChange">
          </el-pagination>
        </div>
      </el-main>

      <el-dialog title="学校详情" width="80%" center="center" :visible.sync="dialogTableVisible">
        <el-form :label-position="'right'" label-width="170px"
                   ref="formData" :inline="true" :model="formData" :rules="rules"  size="small"  class="flex wrap row">
              <div class="clearfix p100 mb20">
                <div class="bF5F5F5 pt10 pb10 inline-block f14 pl20 pr20">
                  基本信息
                </div>
              </div>

              <el-col :span="8">
                <el-form-item label="地区名称 :" prop="areaNum">
                  <span v-if="formData.areaNum"> {{formData.areaNum}}</span>
                </el-form-item>
              </el-col>

              <el-col :span="8">
                    <el-form-item label="学校（机构）代码 :" prop="schoolOrgNum">
                      <span v-if="formData.schoolOrgNum"> {{formData.schoolOrgNum}}</span>
                    </el-form-item>
              </el-col>


              <el-col :span="8">
                    <el-form-item label="邮政编码 :" prop="postNum">
                      <span v-if="formData.postNum"> {{formData.postNum}}</span>
                    </el-form-item>
              </el-col>

               <el-col :span="8">
                    <el-form-item label="学校（机构）简称 :" prop="schoolShortName">
                      <span v-if="formData.schoolShortName"> {{formData.schoolShortName}}</span>
                    </el-form-item>
               </el-col>

                <el-col :span="8">
                    <el-form-item label="联系人 :" prop="contactName">
                      <span v-if="formData.contactName"> {{formData.contactName}}</span>
                    </el-form-item>
                </el-col>


                <el-col :span="8">
                    <el-form-item label="学校（机构）英文 名称 :" prop="schoolOrgNameEn">
                      <span v-if="formData.schoolOrgNameEn"> {{formData.schoolOrgNameEn}}</span>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="联系电话 :" prop="contactPhoneNum">
                      <span v-if="formData.contactPhoneNum"> {{formData.contactPhoneNum}}</span>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="机构类型 :" prop="orgTypeCode">
                      <span v-if="formData.orgTypeCode"> {{formData.orgTypeCode}}</span>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="传真电话 :" prop="contactFaxNum">
                      <span v-if="formData.contactFaxNum"> {{formData.contactFaxNum}}</span>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="学校主管部门 :" prop="schoolAdminOrgName">
                      <span v-if="formData.schoolAdminOrgName"> {{formData.schoolAdminOrgName}}</span>
                    </el-form-item>
                </el-col>


                <el-col :span="8">
                    <el-form-item label="电子邮箱 :" prop="contactEmail">
                      <span v-if="formData.contactEmail"> {{formData.contactEmail}}</span>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="学校办学类型 :" prop="schoolRunTypeCode">
                      <span v-if="formData.schoolRunTypeCode"> {{formData.schoolRunTypeCode}}</span>
                    </el-form-item>
                </el-col>

                <el-col :span="8">
                    <el-form-item label="主页地址 :" prop="webUrl">
                      <span v-if="formData.webUrl"> {{formData.webUrl}}</span>
                    </el-form-item>
                </el-col>

                 <el-col :span="8">
                    <el-form-item label="学校（机构）地址 :" prop="orgAddress">
                      <span v-if="formData.orgAddress"> {{formData.orgAddress}}</span>
                    </el-form-item>
                </el-col>

                 <el-col :span="8">
                    <el-form-item label="学段 :" prop="segmentName">
                      <span v-if="formData.segmentName"> {{formData.segmentName}}</span>
                    </el-form-item>
                </el-col>

                <el-col :span="24">
                    <el-form-item label="图片详情 :" prop="imagePath">
                      <img :src="formData.imagePath" style="max-width:700px" />
                    </el-form-item>
                </el-col>


                <div class="clearfix p100 mb20">
                  <div class="bF5F5F5 pt10 pb10 inline-block f14 pl20 pr20">
                    学校介绍
                  </div>
                </div>


                      <div class="mb20" v-html="formData.orgIntroduction"></div>





            <div class="clearfix"></div>


              <div class="clearfix p100 mb20">
                <div class="bF5F5F5 pt10 pb10 inline-block f14 pl20 pr20">
                  选填信息 <i class="iconfont icon-icon_xiala f14"></i>
                </div>
              </div>

              <el-col :span="8">
                    <el-form-item label="组织机构码 :" prop="organizationNum">
                      <span v-if="formData.organizationNum"> {{formData.organizationNum}}</span>
                    </el-form-item>
              </el-col>

              <el-col :span="8">
                    <el-form-item label="党委负责人号 :" prop="partyCommitteeLeader">
                      <span v-if="formData.partyCommitteeLeader"> {{formData.partyCommitteeLeader}}</span>
                    </el-form-item>
              </el-col>

              <el-col :span="8">
                    <el-form-item label="行政区划码 :" prop="adminAreaNum">
                      <span v-if="formData.adminAreaNum"> {{formData.adminAreaNum}}</span>
                    </el-form-item>
              </el-col>


              <el-col :span="8">
                    <el-form-item label="法定代表人号 :" prop="legalRepresentativeNum">
                      <span v-if="formData.legalRepresentativeNum"> {{formData.legalRepresentativeNum}}</span>
                    </el-form-item>
              </el-col>

              <el-col :span="8">
                    <el-form-item label="学校主管部门码 :" prop="schoolAdminOrgNum">
                      <span v-if="formData.schoolAdminOrgNum"> {{formData.schoolAdminOrgNum}}</span>
                    </el-form-item>
              </el-col>

              <el-col :span="8">
                    <el-form-item label="法人证书号 :" prop="legalPersonCertificateNum">
                      <span v-if="formData.legalPersonCertificateNum"> {{formData.legalPersonCertificateNum}}</span>
                    </el-form-item>
              </el-col>

              <el-col :span="8">
                    <el-form-item label="建校年月 :" prop="schoolSinceYear">
                      <span v-if="formData.schoolSinceYear"> {{formData.schoolSinceYear}}</span>
                    </el-form-item>
              </el-col>

              <el-col :span="8">
                    <el-form-item label="校长工号 :" prop="principalTeacherNum">
                      <span v-if="formData.principalTeacherNum"> {{formData.principalTeacherNum}}</span>
                    </el-form-item>
              </el-col>

              <el-col :span="8">
                    <el-form-item label="校庆日 :" prop="schoolCelebrateDay">
                      <span v-if="formData.schoolCelebrateDay"> {{formData.schoolCelebrateDay}}</span>
                    </el-form-item>
              </el-col>

              <el-col :span="8">
                    <el-form-item label="校长姓名 :" prop="principalTeacherName">
                      <span v-if="formData.principalTeacherName"> {{formData.principalTeacherName}}</span>
                    </el-form-item>
              </el-col>

              <div class="text-right p100 c999999 clearfix">数据截止时间：2018年5月5日 16:00</div>


          </el-form>
      </el-dialog>

      <xx-dialog>
        <div class="text-center">
            <img src="~@/assets/img/dialog-delete.png" />
            <p class="text-center fs-16 color333 mt-20">是否确认删除?</p>
        </div>
        <div slot="footer" class="dialog-footer text-center mt20">
          <el-button @click="dialogDeleteComfireHandler" :loading="dialog.loading">是</el-button>
          <el-button type="primary" @click="dialogDeleteCancelHandler">否</el-button>
        </div>
      </xx-dialog>

    </el-container>
  </div>
</template>

<script>
  import commonApi from "@/api/common/common";
  import api from "./basicschoolorgUrl";
  import { mapGetters,mapMutations } from 'vuex'
  export default {
    data() {
      return {
        formData : {},
        dialogTableVisible : false,
        orgTypeCodeOptions: [{"label": "请您选择", "value": ""}],
        rules :{},
        searchForm: {
          schoolOrgNum : "",
          orgTypeCode : ""
        },
        data: null,
        multipleSelection: [],
        params: {   //接口参数
          page: 1,
          limit: 10,
          orderByField: 'createdDt',
          isAsc: false,
          schoolOrgNum: null,
          schoolOrgName: null,
          schoolShortName: null,
          orgTypeCode: null,
          orgAddress: null,
          adminAreaNum: null,
          areaNum: null,
        }
      }
    },
    created(){
      console.log(this)
    },
    activated() {
      //只刷新数据，不改变整体的缓存
      console.log('重新活跃路由');
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.getList()
    },
    mounted() {
      this.getCurrentPage(this.$route.fullPath, this.params)
      //加载机构类型
      this.orgType();
      //初始化加载表格
      this.getList();
    },
    computed : {
      ...mapGetters(['isLoading','dialog']),
      indexMethod(){
          return (this.params.limit * (this.params.page-1)) + 1
      }
    },
    methods: {
      ...mapMutations(['SET_IS_LOADING','SET_DIALOG_VISIBLE','SET_DIALOG_LOADING']),
      titleClick(schoolOrgId){
        this.SET_IS_LOADING(true);

        api.getById({
          id: schoolOrgId
        }).then((res) => {
          this.dialogTableVisible = true;
          this.formData = res.data.data;
          this.SET_IS_LOADING(false);
        })
          /*this.$detailDialog({
              url : `/base/basicSchoolOrgAd/${schoolOrgId}`,
              items : [
                {
                  key:"areaNum",
                  name : "地区名称"
                },
                {
                  key:"schoolOrgNum",
                  name : "学校（机构）代码"
                },
                {
                  key:"postNum",
                  name : "邮政编码"
                },
                {
                  key:"schoolShortName",
                  name : "学校（机构）简称"
                },
                {
                  key:"contactName",
                  name : "联系人"
                },
                {
                  key:"schoolOrgNameEn",
                  name : "学校（机构）英文 名称"
                },
                {
                  key:"contactPhoneNum",
                  name : "联系电话"
                },
                {
                  key:"orgTypeCodeName",
                  name : "机构类型"
                },
                {
                  key:"contactFaxNum",
                  name : "传真电话"
                },
                {
                  key:"schoolAdminOrgName",
                  name : "学校主管部门"
                },
                {
                  key:"contactEmail",
                  name : "电子邮箱"
                },
                {
                  key:"schoolRunTypeCodeName",
                  name : "学校办学类型"
                },
                {
                  key:"webUrl",
                  name : "主页地址"
                },
                {
                  key:"orgAddress",
                  name : "学校（机构）地址"
                },
                {
                  key:"segmentName",
                  name : "学段"
                },
                {
                  key:"orgIntroduction",
                  name : "学校介绍"
                },
                {
                  key:"organizationNum",
                  name : "组织机构码"
                },
                {
                  key:"partyCommitteeLeader",
                  name : "党委负责人号"
                },
                {
                  key:"adminAreaNum",
                  name : "行政区划码"
                },
                {
                  key:"legalRepresentativeNum",
                  name : "法定代表人号"
                },
                {
                  key:"schoolAdminOrgNum",
                  name : "学校主管部门码"
                },
                {
                  key:"legalPersonCertificateNum",
                  name : "法人证书号"
                },
                {
                  key:"schoolSinceYear",
                  name : "建校年月"
                },
                {
                  key:"principalTeacherNum",
                  name : "校长工号"
                },
                {
                  key:"schoolCelebrateDay",
                  name : "校庆日"
                },
                {
                  key:"principalTeacherName",
                  name : "校长姓名"
                }
              ]
          })*/
      },
      orgType(){
        //加载机构类型
         commonApi.getCodeIntType("orgType").then(res => {
          let viewList = res.data.data || [];
          for (let orgTypeItem of viewList) {
            this.orgTypeCodeOptions.push({
              "label": orgTypeItem.codeDesc,
              "name": orgTypeItem.codeId
            });
          }
        })
      },
      dialogDeleteComfireHandler(){
          this.SET_DIALOG_LOADING(true)
          this.del()
      },
      dialogDeleteCancelHandler(){
        this.SET_DIALOG_VISIBLE(false);
      },
      //删除
      lotDel(){
        if(this.$refs.schooltable.selection.length === 0){
          this.$xxMsg({
            msg : "请至少选择一项内容!",
            css : {
              position: "absolute",
              top:"40%",
              left:"47%"
            }
          })
          return;
        }
        this.SET_DIALOG_VISIBLE(true);
      },
      del(){
        api.lotDel(this.multipleSelection.map(item => {
          return item.schoolOrgId
        })).then(res => {
          this.SET_DIALOG_VISIBLE(false);
          this.SET_DIALOG_LOADING(false);
          this.getList();
        }, res => {
          this.SET_DIALOG_LOADING(false)
          this.$message.error(res.message);
        });
      },
      //删除表格当前行
      rowDel(item) {
        this.SET_DIALOG_VISIBLE(true);
        this.multipleSelection = [item];
      },
      //表格的全选
      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
      sortChange(obj) {
        this.params.orderByField = obj.prop;
        this.params.isAsc = obj.order == "ascending" ? true : false;
        this.setCurrentPage(this.$route.fullPath, this.params)
        this.isLoaded = true;
        this.getList();
      },
      handleSizeChange: function (size) {
        this.params.limit = size;
        this.isLoaded = true;
        this.getList();
      },
      handleCurrentChange: function (currentPage) {
        this.params.page = currentPage;
        this.isLoaded = true;
        this.getList();
      },
      // 分页按找正常序列开始
      typeIndex(index) {
        return index + this.params.limit * (this.params.page - 1) + 1;
      },
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      getList() {
        api.getList(this.params).then(res => {
          this.data = res.data.data;
          this.SET_IS_LOADING(false)
        }, res => {
          this.$message.error(res.message);
        });
      },
      search() {
        this.params.page = 1;
        for(let key in this.searchForm){
          this.params[key] = this.searchForm[key]
        }
        this.isLoaded = true;
        this.getList();
      },
      toAdd() {
        this.$router.push({path: '/basedata/basicschoolorg/p',query:{type:"add",id : 0}})
      },
      toEdit(id) {
        this.$router.push({path: `/basedata/basicschoolorg/p`,query:{type:"edit",id : id}})
      },
      toDetail(id) {
        this.$router.push({path: `/basedata/basicschoolorg/p`,query:{type:"detail",id : id}})
      },

    toPlace(id, path,name) {
          let opath = '/basedata/' + path ;
          this.$router.push({path: opath,query:{schoolId:id,schoolOrgName : name}})
        },
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .tips-school{
    position: absolute;
    top:40%;
    left:47%;

  }
  .schoolSearchInput{
    width:110px;
    margin-right:15px;
  }
  .schoolForm .el-form-item{
    margin-bottom:15px;
  }
  .select-all{
    margin:0px 0 5px;
  }
  .selected-box{
    background:#F0F0F0;
    border-radius: 5px;
    padding:8px;
    font-size:16px;
    img{
      vertical-align: -4px;
    }
  }
  .selected-num{
    color:#509A8F;
    font-weight: bold;
  }


  .el-form-item {
    margin-right: 0;
  }

  .fr {
    margin: 10px 0;
    padding-left: 20px;
  }


</style>
