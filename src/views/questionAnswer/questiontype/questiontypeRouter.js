import listQuestionType from './listQuestionType'
import detailQuestionType from './detailQuestionType'
const model = 'questionAnswer';

export default {
  children:[
    {path: `/${model}/listQuestionType`, name : 'listQuestionType', component : listQuestionType},
    {path: `/${model}/detailQuestionType/:type/:id`, name : 'detailQuestionType', component : detailQuestionType},
  ]
}
