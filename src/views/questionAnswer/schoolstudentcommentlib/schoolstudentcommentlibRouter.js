import listSchoolStudentCommentLib from './listSchoolStudentCommentLib'
import detailSchoolStudentCommentLib from './detailSchoolStudentCommentLib'
const model = 'questionAnswer';

export default [
    {path: `/${model}/listSchoolStudentCommentLib`, name : 'listSchoolStudentCommentLib', component : listSchoolStudentCommentLib},
    {path: `/${model}/detailSchoolStudentCommentLib/:type/:id`, name : 'detailSchoolStudentCommentLib', component : detailSchoolStudentCommentLib},
  ]
