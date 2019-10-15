import listCourseSurvey from './listCourseSurvey'
import detailCourseSurvey from './detailCourseSurvey'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listCourseSurvey`, name: 'listCourseSurvey', component: listCourseSurvey},
    {path: `/${model}/detailCourseSurvey/:type/:id`, name: 'detailCourseSurvey', component: detailCourseSurvey},
  ]
}
