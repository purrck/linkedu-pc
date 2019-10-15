import listStudentLeaveOrq from './listStudentLeaveOrq'
import listStudentLeave from './listStudentLeave'
import detailStudentLeave from './detailStudentLeave'

export default {
  children: [
    {path: '/safety/listStudentLeave', name: 'listStudentLeave',label: '请假记录', component: listStudentLeave},
    {path: '/safety/listStudentLeaveOrq', name: 'listStudentLeaveOrq',label: '销假记录', component: listStudentLeaveOrq},
    {path: '/safety/detailStudentLeave/:type/:id', name: 'detailStudentLeave',label: '记录', component: detailStudentLeave}
  ]
}
