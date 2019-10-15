import listEntityApprove from './listEntityApprove'
import detailEntityApprove from './detailEntityApprove'
import entityapproveTotal from './entityapproveTotal'

const _import = require('@/router/_import');
const model = 'safety';
export default {
  children: [
    {path: `/safety/listEntityApprove`, name: 'listEntityApprove',label: '审批记录', component: listEntityApprove},
    {path: `/safety/detailEntityApprove/:type/:id`, name: 'detailEntityApprove',label: '审批记录', component: detailEntityApprove},
    {path: `/safety/entityapproveTotal`, name: 'entityapproveTotal',label: '审批统计', component: entityapproveTotal},

  ]
}
