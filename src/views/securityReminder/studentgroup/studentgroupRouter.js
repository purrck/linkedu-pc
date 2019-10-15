import listStudentGroup from './listStudentGroup'
import detailStudentGroup from './detailStudentGroup'
const model = 'securityReminder';

export default {
  children:[
    {path: `/${model}/listStudentGroup`, name : 'listStudentGroup', component : listStudentGroup},
    {path: `/${model}/detailStudentGroup/:type/:id`, name : 'detailStudentGroup', component : detailStudentGroup},
  ]
}
