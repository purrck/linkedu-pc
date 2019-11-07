import listSchoolTeacherClassCheck from './listSchoolTeacherClassCheck'
import detailSchoolTeacherClassCheck from './detailSchoolTeacherClassCheck'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolTeacherClassCheck`, name : 'listSchoolTeacherClassCheck', component : listSchoolTeacherClassCheck},
    {path: `/${model}/detailSchoolTeacherClassCheck/:type/:id`, name : 'detailSchoolTeacherClassCheck', component : detailSchoolTeacherClassCheck},
  ]
}
