import listSurveyQnChoice from './listSurveyQnChoice'
import detailSurveyQnChoice from './detailSurveyQnChoice'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listSurveyQnChoice`, name: 'listSurveyQnChoice', component: listSurveyQnChoice},
    {path: `/${model}/detailSurveyQnChoice/:type/:id`, name: 'detailSurveyQnChoice', component: detailSurveyQnChoice},
  ]
}
