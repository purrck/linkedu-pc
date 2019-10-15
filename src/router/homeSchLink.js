import Layout from '@/components/container/index_'
import classmeetinginfoRouter from "../views/homeSchLink/classmeetinginfo/classmeetinginfoRouter";
import classmeetingchecklistRouter from "../views/homeSchLink/classmeetingchecklist/classmeetingchecklistRouter";
import studentfamilyvisitRouter from "../views/homeSchLink/studentfamilyvisit/studentfamilyvisitRouter";
import studentfamilyvisitresultRouter from "../views/homeSchLink/studentfamilyvisitresult/studentfamilyvisitresultRouter";
import classparentcommitteememberRouter
  from "../views/homeSchLink/classparentcommitteemember/classparentcommitteememberRouter";
import classparentcommitteedutyRouter
  from "../views/homeSchLink/classparentcommitteeduty/classparentcommitteedutyRouter";
import classcommitteedutyRouter from "../views/homeSchLink/classcommitteeduty/classcommitteedutyRouter";
import classcommitteememberRouter from "../views/homeSchLink/classcommitteemember/classcommitteememberRouter";
import classhonorRouter from "../views/homeSchLink/classhonor/classhonorRouter";
import classbestworkRouter from "../views/homeSchLink/classbestwork/classbestworkRouter";
import classpacesetterRouter from "../views/homeSchLink/classpacesetter/classpacesetterRouter";
import classstudentcommentRouter from "../views/homeSchLink/classstudentcomment/classstudentcommentRouter";

export default [
  {
    path: '/homeSchLink',
    component: Layout,
    children: [
      ...classmeetinginfoRouter.children,
      ...classmeetingchecklistRouter.children,
      ...studentfamilyvisitRouter.children,
      ...studentfamilyvisitresultRouter.children,
      ...classparentcommitteememberRouter.children,
      ...classparentcommitteedutyRouter.children,
      ...classcommitteedutyRouter.children,
      ...classcommitteememberRouter.children,
      ...classhonorRouter.children,
      ...classbestworkRouter.children,
      ...classpacesetterRouter.children,
      ...classstudentcommentRouter.children
    ]
  }
]
