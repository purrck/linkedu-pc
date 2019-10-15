import listOrgSchoolTimelineXs from './listOrgSchoolTimeline'
import detailOrgSchoolTimelineXs from './detailOrgSchoolTimeline'

const model = 'basedata';
export default {
  children: [
    {path: `/${model}/listOrgSchoolTimelineXs`, name: `listOrgSchoolTimelineXs`, label: '作息', component: listOrgSchoolTimelineXs},
    {path: `/${model}/detailOrgSchoolTimelineXs/:type/:id`, name: `detailOrgSchoolTimelineXs`, label: '作息', component: detailOrgSchoolTimelineXs}
  ]
}
