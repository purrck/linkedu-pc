import listSchoolTeacherLeave from './listSchoolTeacherLeave'
import detailSchoolTeacherLeave from './detailSchoolTeacherLeave'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolTeacherLeave`, name : 'listSchoolTeacherLeave', component : listSchoolTeacherLeave},
    {path: `/${model}/detailSchoolTeacherLeave/:type/:id`, name : 'detailSchoolTeacherLeave', component : detailSchoolTeacherLeave},
  ]
}
