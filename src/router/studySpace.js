import Layout from '@/components/container/index'
import personalstudyspaceRouter from "../views/newApplications/studySpace/personalstudyspace/personalstudyspaceRouter";
import personalstudyspacefollowRouter
  from "../views/newApplications/studySpace/personalstudyspacefollow/personalstudyspacefollowRouter";
import personalarticlerecommendRouter
  from "../views/newApplications/studySpace/personalarticlerecommend/personalarticlerecommendRouter";
import personalarticleRouter from "../views/newApplications/studySpace/personalarticle/personalarticleRouter";
const model = 'newApplications'
const _import = require('./_import')
export default[
  {
    path: '/studySpace',
    component: Layout,
    children:[
      ...personalstudyspaceRouter.children,
      ...personalstudyspacefollowRouter.children,
      ...personalarticlerecommendRouter.children,
      ...personalarticleRouter.children,
    ]
  }
]
