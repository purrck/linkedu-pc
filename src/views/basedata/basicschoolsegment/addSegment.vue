<template>
    <div class="pa30">
        <el-checkbox-group v-model="checkedSegment" @change="checkboxGroupChange">
            <el-checkbox v-for="(item,index) in segments" class="checkbox-v2-rao" :label="item" :key="index">
               {{item.segmentName}}
            </el-checkbox>
        </el-checkbox-group>
        <el-button type="primary" size="mini" class="button-v2-rao b93BF88 mt20" :loading="segmentAddLoading" @click="segmentConfirm">提交</el-button>
    </div>
</template>

<script>
    import api from "./basicschoolsegmentUrl";
    export default {
        data(){
            return {
                checkedSegment : [],
                segmentAddLoading : false,
                segments : [
                    {
                        segmentId : "1",
                        segmentName : "小学"
                    },
                    {
                        segmentId : "2",
                        segmentName : "初中"
                    },
                    {
                        segmentId : "3",
                        segmentName : "高中"
                    }
                ],
            }
        },
        methods : {
            goBack () {
                this.$router.go(-1)
            },
            checkboxGroupChange(event){
                console.log(event)
            },
            segmentConfirm(){
                if(!this.checkedSegment.length){
                    this.$message.error("请选择学段");
                    return;
                }
                this.segmentAddLoading = true;
                api.addLotSegment(this.checkedSegment).then(res => {
                    this.segmentAddLoading = false;
                    if (res.data.resultCode == "000000") {
                        this.$message.success("添加成功");
                        this.goBack();
                    }
                }, res => {
                });
            }
        }
    }
</script>

<style>
</style>