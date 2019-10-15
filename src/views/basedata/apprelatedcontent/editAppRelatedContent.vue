
<template>
    <div>
        <div class="edit-box">
                            <div  v-if="pageState === 'add'">
                    <div class="mb-20">基本信息
                        <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
                        <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
                    </div>
                    <el-form  :label-position="'right'" class="edit-form"
                              label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


                                                                    <el-col :span="12">
                                        <el-form-item label="应用 :" prop="appId">
                                            <el-input v-model="formData.appId" maxlength="32"></el-input>
                                        </el-form-item>
                                    </el-col>


                                                                    <el-col :span="12">
                                        <el-form-item label="应用 :" prop="appName">
                                            <el-input v-model="formData.appName" maxlength="32"></el-input>
                                        </el-form-item>
                                    </el-col>


                                                                    <el-col :span="12">
                                        <el-form-item label="文案类型 :" prop="contentTypeCode">
                                            <el-select v-model="formData.contentTypeCode" placeholder="请您选择">
                                                <el-option v-for="contentTypeCodeItem in contentTypeCodeOptions"
                                                           :key="contentTypeCodeItem.name"
                                                           :label="contentTypeCodeItem.label" :value="contentTypeCodeItem.name">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>


                                                                    <el-col :span="12">
                                        <el-form-item label="文案状态 :" prop="contentStatusCode">
                                            <el-select v-model="formData.contentStatusCode" placeholder="请您选择">
                                                <el-option v-for="contentStatusCodeItem in contentStatusCodeOptions"
                                                           :key="contentStatusCodeItem.name"
                                                           :label="contentStatusCodeItem.label" :value="contentStatusCodeItem.name">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>


                                                                    <el-col :span="12">
                                        <el-form-item label="文案 :" prop="contentTitle">
                                            <el-input v-model="formData.contentTitle" maxlength="128"></el-input>
                                        </el-form-item>
                                    </el-col>


                                                                    <el-col :span="12">
                                        <el-form-item label="文案内容 :" prop="content">
                                            <el-input v-model="formData.content" maxlength="2147483647"></el-input>
                                        </el-form-item>
                                    </el-col>


                                                                    <el-col :span="12">
                                        <el-form-item label="当前应用 :" prop="isCurrent">
                                            <el-select v-model="formData.isCurrent" placeholder="请您选择">
                                                <el-option v-for="isCurrentItem in ynOptions" :key="isCurrentItem.name"
                                                           :label="isCurrentItem.label" :value="isCurrentItem.name">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>


                                                                    <el-col :span="12">
                                        <el-form-item label="序号 :" prop="sequnceNum">
                                            <el-input v-model="formData.sequnceNum" maxlength="11"></el-input>
                                        </el-form-item>
                                    </el-col>

                                                                                                                                                                                                                                                                                                                                                <div class="clearfix"></div>

                    </el-form>
                </div>

                            <div  v-if="pageState === 'edit'">
                    <div class="mb-20">基本信息
                        <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
                        <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
                    </div>
                    <el-form  :label-position="'right'" class="edit-form"
                              label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">



                                                                    <el-col :span="12">
                                        <el-form-item label="文案类型 :" prop="contentTypeCode">
                                            <el-select v-model="formData.contentTypeCode" placeholder="请您选择">
                                                <el-option v-for="contentTypeCodeItem in contentTypeCodeOptions"
                                                           :key="contentTypeCodeItem.name"
                                                           :label="contentTypeCodeItem.label" :value="contentTypeCodeItem.name">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>


                                                                    <el-col :span="12">
                                        <el-form-item label="文案状态 :" prop="contentStatusCode">
                                            <el-select v-model="formData.contentStatusCode" placeholder="请您选择">
                                                <el-option v-for="contentStatusCodeItem in contentStatusCodeOptions"
                                                           :key="contentStatusCodeItem.name"
                                                           :label="contentStatusCodeItem.label" :value="contentStatusCodeItem.name">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>


                                                                    <el-col :span="12">
                                        <el-form-item label="文案 :" prop="contentTitle">
                                            <el-input v-model="formData.contentTitle" maxlength="128"></el-input>
                                        </el-form-item>
                                    </el-col>


                                                                    <el-col :span="12">
                                        <el-form-item label="文案内容 :" prop="content">
                                            <el-input v-model="formData.content" maxlength="2147483647"></el-input>
                                        </el-form-item>
                                    </el-col>


                                                                    <el-col :span="12">
                                        <el-form-item label="当前应用 :" prop="isCurrent">
                                            <el-select v-model="formData.isCurrent" placeholder="请您选择">
                                                <el-option v-for="isCurrentItem in ynOptions" :key="isCurrentItem.name"
                                                           :label="isCurrentItem.label" :value="isCurrentItem.name">
                                                </el-option>
                                            </el-select>
                                        </el-form-item>
                                    </el-col>


                                                                    <el-col :span="12">
                                        <el-form-item label="序号 :" prop="sequnceNum">
                                            <el-input v-model="formData.sequnceNum" maxlength="11"></el-input>
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
                        <el-form :label-position="'right'" class="edit-form" label-width="165px"
                                 :inline="true" :model="formData"  size="small">

                                                                            <el-col :span="12" v-if="formData.appName">
                                            <el-form-item label="应用 :" prop="appName">
                                                {{formData.appName}}
                                            </el-form-item>
                                        </el-col>

                                                                            <el-col :span="12"  v-if="formData.contentTypeCode">
                                            <el-form-item label="文案类型 :" prop="contentTypeCode" :style="{'color':formData.contentTypeCodeStr.split(';')[1]}">
                                                {{formData.contentTypeCodeStr.split(';')[0]}}
                                            </el-form-item>
                                        </el-col>

                                                                            <el-col :span="12"  v-if="formData.contentStatusCode">
                                            <el-form-item label="文案状态 :" prop="contentStatusCode" :style="{'color':formData.contentStatusCodeStr.split(';')[1]}">
                                                {{formData.contentStatusCodeStr.split(';')[0]}}
                                            </el-form-item>
                                        </el-col>

                                                                            <el-col :span="12" v-if="formData.contentTitle">
                                            <el-form-item label="文案 :" prop="contentTitle">
                                                {{formData.contentTitle}}
                                            </el-form-item>
                                        </el-col>

                                                                            <el-col :span="24" v-if="formData.content">
                                            <el-form-item label="文案内容 :" prop="content">
                                                {{formData.content}}
                                            </el-form-item>
                                        </el-col>


                                        <el-col :span="12"  v-if="formData.isCurrent">
                                            <el-form-item label="当前应用 :" prop="isCurrent">
                                                <el-switch v-model="formData.isCurrent == 'Y'" disabled></el-switch>
                                            </el-form-item>
                                        </el-col>


                                                                            <el-col :span="12" v-if="formData.sequnceNum">
                                            <el-form-item label="序号 :" prop="sequnceNum">
                                                {{formData.sequnceNum}}
                                            </el-form-item>
                                        </el-col>

                                                                            <el-col :span="12" v-if="formData.userName">
                                            <el-form-item label="发布人 :" prop="userName">
                                                {{formData.userName}}
                                            </el-form-item>
                                        </el-col>

                                                                            <el-col :span="12"  v-if="formData.publishedDt">
                                            <el-form-item label="发布时间 :" prop="publishedDt">
                                                {{formData.publishedDt}}
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
                <el-button  type="primary" class="mr80" size="small"
                            @click="goBack">返回
                </el-button>
            </div>

        </div>
    </div>
