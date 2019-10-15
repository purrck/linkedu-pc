
import listOrgSchoolCalendarDetail from './listOrgSchoolCalendarDetail'
import detailOrgSchoolCalendarDetail from './detailOrgSchoolCalendarDetail'
const model = 'basedata';

export default {
        children:[
            {path: `/${model}/listOrgSchoolCalendarDetail`, name : 'listOrgSchoolCalendarDetail',label : '校历', component : listOrgSchoolCalendarDetail},
            {path: `/${model}/detailOrgSchoolCalendarDetail/:type/:id`, name : 'detailOrgSchoolCalendarDetail',label : '校历', component : detailOrgSchoolCalendarDetail},
        ]
}
