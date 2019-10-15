import listClassTeacher from './listClassTeacher'
import detailClassTeacher from './detailClassTeacher'
import addClassTeacher from './addClassTeacher'

export default {
  children: [
    {
      path: `/basedata/listClassTeacher`,
      name: `/basedata/listClassTeacher`,
      label: '班主任信息',
      component: listClassTeacher
    },
    {
      path: `/basedata/listClassTeacher/addClassTeacher`,
      label: '班主任信息批量新增', name: 'addClassTeacher',
      component:addClassTeacher
    },
    {
      path: `/basedata/detailClassTeacher`,
      name: `/basedata/detailClassTeacher`,
      label: '班主任信息',
      component: detailClassTeacher
    },
  ]
}
