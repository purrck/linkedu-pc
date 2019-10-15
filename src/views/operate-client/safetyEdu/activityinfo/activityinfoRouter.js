import listActivityInfo from './listActivityInfo'
import detailActivityInfo from './detailActivityInfo'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listActivityInfoOp`, name: 'listActivityInfoOp', label:"活动列表",component: listActivityInfo},
    {path: `/${model}/detailActivityInfoOp/:type/:id`, name: 'detailActivityInfoOp',label:"活动详情", component: detailActivityInfo},
  ]
}
