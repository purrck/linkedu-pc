import listUserSwitchTemp from './listUserSwitchTemp'
import detailUserSwitchTemp from './detailUserSwitchTemp'

export default {
  children: [
    {path: `/safety/listUserSwitchTemp`,
      name: 'listUserSwitchTemp',
      label: '用户应用开关',
      component: listUserSwitchTemp
    },
    {
      path: `/safety/detailUserSwitchTemp/:type/:id`,
      name: 'detailUserSwitchTemp',
      label: '用户应用开关',
      component: detailUserSwitchTemp
    },
  ]
}
