import listCourseClassUser from './listCourseClassUser'
import detailCourseClassUser from './detailCourseClassUser'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listCourseClassUser`, name: 'listCourseClassUser', component: listCourseClassUser},
    {path: `/${model}/detailCourseClassUser/:type/:id`, name: 'detailCourseClassUser', component: detailCourseClassUser},
  ]
}
