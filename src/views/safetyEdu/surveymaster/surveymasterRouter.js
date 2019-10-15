import listSurveyMasterV2 from './listSurveyMasterV2'
import ListSurveySourse from './ListSurveySourse'
import detailSurveySourseV2 from './detailSurveySourse'
import detailSurveyMasterV2 from './detailSurveyMaster'
import surveyMasterTotal from './surveyMasterTotal'
import surveySearch from './surveySearch'
const model = 'safetyEdu';

export default {
  children:[
    {path: `/${model}/listSurveyMaster`, name : 'listSurveyMaster', label : '问卷信息', component : listSurveyMasterV2},
    {path: `/${model}/surveySearch/:id`, name : 'surveySearch', label : '问卷调查信息', component : surveySearch},
    {path: `/${model}/surveyMasterTotal`, name : 'surveyMasterTotal', label : '问卷统计', component : surveyMasterTotal},
    {path: `/${model}/ListSurveySourse`, name : 'ListSurveySourse', label : '问卷资源', component : ListSurveySourse},
    {path: `/${model}/detailSurveySourse/:type/:id`, name : 'detailSurveySourse', label : '问卷资源', component : detailSurveySourseV2},
    {path: `/${model}/detailSurveyMaster/:type/:id`, name : 'detailSurveyMaster', label : '问卷资源', component : detailSurveyMasterV2},
  ]
}
