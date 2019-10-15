import listAaResRes from '@/views/basedata/aaresres/listAaResRes'
import detailAaResRes from '@/views/basedata/aaresres/detailAaResRes'
const model = 'basedata';

export default {children:[
    {path: `/${model}/listAaResRes`, name : 'listAaResRes',label: '资源目录', component : listAaResRes},
    {path: `/${model}/detailAaResRes/:type/:id`, name : 'detailAaResRes',label: '资源目录', component : detailAaResRes},
]}
