import listPublishColumn from './listPublishColumn'
import detailPublishColumn from './detailPublishColumn'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listPublishColumn`, name: 'listPublishColumn', label: '栏目', component: listPublishColumn},
    {path: `/${model}/detailPublishColumn/:type/:id`, name: 'detailPublishColumn',label: '栏目', component: detailPublishColumn},
  ]
}
