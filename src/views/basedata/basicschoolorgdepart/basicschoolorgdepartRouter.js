import listOrgDepart from './listOrgDepart'
import addOrgDepart from './addOrgDepart'
import fenpeiOrgDepart from './fenpei'
import detailOrgDepart from '@/views/basedata/basicschoolorgdepart/detailOrgDepart'

export default {
  children: [
    {path: `/basedata/listOrgDepart`,
      name: `/basedata/listOrgDepart`,
      label: '学校部门', component: listOrgDepart
    },
    {
      path: `/basedata/addOrgDepart`,
      name: `/basedata/addOrgDepart`,
      label: '批量添加学校部门',
      component: addOrgDepart
    },
    {
      path: `/basedata/detailOrgDepart/:type/:id`,
      name: `/basedata/detailOrgDepart/:type/:id`,
      label: '学校部门',
      component: detailOrgDepart
    },
    {
      path: `/basedata/orgDepartFenpei`,
      name: `/basedata/orgDepartFenpei`,
      label: '学校部门分配',
      component: fenpeiOrgDepart
    },
  ]
}
