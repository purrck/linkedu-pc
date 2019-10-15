import listAnalysisPointInfo from './listAnalysisPointInfo'
import detailAnalysisPointInfo from './detailAnalysisPointInfo'
const model = 'admin';

export default {
  children:[
    {path: `/${model}/listAnalysisPointInfo`, name : 'listAnalysisPointInfo',label:'', component : listAnalysisPointInfo},
    {path: `/${model}/detailAnalysisPointInfo/:type/:id`, name : 'detailAnalysisPointInfo',label:'', component : detailAnalysisPointInfo},
  ]
}
