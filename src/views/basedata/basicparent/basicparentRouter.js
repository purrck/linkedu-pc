import listParent from './listParent'
import detailParent from './detailParent'

const model = 'basedata';

export default {
  children: [
    {path: `/basedata/listParent`, name: `/basedata/listParent`, label: '家长信息', component: listParent},
    {
      path: `/basedata/detailParent/:type/:id`,
      name: `/basedata/detailParent/:type/:id`,
      label: '家长信息',
      component: detailParent
    },
  ]
}
