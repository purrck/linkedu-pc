import listHabitAssignment from './listHabitAssignment'
import detailHabitAssignment from './detailHabitAssignment'
const model = 'specialEdu';

export default {
  children:[
    {path: `/${model}/listHabitAssignment`, name : 'listHabitAssignment', component : listHabitAssignment},
    {path: `/${model}/detailHabitAssignment/:type/:id`, name : 'detailHabitAssignment', component : detailHabitAssignment},
  ]
}
