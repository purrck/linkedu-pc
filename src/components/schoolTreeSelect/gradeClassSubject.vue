<template>
    <div>
        <el-col :span="12">
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

        <el-col :span="12" v-show="formData.class">
            <el-form-item label="学科">
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
        name : "grade-class-subject",
        props : ["conf"],
        data(){
            return {
                formData : {
                    class : "",
                    subject : "",
                    grade : ""
                },
                gradeList : [],
                classList : [],
                subjectList : [],
                msg : {
                    schoolData : {},
                    grade : {},
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
        },
        methods : {
            gradeChange(event){
                this.formData.class = "";
                this.formData.subject = "";
                this.subjectList = [];
                if(event == ""){
                    this.classList = [];
                    this.watcher = this.msg.grade = {} = this.msg.class = {} = this.msg.subject = {}
                }
            },
            gradeClick(index){
                if(this.gradeList.length){
                    this.watcher = this.msg.grade = this.gradeList[index];
                   this.classList = this.gradeList[index].children;
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
                commonApi.getSchoolTree("/base/schoolSegmentSubjectAd/subjectTeacherTree",{}).then((res) => {
                    if(res.data.resultCode === '000000' ){
                        let a=[];
                        for(let i=0; i<res.data.data.children.length; i++){
                            for(let j=0; j<res.data.data.children[i].children.length; j++){
                                a.push(res.data.data.children[i].children[j])
                            }
                        }
                        this.msg.schoolData = res.data.data;

                        // console.log(a)
                        let _index = 0;
                        let _b = (children) => {
                            let d = children[_index].children;
                            //debugger
                            for(let i=0; i<children.length; i++){
                                children[i]['flag'] = i;
                            }

                            _index++;
                            _b(d)
                        }
                       // _b(a)
                        this.gradeList = a;

                        for(let i=0; i<this.gradeList.length; i++){
                            let _grade = this.gradeList[i]
                            if(_grade.id == this.conf.gradeId){
                                this.watcher = this.msg.grade = _grade;
                                this.formData.grade = this.conf.gradeId;
                            }
                            for(let j=0; j<_grade.children.length; j++){

                                let _class = _grade.children[j]
                                if(_class.id == this.conf.classId){
                                    this.watcher = this.msg.class = _class;
                                    this.classList = _grade.children;
                                    this.formData.class = this.conf.classId;
                                }
                                for(let s=0; s<_class.children.length; s++){
                                    let _subject = _class.children[s]
                                    if(_subject.id == this.conf.subjectId){
                                        this.watcher = this.msg.subject = _subject;
                                        this.subjectList = _class.children;
                                        this.formData.subject = this.conf.subjectId;
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
