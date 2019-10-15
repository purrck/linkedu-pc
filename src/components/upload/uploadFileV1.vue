<template>
  <div>
    <div class="flex row" >
      <ul class="el-upload-list el-upload-list--picture-card" v-if="imagelists.length">
        <li class="el-upload-list__item is-ready"  v-for="(data,index) in imagelists" :key="index">
          <img :src="data" alt="" class="el-upload-list__item-thumbnail">
          <span class="el-upload-list__item-actions" @click="deleteImg(data,index)"><i class="el-icon-delete"></i></span>
        </li>
      </ul>
      <div class="pictureCards" @click="file" v-if="showJia">
        <i data-v-387883ae="" class="el-icon-plus"></i>
      </div>
    </div>
    <label style="position: relative;" ref="uploadImg">
      <input type="file" @change="change" style="position: absolute; width: 1px; height: 1px; opacity: 0; z-index: -1;"/>
    </label>
  </div>
</template>

<script>

  export default {
    name: "uploadFiles",
    // props : ['imagelist','many'],
    props :{
      imagelist: {
        type: String,
        default () {
          return ''
        }
      },
      many:{
        type: Number,
        default () {
          return 1
        }
      }
    },
    data() {
      return {
        dialogImageUrl: '',
        imagelists :[],
        dialogVisible: false,
        form: {}
      }
    },
    computed:{
      showJia (){
        if(!this.many){
          this.many=1;
        }
        return this.many>this.imagelists.length;
      }
    },
    watch:{
      imagelist(val){
        if(val){
          this.imagelists = val.split(",")===[""]?[]:val.split(",")
        }else{
          this.imagelists = []
        }
      },

    },
    created () {
      console.log('cnmbxxxxxxxxxxxxxx')
    },
    mounted(){
    },
    methods: {
      //删除图片
      deleteImg(data,index){
          this.imagelists.splice(index,1);
          this.$emit('uploadData',  this.imagelists.join(","));
      },

      file() {
        this.$refs.uploadImg.click();
      },

      change(event) {
        this.uploadFile(event.target.files[0], res => {
            this.imagelists.push(res);
            this.$emit('uploadData',  this.imagelists.join(","));
        });
        event.target.value = ''
      },

      handlePictureCardPreview(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true
      },
    }
  }
</script>

<style scoped lang="scss">
  .pictureCards {
    background-color: #E8E8E8;
    /*border: 1px dashed #c0ccda;*/
    color: #89929c;
    font-size: 36px;
    border-radius: 6px;
    box-sizing: border-box;
    width: 148px;
    height: 148px;
    text-align: center;
    line-height: 146px;
    vertical-align: top;
  }
</style>
