import listOrgPosition from './listOrgPosition'
import fenpeiOrgPosition from './fenpeiPosition'
import detailOrgPosition from './detailOrgPosition'

export default {children:[
    {
      path: `/basedata/listOrgPosition`,
      name: `/basedata/listOrgPosition`,
      label: '学校部门人员',
      component: listOrgPosition
    },
    {
      path: `/basedata/fenpeiOrgPosition`,
      name: `/basedata/fenpeiOrgPosition`,
      label: '学校部门人员-分配',
      component: fenpeiOrgPosition
    },
    {
      path: `/basedata/detailOrgPosition`,
      name: `/basedata/detailOrgPosition`,
      label: '学校部门人员',
      component: detailOrgPosition
    },
]}
