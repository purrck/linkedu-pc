import listPublishColumn from './listPublishColumn'
import detailPublishColumn from './detailPublishColumn'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listPublishColumnOp`, name: 'listPublishColumnOp', label: '栏目', component: listPublishColumn},
    {path: `/${model}/detailPublishColumnOp/:type/:id`, name: 'detailPublishColumnOp',label: '栏目', component: detailPublishColumn},
  ]
}
