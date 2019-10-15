import listProductSupplier from './listProductSupplier'
import detailProductSupplier from './detailProductSupplier'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listProductSupplier`, name : 'listProductSupplier', label:'食品供应商', component : listProductSupplier},
    {path: `/${model}/detailProductSupplier/:type/:id`, name : 'detailProductSupplier', label:'食品供应商', component : detailProductSupplier},
  ]
}
