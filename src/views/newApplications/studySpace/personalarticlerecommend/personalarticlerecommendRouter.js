import listPersonalArticleRecommend from './listPersonalArticleRecommend'
import detailPersonalArticleRecommend from './detailPersonalArticleRecommend'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listPersonalArticleRecommend`, name : 'listPersonalArticleRecommend', component : listPersonalArticleRecommend},
    {path: `/${model}/detailPersonalArticleRecommend/:type/:id`, name : 'detailPersonalArticleRecommend', component : detailPersonalArticleRecommend},
  ]
}
