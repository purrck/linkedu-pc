import Layout from '@/components/container/index_'
const _import = require('./_import')
//safety
const model = 'safety'

// TODO 考勤
import studenttimelinecheckRouter from '@/views/safety/studenttimelinecheck/studenttimelinecheckRouter'
import studenttimelinecheckdetailRouter from '@/views/safety/studenttimelinecheckdetail/studenttimelinecheckdetailRouter'
// TODO 事故
import accident from '@/views/safety/accident/schoolsecurityaccident/schoolsecurityaccidentRouter'
import accidentProcess from '@/views/safety/accident/schoolsecurityaccidentprocess/schoolsecurityaccidentprocessRouter'
import accidentStudent from '@/views/safety/accident/schoolsecurityaccidentstudent/schoolsecurityaccidentstudentRouter'
// TODO 隐患
import danger from '@/views/safety/danger/schoolsecuritydanger/schoolsecuritydangerRouter'
import dangerProcess from '@/views/safety/danger/schoolsecuritydangerprocess/schoolsecuritydangerprocessRouter'
// TODO 巡检记录
import schoolSecurityInspection from '@/views/safety/schoolsecuritycheckresult/schoolsecuritycheckresultRouter'
// TODO 巡检计划
import schoolSecurityPlan from '@/views/safety/schoolsecuritycheckplan/schoolsecuritycheckplanRouter'
// TODO 巡检路线
import schoolSecurityRoute from '@/views/safety/schoolsecuritycheckroute/schoolsecuritycheckrouteRouter'
// TODO 巡检点
import schoolSecurityPlace from '@/views/safety/schoolsecurityplace/schoolsecurityplaceRouter'
import securityorganizationRouter from '@/views/safety/securityorganization/securityorganizationRouter'
import securityorganizationcontactRouter from '@/views/safety/securityorganizationcontact/securityorganizationcontactRouter'




// 食品安全样例
import studentleaveRouter from "../views/safety/stulea/studentleaveRouter";
import productinfoRouter from "@/views/safety/food/productinfo/productinfoRouter";
import productsupplierRouter from "@/views/safety/food/productsupplier/productsupplierRouter";
import producttypeRouter from "@/views/safety/food/producttype/producttypeRouter";
import schoolmenuRouter from "@/views/safety/food/schoolmenu/schoolmenuRouter";
import schoolmenudailyRouter from "@/views/safety/food/schoolmenudaily/schoolmenudailyRouter";
import schoolmenuproductRouter from "@/views/safety/food/schoolmenuproduct/schoolmenuproductRouter";
import schoolpoductdailyRouter from "@/views/safety/food/schoolpoductdaily/schoolpoductdailyRouter";
import studentAccessRecordsRouter from "@/views/safety/studentAccessRecords/studentAccessRecordsRouter";  //学生出入记录

import studentmenudailyRouter from "@/views/safety/food/studentmenudaily/studentmenudailyRouter";
import schoolprodreservedsampleRouter from "../views/safety/food/schoolprodreservedsample/schoolprodreservedsampleRouter";
import schoolprodtestitemRouter from "../views/safety/food/schoolprodtestitem/schoolprodtestitemRouter";
import schoolprodtestRouter from "../views/safety/food/schoolprodtest/schoolprodtestRouter";
import teachermenudailyRouter from "../views/safety/teacherfood/teachermenudaily/teachermenudailyRouter";
import teachermenusuggestionRouter from "../views/safety/teacherfood/teachermenusuggestion/teachermenusuggestionRouter";
import schoolaccountabilityruleRouter
  from "../views/safety/teacherfood/schoolaccountabilityrule/schoolaccountabilityruleRouter";
import schoolaccountabilitypersonRouter
  from "../views/safety/teacherfood/schoolaccountabilityperson/schoolaccountabilitypersonRouter";
import schoolaccountabilityinfoRouter
  from "../views/safety/teacherfood/schoolaccountabilityinfo/schoolaccountabilityinfoRouter";


import aasubjectdeviceRouter from "../views/safety/aasubjectdevice/aasubjectdeviceRouter";
import aasubjectotherloginRouter from "../views/safety/aasubjectotherlogin/aasubjectotherloginRouter";
import aasubjectphonenumRouter from "../views/safety/aasubjectphonenum/aasubjectphonenumRouter";
import accessmetricsuriRouter from "../views/safety/accessmetricsuri/accessmetricsuriRouter";
import amaccesslogentryRouter from "../views/safety/amaccesslogentry/amaccesslogentryRouter";
import entityreadinfoRouter from "../views/safety/entity/entityreadinfo/entityreadinfoRouter";
import entityregionRouter from "../views/safety/entity/entityregion/entityregionRouter";
import entityreplyinfoRouter from "../views/safety/entity/entityreplyinfo/entityreplyinfoRouter";
import entityapproveRouter from "../views/safety/entity/entityapprove/entityapproveRouter";
import entitycollectionRouter from "../views/safety/entity/entitycollection/entitycollectionRouter";
import entityevaluateRouter from "../views/safety/entity/entityevaluate/entityevaluateRouter";
import entityorganizationRouter from "../views/safety/entity/entityorganization/entityorganizationRouter";
import entityorganizationuserRouter from "../views/safety/entity/entityorganizationuser/entityorganizationuserRouter";
import entityorganizationuserruleRouter
  from "../views/safety/entity/entityorganizationuserrule/entityorganizationuserruleRouter";
