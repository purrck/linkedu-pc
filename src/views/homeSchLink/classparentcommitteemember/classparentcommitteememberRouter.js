import listClassParentCommitteeMember from './listClassParentCommitteeMember'
import detailClassParentCommitteeMember from './detailClassParentCommitteeMember'
const model = 'homeSchLink';

export default {
  children:[
    {path: `/${model}/listClassParentCommitteeMember`, name : 'listClassParentCommitteeMember',label:'班级家委会', component : listClassParentCommitteeMember},
    {path: `/${model}/detailClassParentCommitteeMember/:type/:id`, name : 'detailClassParentCommitteeMember',label:'班级家委会', component : detailClassParentCommitteeMember},
  ]
}
