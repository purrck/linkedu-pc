import index from '@/views/index'
import login from '@/views/login/login'
import Layout from '@/components/container/index'
import listStatisticsJobs from '@/views/admin/statisticsjobs/listStatisticsJobs'
import detailStatisticsJobs from '@/views/admin/statisticsjobs/detailStatisticsJobs'
import listStatisticsResults from '@/views/admin/statisticsresults/listStatisticsResults'
import detailStatisticsResults from '@/views/admin/statisticsresults/detailStatisticsResults'
import listSystemSearchKeyword2user from '@/views/admin/systemsearchkeyword2user/listSystemSearchKeyword2user'
import detailSystemSearchKeyword2user from '@/views/admin/systemsearchkeyword2user/detailSystemSearchKeyword2user'
import listSystemSearchKeyword from '@/views/admin/systemsearchkeyword/listSystemSearchKeyword'
import detailSystemSearchKeyword from '@/views/admin/systemsearchkeyword/detailSystemSearchKeyword'
import bootPage from '@/views/bootpage/main'
import installApp from '@/views/installApp/main'

import example from '@/views/example/main'
import analysispointRouter from "../views/admin/analysispoint/analysispointRouter";
import analysispointgroupRouter from "../views/admin/analysispointgroup/analysispointgroupRouter";
import analysispointinfoRouter from "../views/admin/analysispointinfo/analysispointinfoRouter";
import noFound from "../components/error-page/404";

export default [
  {
    path: '*',
    redirect: '/404',
    hidden: true
  },
  {
    path: '/404',
    name: '404',
    component: noFound
  },
  {
    path: '/',
    name: '/',
    redirect: '/page/wel'
  },
  {
    path: '/bootPage',
    name : "bootPage",    //引导页
    component : bootPage
  },
  {
    path: '/example',
    name : "example",    //实例文档页
    label : "例子",    //实例文档页
    component : example
  },
  {
    path: '/installApp',
    name : "installApp",    //安装页
    component : installApp
  },
  {
    path: '/login',
    name: 'login',
    label: '登录',
    component: login
  },
  {
    path: '/page',
    component: Layout,
    children: [
      {
      path: '/page/wel',
      name: 'index',
      label: '首页',
      component: index,
    },]
  },
  {
    path: '/admin',
    component: Layout,
    children: [
      ...analysispointRouter.children,
      ...analysispointgroupRouter.children,
      ...analysispointinfoRouter.children,
      {path: `/admin/listStatisticsResults`, name : '/admin/listStatisticsResults',label : '统计任务结果', component : listStatisticsResults},
      {path: `/admin/detailStatisticsResults/:type/:id`, name : '/admin/detailStatisticsResults',label : '统计任务结果', component : detailStatisticsResults},
      {path: `/admin/listStatisticsJobs`, name : '/admin/listStatisticsJobs',label : '统计任务', component : listStatisticsJobs},
      {path: `/admin/detailStatisticsJobs/:type/:id`, name : '/admin/detailStatisticsJobs/',label : '统计任务', component : detailStatisticsJobs},
      {path: `/admin/listSystemSearchKeyword2user`, name : '/admin/listSystemSearchKeyword2user', label : '系统关键字用户检索记录', component : listSystemSearchKeyword2user},
      {path: `/admin/detailSystemSearchKeyword2user/:type/:id`, name : '/admin/detailSystemSearchKeyword2user',label : '系统关键字用户检索记录', component : detailSystemSearchKeyword2user},
      {path: `/admin/listSystemSearchKeyword`, name : 'listSystemSearchKeyword',label : '/admin/listSystemSearchKeyword', component : listSystemSearchKeyword},
      {path: `/admin/detailSystemSearchKeyword/:type/:id`, name : '/admin/detailSystemSearchKeyword',label : '系统关键字', component : detailSystemSearchKeyword},
    ]
  }
]
