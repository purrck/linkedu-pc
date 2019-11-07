import listStudentGroupSet from './listStudentGroupSet'
import detailStudentGroupSet from './detailStudentGroupSet'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listStudentGroupSet`, name : 'listStudentGroupSet', component : listStudentGroupSet},
    {path: `/${model}/detailStudentGroupSet/:type/:id`, name : 'detailStudentGroupSet', component : detailStudentGroupSet},
  ]
}
