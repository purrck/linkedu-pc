import listAaSubjectPwdHistory from '@/views/basedata/aasubjectpwdhistory/listAaSubjectPwdHistory'
import detailAaSubjectPwdHistory from '@/views/basedata/aasubjectpwdhistory/detailAaSubjectPwdHistory'
const model = 'basedata';

export default {children:[
    {
      path: `/basedata/listAaSubjectPwdHistory`,
      name: `/basedata/listAaSubjectPwdHistory`,
      label: '账户密码修改历史',
      component: listAaSubjectPwdHistory
    },
    {
      path: `/basedata/detailAaSubjectPwdHistory/:type/:id`,
      name: `/basedata/detailAaSubjectPwdHistory/:type/:id`,
      label: '账户密码修改历史',
      component: detailAaSubjectPwdHistory
    },
]}
