
import listOrgSchoolTimelineDetailXs from './listOrgSchoolTimelineDetail'
import detailOrgSchoolTimelineDetailXs from './detailOrgSchoolTimelineDetail'
const model = 'basedata';
export default {
      children:[
          {path: `/${model}/listOrgSchoolTimelineDetailXs`, name : 'listOrgSchoolTimelineDetailXs',  label: '学校日常作息安排', component : listOrgSchoolTimelineDetailXs},
          {path: `/${model}/detailOrgSchoolTimelineDetailXs/:type/:id`, name : 'detailOrgSchoolTimelineDetailXs', label: '学校日常作息安排',  component : detailOrgSchoolTimelineDetailXs},
      ]
}
