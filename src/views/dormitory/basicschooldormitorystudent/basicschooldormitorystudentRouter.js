import listBasicSchoolDormitoryStudent from './listBasicSchoolDormitoryStudent'
import detailBasicSchoolDormitoryStudent from './detailBasicSchoolDormitoryStudent'
const model = 'dormitory';

export default {
  children:[
    {path: `/${model}/listBasicSchoolDormitoryStudent`, name : 'listBasicSchoolDormitoryStudent',label : '住宿学生', component : listBasicSchoolDormitoryStudent},
    {path: `/${model}/detailBasicSchoolDormitoryStudent/:type/:id`, name : 'detailBasicSchoolDormitoryStudent',label : '住宿学生', component : detailBasicSchoolDormitoryStudent},
  ]
}
