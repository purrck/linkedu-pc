import listSchoolTeacherAward from './listSchoolTeacherAward'
import detailSchoolTeacherAward from './detailSchoolTeacherAward'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolTeacherAward`, name : 'listSchoolTeacherAward', component : listSchoolTeacherAward},
    {path: `/${model}/detailSchoolTeacherAward/:type/:id`, name : 'detailSchoolTeacherAward', component : detailSchoolTeacherAward},
  ]
}
