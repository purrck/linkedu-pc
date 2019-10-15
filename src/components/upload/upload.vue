<template>
  <div>
    <div class="upload-demo" >
      <div tabindex="0" class="el-upload el-upload--text"  >
        <button type="button" class="el-button el-button--primary el-button--small" @click="files()" ><span>点击上传</span>
        </button>
        <input type="file" ref="uploadFiles" @change="change" style="position: absolute; width: 1px; height: 1px; opacity: 0; z-index: -1;"/></div>
      <!--<div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      <ul class="el-upload-list el-upload-list--text" v-if="value">
        <li tabindex="0" class="el-upload-list__item is-success" v-for="(item,index) in value.split(',')">
          <a class="el-upload-list__item-name"><i class="el-icon-document"></i>{{item}}</a>
          <label class="el-upload-list__item-status-label">
            <i class="el-icon-upload-success el-icon-circle-check"></i>
          </label>
          <i class="el-icon-close" @click="deleteImg(index)"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    name: "uploadFile",
    props: ['value',],
    data() {
      return {
        uploadLimit: 3,
        imageUrl: '',
        dialogVisible: false,
        dialogVisibles: false,
        fileMessage: {},
        resList: [],
        form: {}
      }
    },
    created() {
    },
    watch: {
      value (val) {
        if(val){
          this.data = val.split(",");
        }else{
          this.data = []
        }
      }
    },
    mounted() {

    },
    methods: {
      //删除图片
      deleteImg(index) {
        // this.data = null
        this.data.splice(index,1)
        this.$emit('input', this.url.join(","))
        this.$emit('input','')
      },
      files() {
        this.$refs.uploadFiles.click();
      },
      change(event) {
        let  fileMessage =  event.target.files[0];
        this.uploadFile(event.target.files[0], res => {
          fileMessage.urlurl= res;
          // this.$emit('data', res)
          // this.data = res
          console.log(this.data)
          let resD
          if(this.data) {
            resD = this.data + ',' + res ;
          }else{
            resD = res;
          }
          this.$emit('input',resD)
          this.$emit('change',fileMessage)
        })
        event.target.value = ''
      },
    }
  }
</script>

<style scoped lang="scss">
  .pictureCards {
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    text-align: center;
    line-height: 146px;
    vertical-align: top;
  }
</style>
