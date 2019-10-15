import Vue from 'vue'
import imageForUEditor from './main.vue'
let _a = Vue.extend(imageForUEditor);
const _image = function(callback){
   let a = new _a({
    data : callback
   });
   a.vm = a.$mount();
   document.body.appendChild(a.vm.$el);
   return a.vm;
}

export default _image
