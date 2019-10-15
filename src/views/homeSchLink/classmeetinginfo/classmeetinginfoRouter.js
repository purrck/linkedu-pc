import listClassMeetingInfo from './listClassMeetingInfo'
import detailClassMeetingInfo from './detailClassMeetingInfo'

const model = 'homeSchLink';

export default {
  children: [
    {
      path: `/${model}/listClassMeetingInfo`,
      name: 'listClassMeetingInfo',
      label: '家长会',
      component: listClassMeetingInfo
    },
    {
      path: `/${model}/detailClassMeetingInfo/:type/:id`,
      name: 'detailClassMeetingInfo',
      label: '家长会',
      component: detailClassMeetingInfo
    },
  ]
}
