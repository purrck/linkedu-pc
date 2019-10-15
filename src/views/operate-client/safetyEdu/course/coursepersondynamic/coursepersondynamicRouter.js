import listCoursePersonDynamic from './listCoursePersonDynamic'
import detailCoursePersonDynamic from './detailCoursePersonDynamic'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listCoursePersonDynamic`, name: 'listCoursePersonDynamic', component: listCoursePersonDynamic},
    {path: `/${model}/detailCoursePersonDynamic/:type/:id`, name: 'detailCoursePersonDynamic', component: detailCoursePersonDynamic},
  ]
}
