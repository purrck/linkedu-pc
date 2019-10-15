import listClassHonor from './listClassHonor'
import detailClassHonor from './detailClassHonor'
const model = 'homeSchLink';

export default {
  children:[
    {path: `/${model}/listClassHonor`, name : 'listClassHonor',label : '班级荣誉', component : listClassHonor},
    {path: `/${model}/detailClassHonor/:type/:id`, name : 'detailClassHonor',label : '班级荣誉', component : detailClassHonor},
  ]
}
