import listInterestCourseClassStudent from './listInterestCourseClassStudent'
import detailInterestCourseClassStudent from './detailInterestCourseClassStudent'
const model = 'SpecialEducation';

export default {
  children:[
    {path: `/${model}/listInterestCourseClassStudent`, name : 'listInterestCourseClassStudent',label : '学生', component : listInterestCourseClassStudent},
    {path: `/${model}/detailInterestCourseClassStudent/:type/:id`, name : 'detailInterestCourseClassStudent',label : '学生', component : detailInterestCourseClassStudent},
  ]
}
