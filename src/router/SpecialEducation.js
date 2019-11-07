import Layout from '@/components/container/index'

import interestcourseclassRouter from  "@/views/SpecialEducation/interestcourseclass/interestcourseclassRouter"  //兴趣班
import interestcourseclassstudentcheckRouter from  "@/views/SpecialEducation/interestcourseclassstudentcheck/interestcourseclassstudentcheckRouter"  //兴趣考勤
import interestcourseclassstudentRouter from  "@/views/SpecialEducation/interestcourseclassstudent/interestcourseclassstudentRouter"  //兴趣学生
import interestcourseclassplanRouter from  "@/views/SpecialEducation/interestcourseclassplan/interestcourseclassplanRouter"
import habitwishRouter from "../views/SpecialEducation/habit/habitwish/habitwishRouter";
import habitassignmentrecordRouter
  from "../views/SpecialEducation/habit/habitassignmentrecord/habitassignmentrecordRouter";
import habitassignmentRouter from "../views/SpecialEducation/habit/habitassignment/habitassignmentRouter";
import habitassignmenttypeRouter from "../views/SpecialEducation/habit/habitassignmenttype/habitassignmenttypeRouter";
import habitflowerhistoryRouter from "../views/SpecialEducation/habit/habitflowerhistory/habitflowerhistoryRouter";
import habitwishrecordRouter from "../views/SpecialEducation/habit/habitwishrecord/habitwishrecordRouter";
import habitwishtypeRouter from "../views/SpecialEducation/habit/habitwishtype/habitwishtypeRouter";  //兴趣学生

export default [
  {
    path: '/SpecialEducation',
    component: Layout,
    children: [
      ...interestcourseclassRouter.children,
      ...interestcourseclassstudentcheckRouter.children,
      ...interestcourseclassstudentRouter.children,
      ...interestcourseclassplanRouter.children,
      ...habitwishRouter.children,
      ...habitassignmentrecordRouter.children,
      ...habitassignmentRouter.children,
      ...habitassignmenttypeRouter.children,
      ...habitflowerhistoryRouter.children,
      ...habitwishrecordRouter.children,
      ...habitwishtypeRouter.children,
    ]
  }
]
