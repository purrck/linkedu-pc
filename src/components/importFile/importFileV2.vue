<template>
  <el-container v-loading="isLoading" element-loading-spinner="el-icon-loading"
                element-loading-custom-class="home-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)">
    <el-main>
        <div v-show="step == '1'">
            <el-row>
                <el-col :span="14">
                    <el-row>
                        <el-col :span="2">
                            <p class="f14 mt8">导入数据：</p>
                        </el-col>
                        <el-col :span="22">
                            <el-tabs class="importTabs-rao" v-model="roleType" type="card">
                                <el-tab-pane v-for="(data,key) in importData" :key="key" :label="data.label" :name="data.name"></el-tab-pane>
                            </el-tabs>
                        </el-col>
                    </el-row>
                    <div class="importBox">
                        <div class="text-center mt-20">
                            <img src="~@/assets/img/stepv1.png" style="max-width:814px;width:100%" />
                            <div class="padding20-y">
                                <div class="importWrap">
                                    <div class="importFile">
                                    <el-button type="info" @click="toImport" class="btn-rao" plain><img src="~@/assets/img/icon_daoru11.png" width="20" plain/> 导入
                                    </el-button>
                                    <input v-show="item" type="file" name="file" class="file"
                                            accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                            @change="getFile($event)"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </el-col>
                <el-col :span="9" :offset="1">
                    <p class="fs-14 mt-20">Excel模板下载：</p>
                    <div class="importBox mt-10">
                        <div class="text-center">
                            <div>
                                <el-button type="info" @click="exampleDown" class="btn-rao" plain><img src="~@/assets/img/download.png" width="20" plain/>
                                下载
                                </el-button>
                            </div>
                        </div>
                    </div>

                    <p class="f14 mt-20">注意事项：</p>
                    <div class="importBox mt-10">
                        <div class="text-center f14 line-height1-5">
                            <p>1、导入文件大小不得超过10M</p>
                            <p>2、仅支持导入.xls格式</p>
                            <p>3、不得导入重复数据</p>
                        </div>
                    </div>
                </el-col>
            </el-row>


        </div>

        <div v-show="step == '2'" style="width:70%;margin:0 auto 0;">

            <div class="text-center mb-20">
                <img src="~@/assets/img/step1.png" />
            </div>

            <el-row>
                <el-col :span="6">
                    <div class="grid-content clearfix bg-grey">
                        <el-col :span="5" :offset="1">
                            <div class="drwc-img">
                                <img src="~@/assets/img/icon_daoruwancheng.png" width="100%" />
                            </div>
                        </el-col>
                        <el-col :span="17" :offset="1">
                            <div class="pr-20">
                                <p class="fs-14">本次导入成功数据{{data.successCount}}条，失败数据{{data.failCount}}条</p>
                                <div class="text-right mt-10 fs-14"><a href="javascript:void(0)" @click="failHandler" style="color:#838383">查看失败原因<img class="vm-3 pl-10" src="~@/assets/img/icon_chakan.png" width="15px" /></a></div>
                            </div>
                        </el-col>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content clearfix bg-grey">
                        <el-col :span="5" :offset="1">
                            <div class="daoruchenggong-img">
                                <img src="~@/assets/img/icon-zhengque.png" width="100%" />
                            </div>
                        </el-col>
                        <el-col :span="17" :offset="1">
                            <div class="pr-20">
                                <p class="text-right fs-14">{{data.successCount}}条</p>
                                <div class="text-right mt-10 fs-14">
                                    <span style="color:#838383" v-show="!data.successDownloadUrl">暂无成功信息</span>
                                    <a :href="data.successDownloadUrl" v-show="data.successDownloadUrl" style="color:#838383"><img class="vm-1 pr-10" src="~@/assets/img/icon_xiazai.png" width="13px" />下载成功的数据</a>
                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-grey">
                        <el-col :span="5" :offset="1">
                            <div class="daoruchenggong-img">
                                <img src="~@/assets/img/icon_cuowu.png" width="100%" />
                            </div>
                        </el-col>
                        <el-col :span="17" :offset="1">
                            <div class="pr-20">
                                <p class="text-right fs-14">{{data.failCount}}条</p>
                                <div class="text-right mt-10 fs-14">
                                    <span style="color:#838383" v-show="!data.failDownloadUrl">暂无失败信息</span>
                                    <a :href="data.failDownloadUrl" v-show="data.failDownloadUrl" style="color:#838383"><img src="~@/assets/img/icon_xiazai.png" width="13px" class="vm-1 pr-10" />下载失败的数据</a>
                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-grey">
                        <el-col :span="5" :offset="1">
                            <div class="daoruchenggong-img">
                                <img src="~@/assets/img/icon_chongxindaoeu.png" width="100%" />
                            </div>
                        </el-col>
                        <el-col :span="17" :offset="1">

                            <div class="text-right pr-20 mt-10 fs-14">
                                <a href="javascript:void(0)" style="color:#838383" @click="reImport"><img class="vm-1 pr-10" src="~@/assets/img/icon_chongxindaoru.png" width="13px" />继续上传</a>
                            </div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>

            <el-table :data="allList" class="table-rao checkbox-rao mt-15" ref="schooltable" tooltip-effect="dark" style="width: 100%" border>
                <span v-for="(data,key) in item.column" :key="key">
                    <el-table-column v-if="data.prop != 'remark'" :prop="data.prop" :label="data.label" align="center"></el-table-column>
                    <el-table-column v-if="data.prop == 'remark'" :label="data.label" align="center" >
                        <template slot-scope="scope">
                            <div v-if="scope.row.remark">
                                <span style="color:red">{{scope.row.remark}}</span>
                            </div>
                            <div v-else>
                                <span style="color:green">导入成功</span>
                            </div>
                        </template>
                    </el-table-column>
                </span>
            </el-table>
        </div>

        <div v-if="step == '3'" style="width:70%;margin:0 auto 0;">
            <div class="flex1 space-between">
                <div>
                    <img src="~@/assets/img/icon_chengong.png" style="vertical-align: -9px;padding-right:10px;" width="30" />导入数据失败
                    <span style="color:#CB3946">{{data.failCount}}</span> 条
                </div>
                <div class="text-right"><a href="javascript:void(0)" @click="step='2'">返回列表</a></div>
            </div>
            <el-table :data="data.failData" class="table-rao checkbox-rao mt-15" ref="schooltable" tooltip-effect="dark" style="width: 100%" border>
                <span v-for="(data,key) in column" :key="key">
                    <el-table-column v-if="data.prop != 'remark'" :prop="data.prop" :label="data.label" align="center"></el-table-column>
                    <el-table-column v-if="data.prop == 'remark'" :label="data.label" align="center" >
                        <template slot-scope="scope">
                            <div v-if="scope.row.remark">
                                <span style="color:red">{{scope.row.remark}}</span>
                            </div>
                            <div v-else>
                                <span style="color:green">导入成功</span>
                            </div>
                        </template>
                    </el-table-column>
                </span>
            </el-table>
        </div>

    </el-main>
  </el-container>
