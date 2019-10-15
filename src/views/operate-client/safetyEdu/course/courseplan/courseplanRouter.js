import listCoursePlan from './listCoursePlan'
import detailCoursePlan from './detailCoursePlan'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listCoursePlan`, name: 'listCoursePlan', component: listCoursePlan},
    {path: `/${model}/detailCoursePlan/:type/:id`, name: 'detailCoursePlan', component: detailCoursePlan},
  ]
}
