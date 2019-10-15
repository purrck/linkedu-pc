import listAppRelatedContent from '@/views/basedata/apprelatedcontent/listAppRelatedContent'
import detailAppRelatedContent from '@/views/basedata/apprelatedcontent/detailAppRelatedContent'

const _import = require('@/router/_import');
const model = 'basedata';

export default {
  children: [
    {path: `/${model}/listAppRelatedContent`, name: 'listAppRelatedContent',label: '应用相关文案', component: listAppRelatedContent},
    {
      path: `/${model}/detailAppRelatedContent/:type/:id`,
      name: 'detailAppRelatedContent',
      label: '应用相关文案',
      component: detailAppRelatedContent
    },
  ]
}
