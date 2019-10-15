import listPublishColumnChildV2 from './listPublishColumnChild'
import detailPublishColumnChildV2 from './detailPublishColumnChild'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listPublishColumnChildOp`, name: 'listPublishColumnChildOp',label: '子栏目', component: listPublishColumnChildV2},
    {path: `/${model}/detailPublishColumnChildOp`, name: 'detailPublishColumnChildOp',label: '子栏目', component: detailPublishColumnChildV2}
  ]
}
