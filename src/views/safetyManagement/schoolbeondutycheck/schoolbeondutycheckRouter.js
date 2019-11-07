import listSchoolBeondutyCheck from './listSchoolBeondutyCheck'
import detailSchoolBeondutyCheck from './detailSchoolBeondutyCheck'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolBeondutyCheck`, name : 'listSchoolBeondutyCheck', component : listSchoolBeondutyCheck},
    {path: `/${model}/detailSchoolBeondutyCheck/:type/:id`, name : 'detailSchoolBeondutyCheck', component : detailSchoolBeondutyCheck},
  ]
}
