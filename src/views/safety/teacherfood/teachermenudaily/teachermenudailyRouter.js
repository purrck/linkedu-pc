import listTeacherMenuDaily from './listTeacherMenuDaily'
import detailTeacherMenuDaily from './detailTeacherMenuDaily'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listTeacherMenuDaily`, name : 'listTeacherMenuDaily', component : listTeacherMenuDaily},
    {path: `/${model}/detailTeacherMenuDaily/:type/:id`, name : 'detailTeacherMenuDaily', component : detailTeacherMenuDaily},
  ]
}
