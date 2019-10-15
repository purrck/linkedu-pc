import listEntityOrganizationUser from './listEntityOrganizationUser'
import detailEntityOrganizationUser from './detailEntityOrganizationUser'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'safety';
export default {children:[
    {path: `/safety/listEntityOrganizationUser`, name: 'listEntityOrganizationUser', label: '安全教育组织用户', component: listEntityOrganizationUser},
    {path: `/safety/detailEntityOrganizationUser/:type/:id`, name: 'detailEntityOrganizationUser', label: '安全教育组织用户', component: detailEntityOrganizationUser},
  ]}
