import listQuestionInvite from './listQuestionInvite'
import detailQuestionInvite from './detailQuestionInvite'
const model = 'questionAnswer';

export default {
  children:[
    {path: `/${model}/listQuestionInvite`, name : 'listQuestionInvite', component : listQuestionInvite},
    {path: `/${model}/detailQuestionInvite/:type/:id`, name : 'detailQuestionInvite', component : detailQuestionInvite},
  ]
}
