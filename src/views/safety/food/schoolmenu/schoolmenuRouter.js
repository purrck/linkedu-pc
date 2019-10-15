import listSchoolMenu from './listSchoolMenu'
import detailSchoolMenu from './detailSchoolMenu'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listSchoolMenu`, name : 'listSchoolMenu', label:'学校菜谱', component : listSchoolMenu},
    {path: `/${model}/detailSchoolMenu/:type/:id`, name : 'detailSchoolMenu', label:'学校菜谱', component : detailSchoolMenu},
  ]
}
