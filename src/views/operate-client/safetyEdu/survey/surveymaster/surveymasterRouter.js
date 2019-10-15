import listSurveyMaster from './listSurveyMaster'
import detailSurveyMaster from './detailSurveyMaster'
import editSurveyMaster from './editSurveyMaster'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listSurveyMasterOp`, name: 'listSurveyMasterOp',label: '问卷管理', component: listSurveyMaster},
    {path: `/${model}/editSurveyMasterOp/:id`, name: 'editSurveyMasterOp',label: '问卷发布', component: editSurveyMaster},
    {path: `/${model}/detailSurveyMasterOp/:type/:id`, name: 'detailSurveyMasterOp',label: '问卷发布', component: detailSurveyMaster},
  ]
}
