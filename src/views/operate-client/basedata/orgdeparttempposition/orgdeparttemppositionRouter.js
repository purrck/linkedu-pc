import listTempPosition from './listTempPosition'
import detailTempPosition from './detailTempPosition'

export default {
  children: [
    {
      path: `/basedata/listTempPosition`,
      name: `/basedata/listTempPosition`,
      label: '部门职位模板',
      component: listTempPosition
    },
    {
      path: `/basedata/detailTempPosition/:type/:id`,
      name: `/basedata/detailTempPosition/:type/:id`,
      label: '部门职位模板',
      component: detailTempPosition
    },
  ]
}
