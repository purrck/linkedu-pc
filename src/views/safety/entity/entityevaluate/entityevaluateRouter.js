import listEntityEvaluate from './listEntityEvaluate'
import detailEntityEvaluate from './detailEntityEvaluate'
import entityevaluateTotal from './entityevaluateTotal'

import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'safety';
export default {children:[
    {path: `/safety/listEntityEvaluate`, name: 'listEntityEvaluate',label: '信息评价', component: listEntityEvaluate},
    {path: `/safety/detailEntityEvaluate/:type/:id`, name: 'detailEntityEvaluate',label: '信息评价', component: detailEntityEvaluate},
    {path: `/safety/entityevaluateTotal`, name: 'entityevaluateTotal',label: '信息评价统计', component: entityevaluateTotal},

  ]}
