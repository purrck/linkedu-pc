import listAaSubjectGroup from './listAaSubjectGroup'
import detailAaSubjectGroup from './detailAaSubjectGroup'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'safety';

export default {children:[
    {path: `/${model}/listAaSubjectGroup`, name : 'listAaSubjectGroup', label: '账户分组',component : listAaSubjectGroup},
    {path: `/${model}/detailAaSubjectGroup/:type/:id`, name : 'detailAaSubjectGroup',label: '账户分组', component : detailAaSubjectGroup},
]}
