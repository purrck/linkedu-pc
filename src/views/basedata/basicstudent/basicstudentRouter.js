import listStudent from './listStudent'
import detailStudent from './detailStudent'

export default {children:[
    {path: `/basedata/listStudent`, name: `/basedata/listStudent`, label: '学生信息', component: listStudent},
    {
      path: `/basedata/detailStudent/:type/:id`,
      name: `/basedata/detailStudent/:type/:id`,
      label: '学生信息',
      component: detailStudent
    },
]}
