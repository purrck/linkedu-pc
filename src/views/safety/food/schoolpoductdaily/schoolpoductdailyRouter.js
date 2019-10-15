import listSchoolPoductDaily from './listSchoolPoductDaily'
import detailSchoolPoductDaily from './detailSchoolPoductDaily'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listSchoolPoductDaily`, name : 'listSchoolPoductDaily', label:'日常食品供应', component : listSchoolPoductDaily},
    {path: `/${model}/detailSchoolPoductDaily/:type/:id`, name : 'detailSchoolPoductDaily', label:'日常食品供应', component : detailSchoolPoductDaily},
  ]
}
