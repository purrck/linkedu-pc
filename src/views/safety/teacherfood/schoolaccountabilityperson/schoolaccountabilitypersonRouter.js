import listSchoolAccountabilityPerson from './listSchoolAccountabilityPerson'
import detailSchoolAccountabilityPerson from './detailSchoolAccountabilityPerson'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listSchoolAccountabilityPerson`, name : 'listSchoolAccountabilityPerson', component : listSchoolAccountabilityPerson},
    {path: `/${model}/detailSchoolAccountabilityPerson/:type/:id`, name : 'detailSchoolAccountabilityPerson', component : detailSchoolAccountabilityPerson},
  ]
}
