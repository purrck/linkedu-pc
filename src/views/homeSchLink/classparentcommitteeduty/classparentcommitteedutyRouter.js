import listClassParentCommitteeDuty from './listClassParentCommitteeDuty'
import detailClassParentCommitteeDuty from './detailClassParentCommitteeDuty'
const model = 'homeSchLink';

export default {
  children:[
    {path: `/${model}/listClassParentCommitteeDuty`, name : 'listClassParentCommitteeDuty',label:'家委会职责', component : listClassParentCommitteeDuty},
    {path: `/${model}/detailClassParentCommitteeDuty/:type/:id`, name : 'detailClassParentCommitteeDuty',label:'家委会职责', component : detailClassParentCommitteeDuty},
  ]
}
