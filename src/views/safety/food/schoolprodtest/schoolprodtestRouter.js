import listSchoolProdTest from './listSchoolProdTest'
import detailSchoolProdTest from './detailSchoolProdTest'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listSchoolProdTest`, name : 'listSchoolProdTest', label:'食品检测', component : listSchoolProdTest},
    {path: `/${model}/detailSchoolProdTest/:type/:id`, name : 'detailSchoolProdTest', label:'食品检测', component : detailSchoolProdTest},
  ]
}
