import listOrgSchoolCalendar from './listOrgSchoolCalendar'
import detailOrgSchoolCalendar from './detailOrgSchoolCalendar'

const model = 'basedata';

export default {
  children: [
    {path: `/${model}/listOrgSchoolCalendar`, name: 'listOrgSchoolCalendar', label: '校历管理', component: listOrgSchoolCalendar},
    {path: `/${model}/detailOrgSchoolCalendar/:type/:id`, name: 'detailOrgSchoolCalendar', label: '校历管理', component: detailOrgSchoolCalendar}
  ]
}
