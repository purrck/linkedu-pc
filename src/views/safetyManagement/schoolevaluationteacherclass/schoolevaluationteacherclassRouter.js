import listSchoolEvaluationTeacherClass from './listSchoolEvaluationTeacherClass'
import detailSchoolEvaluationTeacherClass from './detailSchoolEvaluationTeacherClass'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolEvaluationTeacherClass`, name : 'listSchoolEvaluationTeacherClass', component : listSchoolEvaluationTeacherClass},
    {path: `/${model}/detailSchoolEvaluationTeacherClass/:type/:id`, name : 'detailSchoolEvaluationTeacherClass', component : detailSchoolEvaluationTeacherClass},
  ]
}
