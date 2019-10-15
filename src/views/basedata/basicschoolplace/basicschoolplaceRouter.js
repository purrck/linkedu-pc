import listBasicSchoolPlace from './listBasicSchoolPlace'
import detailBasicSchoolPlace from './detailBasicSchoolPlace'
const model = 'basedata';

export default {
  children:[
    {path: `/${model}/listBasicSchoolPlace`, name : 'listBasicSchoolPlace',label:'学校场所', component : listBasicSchoolPlace},
    {path: `/${model}/detailBasicSchoolPlace/:type/:id`, name : 'detailBasicSchoolPlace',label:'学校场所', component : detailBasicSchoolPlace},
  ]
}
