import listSecurityDangerProcess from './listSecurityDangerProcess'
import detailSecurityDangerProcess from './detailSecurityDangerProcess'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listSecurityDangerProcess`, name: 'listSecurityDangerProcess', label:'隐患处理', component: listSecurityDangerProcess},
    {path: `/${model}/detailSecurityDangerProcess/:type/:id`, name: 'detailSecurityDangerProcess', label:'隐患处理', component: detailSecurityDangerProcess},
  ]
}
