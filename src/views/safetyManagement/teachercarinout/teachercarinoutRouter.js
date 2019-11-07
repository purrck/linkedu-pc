import listTeacherCarInout from './listTeacherCarInout'
import detailTeacherCarInout from './detailTeacherCarInout'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listTeacherCarInout`, name : 'listTeacherCarInout', component : listTeacherCarInout},
    {path: `/${model}/detailTeacherCarInout/:type/:id`, name : 'detailTeacherCarInout', component : detailTeacherCarInout},
  ]
}
