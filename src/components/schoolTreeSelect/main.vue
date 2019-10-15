<template>
    <div>
        <el-col :span="12">
            <el-form-item :label="typeName[0]">
                <el-select v-model="formData.segment" placeholder="请您选择" @change="segmentChange">
                    <el-option value="">
                        请您选择
                    </el-option>
                    <el-option v-for="(data,index) in segmentList" :key="index"
                            :label="data.name" :value="data.id">
                            <div @click="segmentClick(index)">{{data.name}}</div>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>

        <el-col :span="12" v-show="classList.length">
            <el-form-item :label="typeName[1]">
                <el-select v-model="formData.class" placeholder="请您选择" @change="classChange">
                    <el-option value="">
                        请您选择
                    </el-option>
                    <el-option v-for="(data,index) in classList" :key="index"
                            :label="data.name" :value="data.id">
                            <div @click="classClick(index)">{{data.name}}</div>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>

        <el-col :span="12" v-show="subjectList.length">
            <el-form-item :label="typeName[2]">
                <el-select v-model="formData.subject" placeholder="请您选择" @change="subjectChange">
                    <el-option value="">
                        请您选择
                    </el-option>
                    <el-option v-for="(data,index) in subjectList" :key="index"
                            :label="data.name" :value="data.id">
                            <div @click="subjectClick(index)">{{data.name}}</div>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>

    </div>
</template>

<script>
    import commonApi from "@/api/common/common";
    export default {
        name : "school-tree-select",
        props : ["conf"],
        data(){
            return {
                formData : {
                    class : "",
                    subject : "",
                    segment : ""
                },
                segmentList : [],
                classList : [],
                subjectList : [],
                msg : {
                    schoolData : {},
                    segment : {},
                    subject : {},
                    class : {}
                },
                watcher : null
            }
        },
        created(){
            this.getSchoolTree();
        },
        watch : {
            watcher(){
                this.$emit("callback",this.msg)
            }
        },
        computed : {
            typeName(){
                if(this.conf.url == "/base/schoolSegmentSubjectAd/subjectTree"){
                    return ["学段 :","年级 :","学科 :"]
                }
                if(this.conf.url == "/base/basicSchoolAggregation/schoolInfoWithOutSegmentNoId"){
                    return ["年级 :","班级 :",""]
                }
                if(this.conf.url == "/base/basicSchoolOrgAd/schoolOrgNoraml"){
                    return ["学段 :","年级 :",""]
                }
            }
        },
        methods : {
            segmentChange(event){
                this.formData.class = "";
                this.formData.subject = "";
                this.subjectList = [];
                if(event == ""){
                    this.classList = [];
                    this.watcher = this.msg.segment = {} = this.msg.class = {} = this.msg.subject = {}
                }
            },
            segmentClick(index){
                if(this.segmentList.length){
                    this.watcher = this.msg.segment = this.segmentList[index];
                   this.classList = this.segmentList[index].children;
                }else{
                    this.classList = "";
                }
            },
            classChange(event){
                this.formData.subject = "";
                if(event == ""){
                    this.subjectList = [];
                    this.watcher = this.msg.class = {} = this.msg.subject = {}
                }
            },
            classClick(index){
                if(this.classList.length){
                    this.watcher = this.msg.class = this.classList[index];
                    this.subjectList = this.classList[index].children ? this.classList[index].children : [];
                }else{
                    this.subjectList = "";
                }
            },
            subjectChange(event){
                if(event == ""){
                    this.watcher = this.msg.subject = {}
                }
            },
            subjectClick(index){
                this.watcher = this.msg.subject = this.subjectList[index];
            },
            getSchoolTree(){
                commonApi.getSchoolTree(this.conf.url,this.conf.data).then((res) => {
                    if(res.data.resultCode === '000000' ){
                        this.msg.schoolData = res.data.data;
                        this.segmentList = res.data.data.children;
                        for(let i=0; i<this.segmentList.length; i++){
                            if(this.segmentList[i].id == this.conf.segmentId){
                                this.watcher = this.msg.segment = this.segmentList[i];
                                this.formData.segment = this.conf.segmentId;
                            }
                            for(let j=0; j<this.segmentList[i].children.length; j++){
                                if(this.segmentList[i].children[j].id == this.conf.classId){
                                    this.watcher = this.msg.class = this.segmentList[i].children[j];
                                    this.classList = this.segmentList[i].children;
                                    this.formData.class = this.conf.classId;
                                }else{
                                    this.formData.class= ""
                                }
                                if(this.segmentList[i].children[j].children){
                                    for(let s=0; s<this.segmentList[i].children[j].children.length; s++){
                                        if(this.segmentList[i].children[j].children[s].id == this.conf.subjectId){
                                            this.watcher = this.msg.subject = this.segmentList[i].children[j].children[s];
                                            this.subjectList = this.segmentList[i].children[j].children;
                                            this.formData.subject = this.conf.subjectId;
                                        }
                                    }
                                }
                            }
                        }
                    }else{
                        this.$message.error(`学段下拉框提示:${res.data.data.message}`);
                    }
                })
            }
        }
    }
</script>

<style>
</style>
