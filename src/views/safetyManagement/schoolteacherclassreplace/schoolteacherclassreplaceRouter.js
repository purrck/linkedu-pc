import listSchoolTeacherClassReplace from './listSchoolTeacherClassReplace'
import detailSchoolTeacherClassReplace from './detailSchoolTeacherClassReplace'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolTeacherClassReplace`, name : 'listSchoolTeacherClassReplace', component : listSchoolTeacherClassReplace},
    {path: `/${model}/detailSchoolTeacherClassReplace/:type/:id`, name : 'detailSchoolTeacherClassReplace', component : detailSchoolTeacherClassReplace},
  ]
}
