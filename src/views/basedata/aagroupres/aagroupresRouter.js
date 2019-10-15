import listAaGroupRes from '@/views/basedata/aagroupres/listAaGroupRes'
import detailAaGroupRes from '@/views/basedata/aagroupres/detailAaGroupRes'
const model = 'basedata';

export default {children:[
    {path: `/${model}/listAaGroupRes`, name : 'listAaGroupRes',label: '用户群组资源', component : listAaGroupRes},
    {path: `/${model}/detailAaGroupRes/:type/:id`, name : 'detailAaGroupRes', label: '用户群组资源',component : detailAaGroupRes},
]}
