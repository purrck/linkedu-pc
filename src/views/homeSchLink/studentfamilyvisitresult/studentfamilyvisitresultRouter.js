import listStudentFamilyVisitResult from './listStudentFamilyVisitResult'
import detailStudentFamilyVisitResult from './detailStudentFamilyVisitResult'
const model = 'homeSchLink';

export default {
  children:[
    {path: `/${model}/listStudentFamilyVisitResult`, name : 'listStudentFamilyVisitResult',label : '家访记录', component : listStudentFamilyVisitResult},
    {path: `/${model}/detailStudentFamilyVisitResult/:type/:id`, name : 'detailStudentFamilyVisitResult',label : '家访记录', component : detailStudentFamilyVisitResult},
  ]
}
