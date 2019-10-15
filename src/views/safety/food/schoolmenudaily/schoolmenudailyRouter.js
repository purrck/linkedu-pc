import listSchoolMenuDaily from './listSchoolMenuDaily'
import detailSchoolMenuDaily from './detailSchoolMenuDaily'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listSchoolMenuDaily`, name : 'listSchoolMenuDaily', label:'每日菜谱', component : listSchoolMenuDaily},
    {path: `/${model}/detailSchoolMenuDaily/:type/:id`, name : 'detailSchoolMenuDaily', label:'每日菜谱', component : detailSchoolMenuDaily},
  ]
}
