import listSchoolEpidemicSituation from './listSchoolEpidemicSituation'
import detailSchoolEpidemicSituation from './detailSchoolEpidemicSituation'
const model = 'newApplications';

export default [
    {path: `/${model}/listSchoolEpidemicSituation`, name : 'listSchoolEpidemicSituation', component : listSchoolEpidemicSituation},
    {path: `/${model}/detailSchoolEpidemicSituation/:type/:id`, name : 'detailSchoolEpidemicSituation', component : detailSchoolEpidemicSituation},
  ]
