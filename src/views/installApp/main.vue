<template>
<div class="bfff pl-10 pr-10">
            <div class="pt20 pb20 bfff">


                        <h1>
                            <img src="~@/assets/img/header-logo.png" />
                        </h1>

                    <!--<el-col :span="2" :offset="1">-->
                        <!--<a href="javascript:void(0)" :class="[ linkIndex == 0 ? 'c428675' : 'c999999' ]" @click="ilink(0)" class="f14 c999999">开发版</a>-->
                    <!--</el-col>-->
                    <!--<el-col :span="5" :xs="12">
                        <a href="javascript:void(0)" :class="[ linkIndex == 1 ? 'c428675' : 'c999999' ]" @click="ilink(1)" class="f14 c999999">演示版</a>
                    </el-col>-->


            </div>

            
                        <div class="mbrem15 f14"><el-button><a href="https://www.pgyer.com/u2wA">进入安装-家长端</a></el-button></div>
                        <div class="mbrem15 f14"><el-button><a href="https://www.pgyer.com/qV53">进入安装-教师端</a></el-button></div>
                        <div class="mbrem15 f14"><el-button><a href="https://www.pgyer.com/rbyz">进入安装-领导端</a></el-button></div>
                        <div class="mbrem15 f14"><el-button><a href="https://www.pgyer.com/du82">进入安装-安防端</a></el-button></div>
                        </div>
        <!--<el-footer :height="'auto'">
            <bottom/>
        </el-footer>-->

</template>

<script>
    import bottom from "@/components/container/bottom";
    export default {
        data(){
            return {
                index : 0,
                appType : "",
                linkIndex : 1
            }
        },
        components : {
            bottom
        },
        created(){
            console.log("33")
        },
        computed : {
            link(){
                if(this.linkIndex == 0){
                    return {
                        systemUrl : "http://192.168.2.60:7099/#/",
                        schoolUrl : "http://192.168.2.60:7099/#/",
                        educationUrl : "http://192.168.2.60:7099/#/"
                    }
                }
                if(this.linkIndex == 1){
                    return {
                        systemUrl : "http://47.106.35.119/#/",
                        schoolUrl : "http://47.106.35.119/#/",
                        educationUrl : "http://47.106.35.119/#/"
                    }
                }
            }
        },
        methods : {
            ilink(index){
                this.linkIndex = index;
            },
            erweima(type){
                this.appType = type;
            },
            tabs(index){
                this.index = index;
            }
        }
    }
</script>

<style>
</style>
