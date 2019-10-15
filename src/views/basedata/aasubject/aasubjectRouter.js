import listAaSubject from '@/views/basedata/aasubject/listAaSubject'
import detailAaSubject from '@/views/basedata/aasubject/detailAaSubject'
const model = 'basedata';

export default {children:[
    {path: `/${model}/listAaSubject`, name : 'listAaSubject', label: '账户信息', component : listAaSubject},
    {path: `/${model}/detailAaSubject/:type/:id`, name : 'detailAaSubject', label: '账户信息', component : detailAaSubject},
]}
