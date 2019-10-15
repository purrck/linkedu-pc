import listActivityInfo from './index'
import detailActivityInfo from './detailActivityInfo'
import detailActivityInfoSchool from './detailActivityInfoSchool'
import activityTotal from './activityTotal'
import send from './send'
import resources from './resources'
import mingdan from './mingdan'
const model = 'safetyEdu';

export default {
        children:[
            {path: `/${model}/edu_activity`, name : 'listActivityInfo', component : listActivityInfo},
            {path: `/${model}/edu_detailActivityDetail/:type/:id`, name : 'detailActivityInfo', component : detailActivityInfo},
            {path: `/${model}/edu_detailActivityDetailSchool`,label:"新增活动信息", name : 'detailActivityInfoSchool', component : detailActivityInfoSchool},
            {path: `/${model}/activityTotal`, name : 'activityTotal', component : activityTotal},
            {path: `/${model}/activitySend`, label:"发送对象", name : 'activitySend', component : send},
            {path: `/${model}/activityResources`, name : 'activityResources', component : resources},
            {path: `/${model}/activityMingdan`, name : 'activityMingdan',label:"参与名单", component : mingdan},
        ]
}
