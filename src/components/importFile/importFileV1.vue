<template>
  <el-container v-loading="isLoaded" element-loading-spinner="el-icon-loading"
                element-loading-custom-class="home-loading"
                element-loading-background="rgba(0, 0, 0, 0.1)" :style="{height: fullHeight+'px'}">
    <el-main>
      <p class="fs-14 mb-10">导入数据：</p>
      <div class="importBox">

        <div class="text-center mt-20">
          <img src="~@/assets/img/step.png"/>
          <div class="padding20-y">
            <importFile @callback="importCallback" :url="url" @before-upload="beforeUpload"></importFile>
          </div>
        </div>
      </div>

      <p class="fs-14 mt-20">Excel模板下载：</p>
      <div class="importBox mt-10">

        <div class="text-center">
          <div>
            <el-button type="info" class="btn-rao" plain><img src="~@/assets/img/download.png" width="20" plain/>
              <a href="/static/excel/学生数据导入.xls">下载</a>
            </el-button>
          </div>
        </div>
      </div>

    </el-main>
  </el-container>
</template>

<script>
  import importFile from '@/components/importFile/importFileV1'

  export default {
    data() {
      return {
        msgShow: false,
        fullHeight: document.documentElement.clientHeight,
        isLoaded: false
      }
    },
    components: {
      importFile
    },
    computed : {
      url (){
        return this.$route.query.url;
      }
    },
    methods: {
      beforeUpload() {
        this.isLoaded = true;
      },
      importCallback(data) {
        this.$router.push({name: "studentImportList", query: data});
        this.isLoaded = false;
      }
    },
    created(){
    }
  }
</script>
<style lang="scss" scoped>
  .importBox {
    background: #fff;
    padding: 15px;
    box-shadow: 0px 2px 37px 1px rgba(204, 204, 204, 0.25);
  }
</style>
