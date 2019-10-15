import listCourseResource from './listCourseResource'
import detailCourseResource from './detailCourseResource'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listCourseResource`, name: 'listCourseResource', component: listCourseResource},
    {path: `/${model}/detailCourseResource/:type/:id`, name: 'detailCourseResource', component: detailCourseResource},
  ]
}
