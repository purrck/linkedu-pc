import listSchoolTask from './listSchoolTask'
import detailSchoolTask from './detailSchoolTask'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listSchoolTask`, name : 'listSchoolTask', component : listSchoolTask},
    {path: `/${model}/detailSchoolTask/:type/:id`, name : 'detailSchoolTask', component : detailSchoolTask},
  ]
}
