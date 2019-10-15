import listClassStudentComment from './listClassStudentComment'
import detailClassStudentComment from './detailClassStudentComment'
const model = 'homeSchLink';

export default {
  children:[
    {path: `/${model}/listClassStudentComment`, name : 'listClassStudentComment',label : '', component : listClassStudentComment},
    {path: `/${model}/detailClassStudentComment/:type/:id`, name : 'detailClassStudentComment',label : '', component : detailClassStudentComment},
  ]
}
