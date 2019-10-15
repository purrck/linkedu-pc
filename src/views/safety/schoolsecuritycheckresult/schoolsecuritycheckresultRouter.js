import listSchoolSecurityCheckResult from './listSchoolSecurityCheckResult'
import detailSchoolSecurityCheckResult from './detailSchoolSecurityCheckResult'
import securityTotal from './securityTotal'

const model = 'safety'
export default {
  children: [
    {path: `/${model}/securityTotal`, name: 'securityTotal', component: securityTotal},
    {path: `/${model}/listSchoolSecurityCheckResult`, name: 'listSchoolSecurityCheckResult', label:'巡检记录', component: listSchoolSecurityCheckResult},
    {path: `/${model}/detailSchoolSecurityCheckResult/:type/:id`, name: 'detailSchoolSecurityCheckResult', label:'巡检记录', component: detailSchoolSecurityCheckResult}]
}
