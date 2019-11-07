import listSchoolStudentBodyabnormal from './listSchoolStudentBodyabnormal'
import detailSchoolStudentBodyabnormal from './detailSchoolStudentBodyabnormal'
const model = 'newApplications';

export default [
    {path: `/${model}/listSchoolStudentBodyabnormal`, name : 'listSchoolStudentBodyabnormal', component : listSchoolStudentBodyabnormal},
    {path: `/${model}/detailSchoolStudentBodyabnormal/:type/:id`, name : 'detailSchoolStudentBodyabnormal', component : detailSchoolStudentBodyabnormal},
  ]
