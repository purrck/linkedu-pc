import listSchoolSecurityCheckRoute from './listSchoolSecurityCheckRoute'
import detailSchoolSecurityCheckRoute from './detailSchoolSecurityCheckRoute'
const model = 'safety'

export default {
  children: [
    {path: `/${model}/listSchoolSecurityCheckRoute`, name: 'listSchoolSecurityCheckRoute', label:'巡检路线',component: listSchoolSecurityCheckRoute},
    {path: `/${model}/detailSchoolSecurityCheckRoute/:type/:id`, name: 'detailSchoolSecurityCheckRoute', label:'巡检路线', component: detailSchoolSecurityCheckRoute},
  ]
}

