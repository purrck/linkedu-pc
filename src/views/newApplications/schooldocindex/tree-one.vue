
<template>
  <ul class="list-none">
    <li v-for="(item, index) in treeData" :key="index" :class="{'active':(item.children && item.children.length > 0)}">
      <span class='item'>
        <span class="title" v-if="(item.children &&item.children.length > 0)"
                        @click.stop="handleClick(item)">{{item.vschooldocindex.indexName}}</span>
        <span class="title c-link" v-else
            @click.stop="getLibrary(item.vschooldocindex.docIndexcId)">{{item.vschooldocindex.indexName}}</span>
      </span>
      <!-- 递归 -->
      <tree-one v-show="treeOneShow" v-if="item.children && item.children.length > 0" :treeData="item.children"></tree-one>
    </li>
  </ul>
</template>
<script>
import api from "../schooldoclibrary/schooldoclibraryUrl";
import talk from './talk'

export default {
  name: 'TreeOne',
  props: {
    treeData: {
      type: Array,
      default: () => {
        return []
      }
    }
  },
  data(){
    return{
       treeOneShow: false,
       params :{
          page: 1,
          limit: 10,
          docIndexcId :null
        }
    }
  },
  methods: {
    handleClick(item){
        if(item.children && item.children.length > 0){
            this.treeOneShow = !this.treeOneShow;
        }
    },
    getLibrary(id) {
      this.params.docIndexcId = id;
      api.fetchList(this.params).then(res => {
        talk.$emit('data',res.data.data);
      },res => {
          this.$message.error(res.message);
        });
    }
  }
}
</script>
<style scoped>
    .list-none{
      height: 100%;
      width: 100%;
    }
    .list-none li{
        list-style: none;
        text-align: left;
        width: 120px;
        margin: 0 0 0 15px;
    }
    .title{
        display: block;
        width: 100%;
        cursor: pointer;
        font-size: 14px;
        border: 1px solid ghostwhite;
        border-radius: 5px;
        background: rgb(238, 233, 233);
    }
    .c-link{
      background: rgb(219, 131, 131);
    }
</style>