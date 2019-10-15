import listMeeting from './listMeetingInfo'
import detailMeeting from './detailMeetingInfo'

const _import = require('@/router/_import')
export default
  {
    children: [
      {
        path: '/safety/listMeetinginfo',
        name: '会议记录',
        label: '会议记录',
        component: listMeeting
      },
      {
        path: '/safety/detailMeetingInfo/:type/:id',
        name: '会议记录',
        label: '会议记录',
        component: detailMeeting
      },

    ]
  }
