import listAnalysisPointGroup from './listAnalysisPointGroup'
import detailAnalysisPointGroup from './detailAnalysisPointGroup'
const model = 'admin';

export default {
  children:[
    {path: `/${model}/listAnalysisPointGroup`, name : 'listAnalysisPointGroup',label:'', component : listAnalysisPointGroup},
    {path: `/${model}/detailAnalysisPointGroup/:type/:id`, name : 'detailAnalysisPointGroup',label:'', component : detailAnalysisPointGroup},
  ]
}
