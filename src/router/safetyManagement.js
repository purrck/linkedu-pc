import Layout from '@/components/container/index'
import classstudygroupRouter from "../views/safetyManagement/classstudygroup/classstudygroupRouter";
import schoolbeondutyRouter from "../views/safetyManagement/schoolbeonduty/schoolbeondutyRouter";
import schoolbeondutycheckRouter from "../views/safetyManagement/schoolbeondutycheck/schoolbeondutycheckRouter";
import schoolbeondutyteacherRouter from "../views/safetyManagement/schoolbeondutyteacher/schoolbeondutyteacherRouter";
import teachercarRouter from "../views/safetyManagement/teachercar/teachercarRouter";
import teachercarinoutRouter from "../views/safetyManagement/teachercarinout/teachercarinoutRouter";
import schoolteacherclasscheckRouter from "../views/safetyManagement/schoolteacherclasscheck/schoolteacherclasscheckRouter";
import schoolteacherclasslookRouter from "../views/safetyManagement/schoolteacherclasslook/schoolteacherclasslookRouter";
import schoolteacherclassreplaceRouter
  from "../views/safetyManagement/schoolteacherclassreplace/schoolteacherclassreplaceRouter";
import schoolteacherleaveRouter from "../views/safetyManagement/schoolteacherleave/schoolteacherleaveRouter";
import schoolteacherawardRouter from "../views/safetyManagement/schoolteacheraward/schoolteacherawardRouter";
import schoolteachercertificateRouter from "../views/safetyManagement/schoolteachercertificate/schoolteachercertificateRouter";
import schoolteachereduhisRouter from "../views/safetyManagement/schoolteachereduhis/schoolteachereduhisRouter";
import schoolteacherpositionaltitleRouter
  from "../views/safetyManagement/schoolteacherpositionaltitle/schoolteacherpositionaltitleRouter";
import schoolteacherpracticeRouter from "../views/safetyManagement/schoolteacherpractice/schoolteacherpracticeRouter";
import schoolteacherpunishmentRouter from "../views/safetyManagement/schoolteacherpunishment/schoolteacherpunishmentRouter";
import schoolteacherstudentcommentRouter
  from "../views/safetyManagement/schoolteacherstudentcomment/schoolteacherstudentcommentRouter";
import schoolteacherworkcheckRouter from "../views/safetyManagement/schoolteacherworkcheck/schoolteacherworkcheckRouter";
import schoolevaluationteacherclassRouter
  from "../views/safetyManagement/schoolevaluationteacherclass/schoolevaluationteacherclassRouter";
import schoolevaluationteacheritemRouter
  from "../views/safetyManagement/schoolevaluationteacheritem/schoolevaluationteacheritemRouter";
import schoolevaluationteacherplanRouter
  from "../views/safetyManagement/schoolevaluationteacherplan/schoolevaluationteacherplanRouter";

const model = 'safetyManagement'
const _import = require('./_import')
export default[
  {
    path: '/safetyManagement',
    component: Layout,
    children:[
      ...classstudygroupRouter.children,
      ...schoolbeondutyRouter.children,
      ...schoolbeondutycheckRouter.children,
      ...schoolbeondutyteacherRouter.children,
      ...teachercarRouter.children,
      ...teachercarinoutRouter.children,
      ...schoolteacherclasscheckRouter.children,
      ...schoolteacherclasslookRouter.children,
      ...schoolteacherclassreplaceRouter.children,
      ...schoolteacherleaveRouter.children,
      ...schoolteacherawardRouter.children,
      ...schoolteachercertificateRouter.children,
      ...schoolteacherclasscheckRouter.children,
      ...schoolteacherclasslookRouter.children,
      ...schoolteacherclassreplaceRouter.children,
      ...schoolteachereduhisRouter.children,
      ...schoolteacherleaveRouter.children,
      ...schoolteacherpositionaltitleRouter.children,
      ...schoolteacherpracticeRouter.children,
      ...schoolteacherpunishmentRouter.children,
      ...schoolteacherstudentcommentRouter.children,
      ...schoolteacherworkcheckRouter.children,
      ...schoolevaluationteacherclassRouter.children,
      ...schoolevaluationteacheritemRouter.children,
      ...schoolevaluationteacherplanRouter.children
    ]
  }
]
