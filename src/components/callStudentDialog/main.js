import detailDialog from './main.vue';
import Vue from 'vue';
let _detailDialog = Vue.extend(detailDialog);

const callTeacherDialog = function(options) {
    let _a = new _detailDialog({
        data : options
    });
    let vm = _a.$mount();
    document.body.appendChild(vm.$el)
}
export default callTeacherDialog
