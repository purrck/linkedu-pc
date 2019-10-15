import detailDialog from './main.vue';
import Vue from 'vue';
let _detailDialog = Vue.extend(detailDialog);
export default (data) => {
    let _a = new _detailDialog({
        data : data
    });
    let vm = _a.$mount();
    document.body.appendChild(vm.$el)
}