</template>

<script>
    import api from "./apprelatedcontentUrl";
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

                                                                                                                                                                                                                                                                                        contentTypeCodeOptions: [{"label": "全部", "name": ""}], contentTypeCode : null,
                                                                                                                    contentStatusCodeOptions: [{"label": "全部", "name": ""}], contentStatusCode : null,
                                                                                                                                                                                                                                                                                            ynOptions :[{"label": "全部", "name": ""}], isCurrent : null,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    formData:{
                                                                                contentId: '',
                                                                                                                                                                                                contentTypeCode :"",
                                                                                                    contentStatusCode :"",
                                                                                                    contentTitle :"",
                                                                                                    content :"",
                                                                                                    isCurrent :"",
                                                                                                    sequnceNum :"",
                                                                                                                                                                                                                                                                                                                                                            },
            pickTime : {
                disabledDate(time)
                {
                    return time.getTime() < Date.now();
                }
            },
            rules : {
                                                                                                appId :[
                                                                            {max: 32, message: "最多能输入32个字", trigger: "blur"},

                    ],
                                                                                appName :[
                                                                            {max: 32, message: "最多能输入32个字", trigger: "blur"},

                    ],
                                                                                contentTypeCode :[
                                                                            {max: 32, message: "最多能输入32个字", trigger: "blur"},

                    ],
                                                                                contentStatusCode :[
                                                                            {max: 255, message: "最多能输入255个字", trigger: "blur"},

                    ],
                                                                                contentTitle :[
                                                                            {max: 128, message: "最多能输入128个字", trigger: "blur"},

                    ],
                                                                                content :[

                    ],
                                                                                isCurrent :[
                                                                            {max: 2, message: "最多能输入2个字", trigger: "blur"},

                    ],
                                                                                sequnceNum :[
                                                                                                                            {validator: validation.number, trigger: "blur"},

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
                                                                                                                                                                                    commonApi.getCodeIntType("contentType").then(res => {
                        let viewList = res.data.data;
                        for (let contentTypeItem of viewList) {
                            this.contentTypeCodeOptions.push({
                                "label": contentTypeItem.codeDesc,
                                "name": contentTypeItem.codeId
                            });
                        }
                    }, res => {
                        this.$message.error(res.data.message);
                    });
                                                                                commonApi.getCodeIntType("contentStatus").then(res => {
                        let viewList = res.data.data;
                        for (let contentStatusItem of viewList) {
                            this.contentStatusCodeOptions.push({
                                "label": contentStatusItem.codeDesc,
                                "name": contentStatusItem.codeId
                            });
                        }
                    }, res => {
                        this.$message.error(res.data.message);
                    });
                                                                                                                                                                                        commonApi.getCodeIntType("boolean_yn").then(res => {
                        let viewList = res.data.data;
                        for (let ynItem of viewList) {
                            this.ynOptions.push({
                                "label": ynItem.codeDesc,
                                "name": ynItem.codeId
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
                    if (this.pageState === "edit" && valid ) {
                        api.putObj(this.formData).then(res => {

                            if (res.data.resultCode === "000000") {
                                this.formLoading = false;
                                this.$message.success("修改成功");
                                this.goBack()
                            } else {
                                //this.$message.error(res.data.message);
                                this.formLoading = false;
                            }
                        }, res => {
                            this.$message.error("加载失败");
                            this.formLoading = false;
                        })
                    } else if (this.pageState === "add" && valid ) {
                        api.addObj(this.formData).then(res => {
                            if (res.data.resultCode === "000000") {
                                this.formLoading = false;
                                this.$message.success("修改成功");
                                this.goBack()
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
                        if (res.data.resultCode === "000000") {
                            this.formData = res.data.data























                                                                    this.formData.publishedDt = this.data.publishedDt;





                                                    }
                        this.isLoaded = false;
                    }, res => {
                        this.$message.error(res.message);
                    });
                }
            },
            goBack () {
                this.$router.go(-1);
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

    .width100 {
        width: 100%;
    }

    .form-table {
        margin-top: 20px;
    }

    .bm-view {
        width: 760px;
        height: 300px;
        margin-top: 10px;
    }
</style>
