import listSchoolTaskUser from './listSchoolTaskUser'
import detailSchoolTaskUser from './detailSchoolTaskUser'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listSchoolTaskUser`, name : 'listSchoolTaskUser', component : listSchoolTaskUser},
    {path: `/${model}/detailSchoolTaskUser/:type/:id`, name : 'detailSchoolTaskUser', component : detailSchoolTaskUser},
  ]
}
