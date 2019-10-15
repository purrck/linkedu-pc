import listSurveyQnInput from './listSurveyQnInput'
import detailSurveyQnInput from './detailSurveyQnInput'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listSurveyQnInput`, name: 'listSurveyQnInput', component: listSurveyQnInput},
    {path: `/${model}/detailSurveyQnInput/:type/:id`, name: 'detailSurveyQnInput', component: detailSurveyQnInput},
  ]
}
