import listSurveyItem from './listSurveyItem'
import detailSurveyItem from './detailSurveyItem'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listSurveyItem`, name: 'listSurveyItem', component: listSurveyItem},
    {path: `/${model}/detailSurveyItem/:type/:id`, name: 'detailSurveyItem', component: detailSurveyItem},
  ]
}
