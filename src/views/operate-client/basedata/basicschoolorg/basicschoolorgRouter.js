import listBasicSchoolOrgV2 from './listBasicSchoolOrg'
import detailBasicSchoolOrgV2 from './detailBasicSchoolOrg'
const model = 'basedata';

export default {
  children:[
    {path: `/${model}/listBasicSchoolOrgV2`, name : 'listBasicSchoolOrg',label : '学校管理', component : listBasicSchoolOrgV2},
    {path: `/${model}/detailBasicSchoolOrgV2/:type/:id`, name : 'detailBasicSchoolOrg',label : '学校管理', component : detailBasicSchoolOrgV2},
  ]
}
