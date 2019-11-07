<template>
  <div class="courseSetting  flex x-center">
    <p class="pb20 text-center bold f30" >
      <!--<span>{{classData.schoolName}}</span>-->
      <!--<span>{{classData.className}}</span>-->
      <span>{{classData.className}}课程表</span>
      <!--<span>{{classData.segmentName}}</span>-->
    </p>
    <div class="flex row bordere8e8e8 border-radius5" style="width: 1205px">
      <div class="flex " v-for="(item, index1) in weekss">
        <div class=" header flex center ">
          {{item.name}}
        </div>
        <div v-for="(its,index2) in item.data" class="item flex center relative" @mouseover="mouseOver(its)">
          <div class="absolute flex center" v-show="its.selected&&index1>0"
               style="top:0;left: 0;right:0;bottom:0;background-color: #000;opacity: 0.4;z-index: 99"></div>
          <div class="absolute flex center" v-show="its.selected&&index1>0" style="z-index: 100">
            <div class="btn-box">
              <el-button size="mini" class="mt10 c93BF88" @click="toEdit(its)">编辑</el-button>
              <el-button size="mini" class="mt10 c93BF88" @click="toDel(its)">删除</el-button>
            </div>
          </div>
          <div class="absolute" style="z-index: 9">
            <span>{{its.placeName}}</span>
            <span class="mt10">{{its.subjectName||'(待编辑)'}}</span>
            <p v-show="index1!==0&&its.teacherName" class="f12 mt10">{{`(${its.teacherName})`||''}}</p>
          </div>
        </div>
      </div>
    </div>
    <el-dialog :title="dialogTitle" :visible.sync="dialogShow" center width="25%">
      <div class="text-center">
        <el-form v-model="formData" class="edit-form">
          <el-form-item>
            <el-select class="select-v2-rao" v-model="formData.subjectId" placeholder="请您选择科目" @change="changeSub">
              <el-option v-for="(item, index) in subjectTypeOptions" :label="item.label" :value="item.name"
                         :key="index"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item >-->
            <!--<el-select class="select-v2-rao" v-model="formData.place_id" placeholder="请您选择课室">-->
              <!--<el-option v-for="(item, index) in subjectTypeOptions" :label="item.label" :value="item.name"-->
                         <!--:key="index"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item  >
            <el-input  class="input-v2-rao" disabled v-model="formData.teacherName"></el-input>
          </el-form-item>
          <el-button size="small" @click="submit()">提交</el-button>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import api from './classcoursetableUrl'
  import commonApi from '@/api/common/common'
  import basicclassApi from  '@/views/basedata/basicclass/basicclassUrl'
  export default {
    name: "courseSetting",
    data() {
      return {
        weekss: [
          {
            name: '节数', data: [
              {subjectName: '1', timelineDetailName: ''},
              {subjectName: '2', timelineDetailName: ''},
              {subjectName: '3', timelineDetailName: ''},
              {subjectName: '4', timelineDetailName: ''},
              {subjectName: '5', timelineDetailName: ''},
              {subjectName: '6', timelineDetailName: ''},
              {subjectName: '7', timelineDetailName: ''},
              {subjectName: '8', timelineDetailName: ''},
            ]
          },
          {
            name: '周一', data: []
          },
          {
            name: '周二', data: []
          },
          {
            name: '周三', data: []
          },
          {
            name: '周四', data: []
          },
          {
            name: '周五', data: []
          },
          // {name:'周六',id:1,data:[{id:1,name:'语文',teacherId:1}],selected:false},
        ],
        data: null,
        subjectTypeOptions: [],
        optionsList: [],
        formData: {
          subjectId: "",
          subjectName: "",
          teacherId: "",
          teacherName: "",
        },
        classData: {},
        events: {},
        dialogShow: false,
        dialogTitle: '',
      }
    },
    created: {},
    mounted() {
      this.init()
      this.initCodes()
    },
    methods: {
      init() {
        let query = this.$route.query;
        this.formData = {
          subjectId: "",
          subjectName: "",
          teacherId: "",
          teacherName: "",
        };
        api.getSetting(query).then(res => {
          if (res.data.resultCode === '000000') {
            let resData = res.data.data;
            for (let items in resData) {
              for (let i = 0; i < resData[items].length; i++) {
                resData[items][i].selected = false
              }
            }

            for (let items in resData) {
              resData[items].sort(function (a, b) {
                return a.weekSequnceNum - b.weekSequnceNum
              });
            }
            this.data = res.data.data;
            this.weekss[1].data = this.data[1];
            this.weekss[2].data = this.data[2];
            this.weekss[3].data = this.data[3];
            this.weekss[4].data = this.data[4];
            this.weekss[5].data = this.data[5];
            this.$forceUpdate()
          }
        })
      },

      initCodes() {
        let query = this.$route.query;
        basicclassApi.getObj(query.classId).then(res=>{
          this.classData = res.data.data
        })
        api.getObj(this.$route.query.classId).then(res => {
          let viewList = res.data.data || [];
          this.optionsList = res.data.data;
          for (let ynItem of viewList) {
            this.subjectTypeOptions.push({
              "label": ynItem.subjectName,
              "name": ynItem.subjectId
            });
          }
        }, res => {
          this.$message.error(res.data.message);
        });
      },

      mouseOver(event) {
        for (let j = 0; j < this.weekss.length; j++) {
          for (let i = 0; i < this.weekss[j].data.length; i++) {
            this.weekss[j].data[i].selected = false;
          }
        }
        event.selected = true;
        // console.log(event);
        this.dialogTitle = `${event.weekNum}-${event.weekSequnceNum}`
      },

      changeSub (e) {
        this.formData = this.optionsList.find(res=>{
          if(res.subjectId === e) {
            return res
          }
        })
        this.events.subjectId = this.formData.subjectId;
        this.events.subjectName = this.formData.subjectName;
        this.events.teacherId = this.formData.teacherId;
        this.events.teacherName = this.formData.teacherName;
      },

      toDel(event) {
        this.$confirm('该操作将会删除当前课程，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let obj = {};
          for (let it in event) {
            obj[it] = event[it]
          }
          obj.subjectId = '';
          obj.subjectName = '';
          obj.teacherId = '';
          obj.teacherName = '';
          this.events = obj;
          this.submit()
        })
      },
      toEdit(event) {
        this.dialogShow = !this.dialogShow
        let obj = {};
        for (let it in event) {
          obj[it] = event[it]
        }
        this.events = obj
      },
      submit() {
        api.putObj(this.events).then(res=>{
          if (res.data.resultCode === '000000') {
            this.$message.success('更新成功')
            this.init()
          }
        })
        this.dialogShow = false
      }
    }

  }
</script>

<style lang="scss" scoped>
  .courseSetting {
    padding: 30px;
    color: #707070;
  }

  .btn-box {
    button {
      border: 1px solid #93bf88;
    }

    button:hover {
      background-color: #93bf88;
      color: #fff;
    }
  }

  .bordere8e8e8 {
    border: 1px #e8e8e8 solid;
    overflow: hidden;
  }

  .header {
    height: 45px;
    width: 200px;
    background-color: #e9e9e9;
    border-right: 1px #ccc solid;
  }

  .item {
    width: 200px;
    height: 120px;
    border-bottom: 1px #e8e8e8 solid;
    border-right: 1px #e8e8e8 solid;
  }

  /*.item:hover{*/
  /*background-color: #000;*/
  /*opacity: 0.4;*/
  /*}*/
</style>
