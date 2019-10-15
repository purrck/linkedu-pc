import listCourseClassTeacher from './listCourseClassTeacher'
import detailCourseClassTeacher from './detailCourseClassTeacher'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listCourseClassTeacher`, name: 'listCourseClassTeacher', component: listCourseClassTeacher},
    {path: `/${model}/detailCourseClassTeacher/:type/:id`, name: 'detailCourseClassTeacher', component: detailCourseClassTeacher},
  ]
}
