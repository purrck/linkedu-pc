import listSchoolDocIndex from './listSchoolDocIndex'
import detailSchoolDocIndex from './detailSchoolDocIndex'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listSchoolDocIndex`, name : 'listSchoolDocIndex', component : listSchoolDocIndex},
    {path: `/${model}/detailSchoolDocIndex/:type/:id`, name : 'detailSchoolDocIndex', component : detailSchoolDocIndex},
  ]
}
