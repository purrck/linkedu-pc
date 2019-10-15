import listSchoolSegment from './listSchoolSegment'
import detailSchoolSegment from './detailSchoolSegment'
import addSegment from './addSegment'

export default {children:[
    {
      path: `/basedata/listSchoolSegment`,
      name: `/basedata/listSchoolSegment`,
      label: '学校学段',
      component: listSchoolSegment
    },
    {
      path: `/basedata/listSchoolSegment/addSegment`,
      name: `学校学段`,
      component:addSegment
    },
    {
      path: `/basedata/detailSchoolSegment`,
      name: `/basedata/detailSchoolSegment`,
      label: '学校学段',
      component: detailSchoolSegment
    },
]}
