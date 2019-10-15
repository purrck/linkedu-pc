
import listOrgSchoolCalendarDetailXs from './listOrgSchoolCalendarDetail'
import detailOrgSchoolCalendarDetailXs from './detailOrgSchoolCalendarDetail'
const model = 'basedata';

export default {
        children:[
            {path: `/${model}/listOrgSchoolCalendarDetailXs`, name : 'listOrgSchoolCalendarDetailXs',label : '校历明细', component : listOrgSchoolCalendarDetailXs},
            {path: `/${model}/detailOrgSchoolCalendarDetailXs/:type/:id`, name : 'detailOrgSchoolCalendarDetailXs',label : '校历明细', component : detailOrgSchoolCalendarDetailXs},
        ]
}
