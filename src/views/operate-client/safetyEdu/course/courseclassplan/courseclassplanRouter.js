import listCourseClassPlan from './listCourseClassPlan'
import detailCourseClassPlan from './detailCourseClassPlan'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listCourseClassPlan`, name: 'listCourseClassPlan', component: listCourseClassPlan},
    {path: `/${model}/detailCourseClassPlan/:type/:id`, name: 'detailCourseClassPlan', component: detailCourseClassPlan},
  ]
}
