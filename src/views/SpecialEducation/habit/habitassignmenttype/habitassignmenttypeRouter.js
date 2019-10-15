import listHabitAssignmentType from './listHabitAssignmentType'
import detailHabitAssignmentType from './detailHabitAssignmentType'
const model = 'specialEdu';

export default {
  children:[
    {path: `/${model}/listHabitAssignmentType`, name : 'listHabitAssignmentType', component : listHabitAssignmentType},
    {path: `/${model}/detailHabitAssignmentType/:type/:id`, name : 'detailHabitAssignmentType', component : detailHabitAssignmentType},
  ]
}
