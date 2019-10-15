import listAaSubjectExtrafield from './listAaSubjectExtrafield'
import detailAaSubjectExtrafield from './detailAaSubjectExtrafield'
const model = 'basedata';

export default {
  children:[
    {path: `/${model}/listAaSubjectExtrafield`, name : 'listAaSubjectExtrafield',label: '用户其他信息', component : listAaSubjectExtrafield},
    {path: `/${model}/detailAaSubjectExtrafield/:type/:id`, name : 'detailAaSubjectExtrafield',label: '用户其他信息', component : detailAaSubjectExtrafield},
  ]
}
