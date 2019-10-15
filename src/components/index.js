import Vue from 'vue'
import dialog from './dialog/main.vue'
import detailDialog from './detailDialog/'
import roleDialog from './roleDialog/main.vue'
import callTeacherDialog from './callTeacherDialog/'
import callStudentDialog from './callStudentDialog/'
import imageForUEditor from './imageForUEditor/'
import schoolTreeSelect from './schoolTreeSelect/main.vue'
import gradeClassSubject from './schoolTreeSelect/gradeClassSubject.vue'
import segmentGradeSubject from './schoolTreeSelect/segmentGradeSubject.vue'
import segmentGradeClassSubject from './schoolTreeSelect/segmentGradeClassSubject.vue'
import segmentGradeClass from './schoolTreeSelect/segmentGradeClass.vue'
import segmentGrade from './schoolTreeSelect/segmentGrade.vue'
import gradeClass from './schoolTreeSelect/gradeClass.vue'
import pjSegmentGradeSubject from './pingjiSelector/pjSegmentGradeSubject.vue'
import pjGradeClassSubject from './pingjiSelector/pjGradeClassSubject.vue'
import xxsendObject from './sendObject/main/indexV1.vue'
import ggsendObject from './sendObject/main/indexV2.vue'
import phoneModel from './phoneModel.vue'
import duozhangUpload from './upload/duozhangUpload.vue'

const components = [
    dialog,
    schoolTreeSelect,
    gradeClassSubject,
    roleDialog,
    segmentGradeSubject,
    segmentGradeClassSubject,
    segmentGrade,
    segmentGradeClass,
    gradeClass,
    pjSegmentGradeSubject,
    pjGradeClassSubject,
    xxsendObject,
    phoneModel,
    ggsendObject,
    duozhangUpload
]

export default {
    install : function(){
        components.forEach(component => {
            Vue.component(component.name,component)
        })
        Vue.prototype.$detailDialog = detailDialog;
        Vue.prototype.$callTeacherDialog = callTeacherDialog
        Vue.prototype.imageForUEditor = imageForUEditor
        Vue.prototype.$callStudentDialog = callStudentDialog
    }
}
