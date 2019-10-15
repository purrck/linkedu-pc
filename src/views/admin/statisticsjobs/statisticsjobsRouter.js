import listStatisticsJobs from '@/views/safety/statisticsjobs/listStatisticsJobs'
import detailStatisticsJobs from '@/views/safety/statisticsjobs/detailStatisticsJobs'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'safety';

export default {children:[
    {path: `/${model}/listStatisticsJobs`, name : 'listStatisticsJobs', component : listStatisticsJobs},
    {path: `/${model}/detailStatisticsJobs/:type/:id`, name : 'detailStatisticsJobs', component : detailStatisticsJobs},
]}
