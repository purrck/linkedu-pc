import listOrgSchoolCalendarXs from './listOrgSchoolCalendar'
import detailOrgSchoolCalendarXs from './detailOrgSchoolCalendar'
import schedule from './schedule'

const model = 'basedata';

export default {
  children: [
    {path: `/${model}/listOrgSchoolCalendarXs`, name: 'listOrgSchoolCalendarXs', label: '校历管理', component: listOrgSchoolCalendarXs},
    {path: `/${model}/detailOrgSchoolCalendarXs/:type/:id`, name: 'detailOrgSchoolCalendarXs', label: '校历管理', component: detailOrgSchoolCalendarXs},
  ]
}
