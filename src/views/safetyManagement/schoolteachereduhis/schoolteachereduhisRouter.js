import listSchoolTeacherEduhis from './listSchoolTeacherEduhis'
import detailSchoolTeacherEduhis from './detailSchoolTeacherEduhis'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolTeacherEduhis`, name : 'listSchoolTeacherEduhis', component : listSchoolTeacherEduhis},
    {path: `/${model}/detailSchoolTeacherEduhis/:type/:id`, name : 'detailSchoolTeacherEduhis', component : detailSchoolTeacherEduhis},
  ]
}
