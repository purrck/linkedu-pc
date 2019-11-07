import Layout from '@/components/container/index'

import basicschooldormitoryRouter from  "@/views/dormitory/basicschooldormitory/basicschooldormitoryRouter"  //宿舍
import basicschooldormitoryroomRouter from  "@/views/dormitory/basicschooldormitoryroom/basicschooldormitoryroomRouter"  //寝室
import basicschooldormitoryteacherRouter from  "@/views/dormitory/basicschooldormitoryteacher/basicschooldormitoryteacherRouter"  //宿舍老师
import basicschooldormitorystudentRouter from  "@/views/dormitory/basicschooldormitorystudent/basicschooldormitorystudentRouter"  //寝室学生
import schoolplacestudentcheckRouter from  "@/views/dormitory/schoolplacestudentcheck/schoolplacestudentcheckRouter"  //学生考勤
import schoolvisitrecordRouter from  "@/views/dormitory/schoolvisitrecord/schoolvisitrecordRouter"  //学校探视记录

export default [
  {
    path: '/dormitory',
    component: Layout,
    children: [
      ...basicschooldormitoryRouter.children,
      ...basicschooldormitoryroomRouter.children,
      ...basicschooldormitorystudentRouter.children,
      ...basicschooldormitoryteacherRouter.children,
      ...schoolplacestudentcheckRouter.children,
      ...schoolvisitrecordRouter.children,
    ]
  }
]
