import listStudentMenuDaily from './listStudentMenuDaily'
import detailStudentMenuDaily from './detailStudentMenuDaily'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listStudentMenuDaily`, name : 'listStudentMenuDaily', component : listStudentMenuDaily},
    {path: `/${model}/detailStudentMenuDaily/:type/:id`, name : 'detailStudentMenuDaily', component : detailStudentMenuDaily},
  ]
}
