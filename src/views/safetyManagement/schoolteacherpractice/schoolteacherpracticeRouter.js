import listSchoolTeacherPractice from './listSchoolTeacherPractice'
import detailSchoolTeacherPractice from './detailSchoolTeacherPractice'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolTeacherPractice`, name : 'listSchoolTeacherPractice', component : listSchoolTeacherPractice},
    {path: `/${model}/detailSchoolTeacherPractice/:type/:id`, name : 'detailSchoolTeacherPractice', component : detailSchoolTeacherPractice},
  ]
}
