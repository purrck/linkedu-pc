import listSystemmessage from './listSystemmessage'
import editSystemmessage from './editSystemmessage'

export default {
  children: [
    {
      path: '/safety/systemmessage',
      name: '/safety/systemmessage',
      label: '系统消息',
      component: listSystemmessage
    },
    {
      path: '/safety/editSystemmessage/:type/:id',
      name: '/safety/editSystemmessage/',
      label: '系统消息',
      component: editSystemmessage
    },
  ]
}
