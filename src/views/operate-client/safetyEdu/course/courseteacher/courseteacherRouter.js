import listCourseTeacher from './listCourseTeacher'
import detailCourseTeacher from './detailCourseTeacher'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listCourseTeacher`, name: 'listCourseTeacher', component: listCourseTeacher},
    {path: `/${model}/detailCourseTeacher/:type/:id`, name: 'detailCourseTeacher', component: detailCourseTeacher},
  ]
}
