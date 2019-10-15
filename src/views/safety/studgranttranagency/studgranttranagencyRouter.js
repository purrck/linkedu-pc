import listGrantTranAgency from './listGrantTranAgency'
import detailGrantTranAgency from './detailGrantTranAgency'

const model = 'safety';
export default {children:[
    {
      path: '/safety/listGrantTranAgency',
      name: '/safety/listGrantTranAgency',
      label: '授权接送委托机构',
      component: listGrantTranAgency
    },
    {
      path: '/safety/detailGrantTranAgency/:type/:id',
      name: '/safety/detailGrantTranAgency',
      label: '授权接送委托机构',
      component: detailGrantTranAgency
    },
]}
