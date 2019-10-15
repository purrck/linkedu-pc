import listSystemSearchKeyword from '@/views/admin/systemsearchkeyword/listSystemSearchKeyword'
import detailSystemSearchKeyword from '@/views/admin/systemsearchkeyword/detailSystemSearchKeyword'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'safety';

export default {children:[
    {path: `/${model}/listSystemSearchKeyword`, name : 'listSystemSearchKeyword', component : listSystemSearchKeyword},
    {path: `/${model}/detailSystemSearchKeyword/:type/:id`, name : 'detailSystemSearchKeyword', component : detailSystemSearchKeyword},
]}
