import listAppVersions from '@/views/basedata/appversions/listAppVersions'
import detailAppVersions from '@/views/basedata/appversions/detailAppVersions'

const _import = require('@/router/_import');
const model = 'basedata';

export default {
  children: [
    {path: `/${model}/listAppVersions`, name: 'listAppVersions',label: '应用版本', component: listAppVersions},
    {path: `/${model}/detailAppVersions/:type/:id`, name: 'detailAppVersions',label: '应用版本', component: detailAppVersions},]
}
