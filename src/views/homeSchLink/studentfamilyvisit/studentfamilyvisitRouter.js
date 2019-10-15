import listStudentFamilyVisit from './listStudentFamilyVisit'
import detailStudentFamilyVisit from './detailStudentFamilyVisit'
const model = 'homeSchLink';

export default {
  children:[
    {path: `/${model}/listStudentFamilyVisit`, name : 'listStudentFamilyVisit',label : '家访', component : listStudentFamilyVisit},
    {path: `/${model}/detailStudentFamilyVisit/:type/:id`, name : 'detailStudentFamilyVisit',label : '家访', component : detailStudentFamilyVisit},
  ]
}
