import listEntityRegion from './listEntityRegion'
import detailEntityRegion from './detailEntityRegion'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'safety';
export default {children:[
    {path: `/safety/listEntityRegion`, name: 'listEntityRegion', label: '信息适用区域', component: listEntityRegion},
    {path: `/safety/detailEntityRegion/:type/:id`, name: 'detailEntityRegion', label: '信息适用区域', component: detailEntityRegion},
]}
