import listStudentAccessRecords from './listStudentAccessRecords'
import detailStudentAccessRecords from './detailStudentAccessRecords'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listStudentAccessRecords`, name : 'listStudentAccessRecords',label : '出入记录', component : listStudentAccessRecords},
    {path: `/${model}/detailStudentAccessRecords/:type/:id`, name : 'detailStudentAccessRecords',label : '出入记录', component : detailStudentAccessRecords},
  ]
}
