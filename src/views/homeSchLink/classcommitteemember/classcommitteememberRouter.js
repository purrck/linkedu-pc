import listClassCommitteeMember from './listClassCommitteeMember'
import detailClassCommitteeMember from './detailClassCommitteeMember'
const model = 'homeSchLink';

export default {
  children:[
    {path: `/${model}/listClassCommitteeMember`, name : 'listClassCommitteeMember', label : '班委会', component : listClassCommitteeMember},
    {path: `/${model}/detailClassCommitteeMember/:type/:id`, name : 'detailClassCommitteeMember', label : '班委会', component : detailClassCommitteeMember},
  ]
}
