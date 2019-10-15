import listAaSubjectPhoneNum from '@/views/safety/aasubjectphonenum/listAaSubjectPhoneNum'
import detailAaSubjectPhoneNum from '@/views/safety/aasubjectphonenum/detailAaSubjectPhoneNum'

const model = 'safety';
export default {children:[
    {path: `/safety/listAaSubjectPhoneNum`, name: 'listAaSubjectPhoneNum',label: '用户手机号', component: listAaSubjectPhoneNum},
    {path: `/safety/detailAaSubjectPhoneNum/:type/:id`, name: 'detailAaSubjectPhoneNum',label: '用户手机号', component: detailAaSubjectPhoneNum},
]}
