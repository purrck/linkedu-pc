import listSchoolStudentIllness from './listSchoolStudentIllness'
import detailSchoolStudentIllness from './detailSchoolStudentIllness'
const model = 'newApplications';

export default [
    {path: `/${model}/listSchoolStudentIllness`, name : 'listSchoolStudentIllness', component : listSchoolStudentIllness},
    {path: `/${model}/detailSchoolStudentIllness/:type/:id`, name : 'detailSchoolStudentIllness', component : detailSchoolStudentIllness},
  ]
