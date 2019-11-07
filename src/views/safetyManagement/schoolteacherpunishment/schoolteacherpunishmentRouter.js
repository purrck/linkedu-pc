import listSchoolTeacherPunishment from './listSchoolTeacherPunishment'
import detailSchoolTeacherPunishment from './detailSchoolTeacherPunishment'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolTeacherPunishment`, name : 'listSchoolTeacherPunishment', component : listSchoolTeacherPunishment},
    {path: `/${model}/detailSchoolTeacherPunishment/:type/:id`, name : 'detailSchoolTeacherPunishment', component : detailSchoolTeacherPunishment},
  ]
}
