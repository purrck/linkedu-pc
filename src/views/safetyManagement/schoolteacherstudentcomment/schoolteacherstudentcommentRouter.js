import listSchoolTeacherStudentComment from './listSchoolTeacherStudentComment'
import detailSchoolTeacherStudentComment from './detailSchoolTeacherStudentComment'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolTeacherStudentComment`, name : 'listSchoolTeacherStudentComment', component : listSchoolTeacherStudentComment},
    {path: `/${model}/detailSchoolTeacherStudentComment/:type/:id`, name : 'detailSchoolTeacherStudentComment', component : detailSchoolTeacherStudentComment},
  ]
}
