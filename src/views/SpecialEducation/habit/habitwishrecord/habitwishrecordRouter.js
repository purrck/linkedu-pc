import listHabitWishRecord from './listHabitWishRecord'
import detailHabitWishRecord from './detailHabitWishRecord'
const model = 'specialEdu';

export default {
  children:[
    {path: `/${model}/listHabitWishRecord`, name : 'listHabitWishRecord', component : listHabitWishRecord},
    {path: `/${model}/detailHabitWishRecord/:type/:id`, name : 'detailHabitWishRecord', component : detailHabitWishRecord},
  ]
}
