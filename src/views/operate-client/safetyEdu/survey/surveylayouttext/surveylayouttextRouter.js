import listSurveyLayoutText from './listSurveyLayoutText'
import detailSurveyLayoutText from './detailSurveyLayoutText'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listSurveyLayoutText`, name: 'listSurveyLayoutText', component: listSurveyLayoutText},
    {path: `/${model}/detailSurveyLayoutText/:type/:id`, name: 'detailSurveyLayoutText', component: detailSurveyLayoutText},
  ]
}
