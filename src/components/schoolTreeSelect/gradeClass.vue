<template>
    <div>


        <el-col :span="12" v-show="gradeList.length">
            <el-form-item label="年级">
                <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.grade" placeholder="请您选择" @change="gradeChange">
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
                <el-select class="select-v2-rao" popper-class="select-popper-v2-rao" v-model="formData.class" placeholder="请您选择" @change="classChange">
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
        name : "grade-class",
        props : ["conf"],
        data(){
            return {
                formData : {
                    grade : "",
                    class : ""
                },
                gradeList : [],
                classList : [],
                msg : {
                    schoolData : {},
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
                commonApi.getGradeClass().then((res) => {
                    if(res.data.resultCode === '000000' ){
                        res.data.data.children.map((item,index) => {
                            item['pid'] = `${index}`;
                            item.children.map((item1,index1) => {
                                item1['pid'] = `${index1}`;
                            })
                        })
                        this.msg.schoolData = res.data.data;
                        this.gradeList = res.data.data.children;
                    }else{
                        this.$message.error(`学段下拉框提示:${res.data.message}`);
                    }
                })
            },
            setCurrent(gradeId,classId){
                for(let i=0; i<this.gradeList.length; i++){
                    let _a = this.gradeList[i].id;
                    let _b = gradeId;
                    if(this.gradeList[i].id == gradeId){
                        this.watcher = this.msg.grade = this.gradeList[i];
                        this.classList = this.gradeList[this.gradeList[i].pid].children;
                        this.formData.grade = gradeId;
                    }
                    for(let j=0; j<this.gradeList[i].children.length; j++){
                        if(this.gradeList[i].children[j].id == classId){
                            this.watcher = this.msg.class = this.gradeList[i].children[j];
                            this.formData.class = classId;
                            //this.classList = this.gradeList[this.gradeList[i].children[j].pid].children
                        }
                    }
                }
            }
        }
    }
</script>

<style>
</style>
