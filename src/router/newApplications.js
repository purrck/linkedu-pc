import Layout from '@/components/container/index'
import schoolsecuritymessageRouter from "../views/newApplications/schoolsecuritymessage/schoolsecuritymessageRouter";
import schooltaskuserhisRouter from "../views/newApplications/schooltaskuserhis/schooltaskuserhisRouter";
import lostthingRouter from "../views/newApplications/lostthing/lostthingRouter";
import schoolmessageRouter from "../views/newApplications/schoolmessage/schoolmessageRouter";
import schoolmessageuserRouter from "../views/newApplications/schoolmessageuser/schoolmessageuserRouter";
import schooltaskRouter from "../views/newApplications/schooltask/schooltaskRouter";
import schooltaskuserRouter from "../views/newApplications/schooltaskuser/schooltaskuserRouter";
import schoolsecuritymessageuserRouter from "../views/newApplications/schoolsecuritymessageuser/schoolsecuritymessageuserRouter";
import repairinfo from '../views/newApplications/repairinfo/repairinfoRouter'
import repairrecord from '../views/newApplications/repairrecord/repairrecordRouter'
import studentgroup from '../views/newApplications/studentgroup/studentgroupRouter'
import studentgroupset from '../views/newApplications/studentgroupset/studentgroupsetRouter'
import studentgroupuser from '../views/newApplications/studentgroupuser/studentgroupuserRouter'
import principalmailboxRouter from "../views/newApplications/principalmailbox/principalmailboxRouter";
import schooldocindexRouter from '../views/newApplications/schooldocindex/schooldocindexRouter';
import schooldoclibraryRouter from '../views/newApplications/schooldoclibrary/schooldoclibraryRouter';

import schoolepidemicsituationRouter from "../views/newApplications/cds/schoolepidemicsituation/schoolepidemicsituationRouter"
import schoolepidemicsituationprocessRouter from "../views/newApplications/cds/schoolepidemicsituationprocess/schoolepidemicsituationprocessRouter"
import schoolepidemicsituationstudentRouter from "../views/newApplications/cds/schoolepidemicsituationstudent/schoolepidemicsituationstudentRouter"
import schoolepidemicsituationteacherRouter from "../views/newApplications/cds/schoolepidemicsituationteacher/schoolepidemicsituationteacherRouter"
import schoolillnesslibRouter from "../views/newApplications/cds/schoolillnesslib/schoolillnesslibRouter"
import schoolstudentbodyabnormalRouter from "../views/newApplications/cds/schoolstudentbodyabnormal/schoolstudentbodyabnormalRouter"
import schoolstudentillnessRouter from "../views/newApplications/cds/schoolstudentillness/schoolstudentillnessRouter"
const model = 'newApplications'
const _import = require('./_import')
export default[
  {
    path: '/newApplication',
    component: Layout,
    children:[
      ...schooltaskRouter.children,
      ...schooltaskuserRouter.children,
      ...schooltaskuserhisRouter.children,
      ...schoolmessageRouter.children,
      ...schoolmessageuserRouter.children,
      ...schoolsecuritymessageRouter.children,
      ...schoolsecuritymessageuserRouter.children,
      ...lostthingRouter.children,
      ...repairinfo.children,
      ...repairrecord.children,
      ...principalmailboxRouter.children,
      ...studentgroup.children,
      ...studentgroupset.children,
      ...studentgroupuser.children,
      ...schooldocindexRouter.children,
      ...schooldoclibraryRouter.children,

      ...schoolepidemicsituationRouter,
      ...schoolepidemicsituationprocessRouter,
      ...schoolepidemicsituationstudentRouter,
      ...schoolepidemicsituationteacherRouter,
      ...schoolillnesslibRouter,
      ...schoolstudentbodyabnormalRouter,
      ...schoolstudentillnessRouter
    ]
  }
]
