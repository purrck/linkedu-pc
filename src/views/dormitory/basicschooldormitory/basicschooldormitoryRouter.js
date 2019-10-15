import listBasicSchoolDormitory from './listBasicSchoolDormitory'
import detailBasicSchoolDormitory from './detailBasicSchoolDormitory'
const model = 'dormitory';

export default {
  children:[
    {path: `/${model}/listBasicSchoolDormitory`, name : 'listBasicSchoolDormitory',label : '', component : listBasicSchoolDormitory},
    {path: `/${model}/detailBasicSchoolDormitory/:type/:id`, name : 'detailBasicSchoolDormitory',label : '', component : detailBasicSchoolDormitory},
  ]
}
