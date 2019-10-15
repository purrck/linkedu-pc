import listComplaintSuggest from './listComplaintSuggest'
import detailComplaintSuggest from './detailComplaintSuggest'
export default {children:[
    {
      path: `/basedata/listComplaintSuggest`,
      name: `/basedata/listComplaintSuggest`,
      label: '投诉记录',
      component: listComplaintSuggest
    },
    {
      path: '/basedata/detailComplaintSuggest/:type/:id',
      name: '/basedata/detailComplaintSuggest/:type/:id',
      label: '投诉记录',
      component: detailComplaintSuggest
    },
]}
