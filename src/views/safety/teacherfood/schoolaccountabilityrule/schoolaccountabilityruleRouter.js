import listSchoolAccountabilityRule from './listSchoolAccountabilityRule'
import detailSchoolAccountabilityRule from './detailSchoolAccountabilityRule'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listSchoolAccountabilityRule`, name : 'listSchoolAccountabilityRule', component : listSchoolAccountabilityRule},
    {path: `/${model}/detailSchoolAccountabilityRule/:type/:id`, name : 'detailSchoolAccountabilityRule', component : detailSchoolAccountabilityRule},
  ]
}
