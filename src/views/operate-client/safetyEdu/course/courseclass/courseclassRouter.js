import listCourseClass from './listCourseClass'
import detailCourseClass from './detailCourseClass'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listCourseClass`, name: 'listCourseClass', component: listCourseClass},
    {path: `/${model}/detailCourseClass/:type/:id`, name: 'detailCourseClass', component: detailCourseClass},
  ]
}
