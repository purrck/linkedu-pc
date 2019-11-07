import listSchoolTeacherPositionalTitle from './listSchoolTeacherPositionalTitle'
import detailSchoolTeacherPositionalTitle from './detailSchoolTeacherPositionalTitle'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolTeacherPositionalTitle`, name : 'listSchoolTeacherPositionalTitle', component : listSchoolTeacherPositionalTitle},
    {path: `/${model}/detailSchoolTeacherPositionalTitle/:type/:id`, name : 'detailSchoolTeacherPositionalTitle', component : detailSchoolTeacherPositionalTitle},
  ]
}
