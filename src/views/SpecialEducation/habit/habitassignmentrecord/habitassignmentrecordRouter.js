import listHabitAssignmentRecord from './listHabitAssignmentRecord'
import detailHabitAssignmentRecord from './detailHabitAssignmentRecord'
const model = 'specialEdu';

export default {
  children:[
    {path: `/${model}/listHabitAssignmentRecord`, name : 'listHabitAssignmentRecord', component : listHabitAssignmentRecord},
    {path: `/${model}/detailHabitAssignmentRecord/:type/:id`, name : 'detailHabitAssignmentRecord', component : detailHabitAssignmentRecord},
  ]
}
