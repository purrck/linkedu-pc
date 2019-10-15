import listInterestCourseClassStudentCheck from './listInterestCourseClassStudentCheck'
import detailInterestCourseClassStudentCheck from './detailInterestCourseClassStudentCheck'
const model = 'SpecialEducation';

export default {
  children:[
    {path: `/${model}/listInterestCourseClassStudentCheck`, name : 'listInterestCourseClassStudentCheck',label : '考勤', component : listInterestCourseClassStudentCheck},
    {path: `/${model}/detailInterestCourseClassStudentCheck/:type/:id`, name : 'detailInterestCourseClassStudentCheck',label : '考勤', component : detailInterestCourseClassStudentCheck},
  ]
}
