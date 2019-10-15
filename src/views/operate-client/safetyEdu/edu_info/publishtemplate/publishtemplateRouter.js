import listPublishTemplate from '@/views/safety/publishtemplate/listPublishTemplate'
import detailPublishTemplate from '@/views/safety/publishtemplate/detailPublishTemplate'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'safety';

export default {children:[
    {path: `/${model}/listPublishTemplate`, name : 'listPublishTemplate', component : listPublishTemplate},
    {path: `/${model}/detailPublishTemplate/:type/:id`, name : 'detailPublishTemplate', component : detailPublishTemplate},
]}
