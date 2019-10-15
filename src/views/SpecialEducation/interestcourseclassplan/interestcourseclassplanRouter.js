import listInterestCourseClassPlan from './listInterestCourseClassPlan'
import detailInterestCourseClassPlan from './detailInterestCourseClassPlan'
const model = 'SpecialEducation';

export default {
  children:[
    {path: `/${model}/listInterestCourseClassPlan`, name : 'listInterestCourseClassPlan',label : '计划', component : listInterestCourseClassPlan},
    {path: `/${model}/detailInterestCourseClassPlan/:type/:id`, name : 'detailInterestCourseClassPlan', label : '计划',component : detailInterestCourseClassPlan},
  ]
}
