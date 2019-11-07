import listSchoolTeacherWorkCheck from './listSchoolTeacherWorkCheck'
import detailSchoolTeacherWorkCheck from './detailSchoolTeacherWorkCheck'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolTeacherWorkCheck`, name : 'listSchoolTeacherWorkCheck', component : listSchoolTeacherWorkCheck},
    {path: `/${model}/detailSchoolTeacherWorkCheck/:type/:id`, name : 'detailSchoolTeacherWorkCheck', component : detailSchoolTeacherWorkCheck},
  ]
}
