import listStudentTimelineCheck from './listStudentTimelineCheck'
import detailStudentTimelineCheck from './detailStudentTimelineCheck'
import studentTimelineCheckTotal from './studentTimelineCheckTotal'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listStudentTimelineCheck`, name : 'listStudentTimelineCheck',label: '考勤记录', component : listStudentTimelineCheck},
    {path: `/${model}/detailStudentTimelineCheck/:type/:id`, name : 'detailStudentTimelineCheck',label: '考勤记录', component : detailStudentTimelineCheck},
    {path: `/${model}/studentTimelineCheckTotal`, name: 'studentTimelineCheckTotal',label: '学生日常考勤统计', component: studentTimelineCheckTotal},
  ]
}
