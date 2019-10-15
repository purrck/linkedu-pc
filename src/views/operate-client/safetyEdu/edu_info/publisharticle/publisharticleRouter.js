import listPublishArticle from './listPublishArticle'
import detailPublishArticle from './detailPublishArticle'
import listPublishArticleTotal from './listPublishArticleTotal'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listPublishArticleOp`, name: 'listPublishArticleOp',label: '文章', component: listPublishArticle},
    {path: `/${model}/detailPublishArticleOp/:type/:id`, name: 'detailPublishArticleOp', label: '文章', component: detailPublishArticle},
    {path: `/${model}/listPublishArticleTotalOp`, name: 'listPublishArticleTotalOp', label: '统计分析', component: listPublishArticleTotal},
  ]
}

