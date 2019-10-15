/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */
const _import = require('../router/_import')
//学校管理端
export default [

  {label: '首页', name: '首页', path: '/page/wel', component: 'Layout', children: []},
  {
    label: '系统管理', name: '系统管理', path: '/admin', component: 'Layout', children: [
      {
        children: [],
        component: 'views/admin/pageone',
        label: '菜单管理',
        name: '菜单管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [],
        component: 'views/admin/pageone',
        label: '角色管理',
        name: '角色管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [],
        component: 'views/admin/pageone',
        label: '资源管理',
        name: '资源管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [],
        component: 'views/admin/pageone',
        label: '数据字典',
        name: '数据字典',
        path: '/page/pagetwo',
        redirect: null,
      },
    ]
  },
  {
    label: '基础数据', name: '基础数据', path: '/basedata', component: 'Layout', children: [
      {
        children: [],
        component: 'views/basedata/pageone',
        label: '学校管理',
        name: '学校管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [],
        component: 'views/basedata/pageone',
        label: '校历管理',
        name: '校历管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [],
        component: 'views/basedata/pageone',
        label: '学段和年级管理',
        name: '学校管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [
          {
            children: [],
            component: 'views/basedata/pageone',
            label: '查看班级数据',
            name: '查看班级数据',
            path: '/page/pagetwo',
            redirect: null,
          },
        ],
        component: 'views/basedata/pageone',
        label: '班级管理',
        name: '班级管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [
          {
            children: [],
            component: 'views/basedata/pageone',
            label: '查看学生数据',
            name: '查看学生数据',
            path: '/page/pagetwo',
            redirect: null,
          },
        ],
        component: 'views/basedata/pageone',
        label: '学生管理',
        name: '学生管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [
          {
            children: [],
            component: 'views/basedata/pageone',
            label: '查看教职工数据',
            name: '查看教职工数据',
            path: '/page/pagetwo',
            redirect: null,
          },
        ],
        component: 'views/basedata/pageone',
        label: '教职工管理',
        name: '教职工管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [
          {
            children: [],
            component: 'views/basedata/pageone',
            label: '查看家长数据',
            name: '查看家长数据',
            path: '/page/pagetwo',
            redirect: null,
          },
        ],
        component: 'views/basedata/pageone',
        label: '家长管理',
        name: '家长管理',
        path: '/page/pagetwo',
        redirect: null,
      },
    ]
  },
  {
    label: '安全教育', name: '安全教育', path: '/safetyEdu', component: 'Layout', children: [
      {
        children: [
          {
            children: [],
            selected:false,
            label: '栏目',
            name: '栏目',
            component: 'views/safetyEdu/pageone',
            path: '/page/pagetwo',
          }, {
            children: [],
            selected:false,
            label: '文章',
            name: '文章',
            component: 'views/safetyEdu/pageone',
            path: '/page/pagetwo',
          }, {
            children: [],
            selected:false,
            label: '模板',
            name: '模板',
            component: 'views/safetyEdu/pageone',
            path: '/page/pagetwo',
          },
        ],
        component: 'Layout',
        label: '安全资讯管理',
        name: '安全资讯管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [
          {
            children: [],
            selected:false,
            label: '问卷管理',
            name: '问卷管理',
            path: '/page/pagetwo',
          }, {
            children: [],
            selected:false,
            label: '测验管理',
            name: '测验管理',
            path: '/page/pagetwo',
          }, {
            children: [],
            selected:false,
            label: '题库管理',
            name: '题库管理',
            path: '/page/pagetwo',
          },

        ],
        component: 'Layout',
        label: '安全问卷和测验管理',
        name: '安全问卷和测验管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [
          {
            children: [],
            selected:false,
            label: '课程管理',
            name: '课程管理',
            path: '/page/pagetwo',
          }, {
            children: [],
            selected:false,
            label: '章节管理',
            name: '章节管理',
            path: '/page/pagetwo',
          }, {
            children: [],
            selected:false,
            label: '课时管理',
            name: '课时管理',
            path: '/page/pagetwo',
          },
        ],
        component: 'Layout',
        label: '安全课程管理',
        name: '安全课程管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [
          {
            children: [],
            selected:false,
            label: '活动管理',
            name: '活动管理',
            path: '/safetyEdu/edu_activity',
          }, {
            children: [],
            selected:false,
            label: '报名记录',
            name: '报名记录',
            path: '/safetyEdu/record',
          },
        ],
        component: 'Layout',
        label: '安全教育活动管理',
        name: '安全教育活动管理',
        path: '/page/safetyEdu',
        redirect: null,
      },
    ]
  },
  {
    label: '安全管理', name: '安全管理', path: '/safety', component: 'Layout', children: [
      {
        children: [
          {
            children: [],
            selected:false,
            label: '巡检统计',
            name: '巡检统计',
            path: '/page/pagetwo',
          }
        ],
        component: 'Layout',
        label: '巡检管理',
        name: '巡检管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [
          {
            children: [],
            selected:false,
            label: '事故统计',
            name: '事故统计',
            path: '/page/pagetwo',
          }
        ],
        component: 'Layout',
        label: '事故隐患上报管理',
        name: '事故隐患上报管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [
          {
            children: [],
            selected:false,
            label: '课表记录',
            name: '课表记录',
            path: '/page/pagetwo',
          }
        ],
        component: 'Layout',
        label: '课程表管理',
        name: '课程表管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [
          {
            children: [],
            selected:false,
            label: '授权接送统计',
            name: '授权接送统计',
            path: '/page/pagetwo',
          }
        ],
        component: 'Layout',
        label: '授权接送管理',
        name: '授权接送管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [
          {
            children: [],
            selected:false,
            label: '查看考勤统计',
            name: '查看考勤统计',
            path: '/page/pagetwo',
          }
        ],
        component: 'Layout',
        label: '考勤管理',
        name: '考勤管理',
        path: '/page/pagetwo',
        redirect: null,
      }, {
        children: [
          {
            children: [],
            selected:false,
            label: '通知统计',
            name: '通知统计',
            path: '/safety/bulletin',
          }
        ],
        component: 'Layout',
        label: '通知管理',
        name: '通知管理',
        path: '/safety/bulletinInfo',
        redirect: null,
      }, {
        children: [
          {
            children: [],
            selected:false,
            label: '请假统计',
            name: '请假统计',
            path: '/page/pagetwo',
          }
        ],
        component: 'Layout',
        label: '请假',
        name: '请假',
        path: '/page/pagetwo',
        redirect: null,
      }
    ]
  },
]

