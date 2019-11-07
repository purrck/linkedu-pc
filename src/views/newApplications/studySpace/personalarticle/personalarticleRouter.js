import listPersonalArticle from './listPersonalArticle'
import detailPersonalArticle from './detailPersonalArticle'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listPersonalArticle`, name : 'listPersonalArticle', component : listPersonalArticle},
    {path: `/${model}/detailPersonalArticle/:type/:id`, name : 'detailPersonalArticle', component : detailPersonalArticle},
  ]
}
