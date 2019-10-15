
import listOrgSchoolTimelineDetail from './listOrgSchoolTimelineDetail'
import detailOrgSchoolTimelineDetail from './detailOrgSchoolTimelineDetail'
const model = 'basedata';
export default {
      children:[
          {path: `/${model}/listOrgSchoolTimelineDetail`, name : 'listOrgSchoolTimelineDetail',  label: '学校日常作息安排', component : listOrgSchoolTimelineDetail},
          {path: `/${model}/detailOrgSchoolTimelineDetail/:type/:id`, name : 'detailOrgSchoolTimelineDetail', label: '学校日常作息安排',  component : detailOrgSchoolTimelineDetail},
      ]
}
