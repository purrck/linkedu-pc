import classcoursetableRouterXs from './listClassCourseTable'
import detailClassCourseTable from './detailClassCourseTable'
import courseSetting from './courseSetting'
const model = 'basedata';

export default {
  children:[
    {path: `/${model}/listClassCourseTableXs`, name : 'classcoursetableRouterXs',label: '课程表', component : classcoursetableRouterXs},
    {path: `/${model}/detailClassCourseTable/:type/:id`, name : 'detailClassCourseTable',label: '课程表', component : detailClassCourseTable},
    {path: `/${model}/courseSetting`, name : 'courseSetting',label: '排课详情', component : courseSetting},
  ]
}
