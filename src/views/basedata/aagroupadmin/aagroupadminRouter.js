import listAaGroupAdmin from '@/views/basedata/aagroupadmin/listAaGroupAdmin'
import detailAaGroupAdmin from '@/views/basedata/aagroupadmin/detailAaGroupAdmin'
const model = 'basedata';

export default {children:[
    {path: `/${model}/listAaGroupAdmin`, name : 'listAaGroupAdmin', label: '用户群组管理员', component : listAaGroupAdmin},
    {path: `/${model}/detailAaGroupAdmin/:type/:id`, name : 'detailAaGroupAdmin', label: '用户群组管理员', component : detailAaGroupAdmin},
]}
