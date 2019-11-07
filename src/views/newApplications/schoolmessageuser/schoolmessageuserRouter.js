import listSchoolMessageUser from './listSchoolMessageUser'
import detailSchoolMessageUser from './detailSchoolMessageUser'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/detailSchoolMessageUser/:type/:id`, name : 'detailSchoolMessageUser', component : detailSchoolMessageUser},
    {path: `/${model}/listSchoolMessageUser`, name : 'listSchoolMessageUser', component : listSchoolMessageUser},
  ]
}
