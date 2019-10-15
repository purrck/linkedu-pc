import listSecurityAccident from './listSecurityAccident'
import detailSecurityAccident from './detailSecurityAccident'
import accidentTotal from './accidentTotal'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/accidentTotal`, name: 'accidentTotal',label:'事故统计', component: accidentTotal},
    {path: `/${model}/listSecurityAccident`, name: 'listSecurityAccident',label:'事故', component: listSecurityAccident},
    {path: `/${model}/detailSecurityAccident/:type/:id`, name: 'detailSecurityAccident',label:'事故', component: detailSecurityAccident},
  ]
}
