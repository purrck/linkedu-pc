import listAaResources from '@/views/basedata/aaresources/listAaResources'
import detailAaResources from '@/views/basedata/aaresources/detailAaResources'
const model = 'basedata';

export default {children:[
    {path: `/${model}/listAaResources`, name : 'listAaResources',label: '用户资源', component : listAaResources},
    {path: `/${model}/detailAaResources/:type/:id`, name : 'detailAaResources',label: '用户资源', component : detailAaResources},
]}
