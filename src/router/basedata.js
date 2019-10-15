import Layout from '@/components/container/index_'
const _import = require('./_import')

//用户中心
import aaauditlogRouter from "../views/basedata/aaauditlog/aaauditlogRouter";
import aagroupRouter from "../views/basedata/aagroup/aagroupRouter";
import aagroupadminRouter from "../views/basedata/aagroupadmin/aagroupadminRouter";
import aagroupresRouter from "../views/basedata/aagroupres/aagroupresRouter";
import aaresourcesRouter from "../views/basedata/aaresources/aaresourcesRouter";
import aaresresRouter from "../views/basedata/aaresres/aaresresRouter";
import aasubjectRouter from "../views/basedata/aasubject/aasubjectRouter";
import aasubjectextrafieldRouter from "../views/basedata/aasubjectextrafield/aasubjectextrafieldRouter";
import aasubjectextrafieldhisRouter from "../views/basedata/aasubjectextrafieldhis/aasubjectextrafieldhisRouter";
import aasubjectgroupRouter from "../views/basedata/aasubjectgroup/aasubjectgroupRouter";
import aasubjectloginRouter from "../views/basedata/aasubjectlogin/aasubjectloginRouter";
import aasubjectpwdhistoryRouter from "../views/basedata/aasubjectpwdhistory/aasubjectpwdhistoryRouter";
import aasubjectresRouter from "../views/basedata/aasubjectres/aasubjectresRouter";
//应用相关
import applistRouter from "../views/basedata/applist/applistRouter";
import apprelatedcontentRouter from "../views/basedata/apprelatedcontent/apprelatedcontentRouter";
import appusersRouter from "../views/basedata/appusers/appusersRouter";
import appversionsRouter from "../views/basedata/appversions/appversionsRouter";
import appwelcomeimageRouter from "../views/basedata/appwelcomeimage/appwelcomeimageRouter";
import appwelcomethemeRouter from "../views/basedata/appwelcometheme/appwelcomethemeRouter";
//基础数据
import basicclassRouter from "../views/basedata/basicclass/basicclassRouter";
import basicclassteacherRouter from "../views/basedata/basicclassteacher/basicclassteacherRouter";
import basicgradeRouter from "../views/basedata/basicgrade/basicgradeRouter";
import basicparentRouter from "../views/basedata/basicparent/basicparentRouter";
import basicschoolorgRouter from "@/views/basedata/basicschoolorg/basicschoolorgRouter";
import basicschoolorgdepartRouter from "../views/basedata/basicschoolorgdepart/basicschoolorgdepartRouter";
import basicschoolorgpositionRouter from "../views/basedata/basicschoolorgposition/basicschoolorgpositionRouter";
import basicschoolplaceRouter from '@/views/basedata/basicschoolplace/basicschoolplaceRouter'
import basicschoolsegmentRouter from "../views/basedata/basicschoolsegment/basicschoolsegmentRouter";
import basicschoolsegmentsubjectRouter
  from "../views/basedata/basicschoolsegmentsubject/basicschoolsegmentsubjectRouter";
import basicsegmentRouter from "../views/basedata/basicsegment/basicsegmentRouter";
import basicstudentRouter from "../views/basedata/basicstudent/basicstudentRouter";
import basicstudentparentRouter from "../views/basedata/basicstudentparent/basicstudentparentRouter";
import basicsubjectRouter from "../views/basedata/basicsubject/basicsubjectRouter";
import basicsubjectsegmentRouter from "../views/basedata/basicsubjectsegment/basicsubjectsegmentRouter";
import basicteacherRouter from "../views/basedata/basicteacher/basicteacherRouter";   //学校场所
import classcoursetableRouterXs from '@/views/basedata/classcoursetable/classcoursetableRouter'   //班级
//其他
import codeintRouter from "../views/basedata/codeint/codeintRouter";
import codetypeRouter from "../views/basedata/codetype/codetypeRouter";
import complaintreplyRouter from "../views/basedata/complaintreply/complaintreplyRouter";
import complaintsuggestRouter from "../views/basedata/complaintsuggest/complaintsuggestRouter";
import configpropRouter from "../views/basedata/configprop/configpropRouter";
import euploadfileRouter from "../views/basedata/euploadfile/euploadfileRouter";
import feedbackinfoRouter from "../views/basedata/feedbackinfo/feedbackinfoRouter";
import filefolderRouter from "../views/basedata/filefolder/filefolderRouter";


