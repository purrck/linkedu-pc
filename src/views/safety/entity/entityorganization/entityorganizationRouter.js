import listEntityOrganization from './listEntityOrganization'
import detailEntityOrganization from './detailEntityOrganization'
import listEntityOrganizationRange from './listEntityOrganizationRange'
import entityOrganizationObject from './entityOrganizationObject'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'safety';
export default {children:[
    {path: `/safety/listEntityOrganization/:type`, name: 'listEntityOrganization', label: '安全教育组织', component: listEntityOrganization},
    {path: `/safety/detailEntityOrganization/:type/:id`, name: 'detailEntityOrganization', label: '安全教育组织', component: detailEntityOrganization},
    {path: `/safety/listEntityOrganizationRange/:id`, name: 'listEntityOrganizationRange', label: '安全教育组织用户规则', component: listEntityOrganizationRange},
    {path: `/safety/listEntityOrganizationObject/:id`, name: 'listEntityOrganizationObject', label: '发送对象', component: entityOrganizationObject},
  ]}
