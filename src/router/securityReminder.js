import Layout from '@/components/container/index_'
import lostthingRouter from "../views/securityReminder/lostthing/lostthingRouter";
import personalarticleRouter from "../views/securityReminder/personalarticle/personalarticleRouter";
import personalarticlerecommendRouter
  from "../views/securityReminder/personalarticlerecommend/personalarticlerecommendRouter";
import schoolmessageRouter from "../views/securityReminder/schoolmessage/schoolmessageRouter";
import schoolmessageuserRouter from "../views/securityReminder/schoolmessageuser/schoolmessageuserRouter";
import schoolsecuritymessageRouter from "../views/securityReminder/schoolsecuritymessage/schoolsecuritymessageRouter";
import schoolsecuritymessageuserRouter
  from "../views/securityReminder/schoolsecuritymessageuser/schoolsecuritymessageuserRouter";
import schooltaskRouter from "../views/securityReminder/schooltask/schooltaskRouter";
import schooltaskuserRouter from "../views/securityReminder/schooltaskuser/schooltaskuserRouter";
import schooltaskuserhisRouter from "../views/securityReminder/schooltaskuserhis/schooltaskuserhisRouter";
import studentgroupRouter from "../views/securityReminder/studentgroup/studentgroupRouter";
import studentgroupsetRouter from "../views/securityReminder/studentgroupset/studentgroupsetRouter";
import studentgroupuserRouter from "../views/securityReminder/studentgroupuser/studentgroupuserRouter";
const model = 'securityReminder';
const _import = require('./_import');
export  default [
  {
    path: '/securityReminder',
    component: Layout,
    children: [
      ...lostthingRouter.children,
      ...personalarticleRouter.children,
      ...personalarticlerecommendRouter.children,
      ...schoolmessageRouter.children,
      ...schoolmessageuserRouter.children,
      ...schoolsecuritymessageRouter.children,
      ...schoolsecuritymessageuserRouter.children,
      ...schooltaskRouter.children,
      ...schooltaskuserRouter.children,
      ...schooltaskuserhisRouter.children,
      ...studentgroupRouter.children,
      ...studentgroupsetRouter.children,
      ...studentgroupuserRouter.children
    ]
  }
]
