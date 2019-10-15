import listTeacher from './listTeacher'
import detailTeacher from './detailTeacher'

export default {children:[
    {path: `/basedata/listTeacher`, name: `/basedata/listTeacher`, label: '老师信息', component: listTeacher},
    {
      path: `/basedata/detailTeacher/:type/:id`,
      name: `/basedata/detailTeacher/:type/:id`,
      label: '老师信息',
      component: detailTeacher
    },
]}
