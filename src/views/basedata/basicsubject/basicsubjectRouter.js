import listSubject from './listSubject'
import detailSubject from './detailSubject'

export default {
  children: [
    {path: `/basedata/listSubject`, name: `/basedata/listSubject`, label: '学科', component: listSubject},
    {
      path: `/basedata/detailSubject/:type/:id`,
      name: `/basedata/detailSubject/:type/:id`,
      label: '学科',
      component: detailSubject
    },
  ]
}
