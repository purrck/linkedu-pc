import listSurveyAnsMaster from './listSurveyAnsMaster'
import detailSurveyAnsMaster from './detailSurveyAnsMaster'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listSurveyAnsMaster`, name: 'listSurveyAnsMaster', component: listSurveyAnsMaster},
    {path: `/${model}/detailSurveyAnsMaster/:type/:id`, name: 'detailSurveyAnsMaster', component: detailSurveyAnsMaster},
  ]
}
