import listSchoolProdTestItem from './listSchoolProdTestItem'
import detailSchoolProdTestItem from './detailSchoolProdTestItem'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listSchoolProdTestItem`, name : 'listSchoolProdTestItem', label:'食品检验产品', component : listSchoolProdTestItem},
    {path: `/${model}/detailSchoolProdTestItem/:type/:id`, name : 'detailSchoolProdTestItem', label:'食品检验产品', component : detailSchoolProdTestItem},
  ]
}
