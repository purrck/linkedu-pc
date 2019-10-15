import listMessagetp from  './listMessagetp'
import editMessagetp from  './editMessagetp'

export default {
  children: [
    {
      path: '/safety/messagetp',
      name: '/safety/messagetp',
      label: '消息模板',
      component: listMessagetp
    },
    {
      path: '/safety/editMessagetp/:type/:id',
      name: '/safety/editMessagetp',
      label: '消息模板',
      component: editMessagetp
    },
  ]
}

