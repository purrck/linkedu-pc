import listClassCommitteeDuty from './listClassCommitteeDuty'
import detailClassCommitteeDuty from './detailClassCommitteeDuty'
const model = 'homeSchLink';

export default {
  children:[
    {path: `/${model}/listClassCommitteeDuty`, name : 'listClassCommitteeDuty', label : '班委职责', component : listClassCommitteeDuty},
    {path: `/${model}/detailClassCommitteeDuty/:type/:id`, name : 'detailClassCommitteeDuty', label : '班委职责', component : detailClassCommitteeDuty},
  ]
}
