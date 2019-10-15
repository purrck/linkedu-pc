import listSurveyQnChoiceOption from './listSurveyQnChoiceOption'
import detailSurveyQnChoiceOption from './detailSurveyQnChoiceOption'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listSurveyQnChoiceOption`, name: 'listSurveyQnChoiceOption', component: listSurveyQnChoiceOption},
    {path: `/${model}/detailSurveyQnChoiceOption/:type/:id`, name: 'detailSurveyQnChoiceOption', component: detailSurveyQnChoiceOption},
  ]
}
