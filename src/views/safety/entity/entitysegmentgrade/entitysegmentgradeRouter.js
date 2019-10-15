import listEntitySegmentGrade from './listEntitySegmentGrade'
import detailEntitySegmentGrade from './detailEntitySegmentGrade'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'safety';
export default {children:[
    {path: `/safety/listEntitySegmentGrade`, name: 'listEntitySegmentGrade', label: '信息适用学段和年级', component: listEntitySegmentGrade},
    {path: `/safety/detailEntitySegmentGrade/:type/:id`, name: 'detailEntitySegmentGrade', label: '信息适用学段和年级', component: detailEntitySegmentGrade},
]}
