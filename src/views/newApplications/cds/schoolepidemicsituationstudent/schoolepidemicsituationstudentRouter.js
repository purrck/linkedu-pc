import listSchoolEpidemicSituationStudent from './listSchoolEpidemicSituationStudent'
import detailSchoolEpidemicSituationStudent from './detailSchoolEpidemicSituationStudent'
const model = 'newApplications';

export default [
    {path: `/${model}/listSchoolEpidemicSituationStudent`, name : 'listSchoolEpidemicSituationStudent', component : listSchoolEpidemicSituationStudent},
    {path: `/${model}/detailSchoolEpidemicSituationStudent/:type/:id`, name : 'detailSchoolEpidemicSituationStudent', component : detailSchoolEpidemicSituationStudent},
  ]
