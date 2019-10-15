import listClassBestWork from './listClassBestWork'
import detailClassBestWork from './detailClassBestWork'
const model = 'homeSchLink';

export default {
  children:[
    {path: `/${model}/listClassBestWork`, name : 'listClassBestWork', component : listClassBestWork},
    {path: `/${model}/detailClassBestWork/:type/:id`, name : 'detailClassBestWork', component : detailClassBestWork},
  ]
}
