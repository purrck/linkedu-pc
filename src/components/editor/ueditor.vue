<template>
  <div>
    <script id="editor" type="text/plain"></script>
  </div>
</template>
<script>
  export default {
    name: 'UEditor',
    data () {
      return {
        editor: null
      }
    },
    props: {
      config: {
        type: Object,
        default (){
          return {
            initialFrameWidth: null,
            initialFrameHeight: 350
          }
        }
      },
      defaultMsg: {
        type: String
      }
    },
    mounted() {
      const _this = this;
      this.editor = UE.getEditor('editor', this.config); // 初始化UE
      this.editor.addListener("ready", function () {
        _this.editor.setContent(_this.defaultMsg); // 确保UE加载完成后，放入内容。
      })
      UE.getEditor('editor').addListener('contentChange',function(editor){
        _this.$emit('change',_this.editor.getContent())
      });
    },
    methods: {
      getUEContent() { // 获取内容方法
        return this.editor.getContent()
      }
    },
    destroyed() {
      this.editor.destroy();
    }
  }
</script>
