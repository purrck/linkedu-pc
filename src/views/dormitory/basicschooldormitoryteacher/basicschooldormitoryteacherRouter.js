import listBasicSchoolDormitoryTeacher from './listBasicSchoolDormitoryTeacher'
import detailBasicSchoolDormitoryTeacher from './detailBasicSchoolDormitoryTeacher'
const model = 'dormitory';

export default {
  children:[
    {path: `/${model}/listBasicSchoolDormitoryTeacher`, name : 'listBasicSchoolDormitoryTeacher',label : '管理老师', component : listBasicSchoolDormitoryTeacher},
    {path: `/${model}/detailBasicSchoolDormitoryTeacher/:type/:id`, name : 'detailBasicSchoolDormitoryTeacher',label : '管理老师', component : detailBasicSchoolDormitoryTeacher},
  ]
}
