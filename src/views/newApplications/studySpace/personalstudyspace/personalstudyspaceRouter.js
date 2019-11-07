import listPersonalStudySpace from './listPersonalStudySpace'
import detailPersonalStudySpace from './detailPersonalStudySpace'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listPersonalStudySpace`, name : 'listPersonalStudySpace', component : listPersonalStudySpace},
    {path: `/${model}/detailPersonalStudySpace/:type/:id`, name : 'detailPersonalStudySpace', component : detailPersonalStudySpace},
  ]
}
