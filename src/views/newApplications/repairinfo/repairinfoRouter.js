import listRepairInfo from './listRepairInfo'
import detailRepairInfo from './detailRepairInfo'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listRepairInfo`, name : 'listRepairInfo', component : listRepairInfo},
    {path: `/${model}/detailRepairInfo/:type/:id`, name : 'detailRepairInfo', component : detailRepairInfo},
  ]
}
