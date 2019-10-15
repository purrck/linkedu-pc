
import listAppWelcomeImage from '@/views/basedata/appwelcomeimage/listAppWelcomeImage'
import detailAppWelcomeImage from '@/views/basedata/appwelcomeimage/detailAppWelcomeImage'

import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'basedata';

export default {children:[
    {path: `/${model}/listAppWelcomeImage`, name : 'listAppWelcomeImage',label : '应用欢迎界面', component : listAppWelcomeImage},
    {path: `/${model}/detailAppWelcomeImage/:type/:id`, name : 'detailAppWelcomeImage',label : '应用欢迎界面', component : detailAppWelcomeImage},
]}
