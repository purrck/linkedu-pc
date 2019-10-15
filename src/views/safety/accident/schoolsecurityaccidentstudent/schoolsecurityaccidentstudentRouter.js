import listSecurityAccidentStudent from './listSecurityAccidentStudent'
import detailSecurityAccidentStudent from './detailSecurityAccidentStudent'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listSecurityAccidentStudent`, name: 'listSecurityAccidentStudent', label:'事故学生', component: listSecurityAccidentStudent},
    {path: `/${model}/detailSecurityAccidentStudent/:type/:id`, name: 'detailSecurityAccidentStudent', label:'事故学生', component: detailSecurityAccidentStudent},
  ]
}
