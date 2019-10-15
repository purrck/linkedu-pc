import detailAaSubjectExtrafieldHis from './detailAaSubjectExtrafieldHis'
import listAaSubjectExtrafieldHis from './listAaSubjectExtrafieldHis'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listItemTest`, name : 'listItemTest',label: '用户其他信息历史', component : detailAaSubjectExtrafieldHis},
    {path: `/${model}/detailItemTest/:type/:id`, name : 'detailItemTest',label: '用户其他信息历史', component : listAaSubjectExtrafieldHis},
  ]
}
