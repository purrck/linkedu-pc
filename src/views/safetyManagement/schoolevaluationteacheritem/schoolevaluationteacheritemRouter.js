import listSchoolEvaluationTeacherItem from './listSchoolEvaluationTeacherItem'
import detailSchoolEvaluationTeacherItem from './detailSchoolEvaluationTeacherItem'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolEvaluationTeacherItem`, name : 'listSchoolEvaluationTeacherItem', component : listSchoolEvaluationTeacherItem},
    {path: `/${model}/detailSchoolEvaluationTeacherItem/:type/:id`, name : 'detailSchoolEvaluationTeacherItem', component : detailSchoolEvaluationTeacherItem},
  ]
}
