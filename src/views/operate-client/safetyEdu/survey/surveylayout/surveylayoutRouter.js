import listSurveyLayout from './listSurveyLayout'
import detailSurveyLayout from './detailSurveyLayout'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listSurveyLayout`, name: 'listSurveyLayout', component: listSurveyLayout},
    {path: `/${model}/detailSurveyLayout/:type/:id`, name: 'detailSurveyLayout', component: detailSurveyLayout},
  ]
}
