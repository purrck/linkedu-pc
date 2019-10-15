import listProductType from './listProductType'
import detailProductType from './detailProductType'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listProductType`, name : 'listProductType', label:'食品类别', component : listProductType},
    {path: `/${model}/detailProductType/:type/:id`, name : 'detailProductType', label:'食品类别', component : detailProductType},
  ]
}
