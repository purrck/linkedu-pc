import listSecurityAccidentProcess from './listSecurityAccidentProcess'
import detailSecurityAccidentProcess from './detailSecurityAccidentProcess'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listSecurityAccidentProcess`, name: 'listSecurityAccidentProcess',label:'事故处理', component: listSecurityAccidentProcess},
    {path: `/${model}/detailSecurityAccidentProcess/:type/:id`, name: 'detailSecurityAccidentProcess',label:'事故处理', component: detailSecurityAccidentProcess},
  ]
}
