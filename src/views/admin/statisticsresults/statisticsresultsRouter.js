import listStatisticsResults from '@/views/safety/statisticsresults/listStatisticsResults'
import detailStatisticsResults from '@/views/safety/statisticsresults/detailStatisticsResults'
import Layout from '@/components/container/index'
const _import = require('@/router/_import');
const model = 'safety';

export default {children:[
    {path: `/${model}/listStatisticsResults`, name : 'listStatisticsResults', component : listStatisticsResults},
    {path: `/${model}/detailStatisticsResults/:type/:id`, name : 'detailStatisticsResults', component : detailStatisticsResults},
]}
