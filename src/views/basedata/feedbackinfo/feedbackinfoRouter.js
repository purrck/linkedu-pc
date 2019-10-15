import listFeedbackinfo from './listFeedbackinfo'
import detailFeedbackinfo from './detailFeedbackinfo'

export default {children:[
    {
      path: '/basedata/listFeedbackinfo',
      name: '/basedata/listFeedbackinfo',
      label: '帮助中心',
      component: listFeedbackinfo
    },
    {
      path: '/basedata/detailFeedbackinfo/:type/:id',
      name: '/basedata/detailFeedbackinfo/:type/:id',
      label: '帮助中心',
      component: detailFeedbackinfo
    },
]}
