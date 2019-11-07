import listSchoolTeacherCertificate from './listSchoolTeacherCertificate'
import detailSchoolTeacherCertificate from './detailSchoolTeacherCertificate'
const model = 'safetyManagement';

export default {
  children:[
    {path: `/${model}/listSchoolTeacherCertificate`, name : 'listSchoolTeacherCertificate', component : listSchoolTeacherCertificate},
    {path: `/${model}/detailSchoolTeacherCertificate/:type/:id`, name : 'detailSchoolTeacherCertificate', component : detailSchoolTeacherCertificate},
  ]
}
