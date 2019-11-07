import listLostThing from './listLostThing'
import detailLostThing from './detailLostThing'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listLostThing`, name : 'listLostThing', component : listLostThing},
    {path: `/${model}/detailLostThing/:type/:id`, name : 'detailLostThing', component : detailLostThing},
  ]
}
