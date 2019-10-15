import listSchoolMenuProduct from './listSchoolMenuProduct'
import detailSchoolMenuProduct from './detailSchoolMenuProduct'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listSchoolMenuProduct`, name : 'listSchoolMenuProduct', component : listSchoolMenuProduct},
    {path: `/${model}/detailSchoolMenuProduct/:type/:id`, name : 'detailSchoolMenuProduct', component : detailSchoolMenuProduct},
  ]
}
