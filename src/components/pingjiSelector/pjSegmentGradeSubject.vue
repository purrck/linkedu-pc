<template>
    <div>
        <el-col :span="12">
                    <el-form-item label="学段">
                        <el-select v-model="conf.segmentId" prop="segmentId" placeholder="请您选择" @change="segmentChange">
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
                        <el-select v-model="conf.gradeId" placeholder="请您选择" @change="gradeChange">
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

                <el-col :span="12" v-show="subjectList.length">
                    <el-form-item label="学科">
                        <el-select v-model="conf.subjectId" placeholder="请您选择" @change="subjectChange">
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
        name : "pj-segment-grade-subject",
        props : ["conf"],
        data(){
            return {
                data : {
                    segment : {},
                    grade : {},
                    subject : {}
                },
                msg : {
                    segmentId :"",
                    segmentName :"",
                    gradeId :"",
                    gradeName :"",
                    subjectId :"",
                    subjectName :""
                },
                segmentList : [],
                gradeList : [],
                subjectList : [],
            }
        },
        created(){
            this.getSchoolSubjectTree()
        },
        methods : {
            getSchoolSubjectTree(){
                commonApi.getSchoolSubjectTree().then((res) => {
                    res.data.data.children.map((item,index) => {
                        item['pid'] = `${index}`;
                        item.children.map((item1,index1) => {
                            item1['pid'] = `${index1}`;
                            item1.children.map((item2,index2) => {
                                item2['pid'] = `${index2}`;
                            })
                        })
                    })
                    this.segmentList = res.data.data.children

                    this.segmentList.map((item,index) => {
                        if(item.id == this.conf.segmentId){
                            this.conf.segmentName = item.name
                            this.data.segment['name'] = item.name
                            this.data.segment['id'] = item.id
                            
                            item.children.map((item1,index1) => {
                                if(item1.name == "grade"){
                                    this.gradeList = item1.children
                                }
                                if(item1.name == "subject"){
                                    this.subjectList = item1.children
                                }
                            });
                            this.gradeList.map((item1,index1) => {
                                if(item1.id == this.conf.gradeId){
                                    this.conf.gradeName = item1.name
                                    this.data.grade['name'] = item1.name
                                    this.data.grade['id'] = item1.id

                                }
                            })
                            this.subjectList.map((item1,index1) => {
                                if(item1.id == this.conf.subjectId){
                                    this.conf.subjectName = item1.name

                                    this.data.subject['name'] = item1.name
                                    this.data.subject['id'] = item1.id
                                    
                                }
                            })
                            this.$emit("callback",this.data)
                        }
                    })
                })
            },
            gradeChange(event){
                if(event == ""){
                    this.conf.gradeName = "";
                    this.conf.gradeId = "";
                    this.data.grade['name'] = this.conf.gradeName
                    this.data.grade['id'] = this.conf.gradeId
                    this.$emit("callback",this.data)
                }
            },
            gradeClick(index){
                this.conf.gradeName = this.gradeList[index].name
                this.conf.gradeId = this.gradeList[index].id

                this.data.grade['name'] = this.conf.gradeName
                this.data.grade['id'] = this.conf.gradeId
                this.$emit("callback",this.data)
            },
            subjectChange(event){
                if(event == ""){
                    this.conf.subjectId = "";
                    this.conf.subjectName = "";
                    this.data.subject['name'] = this.conf.subjectName
                    this.data.subject['id'] = this.conf.subjectId
                    this.$emit("callback",this.data)
                }
            },
            subjectClick(index){
                this.conf.subjectName = this.subjectList[index].name
                this.conf.subjectId = this.subjectList[index].id

                this.data.subject['name'] = this.conf.subjectName
                this.data.subject['id'] = this.conf.subjectId
                this.$emit("callback",this.data)
            },
            segmentChange(event){
                this.conf.subjectId = "";
                this.conf.subjectName = "";
                this.conf.gradeName = "";
                this.conf.gradeId = ""
                if(event == ""){
                    this.gradeList = [];
                    this.subjectList = [];
                    this.data.grade['name'] = ''
                    this.data.grade['id'] = ''
                    this.data.subject['name'] = ''
                    this.data.subject['id'] = ''
                    this.data.segment['name'] = ''
                    this.data.segment['id'] = ''
                    this.$emit("callback",this.data)
                }
            },
            segmentClick(index){
                this.conf.segmentName = this.segmentList[index].name
                this.conf.segmentId = this.segmentList[index].id
                this.segmentList[index].children.map((item,index) => {
                    if(item.name == "grade"){
                        this.gradeList = item.children
                    }
                    if(item.name == "subject"){
                        this.subjectList = item.children
                    }
                });
                this.data.segment['name'] = this.conf.segmentName
                this.data.segment['id'] = this.conf.segmentId
                this.data.grade['name'] = ''
                this.data.grade['id'] = ''
                this.data.subject['name'] = ''
                this.data.subject['id'] = ''
                this.$emit("callback",this.data)
            }
        }
    }
</script>

<style>
</style>