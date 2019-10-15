
<template>
<div>
    <div class="edit-box">
        <div  v-if="pageState === 'add'">
            <div class="mb-20">基本信息
                <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
                <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <el-form  :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


                <el-col :span="12">
                     <el-form-item label="服务地址 :" prop="serverAddress">
                                    <el-input v-model="formData.serverAddress" maxlength="255"></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                     <el-form-item label="远程地址 :" prop="remoteAddress">
                                    <el-input v-model="formData.remoteAddress" maxlength="255"></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                     <el-form-item label=" :" prop="uri">
                                    <el-input v-model="formData.uri" maxlength="255"></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                     <el-form-item label="开始时间 :" prop="startTime">
                                    <el-input v-model="formData.startTime" maxlength="23"></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                     <el-form-item label="调用时长 :" prop="duration">
                                    <el-input v-model="formData.duration" maxlength="23"></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                     <el-form-item label="用户 :" prop="subjectId">
                                    <el-input v-model="formData.subjectId" maxlength="32"></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                     <el-form-item label="行为 :" prop="accesslogId">
                                    <el-input v-model="formData.accesslogId" maxlength="32"></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                     <el-form-item label="地理位置 :" prop="gpsInfo">
                                    <el-input v-model="formData.gpsInfo" maxlength="1024"></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                     <el-form-item label="手机型号 :" prop="mobileModel">
                                    <el-input v-model="formData.mobileModel" maxlength="64"></el-input>
                    </el-form-item>
                </el-col>


