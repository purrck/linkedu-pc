<template>
<el-container v-loading="isLoaded" element-loading-spinner="el-icon-loading" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-background="rgba(0, 0, 0, 0.1)" >
  <div style="width:70%;margin:0 auto 0;">
    <el-main>
        <div v-if="state == 'all'">

            <div class="text-center mb-20">
                <img src="~@/assets/img/step1.png" />
            </div>

            <el-row>
                <el-col :span="6">
                    <div class="grid-content clearfix bg-grey">
                        <el-col :span="6">
                            <div class="drwc-img">
                                <img src="~@/assets/img/icon_daoruwancheng.png" width="100%" />
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="pr-20">
                                <p class="fs-14">本次导入成功数据{{successCount}}条，失败数据{{failCount}}条</p>
                                <div class="text-right mt-10 fs-14"><a href="javascript:void(0)" @click="failHandler" style="color:#838383">查看失败原因<img class="vm-3 pl-10" src="~@/assets/img/icon_chakan.png" width="15px" /></a></div>
                            </div>
                        </el-col>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content clearfix bg-grey">
                        <el-col :span="6">
                            <div class="daoruchenggong-img">
                                <img src="~@/assets/img/icon-zhengque.png" width="100%" />
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="pr-20">
                                <p class="text-right fs-14">{{successCount}}条</p>
                                <div class="text-right mt-10 fs-14">
                                    <a :href="successDownloadUrl" style="color:#838383"><img class="vm-1 pr-10" src="~@/assets/img/icon_xiazai.png" width="13px" />下载成功的数据</a>
                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-grey">
                        <el-col :span="6">
                            <div class="daoruchenggong-img">
                                <img src="~@/assets/img/icon_cuowu.png" width="100%" />
                            </div>
                        </el-col>
                        <el-col :span="18">
                            <div class="pr-20">
                                <p class="text-right fs-14">{{failCount}}条</p>
                                <div class="text-right mt-10 fs-14">
                                    <a :href="failDownloadUrl" style="color:#838383"><img src="~@/assets/img/icon_xiazai.png" width="13px" class="vm-1 pr-10" />下载失败的数据</a>
                                </div>
                            </div>
                        </el-col>
                    </div>
                </el-col>
                <el-col :span="6">
                    <div class="grid-content bg-grey">
                        <el-col :span="6">
                            <div class="daoruchenggong-img">
                                <img src="~@/assets/img/icon_chongxindaoeu.png" width="100%" />
                            </div>
                        </el-col>
                        <el-col :span="18">

                            <div class="text-right pr-20 mt-10 fs-14">
                                <a href="javascript:void(0)" style="color:#838383" @click="toImport"><img class="vm-1 pr-10" src="~@/assets/img/icon_chongxindaoru.png" width="13px" />继续上传</a>
                            </div>
                        </el-col>
                    </div>
                </el-col>
            </el-row>


            <el-table :data="allList" class="table-rao checkbox-rao mt-15" ref="schooltable" tooltip-effect="dark" style="width: 100%" border>
                <el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
                <el-table-column prop="studentNum" label="学号" align="center"  ></el-table-column>
                <el-table-column prop="studentNationalSetNum" label="国家统一学籍编码" align="center"  ></el-table-column>
                <el-table-column prop="userName" label="学生姓名" align="center"  ></el-table-column>
                <el-table-column prop="classNum" label="年级编号" align="center"  ></el-table-column>
                <el-table-column prop="gender" label="性别" align="center" ></el-table-column>
                <el-table-column label="错误提示" align="center" >
                    <template slot-scope="scope">
                        <div v-if="scope.row.remark">
                            <span style="color:red">{{scope.row.remark}}</span>
                        </div>
                        <div v-else>
                            <span style="color:green">导入成功</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div v-if="state == 'fail'">
            <div class="importHead"><img src="~@/assets/img/icon_chengong.png" style="vertical-align: -9px;padding-right:10px;" width="30" />导入数据失败 <span style="color:#CB3946">{{failCount}}</span> 条</div>
            <el-table :data="failData" class="table-rao checkbox-rao" ref="schooltable" tooltip-effect="dark" style="width: 100%" border>
                <el-table-column type="index" label="序号" align="center"></el-table-column>
                <el-table-column prop="teacherNum" label="教师编号" align="center"  ></el-table-column>
                <el-table-column prop="userName" label="教师姓名" align="center"  ></el-table-column>
                <el-table-column prop="telPhoneNum" label="手机号" align="center"  ></el-table-column>
                <el-table-column prop="gender" label="性别" align="center"  ></el-table-column>
                <el-table-column prop="teachSubjectId" label="学科编号" align="center"  ></el-table-column>
                <el-table-column prop="teachSubjectName" label="学科名称" align="center"  ></el-table-column>
                <el-table-column prop="teachSegmentId" label="学段编号" align="center" ></el-table-column>
                <el-table-column prop="teachSegmentName" label="学段名称" align="center" ></el-table-column>
                <el-table-column prop="teachGradeId" label="年级编号" align="center" ></el-table-column>
                <el-table-column prop="teachGradeName" label="年级名称" align="center" ></el-table-column>
                <el-table-column label="错误提示" align="center" >
                    <template slot-scope="scope">
                        <span style="color:red">{{scope.row.remark}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </el-main>
</div>
</el-container>
</template>

<script>
    import importFile from '@/components/importFile/importFile'

    export default{
        data(){
            return {
                state : "all",
                fullHeight: document.documentElement.clientHeight,
                isLoaded : false
            }
        },
        components : {
            importFile
        },
        computed : {
            failDownloadUrl(){
                return `${this.$route.query.data.data.failDownloadUrl}`;
            },
            successDownloadUrl(){
                return `${this.$route.query.data.data.successDownloadUrl}`;
            },
            failCount(){
                return this.$route.query.data.data.failCount;
            },
            successCount(){
                return this.$route.query.data.data.successCount;
            },
            allList(){
              let failData = this.$route.query.data.data.failData || [];
              let successData = this.$route.query.data.data.successData || [];
                return successData.concat(failData);
            },
            failData(){
                return this.$route.query.data.data.failData;
            }
        },
        mounted() {
            // console.log('data');
            // console.log(this.$route.query.data);
            // console.log(this.$route.query.data.data.failDownloadUrl);
            // console.log(this.allList)
        },
        methods : {
            failHandler(){

                this.state = "fail";
            },
            toImport(){
                this.$router.push({path: `/basedata/basicstudent/import`});
            },
            beforeUpload(){

                this.isLoaded = true;
            },
            importCallback(data){
                // console.log(data);
                this.isLoaded = false;
            }
        }
    }
</script>
<style lang="scss" scoped>
    .importHead{
        background:#CCCCCC;
        padding:10px 0;
        text-align:center;
        margin-top:20px;
        font-size:14px;
    }
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
</style>
