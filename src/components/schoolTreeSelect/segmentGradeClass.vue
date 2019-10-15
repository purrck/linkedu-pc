<template>
    <div>
        <el-col :span="12">
            <el-form-item label="学段">
                <el-select v-model="formData.segment" v-if="!isDisabled" placeholder="请您选择"  @change="segmentChange">
                    <el-option value="">
                        请您选择
                    </el-option>
                    <el-option v-for="(data,index) in segmentList" :key="index"
                            :label="data.name" :value="data.id">
                            <div @click="segmentClick(index)">{{data.name}}</div>
                    </el-option>
                </el-select>
                <el-select v-model="formData.segment" v-if="isDisabled" disabled placeholder="请您选择" @change="segmentChange">
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

        <el-col :span="12" v-show="gradeList.length">
            <el-form-item label="年级">
                <el-select v-model="formData.grade" placeholder="请您选择" @change="gradeChange">
                    <el-option value="">
                        请您选择
                    </el-option>
                    <el-option v-for="(data,index) in gradeList" :key="index"
                            :label="data.name" :value="data.id">
                            <div @click="gradeClick(index)">{{data.name}}</div>
                    </el-option>
                </el-select>
            </el-form-item>
        </el-col>

        <el-col :span="12" v-show="classList.length">
            <el-form-item label="班级">
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

    </div>
</template>

<script>
    import commonApi from "@/api/common/common";
    export default {
        name : "segment-grade-class",
        props : ["conf"],
        data(){
            return {
                isDisabled : false,
                formData : {
                    grade : "",
                    class : "",
                    segment : ""
                },
                segmentList : [],
                gradeList : [],
                classList : [],
                msg : {
                    schoolData : {},
                    segment : {},
                    class : {},
                    grade : {}
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
        methods : {
            segmentChange(event){
                this.formData.grade = "";
                this.formData.class = "";
                this.classList = [];
                this.watcher = this.msg.grade = {} = this.msg.class = {}
                if(event == ""){
                    this.gradeList = [];
                    this.watcher = this.msg.segment = {} = this.msg.grade = {} = this.msg.class = {}
                }
            },
            segmentClick(index){
                if(this.segmentList.length){
                    this.watcher = this.msg.segment = this.segmentList[index];
                   this.gradeList = this.segmentList[index].children;
                }else{
                    this.gradeList = "";
                }
            },
            gradeChange(event){
                this.formData.class = "";
                if(event == ""){
                    this.classList = [];
                    this.watcher = this.msg.grade = {} = this.msg.class = {}
                }
            },
            gradeClick(index){
                if(this.gradeList.length){
                    this.watcher = this.msg.grade = this.gradeList[index];
                    this.classList = this.gradeList[index].children ? this.gradeList[index].children : [];
                }else{
                    this.classList = "";
                }
            },
            classChange(event){
                if(event == ""){
                    this.watcher = this.msg.class = {}
                }
            },
            classClick(index){
                this.watcher = this.msg.class = this.classList[index];
            },
            getSchoolTree(){
                commonApi.getSegmentGradeclass().then((res) => {
                    if(res.data.resultCode == "000000" ){
                        res.data.data.children.map((item,index) => {
                            item['pid'] = `${index}`;
                            item.children.map((item1,index1) => {
                                item1['pid'] = `${index1}`;
                                item1.children.map((item2,index2) => {
                                    item2['pid'] = `${index2}`;
                                })
                            })
                        })
                        this.msg.schoolData = res.data.data;
                        this.segmentList = res.data.data.children;
                        if(this.segmentList.length == 1){
                            this.isDisabled = true;
                            this.watcher = this.msg.segment = this.segmentList[0];
                            this.formData.segment = this.msg.segment.id;
                            this.gradeList = this.segmentList[this.segmentList[0].pid].children;
                        }

                        for(let i=0; i<this.segmentList.length; i++){
                            if(this.segmentList[i].id == this.conf.segmentId){
                                this.watcher = this.msg.segment = this.segmentList[i];
                                this.formData.segment = this.conf.segmentId;
                                this.gradeList = this.segmentList[this.segmentList[i].pid].children;
                            }
                            for(let j=0; j<this.segmentList[i].children.length; j++){
                                if(this.segmentList[i].children[j].id == this.conf.gradeId){
                                    this.watcher = this.msg.grade = this.segmentList[i].children[j];
                                    this.gradeList = this.segmentList[i].children;
                                    this.formData.grade = this.conf.gradeId;
                                    this.classList = this.gradeList[this.segmentList[i].children[j].pid].children
                                }
                                if(this.segmentList[i].children[j].children){
                                    for(let s=0; s<this.segmentList[i].children[j].children.length; s++){
                                        if(this.segmentList[i].children[j].children[s].id == this.conf.classId){
                                            this.watcher = this.msg.class = this.segmentList[i].children[j].children[s];
                                            this.classList = this.segmentList[i].children[j].children;
                                            this.formData.class = this.conf.classId;
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
