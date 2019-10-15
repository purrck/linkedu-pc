import listMeetingchecklist444 from './listMeetingChecklist'
import detailMeetingChecklist444 from './detailMeetingChecklist'

const _import = require('@/router/_import');

export default {
  children: [
    {
      path: '/safety/listMeetingChecklist',
      name: '/safety/listMeetingChecklist',
      label: '会议签到4',
      component: listMeetingchecklist444
    },
    {
      path: '/safety/detailMeetingChecklist/:type/:id',
      name: '/safety/detailMeetingChecklist',
      label: '会议签到4',
      component:detailMeetingChecklist444
    },
  ]
}
