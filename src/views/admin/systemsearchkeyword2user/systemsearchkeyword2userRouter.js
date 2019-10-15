import listSystemSearchKeyword2user from '@/views/admin/systemsearchkeyword2user/listSystemSearchKeyword2user'
import detailSystemSearchKeyword2user from '@/views/admin/systemsearchkeyword2user/detailSystemSearchKeyword2user'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'safety';

export default {children:[
    {path: `/${model}/listSystemSearchKeyword2user`, name : 'listSystemSearchKeyword2user', component : listSystemSearchKeyword2user},
    {path: `/${model}/detailSystemSearchKeyword2user/:type/:id`, name : 'detailSystemSearchKeyword2user', component : detailSystemSearchKeyword2user},
]}
