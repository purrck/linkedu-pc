import listSchoolDocLibrary from './listSchoolDocLibrary'
import detailSchoolDocLibrary from './detailSchoolDocLibrary'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listSchoolDocLibrary`, name : 'listSchoolDocLibrary', component : listSchoolDocLibrary},
    {path: `/${model}/detailSchoolDocLibrary/:type/:id`, name : 'detailSchoolDocLibrary', component : detailSchoolDocLibrary},
  ]
}
