import listSubjectSegment from './listSubjectSegment'
import detailSubjectSegment from './detailSubjectSegment'

export default {
  children: [
    {
      path: `/basedata/listSubjectSegment`,
      name: `/basedata/listSubjectSegment`,
      label: '学段开设学科',
      component: listSubjectSegment
    },
    {
      path: `/basedata/detailSubjectSegment/:type/:id`,
      name: `/basedata/detailSubjectSegment/:type/:id`,
      label: '学段开设学科',
      component: detailSubjectSegment
    },
  ]
}
