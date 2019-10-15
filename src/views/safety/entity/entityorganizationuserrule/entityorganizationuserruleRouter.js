import listEntityOrganizationUserRule from './listEntityOrganizationUserRule'
import detailEntityOrganizationUserRule from './detailEntityOrganizationUserRule'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'safety';
export default {children:[
    {path: `/safety/listEntityOrganizationUserRule`, name: 'listEntityOrganizationUserRule', label: '安全教育组织用户规则', component: listEntityOrganizationUserRule},
    {path: `/safety/detailEntityOrganizationUserRule/:type/:id`, name: 'detailEntityOrganizationUserRule', label: '安全教育组织用户规则', component: detailEntityOrganizationUserRule},
  ]}
