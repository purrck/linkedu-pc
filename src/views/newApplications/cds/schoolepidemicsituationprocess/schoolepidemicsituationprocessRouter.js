import listSchoolEpidemicSituationProcess from './listSchoolEpidemicSituationProcess'
import detailSchoolEpidemicSituationProcess from './detailSchoolEpidemicSituationProcess'
const model = 'newApplications';

export default [
    {path: `/${model}/listSchoolEpidemicSituationProcess`, name : 'listSchoolEpidemicSituationProcess', component : listSchoolEpidemicSituationProcess},
    {path: `/${model}/detailSchoolEpidemicSituationProcess/:type/:id`, name : 'detailSchoolEpidemicSituationProcess', component : detailSchoolEpidemicSituationProcess},
  ]
