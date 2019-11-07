import listPrincipalMailbox from './listPrincipalMailbox'
import detailPrincipalMailbox from './detailPrincipalMailbox'
const model = 'newApplications';

export default {
  children:[
    {path: `/${model}/listPrincipalMailbox`, name : 'listPrincipalMailbox', component : listPrincipalMailbox},
    {path: `/${model}/detailPrincipalMailbox/:type/:id`, name : 'detailPrincipalMailbox', component : detailPrincipalMailbox},
  ]
}
