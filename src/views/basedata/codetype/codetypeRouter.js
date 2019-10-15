import listCodetype from './listCodetype'
import detailCodetype from './detailCodetype'

export default {
  children: [
    {path: `/basedata/listCodetype`, name: `/basedata/listCodetype`, label: '字典类型', component: listCodetype},
    {
      path: `/basedata/detailCodetype/:type/:id`,
      name: `/basedata/detailCodetype/:type/:id`,
      label: '字典类型',
      component: detailCodetype
    },
  ]
}
