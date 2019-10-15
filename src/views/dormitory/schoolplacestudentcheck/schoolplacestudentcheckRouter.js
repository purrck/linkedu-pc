import listSchoolPlaceStudentCheck from './listSchoolPlaceStudentCheck'
import detailSchoolPlaceStudentCheck from './detailSchoolPlaceStudentCheck'
const model = 'dormitory';

export default {
  children:[
    {path: `/${model}/listSchoolPlaceStudentCheck`, name : 'listSchoolPlaceStudentCheck',label : '出入记录', component : listSchoolPlaceStudentCheck},
    {path: `/${model}/detailSchoolPlaceStudentCheck/:type/:id`, name : 'detailSchoolPlaceStudentCheck',label : '出入记录', component : detailSchoolPlaceStudentCheck},
  ]
}
