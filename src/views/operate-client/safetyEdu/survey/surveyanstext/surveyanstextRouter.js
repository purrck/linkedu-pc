import listSurveyAnsText from './listSurveyAnsText'
import detailSurveyAnsText from './detailSurveyAnsText'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listSurveyAnsText`, name: 'listSurveyAnsText', component: listSurveyAnsText},
    {path: `/${model}/detailSurveyAnsText/:type/:id`, name: 'detailSurveyAnsText', component: detailSurveyAnsText},
  ]
}
