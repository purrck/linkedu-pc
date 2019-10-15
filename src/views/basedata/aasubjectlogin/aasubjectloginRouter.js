import listAaSubjectLogin from './listAaSubjectLogin'
import detailAaSubjectLogin from './detailAaSubjectLogin'
export default {
  children: [
    {
      path: `/basedata/listAaSubjectLogin`,
      name: `/basedata/listAaSubjectLogin`,
      label: '账户登陆信息',
      component: listAaSubjectLogin
    },
    {
      path: `/basedata/detailAaSubjectLogin/:type/:id`,
      name: `/basedata/detailAaSubjectLogin/:type/:id`,
      label: '账户登陆信息',
      component: detailAaSubjectLogin
    },
  ]
}
