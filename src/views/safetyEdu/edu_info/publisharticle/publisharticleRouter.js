import listPublishArticle from './listPublishArticle'
import detailPublishArticle from './detailPublishArticle'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listPublishArticle`, name: 'listPublishArticle',label: '文章', component: listPublishArticle},
    {path: `/${model}/detailPublishArticle/:type/:id`, name: 'detailPublishArticle', label: '文章', component: detailPublishArticle},
  ]
}

