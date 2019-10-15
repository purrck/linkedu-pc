import listComplaintReply from './listComplaintReply'
import detailComplaintReply from './detailComplaintReply'

export default {
  children: [
    {
      path: `/basedata/listComplaintReply`,
      name: `/basedata/listComplaintReply`,
      label: `投诉回执`,
      component: listComplaintReply
    },
    {
      path: `/basedata/detailComplaintReply/:type/:id`,
      name: `/basedata/detailComplaintReply/:type/:id`,
      label: `投诉回执`,
      component: detailComplaintReply
    },
  ]
}
