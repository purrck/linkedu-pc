import listAppList from '@/views/basedata/applist/listAppList'
import detailAppList from '@/views/basedata/applist/detailAppList'

const _import = require('@/router/_import');
const model = 'basedata';

export default {
  children: [
    {path: `/${model}/listAppList`, name: 'listAppList', label: '应用平台', component: listAppList},
    {path: `/${model}/detailAppList/:type/:id`, name: 'detailAppList',label: '应用平台', component: detailAppList},
  ]
}
