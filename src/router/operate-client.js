import Layout from '@/components/container/index'
const _import = require('./_import')
//运营端
import orgschooltimelineRouter from '@/views/operate-client/basedata/orgschooltimeline/orgschooltimelineRouter'
import orgschooltimelinedetailRouter from '@/views/operate-client/basedata/orgschooltimelinedetail/orgschooltimelinedetailRouter'
import orgschoolcalendarRouter from  "@/views/operate-client/basedata/orgschoolcalendar/orgschoolcalendarRouter"
import orgschoolcalendardetailRouter from  "@/views/operate-client/basedata/orgschoolcalendardetail/orgschoolcalendardetailRouter"
import basicschoolorgRouterOp from "@/views/operate-client/basedata/basicschoolorg/basicschoolorgRouter";

// TODO 课程
import courseRouter from '@/views/operate-client/safetyEdu/course/course/courseRouter'
import courseChapter from '../views/operate-client/safetyEdu/course/coursechapter/coursechapterRouter'
// TODO 活动
import activityinfoRouter from '@/views/operate-client/safetyEdu/activityinfo/activityinfoRouter'
import surveymasterRouter from '@/views/operate-client/safetyEdu/survey/surveymaster/surveymasterRouter'
import publisharticleRouter from "../views/operate-client/safetyEdu/edu_info/publisharticle/publisharticleRouter";
import publishcolumnRouter from "../views/operate-client/safetyEdu/edu_info/publishcolumn/publishcolumnRouter";
import publishcolumnChildRouter
  from "../views/operate-client/safetyEdu/edu_info/publishcolumnChild/publishcolumnChildRouter";
// TODO 问卷
import orgdepartmenttemplateRouter from "../views/operate-client/basedata/orgdepartmenttemplate/orgdepartmenttemplateRouter";
import orgdeparttemppositionRouter from "../views/operate-client/basedata/orgdeparttempposition/orgdeparttemppositionRouter";
import orgdeparttempdepartRouter from "../views/operate-client/basedata/orgdeparttempdepart/orgdeparttempdepartRouter";
import schoolsecuritymessagetmpRouter from '../views/operate-client/basedata/schoolsecuritymessagetmp/schoolsecuritymessagetmpRouter'
export default [
  {
    path: '/operate-client',
    component: Layout,
    children: [
      ...orgschoolcalendarRouter.children,
      ...orgschoolcalendardetailRouter.children,
      ...basicschoolorgRouterOp.children,
      ...orgschooltimelineRouter.children,
      ...orgschooltimelinedetailRouter.children,
      ...orgdepartmenttemplateRouter.children,
      ...orgdeparttemppositionRouter.children,
      ...orgdeparttempdepartRouter.children,
      ...courseRouter.children,
      ...courseChapter.children,
      ...activityinfoRouter.children,
      ...publisharticleRouter.children,
      ...publishcolumnRouter.children,
      ...publishcolumnChildRouter.children,
      ...surveymasterRouter.children,
      ...schoolsecuritymessagetmpRouter,
      // TODO 问卷
      {
        path: `/safetyEdu/safetyQuestionnaireManagement/surveyitem`,
        name: 'listSurveyItem',
        label: '问卷子项',
        component: _import('operate-client/safetyEdu/survey/surveyitem/listSurveyItem', 'views')
      },
      {
        path: `/safetyEdu/detailSurveyItem/:type/:id`,
        name: 'detailSurveyItem',
        label: '问卷子项',
        component: _import('operate-client/safetyEdu/survey/surveyitem/detailSurveyItem', 'views')
      },

      {
        path: `/safetyEdu/safetyQuestionnaireManagement/surveylayout`,
        name: 'listSurveyLayout',
        label: '问卷展示',
        component: _import('operate-client/safetyEdu/survey/surveylayout/listSurveyLayout', 'views')
      },
      {
        path: `/safetyEdu/detailSurveyLayout/:type/:id`,
        name: 'detailSurveyLayout',
        label: '问卷展示',
        component: _import('operate-client/safetyEdu/survey/surveylayout/detailSurveyLayout', 'views')
      },


      {
        path: `/safetyEdu/safetyQuestionnaireManagement/surveylayouttext`,
        name: 'listSurveyLayoutText',
        label: '问卷文字',
        component: _import('operate-client/safetyEdu/survey/surveylayouttext/listSurveyLayoutText', 'views')
      },
      {
        path: `/safetyEdu/detailSurveyLayoutText/:type/:id`,
        name: 'detailSurveyLayoutText',
        label: '问卷文字',
        component: _import('operate-client/safetyEdu/survey/surveylayouttext/detailSurveyLayoutText', 'views')
      },

      // TODO this
      {
        path: `/safetyEdu/safetyQuestionnaireManagement/surveyqnchoice`,
        name: 'listSurveyQnChoice',
        label: '问卷问题',
        component: _import('operate-client/safetyEdu/survey/surveyqnchoice/listSurveyQnChoice', 'views')
      },
      {
        path: `/safetyEdu/detailSurveyQnChoice/:type/:id`,
        name: 'detailSurveyQnChoice',
        label: '问卷问题',
        component: _import('operate-client/safetyEdu/survey/surveyqnchoice/detailSurveyQnChoice', 'views')
      },


      {
        path: `/safetyEdu/safetyQuestionnaireManagement/surveyqnchoiceoption`,
        name: 'listSurveyQnChoiceOption',
        label: '问卷问题选项',
        component: _import('operate-client/safetyEdu/survey/surveyqnchoiceoption/listSurveyQnChoiceOption', 'views')
      },
      {
        path: `/safetyEdu/detailSurveyQnChoiceOption/:type/:id`,
        name: 'detailSurveyQnChoiceOption',
        label: '问卷问题选项',
        component: _import('operate-client/safetyEdu/survey/surveyqnchoiceoption/detailSurveyQnChoiceOption', 'views')
      },


      {
        path: `/safetyEdu/safetyQuestionnaireManagement/surveyqninput`,
        name: 'listSurveyQnInput',
        label: '问卷问题输入',
        component: _import('operate-client/safetyEdu/survey/surveyqninput/listSurveyQnInput', 'views')
      },
      {
        path: `/safetyEdu/detailSurveyQnInput/:type/:id`,
        name: 'detailSurveyQnInput',
        label: '问卷问题输入',
        component: _import('operate-client/safetyEdu/survey/surveyqninput/detailSurveyQnInput', 'views')
      },

    ]
  }
]

