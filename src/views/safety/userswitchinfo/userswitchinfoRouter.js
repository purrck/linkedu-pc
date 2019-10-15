import listUserSwitchInfo from './listUserSwitchInfo'
import detailUserSwitchInfo from './detailUserSwitchInfo'
export default {
  children: [
    {path: `/safety/listUserSwitchInfo`, name: 'listUserSwitchInfo', label: '用户开关配置', component: listUserSwitchInfo},
    {
      path: `/safety/detailUserSwitchInfo/:type/:id`,
      name: 'detailUserSwitchInfo',
      label: '用户开关配置',
      component: detailUserSwitchInfo
    },
  ]
}