<el-col :span="12">
                     <el-form-item label="移动运营商 :" prop="netTypeCode">
                                    <el-select v-model="formData.netTypeCode" placeholder="请您选择">
                                        <el-option v-for="netTypeCodeItem in netTypeCodeOptions"
                                                   :key="netTypeCodeItem.name"
                                                   :label="netTypeCodeItem.label" :value="netTypeCodeItem.name">
                                        </el-option>
                                    </el-select>
                                          </el-form-item>
                                                                </el-col>


                <el-col :span="12">
                     <el-form-item label="手机串码 :" prop="macAddress">
                                    <el-input v-model="formData.macAddress" maxlength="128"></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                     <el-form-item label="经度 :" prop="longitude">
                                    <el-input v-model="formData.longitude" maxlength="24"></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                     <el-form-item label="纬度 :" prop="latitude">
                                    <el-input v-model="formData.latitude" maxlength="24"></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                     <el-form-item label="应用版本 :" prop="appVersion">
                                    <el-input v-model="formData.appVersion" maxlength="16"></el-input>
                    </el-form-item>
                </el-col>

                <div class="clearfix"></div>

            </el-form>
        </div>



         <div  v-if="pageState === 'detail'">
            <el-row>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                    <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
                    <div class="mb-20">基本信息
                        <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
                    </div>
                    <!-- 详细查看 -->
                    <el-form :label-position="'right'" class="schoolForm-rao schoolForm-detail-rao" label-width="165px"
                             :inline="true" :model="formData"  size="small">


                                    <el-col :span="12" v-if="formData.accesslogentryId">
                                        <el-form-item label="用户行为日志 :" prop="accesslogentryId">
                                            {{formData.accesslogentryId}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.serverAddress">
                                        <el-form-item label="服务地址 :" prop="serverAddress">
                                            {{formData.serverAddress}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.remoteAddress">
                                        <el-form-item label="远程地址 :" prop="remoteAddress">
                                            {{formData.remoteAddress}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.uri">
                                        <el-form-item label=" :" prop="uri">
                                            {{formData.uri}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.startTime">
                                        <el-form-item label="开始时间 :" prop="startTime">
                                            {{formData.startTime}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.duration">
                                        <el-form-item label="调用时长 :" prop="duration">
                                            {{formData.duration}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.subjectId">
                                        <el-form-item label="用户 :" prop="subjectId">
                                            {{formData.subjectId}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.accesslogId">
                                        <el-form-item label="行为 :" prop="accesslogId">
                                            {{formData.accesslogId}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="24" v-if="formData.gpsInfo">
                                        <el-form-item label="地理位置 :" prop="gpsInfo">
                                            {{formData.gpsInfo}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.mobileModel">
                                        <el-form-item label="手机型号 :" prop="mobileModel">
                                            {{formData.mobileModel}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12">
                                        <el-form-item label="移动运营商 :" prop="netTypeCode"
                                                      v-if="formData.netTypeCodeStr"
                                                      :style="{'color':formData.netTypeCodeStr.split(';')[1]}">
                                            {{formData.netTypeCodeStr.split(';')[0]}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.macAddress">
                                        <el-form-item label="手机串码 :" prop="macAddress">
                                            {{formData.macAddress}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.longitude">
                                        <el-form-item label="经度 :" prop="longitude">
                                            {{formData.longitude}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.latitude">
                                        <el-form-item label="纬度 :" prop="latitude">
                                            {{formData.latitude}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.appVersion">
                                        <el-form-item label="应用版本 :" prop="appVersion">
                                            {{formData.appVersion}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.appOrgId">
                                        <el-form-item label="机构 :" prop="appOrgId">
                                            {{formData.appOrgId}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.appId">
                                        <el-form-item label="应用 :" prop="appId">
                                            {{formData.appId}}
                                        </el-form-item>
                                    </el-col>



                    </el-form >
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
    import api from "./amaccesslogentryUrl";
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
            //getFileUrl: commonApi.getFileUrl(),
            //getImageUrl: commonApi.getImageUrl(),

            netTypeCodeOptions: [{"label": "全部", "name": ""}], netTypeCode : null,
            data :"",
            formData:{
            accesslogentryId :null,
            },
            pickTime : {
                disabledDate(time)
                {
                    return time.getTime() < Date.now();
                }
            },
            rules : {
                serverAddress :[
                        {max: 255, message: "最多能输入255个字", trigger: "blur"},

                    ],
                remoteAddress :[
                        {max: 255, message: "最多能输入255个字", trigger: "blur"},

                    ],
                uri :[
                        {max: 255, message: "最多能输入255个字", trigger: "blur"},

                    ],
                startTime :[
                        {validator: validation.number, trigger: "blur"},

                    ],
                duration :[
                        {validator: validation.number, trigger: "blur"},

                    ],
                subjectId :[
                        {max: 32, message: "最多能输入32个字", trigger: "blur"},

                    ],
                accesslogId :[
                        {max: 32, message: "最多能输入32个字", trigger: "blur"},

                    ],
                gpsInfo :[
                        {max: 1024, message: "最多能输入1024个字", trigger: "blur"},

                    ],
                mobileModel :[
                        {max: 64, message: "最多能输入64个字", trigger: "blur"},

                    ],
                netTypeCode :[
                        {max: 64, message: "最多能输入64个字", trigger: "blur"},

                    ],
                macAddress :[
                        {max: 128, message: "最多能输入128个字", trigger: "blur"},

                    ],
                longitude :[
                        {validator: validation.number, trigger: "blur"},

                    ],
                latitude :[
                        {validator: validation.number, trigger: "blur"},

                    ],
                appVersion :[
                        {max: 16, message: "最多能输入16个字", trigger: "blur"},

                    ],
                }
            }
        },
        computed: {

            pageState() {
                return this.$route.params.type;
            }
        },
            components: {editor,upload},
        created() {
            this.getDetail(this.$route.params.id);
                     commonApi.getCodeIntType("netType").then(res => {
                        let viewList = res.data.data || [];
                        for (let netTypeItem of viewList) {
                            this.netTypeCodeOptions.push({
                                "label": netTypeItem.codeDesc,
                                "name": netTypeItem.codeId
                            });
                        }
                    }, res => {
                        this.$message.error(res.data.message);
                    });
        },
        methods: {
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
                    if (this.pageState == "edit" && valid ) {
                        api.putObj(this.formData).then(res => {

                            if (res.data.resultCode === '000000') {
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
                    } else if (this.pageState == "add" && valid ) {
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

                            this.formData.accesslogentryId = this.data.accesslogentryId;


                            this.formData.serverAddress = this.data.serverAddress;


                            this.formData.remoteAddress = this.data.remoteAddress;


                            this.formData.uri = this.data.uri;


                            this.formData.startTime = this.data.startTime;


                            this.formData.duration = this.data.duration;


                            this.formData.subjectId = this.data.subjectId;


                            this.formData.accesslogId = this.data.accesslogId;


                            this.formData.gpsInfo = this.data.gpsInfo;


                            this.formData.mobileModel = this.data.mobileModel;


                            this.formData.netTypeCode = this.data.netTypeCode;


                            this.formData.macAddress = this.data.macAddress;


                            this.formData.longitude = this.data.longitude;


                            this.formData.latitude = this.data.latitude;


                            this.formData.appVersion = this.data.appVersion;


                            this.formData.appOrgId = this.data.appOrgId;


                            this.formData.appId = this.data.appId;


                            this.formData.version = this.data.version;
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
