import listQuestionAnswer from './listQuestionAnswer'
import detailQuestionAnswer from './detailQuestionAnswer'
const model = 'questionAnswer';

export default {
  children:[
    {path: `/${model}/listQuestionAnswer`, name : 'listQuestionAnswer', component : listQuestionAnswer},
    {path: `/${model}/detailQuestionAnswer/:type/:id`, name : 'detailQuestionAnswer', component : detailQuestionAnswer},
  ]
}
