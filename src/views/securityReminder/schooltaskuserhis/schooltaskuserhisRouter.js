import listSchoolTaskUserHis from './listSchoolTaskUserHis'
import detailSchoolTaskUserHis from './detailSchoolTaskUserHis'
const model = 'securityReminder';

export default {
  children:[
    {path: `/${model}/listSchoolTaskUserHis`, name : 'listSchoolTaskUserHis', component : listSchoolTaskUserHis},
    {path: `/${model}/detailSchoolTaskUserHis/:type/:id`, name : 'detailSchoolTaskUserHis', component : detailSchoolTaskUserHis},
  ]
}
