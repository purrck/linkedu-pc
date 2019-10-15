import listSchoolAccountabilityInfo from './listSchoolAccountabilityInfo'
import detailSchoolAccountabilityInfo from './detailSchoolAccountabilityInfo'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listSchoolAccountabilityInfo`, name : 'listSchoolAccountabilityInfo', component : listSchoolAccountabilityInfo},
    {path: `/${model}/detailSchoolAccountabilityInfo/:type/:id`, name : 'detailSchoolAccountabilityInfo', component : detailSchoolAccountabilityInfo},
  ]
}
