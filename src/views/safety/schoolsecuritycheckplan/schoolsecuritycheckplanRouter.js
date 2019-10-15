import listSchoolSecurityCheckPlan from './listSchoolSecurityCheckPlan'
import detailSchoolSecurityCheckPlan from './detailSchoolSecurityCheckPlan'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listSchoolSecurityCheckPlan`,label:"计划管理", name: 'listSchoolSecurityCheckPlan', component: listSchoolSecurityCheckPlan},
    {path: `/${model}/detailSchoolSecurityCheckPlan/:type/:id`,label:"计划管理", name: 'detailSchoolSecurityCheckPlan', component: detailSchoolSecurityCheckPlan},
  ]
}
