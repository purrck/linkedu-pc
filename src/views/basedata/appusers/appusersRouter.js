import listAppUsers from '@/views/basedata/appusers/listAppUsers'
import detailAppUsers from '@/views/basedata/appusers/detailAppUsers'

const model = 'basedata';

export default {
  children: [
    {path: `/${model}/listAppUsers`, name: 'listAppUsers',label: '应用用户相关', component: listAppUsers},
    {path: `/${model}/detailAppUsers/:type/:id`, name: 'detailAppUsers',label: '应用用户相关', component: detailAppUsers},
  ]
}
