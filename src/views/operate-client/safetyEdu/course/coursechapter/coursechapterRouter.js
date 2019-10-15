import listCourseChapter from './listCourseChapter'
import detailCourseChapter from './detailCourseChapter'
import ListInterestChapter from './ListInterestChapter'

const model = 'safetyEdu'

export default {
  children: [
    {path: `/${model}/listCourseChapter`, name: 'listCourseChapter',label:"课时列表", component: listCourseChapter},
    {path: `/${model}/detailCourseChapter`, name: 'detailCourseChapter',label:"课时", component: detailCourseChapter},
    {path: `/${model}/ListInterestChapter`, name: 'ListInterestChapter',label:"课时", component: ListInterestChapter},
  ]
}
