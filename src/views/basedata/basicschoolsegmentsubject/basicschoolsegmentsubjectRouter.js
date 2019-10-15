import listSchoolSegmentSubject from './listSchoolSegmentSubject'
import detailSchoolSegmentSubject from './detailSchoolSegmentSubject'
import addSubject from './addSubject'

export default {
  children: [
    {
      path: `/basedata/listSchoolSegmentSubject`,
      name: `/basedata/listSchoolSegmentSubject`,
      label: '学校学段学科',
      component: listSchoolSegmentSubject
    },
    {
      path: `/basedata/listSchoolSegmentSubject/addSubject`,
      name: `学校学段学科`,
      component: addSubject
    },
    {
      path: `/basedata/detailSchoolSegmentSubject/:type/:id`,
      name: `/basedata/detailSchoolSegmentSubject/:type/:id`,
      label: '学校学段学科',
      component: detailSchoolSegmentSubject
    },
  ]
}
