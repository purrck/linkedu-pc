import listSchoolPlaceTimeCheckRule from './listSchoolPlaceTimeCheckRule'
import detailSchoolPlaceTimeCheckRule from './detailSchoolPlaceTimeCheckRule'
const model = 'basedata';

export default {
  children:[
    {path: `/${model}/listSchoolPlaceTimeCheckRule`, name : 'listSchoolPlaceTimeCheckRule',label : '场所考勤规则', component : listSchoolPlaceTimeCheckRule},
    {path: `/${model}/detailSchoolPlaceTimeCheckRule/:type/:id`, name : 'detailSchoolPlaceTimeCheckRule',label : '场所考勤规则', component : detailSchoolPlaceTimeCheckRule},
  ]
}
