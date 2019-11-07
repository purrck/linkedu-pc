import listSchoolTaskUserHis from './listSchoolTaskUserHis'
import detailSchoolTaskUserHis from './detailSchoolTaskUserHis'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listSchoolTaskUserHis`, name : 'listSchoolTaskUserHis', component : listSchoolTaskUserHis},
    {path: `/${model}/detailSchoolTaskUserHis/:type/:id`, name : 'detailSchoolTaskUserHis', component : detailSchoolTaskUserHis},
  ]
}
