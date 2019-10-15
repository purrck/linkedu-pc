import listSchoolProdReservedSample from './listSchoolProdReservedSample'
import detailSchoolProdReservedSample from './detailSchoolProdReservedSample'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listSchoolProdReservedSample`, name : 'listSchoolProdReservedSample', label:'食品留样',component : listSchoolProdReservedSample},
    {path: `/${model}/detailSchoolProdReservedSample/:type/:id`, name : 'detailSchoolProdReservedSample', label:'食品留样', component : detailSchoolProdReservedSample},
  ]
}
