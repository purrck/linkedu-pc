import listClassPacesetter from './listClassPacesetter'
import detailClassPacesetter from './detailClassPacesetter'
const model = 'homeSchLink';

export default {
  children:[
    {path: `/${model}/listClassPacesetter`, name : 'listClassPacesetter',label : '班级荣誉', component : listClassPacesetter},
    {path: `/${model}/detailClassPacesetter/:type/:id`, name : 'detailClassPacesetter',label : '班级荣誉', component : detailClassPacesetter},
  ]
}
