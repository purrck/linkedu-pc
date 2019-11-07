import listQuestionTag from './listQuestionTag'
import detailQuestionTag from './detailQuestionTag'
const model = 'questionAnswer';

export default {
  children:[
    {path: `/${model}/listQuestionTag`, name : 'listQuestionTag', component : listQuestionTag},
    {path: `/${model}/detailQuestionTag/:type/:id`, name : 'detailQuestionTag', component : detailQuestionTag},
  ]
}
