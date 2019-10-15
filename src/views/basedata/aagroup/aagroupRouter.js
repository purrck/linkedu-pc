import listAaGroup from '@/views/basedata/aagroup/listAaGroup'
import detailAaGroup from '@/views/basedata/aagroup/detailAaGroup'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'basedata';

export default {children:[
    {path: `/${model}/listAaGroup`, name : 'listAaGroup', label: '用户群组', component : listAaGroup},
    {path: `/${model}/detailAaGroup/:type/:id`, name : 'detailAaGroup', label: '用户群组', component : detailAaGroup},

]}
