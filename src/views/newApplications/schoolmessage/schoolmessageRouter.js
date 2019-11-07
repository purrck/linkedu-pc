import listSchoolMessage from './listSchoolMessage'
import detailSchoolMessage from './detailSchoolMessage'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listSchoolMessage`, name : 'listSchoolMessage', component : listSchoolMessage},
    {path: `/${model}/detailSchoolMessage/:type/:id`, name : 'detailSchoolMessage', component : detailSchoolMessage},
  ]
}
