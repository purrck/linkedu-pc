import listSchoolBeonduty from './listSchoolBeonduty'
import detailSchoolBeonduty from './detailSchoolBeonduty'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolBeonduty`, name : 'listSchoolBeonduty', component : listSchoolBeonduty},
    {path: `/${model}/detailSchoolBeonduty/:type/:id`, name : 'detailSchoolBeonduty', component : detailSchoolBeonduty},
  ]
}
