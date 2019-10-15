<template>
  <div>
    <div class="upload-demo" >
      <div tabindex="0" class="el-upload el-upload--text"  v-if="!data">
        <button type="button" class="el-button el-button--primary el-button--small" @click="files()" ><span>点击上传</span>
        </button>
        <input type="file" ref="uploadFiles" @change="change" style="position: absolute; width: 1px; height: 1px; opacity: 0; z-index: -1;"/></div>
      <!--<div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      <ul class="el-upload-list el-upload-list--text" v-if="data">
        <li tabindex="0" class="el-upload-list__item is-success"><!----><a class="el-upload-list__item-name"><i
          class="el-icon-document"></i>{{data}}
        </a><label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-circle-check"></i></label><i
          class="el-icon-close" @click="deleteImg"></i></li>
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
      data () {
        return this.value
      }
    },
    mounted() {
      init(this.id)
    },
    methods: {
      //删除图片
      deleteImg(index) {
          // this.data = null
        let obj = {}
        obj.urlurl = ''
        this.$emit('fileMessage',obj)
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
          this.$emit('input',res)
          this.$emit('fileMessage',fileMessage)
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
