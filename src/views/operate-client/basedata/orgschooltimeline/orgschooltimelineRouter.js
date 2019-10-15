import listOrgSchoolTimeline from './listOrgSchoolTimeline'
import detailOrgSchoolTimeline from './detailOrgSchoolTimeline'

const model = 'basedata';
export default {
  children: [
    {path: `/${model}/listOrgSchoolTimeline`, name: `listOrgSchoolTimeline`, label: '作息', component: listOrgSchoolTimeline},
    {path: `/${model}/detailOrgSchoolTimeline/:type/:id`, name: `detailOrgSchoolTimeline`, label: '作息', component: detailOrgSchoolTimeline}
  ]
}
