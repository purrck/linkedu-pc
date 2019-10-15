<template>
  <div>
    <el-col :span="12">
      <el-form-item label="年级">
        <el-select v-model="data.grade.id" placeholder="请您选择" @change="gradeChange">
          <el-option value>请您选择</el-option>
          <el-option
            v-for="(data,index) in gradeList"
            :key="index"
            :label="data.name"
            :value="data.id"
          >
            <div @click="gradeClick(index)">{{data.name}}</div>
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="12" v-show="classList.length">
      <el-form-item label="班级">
        <el-select v-model="data.class.id" placeholder="请您选择" @change="classChange">
          <el-option value>请您选择</el-option>
          <el-option
            v-for="(data,index) in classList"
            :key="index"
            :label="data.name"
            :value="data.id"
          >
            <div @click="classClick(index)">{{data.name}}</div>
          </el-option>
        </el-select>
      </el-form-item>
    </el-col>

    <el-col :span="12" v-show="subjectList.length">
      <el-form-item label="学科">
        <el-select v-model="data.subject.id" placeholder="请您选择" @change="subjectChange">
          <el-option value>请您选择</el-option>
          <el-option
            v-for="(data,index) in subjectList"
            :key="index"
            :label="data.name"
            :value="data.id"
          >
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
  name: "pj-grade-class-subject",
  props: ["conf"],
  data() {
    return {
      data: {
        grade: {
          name: "",
          id: ""
        },
        class: {
          name: "",
          id: ""
        },
        subject: {
          name: "",
          id: ""
        }
      },
      /*msg : {
                    gradeId :"",
                    gradeName :"",
                    classId :"",
                    className :"",
                    subjectId :"",
                    subjectName :""
                },*/
      gradeList: [],
      classList: [],
      subjectList: []
    };
  },
  computed: {
    isGradeDisabled() {
      return this.conf.gradeId;
    },
    isClassDisabled() {
      return this.conf.classId;
    }
  },
  created() {
    this.data.grade["id"] = this.conf.gradeId;
    this.data.class["id"] = this.conf.classId;
    this.getPJGradeClassSubject();
  },
  methods: {
    getPJGradeClassSubject() {
      commonApi.getPJGradeClassSubject().then(res => {
        /*res.data.data.children.map((item,index) => {
                        item['pid'] = `${index}`;
                        item.children.map((item1,index1) => {
                            item1['pid'] = `${index1}`;
                            item1.children.map((item2,index2) => {
                                item2['pid'] = `${index2}`;
                            })
                        })
                    })*/
        let a = [];
        for (let i = 0; i < res.data.data.children.length; i++) {
          for (let j = 0; j < res.data.data.children[i].children.length; j++) {
            a.push(res.data.data.children[i].children[j]);
          }
        }
        this.gradeList = a;
        console.log(a);

        this.gradeList.map((item, index) => {
          if (item.id == this.conf.gradeId) {
            //this.conf.gradeName = item.name
            this.data.grade["name"] = item.name;
            this.data.grade["id"] = item.id;

            item.children.map((item1, index1) => {
              if (item1.name == "class") {
                this.classList = item1.children;
              }
              if (item1.name == "subject") {
                this.subjectList = item1.children;
              }
            });
            this.classList.map((item1, index1) => {
              if (item1.id == this.conf.classId) {
                //this.conf.className = item1.name
                this.data.class["name"] = item1.name;
                this.data.class["id"] = item1.id;
              }
            });
            this.subjectList.map((item1, index1) => {
              if (item1.id == this.conf.subjectId) {
                //this.conf.subjectName = item1.name

                this.data.subject["name"] = item1.name;
                this.data.subject["id"] = item1.id;
              }
            });
            this.$emit("callback", this.data);
          }
        });
      });
    },
    classChange(event) {
      if (event == "") {
        //this.conf.className = "";
        //this.conf.classId = "";
        this.data.class["name"] = "";
        this.data.class["id"] = "";
        this.$emit("callback", this.data);
      }
    },
    classClick(index) {
      //this.conf.className = this.classList[index].name
      //this.conf.classId = this.classList[index].id
      this.data.class["name"] = this.classList[index].name;
      this.data.class["id"] = this.classList[index].id;
      this.$emit("callback", this.data);
    },
    subjectChange(event) {
      if (event == "") {
        //this.conf.subjectId = "";
        //this.conf.subjectName = "";
        this.data.subject["name"] = "";
        this.data.subject["id"] = "";
        this.$emit("callback", this.data);
      }
    },
    subjectClick(index) {
      //this.conf.subjectName = this.subjectList[index].name
      //this.conf.subjectId = this.subjectList[index].id

      this.data.subject["name"] = this.subjectList[index].name;
      this.data.subject["id"] = this.subjectList[index].id;
      this.$emit("callback", this.data);
    },
    gradeChange(event) {
      //this.conf.subjectId = "";
      //this.conf.subjectName = "";
      //this.conf.className = "";
      //this.conf.classId = ""
      if (event == "") {
        this.classList = [];
        this.subjectList = [];
        this.data.class["name"] = "";
        this.data.class["id"] = "";
        this.data.subject["name"] = "";
        this.data.subject["id"] = "";
        this.data.grade["name"] = "";
        this.data.grade["id"] = "";
        this.$emit("callback", this.data);
      }
    },
    gradeClick(index) {
      //this.conf.gradeName = this.gradeList[index].name
      //this.conf.gradeId = this.gradeList[index].id
      this.gradeList[index].children.map((item, index) => {
        if (item.name == "class") {
          this.classList = item.children;
        }
        if (item.name == "subject") {
          this.subjectList = item.children;
        }
      });
      this.data.grade["name"] = this.gradeList[index].name;
      this.data.grade["id"] = this.gradeList[index].id;
      this.data.class["name"] = "";
      this.data.class["id"] = "";
      this.data.subject["name"] = "";
      this.data.subject["id"] = "";
      this.$emit("callback", this.data);
    }
  }
};
</script>

<style>
</style>