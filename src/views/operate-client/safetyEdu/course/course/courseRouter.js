import listCourse from './listCourse'
import detailCourse from './detailCourse'
import ListInterestClass from './ListInterestClass'
const _import = require('@/router/_import');
const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listCourseOp`, name: 'listCourseOp',label:"课程列表", component: listCourse},
    {path: `/${model}/ListInterestClass`, name: 'ListInterestClass',label:"课程列表", component: ListInterestClass},
    {path: `/${model}/detailCourseOp/:type/:id`,label:"课程", name: 'detailCourseOp', component: detailCourse},
  ]
}
