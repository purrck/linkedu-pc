const _import = require('@/router/_import');
const model = 'safetyEdu';
export default {
  children: [
    {
      path: '/safetyEdu/guankanList',
      name: '/safetyEdu/guankanList',
      label: '校园课程观看记录',
      component: _import('safetyEdu/schoolcourse/guankanList', 'views')
    },
    {
      path: '/safetyEdu/schoolCourseList',
      name: '/safetyEdu/schoolCourseList',
      label: '课程管理',
      component: _import('safetyEdu/schoolcourse/courseList', 'views')
    },
    {
      path: '/safetyEdu/schoolCourseAdd',
      name: '/safetyEdu/schoolCourseAdd',
      label: '课程管理',
      component: _import('safetyEdu/schoolcourse/courseAdd', 'views')
    },
    // {
    //   path: '/safetyEdu/send',
    //   name: '/safetyEdu/send',
    //   label: '课程管理-发送对象',
    //   component: _import('safetyEdu/schoolcourse/send', 'views')
    // },
    {
      path: '/safetyEdu/schoolCourseRes/:type',
      name: '/safetyEdu/schoolCourseRes',
      label: '课程资源',
      component: _import('safetyEdu/schoolcourse/courseResources', 'views')
    },
    {
      path: '/safetyEdu/schoolCourseReview',
      name: '/safety/schoolCourseReview',
      label: '预览查看',
      component: _import('safetyEdu/schoolcourse/courseReview', 'views')
    },
  ]
}
