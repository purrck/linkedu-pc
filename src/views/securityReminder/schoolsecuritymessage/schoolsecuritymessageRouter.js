import listSchoolSecurityMessage from './listSchoolSecurityMessage'
import detailSchoolSecurityMessage from './detailSchoolSecurityMessage'
const model = 'securityReminder';

export default {
  children:[
    {path: `/${model}/listSchoolSecurityMessage`, name : 'listSchoolSecurityMessage', component : listSchoolSecurityMessage},
    {path: `/${model}/detailSchoolSecurityMessage/:type/:id`, name : 'detailSchoolSecurityMessage', component : detailSchoolSecurityMessage},
  ]
}
