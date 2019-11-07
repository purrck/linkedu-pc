                 
<template>
  <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                    style="min-height: 600px;width: 100%;"
                    element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
    <div class="SchoolDocIndex" style="width:100%">
      <div class="tree-one">
        <TreeOne :treeData="data.records"></TreeOne>
        <!-- <el-tree :data="data.records" :props="defaultProps" @node-click="handleNodeClick"></el-tree> -->
      </div>
        <listSchoolLar></listSchoolLar>
    </div>
  </el-container>
</template>

<script>
import api from "./schooldocindexUrl";
import commonApi from "@/api/common/common";
import preview from "@/util/preview";
import TreeOne from "./tree-one";
import listSchoolLar from '../schooldoclibrary/listSchoolDocLibrary'
export default {
  directives: { preview },
  data() {
    return {
      msgShow: false,
      data: "",
      params: {
        page: 1,
        limit: 10
      },
      defaultProps: {
          children: 'children',
          label: 'vschooldocindex.indexName'
        }
    }
  },
  components: {
    TreeOne,
    listSchoolLar
  },
  created() {
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      api.fetchList(this.params).then(
        res => {
          this.data = res.data.data;
          this.isLoaded = false;
          this.recomData(this.data.records);
        },
        res => {
          this.$message.error(res.message);
        }
      );
    },
    handleNodeClick(data){
      // console.log(data.vschooldocindex.indexName);
    },
    // 再次处理树形数据,递归
    recomData(data){
      //let tree = new Node(0,null,null);
      for(let i = 0; i < data.length; i++){
        if(data[i].children && data[i].children.length < 0){
          // console.log(data[i].vschooldocindex);
        }else{
          for(let j = 0; j < data[i].children.length; j++){
            if(data[i].children[j].children && data[i].children[j].children.length < 0){
              // console.log(data[i].children[j].vschooldocindex);
            }else{
              this.recomData(data[i].children[j]);
            }
          }
        }
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.SchoolDocIndex{
  position: relative;
}
.tree-one{
  position: absolute;
  top: 10%;
  left: 0px;
  width: 10%;
  max-height: 100%;
  overflow: auto;
  border-right: 1px solid rgb(147, 212, 138); 
}
</style>
