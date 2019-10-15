import listGrade from '@/views/basedata/basicgrade/listGrade'
import detailGrade from '@/views/basedata/basicgrade/detailGrade'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'basedata';

export default {children:[
    {path: `/basedata/listGrade`, name: `/basedata/listGrade`, label: '年级信息', component: listGrade},
    {
      path: `/basedata/detailGrade/:type/:id`,
      name: `/basedata/detailGrade/:type/:id`,
      label: '年级信息',
      component: detailGrade
    },
]}
