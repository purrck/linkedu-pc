import listCourseBulletin from './listCourseBulletin'
import detailCourseBulletin from './detailCourseBulletin'

const model = 'safety'

export default {
  children: [
    {path: `/${model}/listCourseBulletin`, name: 'listCourseBulletin', component: listCourseBulletin},
    {path: `/${model}/detailCourseBulletin/:type/:id`, name: 'detailCourseBulletin', component: detailCourseBulletin},
  ]
}
