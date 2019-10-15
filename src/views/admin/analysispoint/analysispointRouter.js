import listAnalysisPoint from './listAnalysisPoint'
import detailAnalysisPoint from './detailAnalysisPoint'
const model = 'admin';

export default {
  children:[
    {path: `/${model}/listAnalysisPoint`, name : 'listAnalysisPoint',label:'', component : listAnalysisPoint},
    {path: `/${model}/detailAnalysisPoint/:type/:id`, name : 'detailAnalysisPoint',label:'', component : detailAnalysisPoint},
  ]
}
