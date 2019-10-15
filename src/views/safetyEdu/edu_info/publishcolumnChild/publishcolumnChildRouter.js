import listPublishColumnChildV2 from './listPublishColumnChild'
import detailPublishColumnChildV2 from './detailPublishColumnChild'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listPublishColumnChild`, name: 'listPublishColumnChild',label: '子栏目', component: listPublishColumnChildV2},
    {path: `/${model}/detailPublishColumnChild`, name: 'detailPublishColumnChild',label: '子栏目', component: detailPublishColumnChildV2}
  ]
}
