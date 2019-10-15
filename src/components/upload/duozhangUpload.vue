<template>
  <div>
    <div class="upload-demo">
      <div tabindex="0" class="el-upload el-upload--text">
        <button type="button" class="el-button el-button--primary el-button--small" @click="files()"><span>点击上传</span>
        </button>
        <input type="file" ref="uploads" @change="change" style="position: absolute; width: 1px; height: 1px; opacity: 0; z-index: -1;"/>
      </div>
      <!--<div class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>-->
      <ul class="el-upload-list el-upload-list--text">
        <li tabindex="0" class="el-upload-list__item is-success" v-for="(data,index) in url" :key="index"><!----><a class="el-upload-list__item-name"><i
          class="el-icon-document"></i>{{data}}
        </a><label class="el-upload-list__item-status-label"><i class="el-icon-upload-success el-icon-circle-check"></i></label><i
          class="el-icon-close" @click="deleteImg(index)"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>

export default {
  name: 'duozhang-upload',
  props: ['value'],
  data () {
    return {
      uploadLimit: 3,
      imageUrl: '',
      dialogVisible: false,
      dialogVisibles: false,
      fileMessage: {},
      resList: [],
      form: {},
      url: this.value
    }
  },
  watch:{
    value(val){
      if(val){
        this.url = val.split(",");
      }else{
        this.url = []
      }
    },
  },
  created(){
    // console.log(this.url)
  },
  mounted(){
    // console.log(this.url)
  },
  methods: {
    //删除图片
    deleteImg (index) {
      this.url.splice(index,1)
      this.$emit('input', this.url.join(","))
    },
    files () {
      this.$refs.uploads.click()
    },
    change (event) {
      this.uploadFile(event.target.files[0], res => {
        console.log('retrun');
        console.log(res);
        this.url.push(res)
        this.$emit('input', this.url.join(","))
      })
      event.target.value = ''
    },
  }
}
</script>

<style scoped lang="scss">
  .upload-demo {
    display: flex;
  }

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
