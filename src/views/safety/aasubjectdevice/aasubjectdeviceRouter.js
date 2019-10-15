import listAaSubjectDevice from './listAaSubjectDevice'
import detailAaSubjectDevice from './detailAaSubjectDevice'
const _import = require('@/router/_import');
const model = 'safety';
export default {children:[
    {path: `/safety/listAaSubjectDevice`, name: 'listAaSubjectDevice',label: '用户应用设备', component: listAaSubjectDevice},
    {path: `/safety/detailAaSubjectDevice/:type/:id`, name: 'detailAaSubjectDevice',label: '用户应用设备', component: detailAaSubjectDevice},
]}
