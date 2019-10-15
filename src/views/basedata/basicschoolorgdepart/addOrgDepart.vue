<template>
<el-container v-loading="isLoading" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)" class="bF5F5F5">
            <el-header style="height: auto">
                    <span class="f24">部门职位</span>
            </el-header>
            <el-main>
                <div class="edit-box bfff">
                    <el-card class="box-card orgDepartCard">
                        <div slot="header" class="bE8E8E8 clearfix text-center">
                            <span>请选择您要添加的部门职位模板</span>
                        </div>
                        <div>
                            <div v-for="(data,index) in list" :key="index">
                                <div @click="tempHandler(data)"><el-radio v-model="templateId" :label="data.id" class="mt10 mb15">{{data.name}}</el-radio></div>
                                <div class="flex1 flex-wrap-wrap">
                                    <div v-for="(data,index) in data.children" :key="index" class="p20 mb10 f12">{{data.name}}</div>
                                </div>
                            </div>

                            <div class="text-center mt20">
                                <el-button type="primary" size="small" class="button-v2-rao b93BF88" @click="queren">确认</el-button>
                                <el-button type="primary" size="small" @click="goBack" class="button-v2-rao b93BF88">取消</el-button>
                            </div>
                        </div>
                    </el-card>
                </div>
            </el-main>
    </el-container>
</template>

<script>
    import api from "./basicschoolorgdepartUrl";
    import { mapGetters, mapMutations } from 'vuex';
    export default {
        data(){
            return {
                templateId : "",
                templateName : "",
                list : []
            }
        },
        computed : {
            ...mapGetters(['isLoading','schoolInfo']),
        },
        created(){
            this.SET_IS_LOADING(false);
            this.getData();
        },
        mounted(){

        },
        methods : {
            ...mapMutations(["SET_IS_LOADING"]),
            queren(){

                if(!this.templateId){
                    this.$message.error("请选择模版");
                    return ;
                }

                this.SET_IS_LOADING(true);
                api.addBatchSchoolDepart(this.templateId).then(res => {
                    if (res.data.resultCode === "000000") {
                        let opath = `/basedata/orgDepartFenpei?templateId=${this.templateId}&templateName=${this.templateName}`;
                        this.$router.push({path: opath})
                    }else{
                        this.$message.error(res.data.message);
                    }
                    this.SET_IS_LOADING(false);
                }, res => {
                    this.$message.error("加载失败");
                    this.SET_IS_LOADING(false);
                })

            },
            goBack () {
                this.$router.go(-1);
            },
            tempHandler(data){
                this.templateName = data.name;
                this.templateId = data.id;
            },
            getData(){
                this.SET_IS_LOADING(true);
                api.getOrgDepartTemp().then(res => {

                    if (res.data.resultCode === "000000") {
                        this.list = res.data.data.children
                    }
                    this.SET_IS_LOADING(false);
                }, res => {
                    this.$message.error("加载失败");
                    this.SET_IS_LOADING(false);
                })
            }
        }
    }
</script>

<style lang="scss">
    .orgDepartCard{
        width:50%;
        margin:0 auto;
        .el-card__header{
            background:#E8E8E8;
            padding: 12px 20px;
        }
    }
</style>
