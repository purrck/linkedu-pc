import listSchoolTeacherClassLook from './listSchoolTeacherClassLook'
import detailSchoolTeacherClassLook from './detailSchoolTeacherClassLook'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolTeacherClassLook`, name : 'listSchoolTeacherClassLook', component : listSchoolTeacherClassLook},
    {path: `/${model}/detailSchoolTeacherClassLook/:type/:id`, name : 'detailSchoolTeacherClassLook', component : detailSchoolTeacherClassLook},
  ]
}
