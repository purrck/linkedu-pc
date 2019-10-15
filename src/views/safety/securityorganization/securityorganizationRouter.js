import listSecurityOrganization from './listSecurityOrganization'
import detailSecurityOrganization from './detailSecurityOrganization'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listSecurityOrganization`, name : 'listSecurityOrganization',label : '安全联防', component : listSecurityOrganization},
    {path: `/${model}/detailSecurityOrganization/:type/:id`, name : 'detailSecurityOrganization',label : '安全联防', component : detailSecurityOrganization},
  ]
}
