import listSecurityDanger from './listSecurityDanger'
import detailSecurityDanger from './detailSecurityDanger'
import dangerTotal from './dangerTotal'


const model = 'safety'

export default {
  children: [
    {path: `/${model}/dangerTotal`, name: 'dangerTotal', label:'隐患',component: dangerTotal},
    {path: `/${model}/listSecurityDanger`, name: 'listSecurityDanger', label:'隐患',component: listSecurityDanger},
    {path: `/${model}/detailSecurityDanger/:type/:id`, name: 'detailSecurityDanger', label:'隐患', component: detailSecurityDanger},
  ]
}