import orgschoolcalendarXsRouter from  "@/views/basedata/orgschoolcalendar/orgschoolcalendarRouter"
import orgschoolcalendardetailXsRouter from  "@/views/basedata/orgschoolcalendardetail/orgschoolcalendardetailRouter"
import orgschooltimelineRouterXs from '@/views/basedata/orgschooltimeline/orgschooltimelineRouter'
import orgschooltimelinedetailRouterXs from '@/views/basedata/orgschooltimelinedetail/orgschooltimelinedetailRouter'
import publicholidayRouter from '@/views/basedata/publicholiday/publicholidayRouter'
import schooldeviceRouter from '@/views/basedata/schooldevice/schooldeviceRouter'   //学校设备
import sensitivewordsRouter from  "@/views/basedata/sensitivewords/sensitivewordsRouter"
import sensitivewordshisRouter from  "@/views/basedata/sensitivewordshis/sensitivewordshisRouter"
import studentdeviceRouter from '@/views/basedata/studentdevice/studentdeviceRouter'   //学生设备
import systemerrorlogRouter from "../views/basedata/systemerrorlog/systemerrorlogRouter";
import schoolplacetimecheckruleRouter from "../views/basedata/schoolplacetimecheckrule/schoolplacetimecheckruleRouter";



const model = 'basedata';

export default [
  {
   path: '/basedata',
    component: Layout,
    children: [
      //用户认证中心
      ...aaauditlogRouter.children,
      ...aagroupRouter.children,
      ...aagroupadminRouter.children,
      ...aagroupresRouter.children,
      ...aaresourcesRouter.children,
      ...aaresresRouter.children,
      ...aasubjectRouter.children,
      ...aasubjectextrafieldRouter.children,
      ...aasubjectextrafieldhisRouter.children,
      ...aasubjectgroupRouter.children,
      ...aasubjectloginRouter.children,
      ...aasubjectpwdhistoryRouter.children,
      ...aasubjectresRouter.children,
      //应用相关
      ...applistRouter.children,
      ...apprelatedcontentRouter.children,
      ...appusersRouter.children,
      ...appversionsRouter.children,
      ...appwelcomeimageRouter.children,
      ...appwelcomethemeRouter.children,
      //学校基础数据
      ...basicclassRouter.children,
      ...basicclassteacherRouter.children,
      ...basicgradeRouter.children,
      ...basicparentRouter.children,
      ...basicschoolorgRouter.children,
      ...basicschoolorgdepartRouter.children,
      ...basicschoolorgpositionRouter.children,
      ...basicschoolplaceRouter.children,
      ...basicschoolsegmentRouter.children,
      ...basicschoolsegmentsubjectRouter.children,
      ...basicsegmentRouter.children,
      ...basicstudentRouter.children,
      ...basicstudentparentRouter.children,
      ...basicsubjectRouter.children,
      ...basicsubjectsegmentRouter.children,
      ...basicteacherRouter.children,
      //其他
      ...classcoursetableRouterXs.children,
      ...codeintRouter.children,
      ...codetypeRouter.children,
      ...complaintreplyRouter.children,
      ...complaintsuggestRouter.children,
      ...configpropRouter.children,
      ...euploadfileRouter.children,
      ...feedbackinfoRouter.children,
      ...filefolderRouter.children,

      ...orgschoolcalendarXsRouter.children,
      ...orgschoolcalendardetailXsRouter.children,
      ...orgschooltimelineRouterXs.children,
      ...orgschooltimelinedetailRouterXs.children,
      ...publicholidayRouter.children,
      ...schooldeviceRouter.children,
      ...schoolplacetimecheckruleRouter.children,
      ...sensitivewordsRouter.children,
      ...sensitivewordshisRouter.children,
      ...studentdeviceRouter.children,
      ...systemerrorlogRouter.children,
      //运营端

      {path: `/import`, name: `importFile`, label: `上传文件`, component: _import(`importFileV2`, `components/importFile`)},
    ]
  },
]
