import listSchoolSecurityMessageTmp from './listSchoolSecurityMessageTmp'
import detailSchoolSecurityMessageTmp from './detailSchoolSecurityMessageTmp'
const model = 'securityReminder';

export default {
  children:[
    {path: `/${model}/listSchoolSecurityMessageTmp`, name : 'listSchoolSecurityMessageTmp', component : listSchoolSecurityMessageTmp},
    {path: `/${model}/detailSchoolSecurityMessageTmp/:type/:id`, name : 'detailSchoolSecurityMessageTmp', component : detailSchoolSecurityMessageTmp},
  ]
}
