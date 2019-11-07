import listQuestionInfo from './listQuestionInfo'
import detailQuestionInfo from './detailQuestionInfo'
const model = 'questionAnswer';

export default {
  children:[
    {path: `/${model}/listQuestionInfo`, name : 'listQuestionInfo', component : listQuestionInfo},
    {path: `/${model}/detailQuestionInfo/:type/:id`, name : 'detailQuestionInfo', component : detailQuestionInfo},
  ]
}
