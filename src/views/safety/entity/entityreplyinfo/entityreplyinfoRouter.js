import listEntityReplyinfo from './listEntityReplyinfo'
import detailEntityReplyinfo from './detailEntityReplyinfo'
import entityreplyinfoTotal from './entityreplyinfoTotal'

const _import = require('@/router/_import');
const model = 'safety';
export default {
  children: [
    {path: `/${model}/listEntityReplyinfo`, name: 'listEntityReplyinfo', label: '信息评论', component: listEntityReplyinfo},
    {
      path: `/${model}/detailEntityReplyinfo/:type/:id`,
      name: 'detailEntityReplyinfo',
      label: '信息评论',
      component: detailEntityReplyinfo
    },
    {
      path: `/safety/entityreplyinfoTotal`,
      name: 'entityreplyinfoTotal',
      label: '信息评论统计',
      component: entityreplyinfoTotal
    },

  ]
}
