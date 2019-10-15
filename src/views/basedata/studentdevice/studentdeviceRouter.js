import listStudentDevice from './listStudentDevice'
import detailStudentDevice from './detailStudentDevice'
const model = 'basedata';

export default {
  children:[
    {path: `/${model}/listStudentDevice`, name : 'listStudentDevice',label:'学生设备', component : listStudentDevice},
    {path: `/${model}/detailStudentDevice/:type/:id`, name : 'detailStudentDevice',label:'学生设备', component : detailStudentDevice},
  ]
}
