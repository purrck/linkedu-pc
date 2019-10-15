import listHabitWish from './listHabitWish'
import detailHabitWish from './detailHabitWish'
const model = 'specialEdu';

export default {
  children:[
    {path: `/${model}/listHabitWish`, name : 'listHabitWish', component : listHabitWish},
    {path: `/${model}/detailHabitWish/:type/:id`, name : 'detailHabitWish', component : detailHabitWish},
  ]
}