</template>

<script>

  import commonApi from "@/api/common/common";
  import {baseUrl, khglUrl, dicUrl} from '@/config/env';
  // const  baseUrl = '/cHF'
  import { mapGetters, mapMutations } from 'vuex'
  export default {
    data() {
      return {
          allList:[],
        data : {},
        step : "1",

        item : "",
        flag : ""
      }
    },
    computed : {
        ...mapGetters(['importData','isLoading']),
      roleType : {
          get(){
              let _roleType = this.flag;
                this.item = this.importData.find((item) => {
                    return item.name == _roleType;
                }) || ""
                if(this.item == ""){
                    this.$message.error('错了哦，请选择一个模块,谢谢');
                }
            return _roleType;
          },
          set(_roleType){
              this.flag = _roleType;
                this.item = this.importData.find((item) => {
                    return item.name == _roleType;
                }) || ""
          }

      }
    },
    methods: {
        ...mapMutations(['SET_IS_LOADING']),
        toImport(){
            if(this.item == ""){
                this.$message.error('错了哦，请选择一个模块,谢谢');
                return false;
            }
        },
        exampleDown(){
            if(this.item == ""){
                this.$message.error('错了哦，请选择一个模块,谢谢');
                return false;
            }
            window.location.href=this.item.example;
        },
        reImport(){
            this.step = "1"
        },
        failHandler(){
            this.step = "3"
        },
        getFile(event) {
            if(this.item == ""){
                this.$message.error('错了哦，请选择一个模块,谢谢');
                return ;
            }

            let fileType = event.target.files[0].name;
            if (fileType.lastIndexOf(".xlsx") != -1 || fileType.lastIndexOf(".xls") < 1) {
                this.$message.error( "导入文件格式不正确,必须是xls后缀")
                return;
            }
            let formData = new FormData();
            formData.append('file', event.target.files[0]);
            this.SET_IS_LOADING(true);
            commonApi.importFileV1(formData,this.item.url).then((response) => {
                if(response.data.resultCode == "000000"){
                    response.data.data.failDownloadUrl = response.data.data.failDownloadUrl ? `${baseUrl}${response.data.data.failDownloadUrl}` : ''
                    response.data.data.successDownloadUrl = response.data.data.successDownloadUrl ? `${baseUrl}${response.data.data.successDownloadUrl}` : ''
                    response.data.data.failData = response.data.data.failData || []
                    response.data.data.successData = response.data.data.successData || []
                    this.data = response.data.data;
                    this.allList = this.data.failData.concat(this.data.successData);
                    event.target.value= "";
                    this.step = "2";
                }else{
                    this.$message.error(response.data.message);
                }
                this.SET_IS_LOADING(false);
            },(res) => {
                this.SET_IS_LOADING(false);
            });
      }
    },
    created(){
        this.SET_IS_LOADING(false);
        this.flag = this.$route.query.roleType;
        console.log(this.$route.query)
    }
  }
</script>
<style lang="scss" scoped>

    .grid-content{
        padding:10px 0;
        height:100px;
        align-items: center;
        display: -webkit-flex;
    }
    .bg-grey{
        background:#fff;
        box-shadow:0px 2px 37px 1px rgba(204,204,204,0.25);
    }
  .importBox {
    background: #fff;
    padding: 15px;
    box-shadow: 0px 2px 37px 1px rgba(204, 204, 204, 0.25);
  }
  .importWrap {
    display: inline-block;
    cursor: pointer;
  }

  .importFile {
    position: relative;
    display: inline-block;
    cursor: pointer;

    .file {
      position: absolute;
      top: 5px;
      left: 5px;
      z-index: 1;
      width: 70px;
      overflow: hidden;
      opacity: 0;
      cursor: pointer;
    }
  }
</style>
