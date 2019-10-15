export default [
  {
    label: '用户账号中心',
    name: '用户账号中心',//0105 云鹏
    path: '/basedata',
    component: 'Layout',
    selected: false,
    children: [
      {
        children: [],
        selected: false,
        label: '用户开关信息',
        name: '用户开关信息',
        path: '/safety/listUserSwitchInfo',
        redirect: null,
      },
      {
        children: [],
        selected: false,
        label: '用户行为日志',
        name: '用户行为日志',
        path: '/safety/listAmAccesslogentry',
        redirect: null,
      },
    ],
  },
  {
    label: '运营管理',
    name: '运营管理',
    path: '/admin',
    component: 'Layout',
    selected: false,
    children: [
      {
        children: [
          {
            children: [],
            selected: false,
            path: '/basedata/listBasicSchoolOrgV2',
            label: '学校',
            name: '学校'
          }, {
            children: [],
            selected: false,
            path: '/basedata/listSegment',
            label: '学段',
            name: '学段'
          },{
            children: [],
            selected: false,
            path: '/basedata/listGrade',
            label: '年级',
            name: '年级'
          },  {
            children: [],
            selected: false,
            path: '/basedata/listSubject',
            label: '学科',
            name: '学科'
          }, {
            children: [],
            selected: false,
            path: '/basedata/listSubjectSegment',
            label: '学段学科',
            name: '学段学科'
          }, {
            children: [],
            selected: false,
            label: '校历管理',
            name: '校历管理',
            path: '/basedata/listOrgSchoolCalendar',
          },
          {
            children: [],
            selected: false,
            label: '作息管理',
            name: '作息管理',
            path: '/basedata/listOrgSchoolTimeline',
          },{
            children: [],
            selected: false,
            label: '假期管理',
            name: '假期管理',
            path: '/basedata/listPublicHoliday',
          }, {
            children: [],
            selected: false,
            label: '敏感词',
            name: '/basedata/listSensitiveWords',
            path: '/basedata/listSensitiveWords',
          }, {
            children: [],
            selected: false,
            label: '敏感词历史',
            name: '/basedata/listSensitiveWordsHis',
            path: '/basedata/listSensitiveWordsHis',
          }, {
            children: [],
            selected: false,
            label: '敏感词统计',
            name: '/basedata/sensitiveHisTotal',
            path: '/basedata/sensitiveHisTotal',
          },
          {
            children: [],
            selected: false,
            label: '安全提醒',
            name: '/securityReminder/listSchoolSecurityMessageTmp',
            path: '/securityReminder/listSchoolSecurityMessageTmp',
          },
        ],
        label: '配置管理',
        name: '配置管理',
        path: '/safetyEdu/',
        selected: false,
      },
      {
        children: [],
        selected: false,
        label: '我的文件夹',
        name: '我的文件夹',
        path: '/basedata/listFilefolder',
      },
      // {
      //   children: [],
      //   selected: false,
      //   label: '活动中心',
      //   name: '活动中心',
      //   path: '/safetyEdu/listActivityInfo',
      // },

      {
        children: [],
        selected: false,
        label: '帮助中心',
        name: '帮助中心',
        path: '/basedata/listFeedbackinfo',
      },
      {
        children: [],
        selected: false,
        label: '投诉反馈',
        name: '投诉反馈',
        path: '/basedata/listComplaintSuggest',
      },

      {
        children: [
          {
            children: [],
            selected: false,
            label: '信息审批',
            name: '信息审批',
            path: '/safety/listEntityApprove',
            redirect: null,
          },
          {
            children: [],
            selected: false,
            label: '信息收藏',
            name: '信息收藏',
            path: '/safety/listEntityCollection',
            redirect: null,
          }, {
            children: [],
            selected: false,
            label: '信息点赞',
            name: '信息点赞',
            path: '/safety/listEntityEvaluate',
            redirect: null,
          },
          {
            children: [],
            selected: false,
            label: '信息评论',
            name: '信息评论',
            path: '/safety/listEntityReplyinfo',
            redirect: null,
          },
          {
            children: [],
            selected: false,
            label: '浏览记录',
            name: '浏览记录',
            path: '/safety/listEntityReadinfo',
            redirect: null,
          },
          {
            children: [],
            selected: false,
            label: '信息管理统计分析',
            name: '信息管理统计分析',
            path: '/safety/messageManageTotal'
          },
        ],
        selected: false,
        label: '信息管理',
        name: '信息管理',
        path: '/safety',
        component: 'Layout2',
        redirect: null,
      },
      // {
      //   children: [],
      //   selected: false,
      //   label: '信息审批',
      //   name: '信息审批',
      //   path: '/safety/listEntityApprove',
      //   redirect: null,
      // },
      {
        children: [],
        selected: false,
        label: '统计分析',
        name: '统计分析',
        path: '/admin/listStatisticsJobs',
        redirect: null,
      },
      {
        children: [],
        selected: false,
        label: '用户搜索关键词',
        name: '用户搜索关键词',
        path: '/admin/listSystemSearchKeyword2user',
        redirect: null,
      },
      {
        children: [],
        selected: false,
        label: '推荐搜索关键字',
        name: '推荐搜索关键字',
        path: '/admin/listSystemSearchKeyword',
        redirect: null,
      },
      {
        children: [],
        selected: false,
        label: '应用管理',
        name: '应用管理',
        path: '/basedata/listAppList',
        redirect: null,
      }, {
        children: [],
        selected: false,
        label: '机构部门模板',
        name: '机构部门模板',
        path: '/basedata/listDepartTemplate',
      },{
        children: [
          {
            children: [],
            selected: false,
            label: '埋点信息',
            name: '埋点信息',
            path: '/admin/listAnalysisPointInfo',
          }, {
            children: [],
            selected: false,
            label: '埋点分组',
            name: '埋点分组',
            path: '/admin/listAnalysisPointGroup',
          }, {
            children: [],
            selected: false,
            label: '埋点',
            name: '埋点',
            path: '/admin/listAnalysisPoint',
          },
        ],
        selected: false,
        label: '用户行为分析',
        name: '用户行为分析',
        path: '/admin',
      },
    ]
  },
  {
    label: '安全教育',
    name: '安全教育',
    path: '/safetyEdu',
    component: 'Layout',
    selected: false,
    children: [
      {
        children: [
          {
            children: [],
            selected: false,
            label: '问卷信息',
            name: 'surveymaster',
            path: '/safetyEdu/listSurveyMasterOp',
            component: null
          },
        ],
        component: 'Layout2',
        label: '安全问卷',
        name: '安全问卷',
        path: '/safetyEdu',
        selected: false,
        redirect: null,
      },
      {
        children: [
          {
            children: [],
            label: '安全课程管理',
            name: '安全课程管理',
            path: '/safetyEdu/listCourseOp',
          },
          {
            children: [],
            label: '安全课时管理',
            name: '安全课时管理',
            path: '/safetyEdu/listCourseChapter',
          },
          {
            children: [],
            label: '兴趣课程管理',
            name: '兴趣课程管理',
            path: '/safetyEdu/ListInterestClass',
          },
          {
            children: [],
            label: '兴趣课时管理',
            name: '兴趣课时管理',
            path: '/safetyEdu/ListInterestChapter',
          }
        ],
        // component: 'Layout2',
        label: '安全课程',
        name: '安全课程',
      },
      {
        children: [
          {
            children: [],
            selected: false,
            label: '活动信息',
            name: 'listActivityInfoOp',
            path: '/safetyEdu/listActivityInfoOp',
          }

        ],
        component: 'Layout2',
        label: '安全教育活动',
        name: '安全教育活动',
        path: '/safetyEdu',
        selected: false,
        redirect: null,
      },
      {
        children: [
          {
            children: [],
            selected: false,
            label: '信息使用区域',
            name: '信息使用区域',
            path: '/safety/listEntityRegion',
          }, {
            children: [],
            selected: false,
            label: '适用年级学段',
            name: 'SegmentGrade',
            path: '/safety/listEntitySegmentGrade',
          },

        ],
        selected: false,
        label: '安全教育适用',
        name: '安全教育适用',
        path: 'Layout2',
        component: 'Layout2',
      },
      {
        name: '资讯',
        label: '资讯',
        component: 'Layout2',
        selected: false,
        path: '/safetyEdu',
        children: [
          {
            children: [],
            selected: false,
            label: '资讯管理',
            name: '资讯管理',
            path: '/safetyEdu/listPublishArticleOp',
          },
          {
            children: [],
            selected: false,
            label: '栏目管理',
            name: '栏目管理',
            path: '/safetyEdu/listPublishColumnOp',
          },
          // {
          //   children: [],
          //   selected: false,
          //   label: '资讯栏目',
          //   name: '资讯栏目',
          //   path: '/safetyEdu/listPublishColumn',
          // }, {
          //   children: [],
          //   selected: false,
          //   label: '资讯文章',
          //   name: '资讯文章',
          //   path: '/safetyEdu/listPublishArticle',
          // },
          // {
          //   children: [],
          //   selected: false,
          //   label: '资讯模板',
          //   name: '资讯模板',
          //   path: '/safetyEdu/listPublishTemplate',
          // },
        ]
      }
    ]
  },
  {
    label: '习惯养成',
    name: '习惯养成',
    path: '/specialEdu/listHabitAssignment',
    component: 'Layout',
    children: [
      {
        label: '习惯养成任务',
        name: '习惯养成任务',
        path: '/specialEdu/listHabitAssignment',
        component: 'Layout',
        children: []
      },{
        label: '心愿记录',
        name: '心愿记录',
        path: '/specialEdu/listHabitWishRecord',
        component: 'Layout',
        children: []
      },{
        label: '红花历史',
        name: '红花历史',
        path: '/specialEdu/listHabitFlowerHistory',
        component: 'Layout',
        children: []
      },{
        label: '任务类型',
        name: '任务类型',
        path: '/specialEdu/listHabitAssignmentType',
        component: 'Layout',
        children: []
      },
      {
        label: '激励心愿',
        name: '激励心愿',
        path: '/specialEdu/listHabitWish',
        component: 'Layout',
        children: []
      },
      // {
      //   label: '任务记录',
      //   name: '任务记录',
      //   path: '/specialEdu/listHabitAssignmentRecord',
      //   component: 'Layout',
      //   children: []
      // },

      {
        label: '心愿类型',
        name: '心愿类型',
        path: '/specialEdu/listHabitWishType',
        component: 'Layout',
        children: []
      },
    ]
  },
]
