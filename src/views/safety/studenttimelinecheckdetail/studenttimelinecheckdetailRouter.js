import listStudentTimelineCheckDetail from './listStudentTimelineCheckDetail'
import detailStudentTimelineCheckDetail from './detailStudentTimelineCheckDetail'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listStudentTimelineCheckDetail`, name : 'listStudentTimelineCheckDetail',label : '学生考勤明细', component : listStudentTimelineCheckDetail},
    {path: `/${model}/detailStudentTimelineCheckDetail/:type/:id`, name : 'detailStudentTimelineCheckDetail',label : '学生考勤明细', component : detailStudentTimelineCheckDetail},
  ]
}
