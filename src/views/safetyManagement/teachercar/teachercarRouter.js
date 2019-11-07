import listTeacherCar from './listTeacherCar'
import detailTeacherCar from './detailTeacherCar'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listTeacherCar`, name : 'listTeacherCar', component : listTeacherCar},
    {path: `/${model}/detailTeacherCar/:type/:id`, name : 'detailTeacherCar', component : detailTeacherCar},
  ]
}
