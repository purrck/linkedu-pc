import listHabitFlowerHistory from './listHabitFlowerHistory'
import detailHabitFlowerHistory from './detailHabitFlowerHistory'
const model = 'specialEdu';

export default {
  children:[
    {path: `/${model}/listHabitFlowerHistory`, name : 'listHabitFlowerHistory', component : listHabitFlowerHistory},
    {path: `/${model}/detailHabitFlowerHistory/:type/:id`, name : 'detailHabitFlowerHistory', component : detailHabitFlowerHistory},
  ]
}
