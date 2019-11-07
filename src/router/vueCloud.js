import Layout from '@/components/container/index'
import schoolepidemicsituationRouter from "../views/newApplications/cds/schoolepidemicsituation/schoolepidemicsituationRouter"
import schoolepidemicsituationprocessRouter from "../views/newApplications/cds/schoolepidemicsituationprocess/schoolepidemicsituationprocessRouter"
import schoolepidemicsituationstudentRouter from "../views/newApplications/cds/schoolepidemicsituationstudent/schoolepidemicsituationstudentRouter"
import schoolepidemicsituationteacherRouter from "../views/newApplications/cds/schoolepidemicsituationteacher/schoolepidemicsituationteacherRouter"
import schoolillnesslibRouter from "../views/newApplications/cds/schoolillnesslib/schoolillnesslibRouter"
import schoolstudentbodyabnormalRouter from "../views/newApplications/cds/schoolstudentbodyabnormal/schoolstudentbodyabnormalRouter"
import schoolstudentillnessRouter from "../views/newApplications/cds/schoolstudentillness/schoolstudentillnessRouter"

const model = 'newApplications'
// const _import = require('./_import')
export default[
  {
    path: '/newApplications',
    component: Layout,
    children:[
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
