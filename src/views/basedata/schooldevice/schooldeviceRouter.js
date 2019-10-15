import listSchoolDevice from './listSchoolDevice'
import detailSchoolDevice from './detailSchoolDevice'
const model = 'basedata';
export default {
  children:[
    {path: `/${model}/listSchoolDevice`, name : 'listSchoolDevice', label: '', component : listSchoolDevice},
    {path: `/${model}/detailSchoolDevice/:type/:id`, name : 'detailSchoolDevice',label: '', component : detailSchoolDevice},
  ]
}
