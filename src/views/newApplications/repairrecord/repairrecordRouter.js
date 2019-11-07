import listRepairRecord from './listRepairRecord'
import detailRepairRecord from './detailRepairRecord'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listRepairRecord`, name : 'listRepairRecord', component : listRepairRecord},
    {path: `/${model}/detailRepairRecord/:type/:id`, name : 'detailRepairRecord', component : detailRepairRecord},
  ]
}
