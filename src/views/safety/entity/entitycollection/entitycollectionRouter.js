import listEntityCollection from './listEntityCollection'
import detailEntityCollection from './detailEntityCollection'
import entitycollectionTotal from './entitycollectionTotal'

const _import = require('@/router/_import');
const model = 'safety';
export default {
  children: [
    {path: `/safety/listEntityCollection`, name: 'listEntityCollection',label: '信息收藏', component: listEntityCollection},
    {path: `/safety/detailEntityCollection/:type/:id`, name: 'detailEntityCollection',label: '信息收藏', component: detailEntityCollection},
    {path: `/safety/entitycollectionTotal`, name: 'entitycollectionTotal',label: '信息收藏统计', component: entitycollectionTotal}
  ]
}
