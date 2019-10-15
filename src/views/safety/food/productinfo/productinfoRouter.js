import listProductInfo from './listProductInfo'
import detailProductInfo from './detailProductInfo'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listProductInfo`, name : 'listProductInfo', label:'食品商品', component : listProductInfo},
    {path: `/${model}/detailProductInfo/:type/:id`, name : 'detailProductInfo', label:'食品商品', component : detailProductInfo},
  ]
}
