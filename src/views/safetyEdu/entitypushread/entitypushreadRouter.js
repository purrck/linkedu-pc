import listEntityPushRead from './listEntityPushRead'
import detailEntityPushRead from './detailEntityPushRead'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listEntityPushRead`, name : 'listEntityPushRead', component : listEntityPushRead},
    {path: `/${model}/detailEntityPushRead/:type/:id`, name : 'detailEntityPushRead', component : detailEntityPushRead},
  ]
}
