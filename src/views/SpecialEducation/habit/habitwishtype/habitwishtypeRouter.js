import listHabitWishType from './listHabitWishType'
import detailHabitWishType from './detailHabitWishType'
const model = 'specialEdu';

export default {
  children:[
    {path: `/${model}/listHabitWishType`, name : 'listHabitWishType', component : listHabitWishType},
    {path: `/${model}/detailHabitWishType/:type/:id`, name : 'detailHabitWishType', component : detailHabitWishType},
  ]
}
