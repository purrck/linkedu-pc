import listPersonalStudySpaceFollow from './listPersonalStudySpaceFollow'
import detailPersonalStudySpaceFollow from './detailPersonalStudySpaceFollow'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listPersonalStudySpaceFollow`, name : 'listPersonalStudySpaceFollow', component : listPersonalStudySpaceFollow},
    {path: `/${model}/detailPersonalStudySpaceFollow/:type/:id`, name : 'detailPersonalStudySpaceFollow', component : detailPersonalStudySpaceFollow},
  ]
}