import entitysegmentgradeRouter from "../views/safety/entity/entitysegmentgrade/entitysegmentgradeRouter";
import entitytypeRouter from "../views/safety/entity/entitytype/entitytypeRouter";

import meetingchecklistRouter from "../views/safety/meetingchecklist/meetingchecklistRouter";
import meetinginfoRouter from "../views/safety/meetinginfo/meetinginfoRouter";
import messagetpRouter from "../views/safety/messagetp/messagetpRouter";
import messagetptxtRouter from "../views/safety/messagetptxt/messagetptxtRouter";
import studentgranttransferRouter from "../views/safety/studentgranttransfer/studentgranttransferRouter";
import studgranttranagencyRouter from "../views/safety/studgranttranagency/studgranttranagencyRouter";
import studgranttranpeopleRouter from "../views/safety/studgranttranpeople/studgranttranpeopleRouter";
import systemmessageRouter from "../views/safety/systemmessage/systemmessageRouter";
import userswitchinfoRouter from "../views/safety/userswitchinfo/userswitchinfoRouter";
import bulletinRouter from "../views/safety/bulletin/bulletinRouter";

//文件

export default [
  {
    path: '/safety',
    component: Layout,
    children: [
      ...aasubjectdeviceRouter.children,
      ...aasubjectotherloginRouter.children,
      ...aasubjectphonenumRouter.children,
      ...accessmetricsuriRouter.children,
      ...amaccesslogentryRouter.children,
      ...bulletinRouter,

      //信息管理
      ...entityapproveRouter.children,
      ...entitycollectionRouter.children,
      ...entityevaluateRouter.children,
      //组织
      ...entityorganizationRouter.children,
      ...entityorganizationuserRouter.children,
      ...entityorganizationuserruleRouter.children,
      ...entityregionRouter.children,
      ...entityreplyinfoRouter.children,
      ...entityreadinfoRouter.children,
      ...entitysegmentgradeRouter.children,
      ...entitytypeRouter.children,
      //食品安全
      ...productinfoRouter.children,
      ...productsupplierRouter.children,
      ...producttypeRouter.children,
      ...schoolmenuRouter.children,
      ...schoolmenudailyRouter.children,
      ...schoolmenuproductRouter.children,
      ...schoolpoductdailyRouter.children,
      ...studentAccessRecordsRouter.children,
      ...studentmenudailyRouter.children,
      //会议
      ...meetingchecklistRouter.children,
      ...meetinginfoRouter.children,
      ...messagetpRouter.children,
      ...messagetptxtRouter.children,
      ...studentgranttransferRouter.children,
      ...studgranttranagencyRouter.children,
      ...studgranttranpeopleRouter.children,
      ...studenttimelinecheckRouter.children,
      ...studenttimelinecheckdetailRouter.children,
      ...studentleaveRouter.children,
      ...systemmessageRouter.children,
      ...schoolaccountabilityruleRouter.children,
      ...schoolaccountabilitypersonRouter.children,
      ...schoolaccountabilityinfoRouter.children,
      ...teachermenudailyRouter.children,
      ...teachermenusuggestionRouter.children,
      ...userswitchinfoRouter.children,


      ...schoolSecurityInspection.children,
      ...schoolSecurityPlan.children,
      ...schoolSecurityRoute.children,
      ...schoolSecurityPlace.children,
      ...danger.children,
      ...dangerProcess.children,
      ...accident.children,
      ...accidentProcess.children,
      ...accidentStudent.children,

      ...securityorganizationRouter.children,
      ...securityorganizationcontactRouter.children,
      ...schoolprodreservedsampleRouter.children,
      ...schoolprodtestitemRouter.children,
      ...schoolprodtestRouter.children,

      {path: '/safety/grantTotal', name: '/safety/grantTotal', label: '授权接送统计', component: _import('safety/studentGrant/studentGrantTotal', 'views')},
      {path: `/safety/bulletinTotal`, name: 'bulletinTotal',label: '通知记录统计', component: _import('safety/bulletin/bulletinTotal', 'views')},
      {path: `/safety/studentRouteTotal`, name: 'studentRouteTotal',label: '学生日常考勤', component: _import('safety/studentRoute/studentRouteTotal', 'views')},
      {path: `/safety/studentLeaveTotal`, name: 'studentLeaveTotal',label: '学生考勤统计', component: _import('safety/stulea/studentLeaveTotal', 'views')},
      {path: `/safety/statisticsjobsTotal`, name: 'statisticsjobsTotal',label: '统计任务', component: _import('admin/statisticsjobs/statisticsjobsTotal', 'views')},
      {path: `/safety/messageManageTotal`, name: 'messageManageTotal',label: '信息管理统计', component: _import('safety/messageManage/messageManageTotal', 'views')},
    ]
  },
]
