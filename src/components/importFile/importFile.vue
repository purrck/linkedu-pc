<template>
  <div class="importWrap">
    <div class="importFile">
      <el-button type="info" class="btn-rao" plain><img src="~@/assets/img/icon_daoru11.png" width="20" plain/> 导入
      </el-button>
      <input type="file" name="file" class="file"
             accept="application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
             @change="getFile($event)"/>
    </div>
  </div>
</template>

<script>
  import commonApi from "@/api/common/common";
  import {baseUrl, khglUrl, dicUrl} from '@/config/env';
  import { mapGetters } from 'vuex'

  export default {
    data() {
      return {
        msgShow: false,
        msg: {
          failCount: "",
          failDownloadUrl: "",
          successCount: "",
          successDownloadUrl: ""
        }
      }
    },
    computed : {
      ...mapGetters(['importUrl'])
    },
    mounted() {
    },
    methods: {
      getFile(event) {
        let fileType = event.target.files[0].name;

        if (fileType.lastIndexOf(".xlsx") != -1 || fileType.lastIndexOf(".xls") < 1) {

          this.$message.error("导入文件格式不正确,必须是xls后缀")

          return;
        }
        this.$emit("before-upload");
        let formData = new FormData();
        formData.append('file', event.target.files[0]);
        commonApi.importFile(formData).then((response) => {
          response.data.data.failDownloadUrl = `${baseUrl}${response.data.data.failDownloadUrl}`;
          response.data.data.successDownloadUrl = `${baseUrl}${response.data.data.successDownloadUrl}`
          this.msg = response.data.data;
          //this.isShow = true;
          this.$emit("callback", response);
        });
      }
    }
  }
</script>

<style lang="scss" scoped>
  .tips-school {
    position: absolute;
    top: 30%;
    left: 47%;

  }

  .importWrap {
    display: inline-block;
  }

  .importFile {
    position: relative;
    display: inline-block;
    cursor: pointer;

    .file {
      position: absolute;
      top: 5px;
      left: 5px;
      z-index: 1;
      width: 70px;
      overflow: hidden;
      opacity: 0;
      cursor: pointer;
    }
  }
</style>
