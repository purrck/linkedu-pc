import listSchoolEvaluationTeacherPlan from './listSchoolEvaluationTeacherPlan'
import detailSchoolEvaluationTeacherPlan from './detailSchoolEvaluationTeacherPlan'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolEvaluationTeacherPlan`, name : 'listSchoolEvaluationTeacherPlan', component : listSchoolEvaluationTeacherPlan},
    {path: `/${model}/detailSchoolEvaluationTeacherPlan/:type/:id`, name : 'detailSchoolEvaluationTeacherPlan', component : detailSchoolEvaluationTeacherPlan},
  ]
}
