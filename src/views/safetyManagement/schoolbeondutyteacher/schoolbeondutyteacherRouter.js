import listSchoolBeondutyTeacher from './listSchoolBeondutyTeacher'
import detailSchoolBeondutyTeacher from './detailSchoolBeondutyTeacher'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolBeondutyTeacher`, name : 'listSchoolBeondutyTeacher', component : listSchoolBeondutyTeacher},
    {path: `/${model}/detailSchoolBeondutyTeacher/:type/:id`, name : 'detailSchoolBeondutyTeacher', component : detailSchoolBeondutyTeacher},
  ]
}
