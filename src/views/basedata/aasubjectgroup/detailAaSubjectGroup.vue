
<template>
<div>
    <div class="edit-box">
        <div  v-if="pageState === 'add'" class='mh500'>
            <div class="mb-20">基本信息
                <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
                <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <el-form  :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


                <el-col :span="12">
                     <el-form-item label="用户id *  :" prop="subjectId">
                                    <el-input v-model="formData.subjectId" maxlength="32"></el-input>
                    </el-form-item>
                </el-col>


                <el-col :span="12">
                     <el-form-item label="群组id *  :" prop="groupId">
                                    <el-input v-model="formData.groupId" maxlength="32"></el-input>
                    </el-form-item>
                </el-col>

                <div class="clearfix"></div>

            </el-form>
        </div>



         <div  v-if="pageState === 'detail'" class='mh500'>
            <el-row>
                <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
                    <h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>
                    <div class="mb-20">基本信息
                        <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
                    </div>
                    <!-- 详细查看 -->
                    <el-form :label-position="'right'" class="edit-form" label-width="165px"
                             :inline="true" :model="formData"  size="small">


                                    <el-col :span="12" v-if="formData.subjectId">
                                        <el-form-item label="用户id :" prop="subjectId">
                                            {{formData.subjectId}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.subjectGroupId">
                                        <el-form-item label="id :" prop="subjectGroupId">
                                            {{formData.subjectGroupId}}
                                        </el-form-item>
                                    </el-col>


                                    <el-col :span="12" v-if="formData.groupId">
                                        <el-form-item label="群组id :" prop="groupId">
                                            {{formData.groupId}}
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
            <el-button  type="primary" class="mr80" size="small"
                       @click="goBack">返回
            </el-button>
        </div>

    </div>
</div>
</template>

<script>
    import api from "./aasubjectgroupUrl";
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

            data :"",
            formData:{
            subjectGroupId :null,
            },
            pickTime : {
                disabledDate(time)
                {
                    return time.getTime() < Date.now();
                }
            },
            rules : {
                subjectId :[
                        {required: true, message: "请您输入用户id", trigger: "blur"},
                        {max: 32, message: "最多能输入32个字", trigger: "blur"},

                    ],
                groupId :[
                        {required: true, message: "请您输入群组id", trigger: "blur"},
                        {max: 32, message: "最多能输入32个字", trigger: "blur"},

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
                this.$router.go(-1)
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
                        if (res.data.resultCode === "000000") {
                            this.data = res.data.data;
                            this.formData = res.data.data

                            this.formData.subjectId = this.data.subjectId;


                            this.formData.subjectGroupId = this.data.subjectGroupId;


                            this.formData.groupId = this.data.groupId;


                            this.formData.appOrgId = this.data.appOrgId;


                            this.formData.appId = this.data.appId;

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


</style>
