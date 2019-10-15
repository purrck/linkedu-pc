import listSchoolSecurityMessageUser from './listSchoolSecurityMessageUser'
import detailSchoolSecurityMessageUser from './detailSchoolSecurityMessageUser'
const model = 'securityReminder';

export default {
  children:[
    {path: `/${model}/listSchoolSecurityMessageUser`, name : 'listSchoolSecurityMessageUser', component : listSchoolSecurityMessageUser},
    {path: `/${model}/detailSchoolSecurityMessageUser/:type/:id`, name : 'detailSchoolSecurityMessageUser', component : detailSchoolSecurityMessageUser},
  ]
}
