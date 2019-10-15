import listMessagetptxt from './listMessagetptxt'
import editMessagetptxt from './editMessagetptxt'

export default {
  children: [
    {
      path: '/safety/messagetptxt',
      name: '/safety/messagetptxt',
      label: '消息头底部',
      component:listMessagetptxt
    },
    {
      path: '/safety/editMessagetptxt/:type/:id',
      name: '/safety/editMessagetptxt/:type/:id',
      label: '消息头底部',
      component: editMessagetptxt
    },

  ]
}

