
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
                             <el-form-item label="应用欢迎主题 :" prop="welcomeThemeId">
                                    <el-input v-model="formData.welcomeThemeId" maxlength="32"></el-input>
                             </el-form-item>
</el-col>



<el-col :span="24">
                        <el-form-item label="图片 :" prop="imagePath">
                            <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                        </el-form-item>
</el-col>



<el-col :span="12">
                             <el-form-item label="标题 :" prop="title">
                                    <el-input v-model="formData.title" maxlength="128"></el-input>
                             </el-form-item>
</el-col>



<el-col :span="12">
                             <el-form-item label="描述 :" prop="description">
                                    <el-input v-model="formData.description" maxlength="200"></el-input>
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



            <el-col :span="24">
                <el-form-item label="图片 :" prop="imagePath">
                    <upload v-on:uploadData="uploadData" :imagelist="formData.imagePath"/>
                </el-form-item>
            </el-col>


                <el-col :span="12">
                     <el-form-item label="标题 :" prop="title">
                                    <el-input v-model="formData.title" maxlength="128"></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                     <el-form-item label="描述 :" prop="description">
                                    <el-input v-model="formData.description" maxlength="200"></el-input>
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


                                    <el-col :span="24"  v-if="formData.imagePath">
                                        <el-form-item label="图片 :" prop="imagePath">
                                            <img :src="formData.imagePath" alt="" width="100px" >
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.title">
                                        <el-form-item label="标题 :" prop="title">
                                            {{formData.title}}
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="12" v-if="formData.description">
                                        <el-form-item label="描述 :" prop="description">
                                            {{formData.description}}
                                        </el-form-item>
                                    </el-col>

                                    <el-col :span="12" v-if="formData.sequnceNum">
                                        <el-form-item label="序号 :" prop="sequnceNum">
                                            {{formData.sequnceNum}}
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
    import api from "./appwelcomeimageUrl";
    import validation from "@/util/validate2";
    import commonApi from "@/api/common/common";
    import editor from '@/components/editor/editor'
    import upload from '@/components/upload/uploadFileV1'
    import uploads from '@/components/upload/uploadFile'
    export default {
        components: {editor,upload,uploads},
    data() {
        return {
            xuantian: false, //选填信息
            formLoading: false,
            isLoaded: true,
            imagePath: [], //单独使用一个图片变量
            //getFileUrl: commonApi.getFileUrl(),
            //getImageUrl: commonApi.getImageUrl(),

            imagePathFileList : [],
            imagePathFileType:'',
            formData:{
            welcomeImageId: '',
            imagePath :"",
            title :"",
            description :"",
            sequnceNum :"",
            },
            pickTime : {
                disabledDate(time)
                {
                    return time.getTime() < Date.now();
                }
            },
            rules : {
                welcomeThemeId :[
                        {max: 32, message: "最多能输入32个字", trigger: "blur"},

                    ],
                imagePath :[
                        {max: 255, message: "最多能输入255个字", trigger: "blur"},

                    ],
                title :[
                        {max: 128, message: "最多能输入128个字", trigger: "blur"},

                    ],
                description :[
                        {max: 200, message: "最多能输入200个字", trigger: "blur"},

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
        created() {
            this.getDetail(this.$route.params.id);
        },
        methods: {
            //图片上传
            uploadData(res) {
                this.formData.imagePath = res;
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

            getFileMessage(res) {
                let obj = res;
                // console.log('图片基本信息');
                // console.log(obj);
                this.formData.imagePath = res.urlurl;
                this.formData.url = res.urlurl;
                this.formData.sizes = res.size;
                this.formData.folderId = this.$route.params.id;
            },





            getDetail(paramsId) {
                if (this.pageState !== 'add') {
                    api.getObj(paramsId).then(res => {
                        if (res.data.resultCode === "000000") {
                            this.formData = res.data.data
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
