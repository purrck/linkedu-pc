import listStudentParent from './listStudentParent'
import detailStudentParent from './detailStudentParent'

export default {
  children: [
    {
      path: `/basedata/listStudentParent`,
      name: `/basedata/listStudentParent`,
      label: '学生家长信息',
      component: listStudentParent
    },
    {
      path: `/basedata/detailStudentParent/:type/:id`,
      name: `/basedata/detailStudentParent/:type/:id`,
      label: '学生家长信息',
      component: detailStudentParent
    },
  ]
}
