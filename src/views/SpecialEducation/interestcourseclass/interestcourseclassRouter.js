import listInterestCourseClass from './listInterestCourseClass'
import detailInterestCourseClass from './detailInterestCourseClass'
const model = 'SpecialEducation';

export default {
  children:[
    {path: `/${model}/listInterestCourseClass`, name : 'listInterestCourseClass',label : '', component : listInterestCourseClass},
    {path: `/${model}/detailInterestCourseClass/:type/:id`, name : 'detailInterestCourseClass',label : '', component : detailInterestCourseClass},
  ]
}
