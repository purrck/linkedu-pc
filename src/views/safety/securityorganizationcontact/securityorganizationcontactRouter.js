import listSecurityOrganizationContact from './listSecurityOrganizationContact'
import detailSecurityOrganizationContact from './detailSecurityOrganizationContact'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listSecurityOrganizationContact`, name : 'listSecurityOrganizationContact',label : '机构联系人', component : listSecurityOrganizationContact},
    {path: `/${model}/detailSecurityOrganizationContact/:type/:id`, name : 'detailSecurityOrganizationContact',label : '机构联系人', component : detailSecurityOrganizationContact},
  ]
}
