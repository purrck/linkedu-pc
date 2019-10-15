import listAaSubjectOtherLogin from './listAaSubjectOtherLogin'
import detailAaSubjectOtherLogin from './detailAaSubjectOtherLogin'

import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'safety';
export default {children:[
    {path: `/safety/listAaSubjectOtherLogin`, name: 'listAaSubjectOtherLogin',label: '用户其他平台登录账号', component: listAaSubjectOtherLogin},
    {path: `/safety/detailAaSubjectOtherLogin/:type/:id`, name: 'detailAaSubjectOtherLogin',label: '用户其他平台登录账号', component: detailAaSubjectOtherLogin},
]}
