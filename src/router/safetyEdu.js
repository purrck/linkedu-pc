import Layout from '@/components/container/index'
//safetyEdu
import publisharticleRouter from '@/views/safetyEdu/edu_info/publisharticle/publisharticleRouter'
import entitypushreadRouter from '@/views/safetyEdu/entitypushread/entitypushreadRouter'
// TODO 课程-校园
import schcoolCourseRouter from "../views/safetyEdu/schoolcourse/schcoolCourseRouter";
// TODO 活动-校园
import activityinfoRouter from '../views/safetyEdu/edu_activity/activityinfoRouter'
// TODO 问卷-校园
import surveymasterRouter from  "@/views/safetyEdu/surveymaster/surveymasterRouter"
import publishcolumnChildRouter from "../views/safetyEdu/edu_info/publishcolumnChild/publishcolumnChildRouter";
import publishcolumnRouter from "../views/safetyEdu/edu_info/publishcolumn/publishcolumnRouter";

const model = 'safetyEdu';
const _import = require('./_import')
export  default [
  {
    path: '/safetyEdu',
    component: Layout,
    children: [
      ...schcoolCourseRouter.children,
      ...activityinfoRouter.children,
      ...surveymasterRouter.children,
      ...publisharticleRouter.children,
      ...publishcolumnChildRouter.children,
      ...publishcolumnRouter.children,
      ...entitypushreadRouter.children,

    ]
  },
]
