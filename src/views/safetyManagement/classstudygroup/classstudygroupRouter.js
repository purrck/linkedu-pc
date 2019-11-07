import listClassStudyGroup from './listClassStudyGroup'
import detailClassStudyGroup from './detailClassStudyGroup'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listClassStudyGroup`, name : 'listClassStudyGroup', component : listClassStudyGroup},
    {path: `/${model}/detailClassStudyGroup/:type/:id`, name : 'detailClassStudyGroup', component : detailClassStudyGroup},
  ]
}
