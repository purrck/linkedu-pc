import listSchoolEpidemicSituationTeacher from './listSchoolEpidemicSituationTeacher'
import detailSchoolEpidemicSituationTeacher from './detailSchoolEpidemicSituationTeacher'
const model = 'newApplications';

export default [
    {path: `/${model}/listSchoolEpidemicSituationTeacher`, name : 'listSchoolEpidemicSituationTeacher', component : listSchoolEpidemicSituationTeacher},
    {path: `/${model}/detailSchoolEpidemicSituationTeacher/:type/:id`, name : 'detailSchoolEpidemicSituationTeacher', component : detailSchoolEpidemicSituationTeacher},
  ]
