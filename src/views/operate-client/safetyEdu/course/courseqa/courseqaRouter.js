import listCourseQa from './listCourseQa'
import detailCourseQa from './detailCourseQa'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listCourseQa`, name: 'listCourseQa', component: listCourseQa},
    {path: `/${model}/detailCourseQa/:type/:id`, name: 'detailCourseQa', component: detailCourseQa},
  ]
}
