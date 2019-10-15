<template xmlns="">
  <div class="editor-wrap">
    <quill-editor
      :content="content"
      ref="myQuillEditor"
      :style="{height:ruleHight+trueHeight+'px'}"
      style="padding-bottom:112px"
      :options="editorOption"
      @change="onEditorChange($event)"
     >
    </quill-editor>

    <input type="file" class="fileClick" @change="changes" v-show="false" />

  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'

export default {
  name: 'editor',
  components: {quillEditor},
  computed: {
    editor () {
      return this.$refs.myQuillEditor
    },
  },
  props: {
    value: String,
    trueHeight:{
      type: Number,
      default: 400
    }
  },
  data () {
    // 富文本工具栏配置
    const toolbarOptions = [
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote'],
      [{ 'color': [] }, { 'background': [] }],
      [{'header': 1}, {'header': 2}],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      [{'script': 'sub'}, {'script': 'super'}],
      [{'indent': '-1'}, {'indent': '+1'}],
      [{'size': ['small', false, 'large', 'huge']}],
      [{'header': [1, 2, 3, 4, 5, 6, false]}],
      [{'align': []}],
      ['link', 'image']
    ]
    return {
      content : this.value,
      imagelist: '',
      editorOption: {
        placeholder: '请在这里输入内容',
        theme: 'snow', // or 'bubble'
        modules: {
          toolbar: {
            container: toolbarOptions, // 工具栏
            handlers: {
              'image': function (value) {
                if (value) {
                  document.querySelector('.fileClick').click()
                } else {
                  this.quill.format('image', false)
                }
              }
            }
          }
        }
      },
      ruleHight: -100
    }
  },
  created(){
  },
  watch : {
    value(val){
      this.content = val
    }
  },
  methods: {
    onEditorBlur () { // 失去焦点事件
    },
    onEditorFocus () { // 获得焦点事件
    },
    onEditorChange (val) { // 内容改变事件
      this.content = val.html
      this.$emit('input', this.content)
    },
    changes(event) {
      this.uploadFile(event.target.files[0], res => {
          this.uploadData(res,'editor');
      })
      event.target.value = ''
    },
    uploadData (res) {
      let quill = this.editor.quill
      let length = quill.getSelection().index
      quill.insertEmbed(length, 'image', res)
      quill.setSelection(length + 1)
      // this.value = this.value + `<img src="${res}" alt="${res}"/>`
      this.$emit('input', this.content)
    }
  }
}
</script>
