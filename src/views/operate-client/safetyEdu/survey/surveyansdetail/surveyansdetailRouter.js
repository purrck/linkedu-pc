import listSurveyAnsDetail from './listSurveyAnsDetail'
import detailSurveyAnsDetail from './detailSurveyAnsDetail'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listSurveyAnsDetail`, name: 'listSurveyAnsDetail', component: listSurveyAnsDetail},
    {path: `/${model}/detailSurveyAnsDetail/:type/:id`, name: 'detailSurveyAnsDetail', component: detailSurveyAnsDetail},
  ]
}
