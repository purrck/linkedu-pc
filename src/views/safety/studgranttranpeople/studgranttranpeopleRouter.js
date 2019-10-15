import listGrantTranPeople from './listGrantTranPeople'
import detailGrantTranPeople from './detailGrantTranPeople'

export default {
  children: [
    {
      path: '/safety/listGrantTranPeople',
      name: '/safety/listGrantTranPeople',
      label: '授权接送人',
      component: listGrantTranPeople
    },
    {
      path: '/safety/detailGrantTranPeople/:type/:id',
      name: '/safety/detailGrantTranPeople',
      label: '授权接送人',
      component: detailGrantTranPeople
    },
  ]
}

