import listSchoolVisitRecord from './listSchoolVisitRecord'
import detailSchoolVisitRecord from './detailSchoolVisitRecord'
const model = 'dormitory';

export default {
  children:[
    {path: `/${model}/listSchoolVisitRecord`, name : 'listSchoolVisitRecord',label : '来访记录', component : listSchoolVisitRecord},
    {path: `/${model}/detailSchoolVisitRecord/:type/:id`, name : 'detailSchoolVisitRecord',label : '出入记录', component : detailSchoolVisitRecord},
  ]
}
