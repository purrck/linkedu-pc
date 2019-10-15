import listEntityReadinfo from './listEntityReadinfo'
import detailEntityReadinfo from './detailEntityReadinfo'
import entityreadinfoTotal from './entityreadinfoTotal'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'safety';
export default {children:[
    {path: `/safety/listEntityReadinfo`, name: 'listEntityReadinfo',label: '浏览记录', component: listEntityReadinfo},
    {path: `/safety/detailEntityReadinfo/:type/:id`, name: 'detailEntityReadinfo',label: '浏览记录', component: detailEntityReadinfo},
    {path: `/safety/entityreadinfoTotal`, name: 'entityreadinfoTotal',label: '信息浏览统计', component: entityreadinfoTotal},

  ]}
