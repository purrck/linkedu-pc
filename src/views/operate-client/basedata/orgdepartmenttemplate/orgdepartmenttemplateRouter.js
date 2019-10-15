import listDepartTemplate from './listDepartTemplate'
import detailDepartTemplate from './detailDepartTemplate'

export default {
  children: [
    {
      path: '/basedata/listDepartTemplate',
      name: '/basedata/listDepartTemplate',
      label: '机构部门模板',
      component: listDepartTemplate
    },
    {
      path: '/basedata/detailDepartTemplate/:type/:id',
      name: '/basedata/detailDepartTemplate/:type/:id',
      label: '机构部门模板',
      component: detailDepartTemplate
    },
  ]
}
