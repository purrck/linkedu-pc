import listCodeInt from './listCodeInt'
import detailCodeInt from './detailCodeInt'

export default {
  children: [
    {path: `/basedata/listCodeInt`, name: `/basedata/listCodeInt`, label: '数据字典', component: listCodeInt},
    {
      path: `/basedata/detailCodeInt/:type/:id`,
      name: `/basedata/detailCodeInt/:type/:id`,
      label: '数据字典',
      component: detailCodeInt
    },//
  ]
}
