<template>
  <div class="schedule">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">

        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">

          <el-form-item label="学段:" prop="segmentId">
            <el-input class="input-v2-rao" v-model="searchForm.segmentId" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="年级:" prop="gradeId">
            <el-input class="input-v2-rao" v-model="searchForm.gradeId" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="学年:" prop="schoolYear">
            <el-input class="input-v2-rao" v-model="searchForm.schoolYear" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="学期:" prop="schoolTerm">
            <el-input class="input-v2-rao" v-model="searchForm.schoolTerm" maxlength="30"></el-input>
          </el-form-item>
          <el-form-item label="开始日期:" prop="effectiveDt">
            <el-date-picker class="date-v2-rao" v-model="searchForm.effectiveDt" type="date"
                            value-format="yyyy-MM-dd HH:mm" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item label="截止日期:" prop="expiryDt">
            <el-date-picker class="date-v2-rao" v-model="searchForm.expiryDt" type="date"
                            value-format="yyyy-MM-dd HH:mm" placeholder="选择日期"></el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <!---->
          </el-form-item>
        </el-form>
      </el-header>

      <div class="bt border-color-e8e8e8 mt10 mb10"></div>
      <el-main>
        <div class="flex row">
          <div class="p70">
            <div class="data-header">
              <ul>
                <li v-for="(item,index) in weeks" :key="index">
                  {{item.title}}
                </li>
              </ul>
            </div>
            <div class="data-content">
              <ul>
                <li v-for="(item,index) in dates" :key="index" @click="getItem(item)">
                  {{index}}
                </li>
              </ul>
            </div>
          </div>
          <div class="date-edit-box bF5F5F5  p30">
            12312
          </div>

        </div>

      </el-main>
    </el-container>
  </div>
</template>

<script>
  import api from './orgschoolcalendarUrl'
  import commonApi from '@/api/common/common'
  export default {
    name: "schedule",
    data() {
      return {
        isLoaded: '',
        weeks: [
          {id: 0, title: '日', content: ''},
          {id: 1, title: '一', content: ''},
          {id: 2, title: '二', content: ''},
          {id: 3, title: '三', content: ''},
          {id: 4, title: '四', content: ''},
          {id: 5, title: '五', content: ''},
          {id: 6, title: '六', content: ''},
        ],
        dates:[
          {id:1,content:1,specialId:1},
          {id:2,content:2,specialId:1},
          {id:3,content:3,specialId:1},
          {id:4,content:4,specialId:1},
          {id:5,content:5,specialId:1},
          {id:6,content:6,specialId:1},
          {id:7,content:7,specialId:1},
          {id:8,content:8,specialId:1},
          {id:9,content:9,specialId:1},
          {id:10,content:10,specialId:1},
          {id:11,content:1,specialId:1},
          {id:12,content:1,specialId:1},
          {id:13,content:1,specialId:1},
          {id:14,content:1,specialId:1},
          {id:15,content:1,specialId:1},
          {id:16,content:1,specialId:1},
          {id:17,content:1,specialId:1},
          {id:18,content:1,specialId:1},
          {id:19,content:1,specialId:1},
          {id:20,content:1,specialId:1},
          {id:21,content:1,specialId:1},
          {id:22,content:1,specialId:1},
          {id:23,content:1,specialId:1},
          {id:24,content:1,specialId:1},
          {id:25,content:1,specialId:1},
          {id:23,content:1,specialId:1},
          {id:23,content:1,specialId:1},
          {id:23,content:1,specialId:1},
          {id:23,content:1,specialId:1},
          {id:23,content:1,specialId:1},
          {id:23,content:1,specialId:1},
          {id:23,content:1,specialId:1},
        ],
        searchForm: {}
      }
    },
    methods: {
      search() {
        // alert(1)
      },
      getItem(item){
        console.log(item);
      }
    }
  }
</script>

<style scoped lang="scss">

  .data-header {
    width: 708px;
    ul {
      display: flex;
      flex-wrap: wrap;
      border-left: 1px solid #e8e8e8;
      border-bottom: 1px solid #e8e8e8;

      li {
        border-top: 1px solid #e8e8e8;
        border-right: 1px solid #e8e8e8;
        width: 100px;
        height: 100px;
        text-align: center;
        line-height: 100px;
        float: left;
      }
    }
  }

  .data-content {
      width: 708px;
    ul {
      display: flex;
      flex-wrap: wrap;
      border-left: 1px solid #e8e8e8;
      li {
        border-bottom: 1px solid #e8e8e8;
        border-right: 1px solid #e8e8e8;
        width: 100px;
        height: 100px;
        float: left;
        text-align: center;
        line-height: 100px;
      }
    }
  }
</style>
