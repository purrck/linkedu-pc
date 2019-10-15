import listSegment from './listSegment'
import detailSegment from './detailSegment'

export default {children:[
    {path: `/basedata/listSegment`, name: `/basedata/listSegment`, label: '学段', component: listSegment},
    {
      path: `/basedata/detailSegment/:type/:id`,
      name: `/basedata/detailSegment/:type/:id`,
      label: '学段',
      component: detailSegment
    },
]}
