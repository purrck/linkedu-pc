<template>
    <el-container>
        <el-header :height="'auto'">
            <div class="pt20 pb20 bfff">
                <el-row class="align-items-flex-end">
                    <el-col :span="3">
                        <h1>
                            <img src="~@/assets/img/header-logo.png" />
                        </h1>
                    </el-col>
                    <!--<el-col :span="2" :offset="1">-->
                        <!--<a href="javascript:void(0)" :class="[ linkIndex == 0 ? 'c428675' : 'c999999' ]" @click="ilink(0)" class="f14 c999999">开发版</a>-->
                    <!--</el-col>-->
                    <el-col :span="5">
                        <a href="javascript:void(0)" :class="[ linkIndex == 1 ? 'c428675' : 'c999999' ]" @click="ilink(1)" class="f14 c999999">演示版</a>
                    </el-col>
                </el-row>

            </div>
        </el-header>
        <el-main class="bF5F5F5">
            <div style="max-width:1360px;" class="p100 marginAuto">
                <el-row>
                    <el-col :span="4">
                        <div style="max-width:200px;">
                            <div class="mbrem30 pbrem20 ptrem20 text-center bE0ECDC border-color-C3DBBE border1 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                <div class="p50 marginAuto"><a :href="link.systemUrl" target="_blank"><img src="~@/assets/img/icon_yunyin.png" class="inline-block p100" /></a></div>
                                <div class="frem24 c353535 mtrem15"><a :href="link.systemUrl" target="_blank">运营系统</a></div>
                            </div>
                            <div class="mbrem30 pbrem20 ptrem20 text-center bE0ECDC border-color-C3DBBE border1 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                <div class="p50 marginAuto"><a :href="link.schoolUrl" target="_blank"><img src="~@/assets/img/icon_yunyin.png" class="inline-block p100" /></a></div>
                                <div class="frem24 c353535 mtrem15"><a :href="link.schoolUrl" target="_blank">校方</a></div>
                            </div>
                            <div class="mbrem30 pbrem20 ptrem20 text-center bE0ECDC border-color-C3DBBE border1 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                <div class="p50 marginAuto"><a :href="link.educationUrl" target="_blank"><img src="~@/assets/img/icon_yunyin.png" class="inline-block p100" /></a> </div>
                                <div class="frem24 c353535 mtrem15"><a :href="link.educationUrl" target="_blank">教育局</a></div>
                            </div>
                        </div>
                    </el-col>
                    <el-col :span="20">
                        <div class="bfff parem18 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                            <el-row :gutter="20">
                                <el-col :span="6">
                                    <div @click="tabs(0)" :class="[ index == 0  ? 'border-color-93BF88' : 'border-color-F5F5F5' ]" class="bF5F5F5 parem10 border1 border-color-F5F5F5 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                        <div :class="[ index == 0 ? 'c93BF88' : 'c999999' ]" class="frem24 c999999">家长端</div>
                                        <div :class="[ index == 0 ? 'c93BF88' : 'c999999' ]" class="f14 c999999 ellipsis mtrem10">iPhone 1.0 Andriod 1.0</div>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div @click="tabs(1)" :class="[ index == 1  ? 'border-color-93BF88' : 'border-color-F5F5F5' ]" class="bF5F5F5 parem10 border1  border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                        <div :class="[ index == 1  ? 'c93BF88' : 'c999999' ]" class="frem24 c999999">教师端</div>
                                        <div :class="[ index == 1  ? 'c93BF88' : 'c999999' ]" class="f14 c999999 ellipsis mtrem10">iPhone 1.0 Andriod 1.0</div>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div @click="tabs(2)" :class="[ index == 2  ? 'border-color-93BF88' : 'border-color-F5F5F5' ]" class="bF5F5F5 parem10 border1 border-color-F5F5F5 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                        <div :class="[ index == 2  ? 'c93BF88' : 'c999999' ]" class="frem24 c999999">领导端</div>
                                        <div :class="[ index == 2  ? 'c93BF88' : 'c999999' ]" class="f14 c999999 ellipsis mtrem10">iPhone 1.0 Andriod 1.0</div>
                                    </div>
                                </el-col>
                                <el-col :span="6">
                                    <div @click="tabs(3)" :class="[ index == 3  ? 'border-color-93BF88' : 'border-color-F5F5F5' ]" class="bF5F5F5 parem10 border1 border-color-F5F5F5 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                        <div :class="[ index == 3  ? 'c93BF88' : 'c999999' ]" class="frem24 c999999">安防端</div>
                                        <div :class="[ index == 3  ? 'c93BF88' : 'c999999' ]" class="f14 c999999 ellipsis mtrem10">iPhone 1.0 Andriod 1.0</div>
                                    </div>
                                </el-col>
                            </el-row>


                            <div class="p80 marginAuto mtrem100 mbrem100" v-show="index == 0">
                                <el-row>
                                    <el-col :span="12">
                                        <img src="~@/assets/img/heibaishouji.png" class="p100" />
                                    </el-col>
                                    <el-col :span="11" :offset="1">
                                        <div class="frem40 c444444 mtrem80">实时掌握孩子状态</div>
                                        <div class="frem24 c707070 mtrem20">家校互通、智能设备，随时随地跟踪</div>

                                            <div class="flex1">
                                                <div class="p50">
                                                    <div @click="erweima('')" class="b999999 mtrem30 p80 ptrem5 pbrem5 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                                        <div class="flex1 p60 align-items-center marginAuto space-between">
                                                            <div class="p30">
                                                                <img src="~@/assets/img/icon_android.png" style="width:1.5rem" /><br />
                                                            </div>
                                                            <div class="p70">
                                                                <div class="f14 cfff ellipsis">Android</div>
                                                                <div class="f14 cfff ellipsis">即将上线</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div @click="erweima('jiazhang')" class="b93BF88 mtrem30 p80 ptrem5 pbrem5 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                                        <div class="flex1 p60 align-items-center marginAuto space-between">
                                                            <div class="p30">
                                                                <img src="~@/assets/img/icon_iphone.png" style="width:1.5rem" /><br />
                                                            </div>
                                                            <div class="p70">
                                                                <div class="f14 cfff ellipsis">IOS</div>
                                                                <div class="f14 cfff ellipsis">立即下载</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="p50">
                                                    <div class="mtrem30">
                                                        <img v-show="appType == 'jiazhang'" src="~@/assets/img/jiazhangduan.jpg" />
                                                    </div>
                                                </div>
                                            </div>
                                    </el-col>
                                </el-row>
                            </div>

                            <div class="p80 marginAuto mtrem100 mbrem100" v-show="index == 3">
                                <el-row>
                                    <el-col :span="12">
                                        <img src="~@/assets/img/anfangduan_a.png" class="p100" />
                                    </el-col>
                                    <el-col :span="11" :offset="1">
                                        <div class="frem40 c444444 mtrem80">安全防护监控助手</div>
                                        <div class="frem24 c707070 mtrem20">事故、巡检、隐患清除排查</div>

                                            <div class="flex1">
                                                <div class="p50">
                                                    <div @click="erweima('')" class="b999999 mtrem30 p80 ptrem5 pbrem5 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                                        <div class="flex1 p60 align-items-center marginAuto space-between">
                                                            <div class="p30">
                                                                <img src="~@/assets/img/icon_android.png" style="width:1.5rem" /><br />
                                                            </div>
                                                            <div class="p70">
                                                                <div class="f14 cfff ellipsis">Android</div>
                                                                <div class="f14 cfff ellipsis">即将上线</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div @click="erweima('anfang')" class="b93BF88 mtrem30 p80 ptrem5 pbrem5 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                                        <div class="flex1 p60 align-items-center marginAuto space-between">
                                                            <div class="p30">
                                                                <img src="~@/assets/img/icon_iphone.png" style="width:1.5rem" /><br />
                                                            </div>
                                                            <div class="p70">
                                                                <div class="f14 cfff ellipsis">IOS</div>
                                                                <div class="f14 cfff ellipsis">立即下载</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="p50">
                                                    <div class="mtrem30">
                                                        <img v-show="appType == 'anfang'" src="~@/assets/img/anfangduan.jpg" />
                                                    </div>
                                                </div>
                                            </div>
                                    </el-col>
                                </el-row>
                            </div>

                            <div class="p80 marginAuto mtrem100 mbrem100" v-show="index == 2">
                                <el-row>
                                    <el-col :span="12">
                                        <img src="~@/assets/img/lingdaoduan_a.png" class="p100" />
                                    </el-col>
                                    <el-col :span="11" :offset="1">
                                        <div class="frem40 c444444 mtrem80">校内学情监督实时监控 </div>
                                        <div class="frem24 c707070 mtrem20">学生在校情况一目了然</div>

                                            <div class="flex1">
                                                <div class="p50">
                                                    <div @click="erweima('')" class="b999999 mtrem30 p80 ptrem5 pbrem5 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                                        <div class="flex1 p60 align-items-center marginAuto space-between">
                                                            <div class="p30">
                                                                <img src="~@/assets/img/icon_android.png" style="width:1.5rem" /><br />
                                                            </div>
                                                            <div class="p70">
                                                                <div class="f14 cfff ellipsis">Android</div>
                                                                <div class="f14 cfff ellipsis">即将上线</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div @click="erweima('lingdao')" class="b93BF88 mtrem30 p80 ptrem5 pbrem5 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                                        <div class="flex1 p60 align-items-center marginAuto space-between">
                                                            <div class="p30">
                                                                <img src="~@/assets/img/icon_iphone.png" style="width:1.5rem" /><br />
                                                            </div>
                                                            <div class="p70">
                                                                <div class="f14 cfff ellipsis">IOS</div>
                                                                <div class="f14 cfff ellipsis">立即下载</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="p50">
                                                    <div class="mtrem30">
                                                        <img v-show="appType == 'lingdao'" src="~@/assets/img/lingdaoduan.jpg" />
                                                    </div>
                                                </div>
                                            </div>
                                    </el-col>
                                </el-row>
                            </div>

                            <div class="p80 marginAuto mtrem100 mbrem100" v-show="index == 1">
                                <el-row>
                                    <el-col :span="12">
                                        <img src="~@/assets/img/jiaoshiduan_a.png" class="p100" />
                                    </el-col>
                                    <el-col :span="11" :offset="1">
                                        <div class="frem40 c444444 mtrem80">学生即时资讯一手掌握</div>
                                        <div class="frem24 c707070 mtrem20">考勤，请假，校内安全随时查询 </div>

                                            <div class="flex1">
                                                <div class="p50">
                                                    <div @click="erweima('')" class="b999999 mtrem30 p80 ptrem5 pbrem5 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                                        <div class="flex1 p60 align-items-center marginAuto space-between">
                                                            <div class="p30">
                                                                <img src="~@/assets/img/icon_android.png" style="width:1.5rem" /><br />
                                                            </div>
                                                            <div class="p70">
                                                                <div class="f14 cfff ellipsis">Android</div>
                                                                <div class="f14 cfff ellipsis">即将上线</div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div @click="erweima('jiaoshi')" class="b93BF88 mtrem30 p80 ptrem5 pbrem5 border-top-left-radius5 border-top-right-radius5 border-bottom-left-radius5 border-bottom-right-radius5">
                                                        <div class="flex1 p60 align-items-center marginAuto space-between">
                                                            <div class="p30">
                                                                <img src="~@/assets/img/icon_iphone.png" style="width:1.5rem" /><br />
                                                            </div>
                                                            <div class="p70">
                                                                <div class="f14 cfff ellipsis">IOS</div>
                                                                <div class="f14 cfff ellipsis">立即下载</div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="p50">
                                                    <div class="mtrem30">
                                                        <img v-show="appType == 'jiaoshi'" src="~@/assets/img/jiaoshiduan.jpg" />
                                                    </div>
                                                </div>
                                            </div>
                                    </el-col>
                                </el-row>
                            </div>



                        </div>
                    </el-col>
                </el-row>
            </div>
        </el-main>
        <el-footer :height="'auto'">
            <bottom/>
        </el-footer>
    </el-container>
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
            // console.log("33")
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
