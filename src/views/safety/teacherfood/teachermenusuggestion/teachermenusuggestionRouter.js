import listTeacherMenuSuggestion from './listTeacherMenuSuggestion'
import detailTeacherMenuSuggestion from './detailTeacherMenuSuggestion'
const model = 'safety';

export default {
  children:[
    {path: `/${model}/listTeacherMenuSuggestion`, name : 'listTeacherMenuSuggestion', component : listTeacherMenuSuggestion},
    {path: `/${model}/detailTeacherMenuSuggestion/:type/:id`, name : 'detailTeacherMenuSuggestion', component : detailTeacherMenuSuggestion},
  ]
}
