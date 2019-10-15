import listGranttransfer from '@/views/safety/studentgranttransfer/listGrantTransfer'
import detailGrantTransfer from '@/views/safety/studentgranttransfer/detailGrantTransfer'
const model = 'safety';

export default {children:[
    {
      path: '/safety/listGrantTransfer',
      name: '/safety/listGrantTransfer',
      label: '授权接送',
      component: listGranttransfer
    },

    {
      path: '/safety/detailGrantTransfer/:type/:id',
      name: '/safety/detailGrantTransfer',
      label: '授权接送',
      component: detailGrantTransfer
    },
]}
