import listAaSubjectRes from '@/views/basedata/aasubjectres/listAaSubjectRes'
import detailAaSubjectRes from '@/views/basedata/aasubjectres/detailAaSubjectRes'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'basedata';

export default {children:[
    {
      path: `/basedata/listAaSubjectRes`,
      name: `/basedata/listAaSubjectRes`,
      label: '账户资源',
      component: listAaSubjectRes
    },

    {
      path: `/basedata/detailAaSubjectRes/:type/:id`,
      name: `/basedata/detailAaSubjectRes/:type/:id`,
      label: '账户资源',
      component: detailAaSubjectRes
    },
]}
