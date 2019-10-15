import listSystemErrorLog from './listSystemErrorLog'
import detailSystemErrorLog from './detailSystemErrorLog'


export default {children:[
    {
      path: `/basedata/listSystemErrorLog`,
      name: `/basedata/listSystemErrorLog`,
      label: '系统错误日志',
      component: listSystemErrorLog
    },
    {
      path: `/basedata/detailSystemErrorLog/:type/:id`,
      name: `/basedata/detailSystemErrorLog/:type/:id`,
      label: '系统错误日志',
      component: detailSystemErrorLog
    },
]}
