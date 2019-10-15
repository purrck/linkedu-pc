import listStudentGroupUser from './listStudentGroupUser'
import detailStudentGroupUser from './detailStudentGroupUser'
const model = 'securityReminder';

export default {
  children:[
    {path: `/${model}/listStudentGroupUser`, name : 'listStudentGroupUser', component : listStudentGroupUser},
    {path: `/${model}/detailStudentGroupUser/:type/:id`, name : 'detailStudentGroupUser', component : detailStudentGroupUser},
  ]
}
