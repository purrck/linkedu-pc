import listBasicSchoolDormitoryRoom from './listBasicSchoolDormitoryRoom'
import detailBasicSchoolDormitoryRoom from './detailBasicSchoolDormitoryRoom'
const model = 'dormitory';

export default {
  children:[
    {path: `/${model}/listBasicSchoolDormitoryRoom`, name : 'listBasicSchoolDormitoryRoom',label : '住宿房间', component : listBasicSchoolDormitoryRoom},
    {path: `/${model}/detailBasicSchoolDormitoryRoom/:type/:id`, name : 'detailBasicSchoolDormitoryRoom',label : '住宿房间', component : detailBasicSchoolDormitoryRoom},
  ]
}
