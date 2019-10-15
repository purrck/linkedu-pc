
import listMeetingChecklist from './listClassMeetingChecklist'
import detailMeetingChecklist from './detaiClasslMeetingChecklist'
const model = 'homeSchLink';

export default {
        children:[
            {path: `/${model}/listMeetingChecklist2`, name : 'listMeetingChecklist',label : '签到列表', component : listMeetingChecklist},
            {path: `/${model}/detailMeetingChecklist2/:type/:id`, name : 'detailMeetingChecklist',label : '签到列表', component : detailMeetingChecklist},
        ]
}
