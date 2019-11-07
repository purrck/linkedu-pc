export default [
  {
    label: '基础数据',
    path: '/basedata',
    children: [
      {
        children: [],
        path: '/basedata/listBasicschoolorg',
        label: '学校管理',
      },
      {
        children: [],
        path: '/basedata/listSchoolSegment',
        label: '学校学段',
      },
      {
        children: [],
        path: '/basedata/listSchoolSegmentSubject',
        label: '学校学科',
      },
      {
        children: [],
        path: '/basedata/listTeacher',
        label: '教师管理',
      },
      {
        children: [],
        label: '班级管理',
        path: '/basedata/listClassInfo',
        redirect: null,
      },
      {
        children: [],
        selected: false,
        path: '/basedata/listClassTeacher',
        label: '班级科任教师',
      },
      {
        children: [],
        selected: false,
        label: '学生管理',
        path: '/basedata/listStudent',
        redirect: null,
      },
      {
        children: [],
        selected: false,
        label: '家长管理',
        path: '/basedata/listParent',
        redirect: null,
      },
      {
        children: [],
        selected: false,
        path: '/basedata/listStudentParent',
        label: '学生家长',
      },
      {
        children: [],
        selected: false,
        path: '/basedata/listOrgDepart',
        label: '部门职位',
      },
      {
        children: [],
        selected: false,
        label: '校历管理',
        path: '/basedata/listOrgSchoolCalendarXs',
      },
      {
        children: [],
        selected: false,
        label: '作息管理',
        path: '/basedata/listOrgSchoolTimelineXs',
      },
      {
        children: [],
        selected: false,
        label: '班级课程表',
        path: '/basedata/listClassCourseTableXs',
      },
      {
        children: [],
        selected: false,
        label: '学校场所',
        path: '/basedata/listBasicSchoolPlace',
      },
      {
        children: [],
        selected: false,
        label: '场所考勤规则',
        path: '/basedata/listSchoolPlaceTimeCheckRule',
      },
      {
        children: [],
        selected: false,
        label: '设备管理',
        path: '/basedata/listSchoolDevice',
      },
      // {
      //   children: [],
      //   selected: false,
      //   label: '学生设备',
      //   path: '/basedata/listStudentDevice',
      // },
    ],
  },
  {
    label: '安全教育',
    path: '/safetyEdu',
    component: 'Layout',
    children: [
      // {
      //   children: [
      //     {
      //       children: [],
      //       selected: false,
      //       label: '已发布',
      //       path: '/safety/listEntityOrganization/opening',
      //     },
      //     {
      //       children: [],
      //       selected: false,
      //       label: '全部',
      //       path: '/safety/listEntityOrganization/all',
      //     },
      //   ],
      //   selected: false,
      //   label: '安全教育组织',
      //   path: '/safety',
      //   component: 'Layout2'
      // },
      {
        children: [
          {
            children: [],
            selected: false,
            label: '课程信息',
            path: '/safetyEdu/schoolCourseList',
          },
          {
            children: [],
            selected: false,
            label: '安全课程资源',
            path: '/safetyEdu/schoolCourseRes/1',
          }, {
            children: [],
            selected: false,
            label: '兴趣课程资源',
            path: '/safetyEdu/schoolCourseRes/2',
          },
        ],
        selected: false,
        label: '课程管理',
        path: '/safety',
        component: 'Layout2'
      },
      {
        children: [
          {
            children: [],
            selected: false,
            label: '活动信息',
            path: '/safetyEdu/edu_activity',
          },
          {
            children: [],
            selected: false,
            label: '活动资源',
            path: '/safetyEdu/activityResources',
          },
          {
            children: [],
            selected: false,
            label: '活动数据统计',
            path: '/safetyEdu/activityTotal',
          },
        ],
        selected: false,
        label: '教育活动',
        path: '/safetyEdu/edu_activity',
      },
      {
        children: [
          {
            children: [],
            selected: false,
            label: '问卷信息',
            path: '/safetyEdu/listSurveyMaster',
          },
          {
            children: [],
            selected: false,
            label: '问卷资源',
            path: '/safetyEdu/ListSurveySourse',
          },
          {
            children: [],
            selected: false,
            label: '问卷数据统计',
            path: '/safetyEdu/surveyMasterTotal',
          },
        ],
        selected: false,
        label: '问卷管理',
        path: '/safetyEdu/listSurveyMaster',
      },
      {
        children: [

        ],
        selected: false,
        label: '老幼专栏',
        path: '/safety/listEntityPushRead',
      },
      {
        label: '资讯',
        component: 'Layout2',
        selected: false,
        path: '/safetyEdu',
        children: [
          {
            children: [],
            selected: false,
            label: '资讯管理',
            path: '/safetyEdu/listPublishArticle',
          }, {
            children: [],
            selected: false,
            label: '栏目管理',
            path: '/safetyEdu/listPublishColumn',
          },

        ]
      }
    ]
  },
  {
    label: '安全管理',
    path: '/safety',
    component: 'Layout',
    children: [
      {
        children: [
          {
            children: [],
            selected: false,
            label: '巡检记录管理',
            path: '/safety/listSchoolSecurityCheckResult',
          },

          {
            children: [],
            selected: false,
            label: '路线路线',
            path: '/safety/listSchoolSecurityCheckRoute',
          },
          {
            children: [],
            selected: false,
            label: '巡检点管理',
            path: '/safety/listSchoolSecurityPlace',
          },
          {
            children: [],
            selected: false,
            label: '计划管理',
            path: '/safety/listSchoolSecurityCheckPlan',
          },
          {
            children: [],
            selected: false,
            label: '巡检统计',
            path: '/safety/securityTotal',
          },
          // {
          //   children: [],
          //   selected: false,
          //   label: '数据统计',
          //   path: '/safety/listSchoolSecurityCheckPlan',
          // },
          // {
          //   label: '安全巡检',
          //   path: '/safety/schoolsecuritycheckplan',
          //   children: []
          // },
          // {
          //   children: [],
          //   selected:false,
          //   label: '学校安全检查结果',
          //   path: '/safety/schoolsecuritycheckresult',
          // },
          // {
          //   children: [],
          //   selected:false,
          //   label: '学校安全检查路线',
          //   path: '/safety/schoolsecuritycheckroute',
          // },
          // {
          //   children: [],
          //   selected:false,
          //   label: '学校安全检查路线项目',
          //   path: '/safety/schoolsecuritycheckrouteitem',
          // },
          // {
          //   children: [],
          //   label: '巡检统计分析',
          //   path: '/safety/studentRouteTotal',
          // }
        ],
        selected: false,
        label: '安全巡检',
        path: '/safety',
        redirect: '/safety/schoolsecuritycheckplan',
      },
      {
        children: [
          {
            label: '事故管理',
            children: [],
            selected: false,
            path: '/safety/listSecurityAccident',
          },
          {
            label: '事故统计',
            children: [],
            selected: false,
            path: '/safety/accidentTotal',
          }
        ],
        // component: 'Layout2',
        label: '事故管理',
        path: '/safety/listSecurityAccident',
        redirect: null,
      },
      {
        children: [
          {
            label: '隐患管理',
            children: [],
            selected: false,
            path: '/safety/listSecurityDanger',
          },
          {
            label: '隐患统计',
            children: [],
            selected: false,
            path: '/safety/dangerTotal',
          }
          // {
          //   path: '/safety/listSecurityDanger',
          //   label: '隐患管理',
          //   children: []
          // }
        ],
        // component: 'Layout2',
        label: '隐患管理',
        path: '/safety/listSecurityDanger',
        redirect: null,
      },
      {
        children: [
          {
            label: '记录管理',
            children: [],
            selected: false,
            path: '/safety/listGrantTransfer',
          },
          {
            children: [],
            selected: false,
            label: '机构管理',
            path: '/safety/listGrantTranAgency',
          },
          {
            children: [],
            selected: false,
            label: '数据统计',
            path: '/safety/grantTotal',
          },
          // {
          //   children: [],
          //   selected: false,
          //   label: '授权接送人',
          //   path: '/safety/listGrantTranPeople',
          // },
        ],
        selected: false,
        label: '授权管理',
        redirect: '/safety/studentgranttransfer'
      },
      {
        children: [
          {
            children: [],
            // component: 'Layout2',
            label: '通知记录',
            path: '/safety/bulletin',
            redirect: null,
          },
          {
            children: [],
            // component: 'Layout2',
            label: '通知统计',
            path: '/safety/bulletinTotal',
            redirect: null,
          },
        ],
        // component: 'Layout2',
        label: '通知管理',
        path: '/safety/bulletin',
        redirect: null,
      },
      {
        children: [
          {
            children: [],
            // component: 'Layout2',
            label: '请假记录',
            path: '/safety/listStudentleave',
            redirect: null,
          }, {
            children: [],
            // component: 'Layout2',
            label: '销假记录',
            path: '/safety/listStudentleaveOrq',
            redirect: null,
          }, {
            children: [],
            // component: 'Layout2',
            label: '数据统计',
            path: '/safety/studentLeaveTotal',
            redirect: null,
          },
        ],
        // component: 'Layout2',
        label: '请假管理',
        path: '/safety/listStudentleave',
        redirect: null,
      },
      {
        children: [
          {
            children: [],
            // component: 'Layout2',
            label: '考勤管理',
            path: '/safety/listStudentTimelineCheck',
          },
          {
            children: [],
            // component: 'Layout2',
            label: '日常考勤统计',
            path: '/safety/studentTimelineCheckTotal',
          },
        ],
        // component: 'Layout2',
        label: '考勤管理',
        path: '/safety/listStudentTimelineCheck',
      },
      {
        children: [],
        selected: false,
        label: '学生健康管理',
        path: '/basedata/listAaSubjectExtrafield',
      },
      {
        label: '安全联防机构',
        path: '/safety/listSecurityOrganization',
        component: 'Layout',
        children: []
      },
      {
        label: '食品安全与营养健康',
        path: '/safety/listSchoolProdReservedSample',
        component: 'Layout',
        children: [
          {
            children: [],
            label: '日常食品供应信息',
            path: '/safety/listSchoolPoductDaily'
          },
          {
            label: '食品留样',
            path: '/safety/listSchoolProdReservedSample',
            component: 'Layout',
            children: []
          }, {
            label: '食品检验',
            path: '/safety/listSchoolProdTest',
            component: 'Layout',
            children: []
          },
          {
            children: [],
            label: '食品商品',
            path: '/safety/listProductInfo'
          },
          {
            children: [],
            label: '食品供应商',
            path: '/safety/listProductSupplier'
          },
          {
            children: [],
            label: '食品类型',
            path: '/safety/listProductType'
          },
          {
            children: [],
            label: '学校菜谱',
            path: '/safety/listSchoolMenu'
          },
          {
            children: [],
            label: '学校菜谱食材',
            path: '/safety/listSchoolMenuProduct'
          },
          {
            children: [],
            label: '今日菜谱',
            path: '/safety/listSchoolMenuDaily'
          },
          {
            children: [],
            label: '今日学生菜谱',
            path: '/safety/listStudentMenuDaily'
          },
          {
            children: [],
            label: '教师陪餐',
            path: '/safety/listTeacherMenuDaily'
          },
          {
            children: [],
            label: '教师陪餐建议',
            path: '/safety/listTeacherMenuSuggestion'
          },

          {
            children: [],
            label: '责任追究事件',
            path: '/safety/listSchoolAccountabilityInfo'
          },
          {
            children: [],
            label: '责任追究干系人员',
            path: '/safety/listSchoolAccountabilityPerson'
          },
          {
            children: [],
            label: '责任追究规则',
            path: '/safety/listSchoolAccountabilityRule'
          }
        ]
      },
      {
        label: '学生出入记录',
        path: '/safety/listStudentAccessRecords',
        component: 'Layout',
        children: []
      },
      {
        label: '宿舍管理和来访',
        path: '/dormitory/listBasicSchoolDormitory',
        children: [
          {
            label: '学校宿舍',
            path: '/dormitory/listBasicSchoolDormitory',
            component: 'Layout',
            children: [

            ]
          },
          {
            label: '学校来访记录',
            path: '/dormitory/listSchoolVisitRecord',
            component: 'Layout',
            children: []
          },
        ]
      },
    ],
  },

  {
    label: '家校通',
    path: '/homeSchLink',
    component: 'Layout',
    children: [
      {
        label: '班委会',
        path: '/homeSchLink/listClassCommitteeMember',
        component: 'Layout',
        children: []
      }, {
        label: '班委职责',
        path: '/homeSchLink/listClassCommitteeDuty',
        component: 'Layout',
        children: []
      }, {
        label: '班级家委会',
        path: '/homeSchLink/listClassParentCommitteeMember',
        component: 'Layout',
        children: []
      }, {
        label: '家委会职责',
        path: '/homeSchLink/listClassParentCommitteeDuty',
        component: 'Layout',
        children: []
      }, {
        label: '家长会',
        path: '/homeSchLink/listClassMeetingInfo',
        component: 'Layout',
        children: []
      }, {
        label: '家访',
        path: '/homeSchLink/listStudentFamilyVisit',
        component: 'Layout',
        children: []
      }, {
        label: '学生成长档案',
        path: '/homeSchLink',
        component: 'Layout',
        children: [
          {
            label: '班级荣誉',
            path: '/homeSchLink/listClassHonor',
            component: 'Layout',
            children: []
          }, {
            label: '班级标兵',
            path: '/homeSchLink/listClassPacesetter',
            component: 'Layout',
            children: []
          }, {
            label: '优秀作品',
            path: '/homeSchLink/listClassBestWork',
            component: 'Layout',
            children: []
          },
          {
            label: '学生评语',
            path: '/homeSchLink/listClassStudentComment',
            component: 'Layout',
            children: []
          },
        ]
      },
    ]
  },
  // {
  //   label: '特长教育',
  //   path: '/SpecialEducation',
  //   component: 'Layout',
  //   children: [
  //     {
  //       label: '兴趣班',
  //       path: '/SpecialEducation/listInterestCourseClass',
  //       component: 'Layout',
  //       children: []
  //     },
  // {
  //   label: '兴趣班学生',
  //   path: '/SpecialEducation/listInterestCourseClassStudent',
  //   component: 'Layout',
  //   children: []
  // },
  // {
  //   label: '兴趣班学生考勤',
  //   path: '/SpecialEducation/listInterestCourseClassStudentCheck',
  //   component: 'Layout',
  //   children: []
  // },
  // {
  //   label: '兴趣班学生计划',
  //   path: '/SpecialEducation/listInterestCourseClassPlan',
  //   component: 'Layout',
  //   children: []
  // },
  //   ]
  // },
  // {
  //   label: '宿舍管理和来访',
  //   path: '/dormitory',
  //   component: 'Layout',
  //   children: [
  //     {
  //       label: '学校宿舍',
  //       path: '/dormitory/listBasicSchoolDormitory',
  //       component: 'Layout',
  //       children: [

  //       ]
  //     },
  //     {
  //       label: '学校来访记录',
  //       path: '/dormitory/listSchoolVisitRecord',
  //       component: 'Layout',
  //       children: []
  //     },
  //   ]
  // },
  {
    label: '微应用',
    path: '/newApplications',
    component: 'Layout',
    children: [
      {
        label: '疾控中心',
        path: '/newApplications/listSchoolEpidemicSituation',
        children: [
          {
            label: '疫情记录',
            path: '/newApplications/listSchoolEpidemicSituation',
            component: 'Layout',
            children: []
          },
          {
            label: '疫情处理',
            path: '/newApplications/listSchoolEpidemicSituationProcess',
            component: 'Layout',
            children: []
          },
          {
            label: '疫情学生',
            path: '/newApplications/listSchoolEpidemicSituationStudent',
            component: 'Layout',
            children: []
          },
          {
            label: '疫情处理小组教师',
            path: '/newApplications/listSchoolEpidemicSituationTeacher',
            component: 'Layout',
            children: []
          },
          {
            label: '学生疾病知识库',
            path: '/newApplications/listSchoolIllnessLib',
            component: 'Layout',
            children: []
          },
          {
            label: '学生异常情况',
            path: '/newApplications/listSchoolStudentBodyabnormal',
            component: 'Layout',
            children: []
          },
          {
            label: '学生疾病信息',
            path: '/newApplications/listSchoolStudentIllness',
            component: 'Layout',
            children: []
          }
        ]
      },
      {
        label: '特长教育',
        path: '/SpecialEducation/listInterestCourseClass',
        children: [
          {
            label: '兴趣班',
            path: '/SpecialEducation/listInterestCourseClass',
            component: 'Layout',
            children: []
          },
        ]
      },
      {
        label: '学校',
        path: '/newApplications/listSchoolDocIndex',
        children: [
          {
            label: '学校文件',
            path: '/newApplications/listSchoolDocIndex',
            component: 'Layout',
            children: []
          }
        ]
      },
      {
        label: '网络学习空间',
        path: '/newApplications/listPersonalStudySpace',
        children: [
          {
            label: '个人学习空间',
            path: '/newApplications/listPersonalStudySpace',
            component: 'Layout',
            children: []
          },
          {
            label: '个人文章',
            path: '/newApplications/listPersonalArticle',
            component: 'Layout',
            children: []
          }
        ]
      },
      {
        label: '失物招领',
        path: '/newApplications/listLostThing',
        component: 'Layout',
        children: []
      },
      {
        label: '校长信箱',
        path: '/newApplications/listPrincipalMailbox',
        component: 'Layout',
        children: []
      },
      {
        label: '校内消息',
        path: '/newApplications/listSchoolMessage',
        component: 'Layout',
        children: []
      },
      {
        label: '校内任务',
        path: '/newApplications/listSchoolTask',
        component: 'Layout',
        children: []
      },
      {
        label: '学生小组设置',
        path: '/newApplications/listStudentGroupSet',
        component: 'Layout',
        children: []
      },
      {
        label: '报修信息',
        path: '/newApplications/listRepairInfo',
        component: 'Layout',
        children: []
      }
    ]
  },
  {
    label: '教学综合管理',
    path: '/safetyManagement',
    component: 'Layout',
    children: [
      {
        label: '新教师',
        path: '/safetyManagement/listSchoolTeacherStudentComment',
        children: [
          {
            label: '学生评语',
            path: '/safetyManagement/listSchoolTeacherStudentComment',
            component: 'Layout',
            children: []
          },
          {
            label: '教师评估',
            path: '/safetyManagement/listSchoolEvaluationTeacherClass',
            component: 'Layout',
            children: []
          },
          {
            label: '教师评估计划',
            path: '/safetyManagement/listSchoolEvaluationTeacherPlan',
            component: 'Layout',
            children: []
          },
          {
            label: '教师奖项',
            path: '/safetyManagement/listSchoolTeacherAward',
            component: 'Layout',
            children: []
          },
          {
            label: '教师学历',
            path: '/safetyManagement/listSchoolTeacherEduhis',
            component: 'Layout',
            children: []
          },
          {
            label: '教师职称',
            path: '/safetyManagement/listSchoolTeacherPositionalTitle',
            component: 'Layout',
            children: []
          },
          {
            label: '教师实习',
            path: '/safetyManagement/listSchoolTeacherPractice',
            component: 'Layout',
            children: []
          },
          {
            label: '教师处分',
            path: '/safetyManagement/listSchoolTeacherPunishment',
            component: 'Layout',
            children: []
          },
          {
            label: '教师工作考勤',
            path: '/safetyManagement/listSchoolTeacherWorkCheck',
            component: 'Layout',
            children: []
          },
          {
            label: '教师证书',
            path: '/safetyManagement/listSchoolTeacherCertificate',
            component: 'Layout',
            children: []
          }
        ]
      },
      {
        label: '值周值日',
        path: '/safetyManagement/listSchoolBeonduty',
        component: 'Layout',
        children: []
      },
      {
        label: '教师上课考勤',
        path: '/safetyManagement/listSchoolTeacherClassCheck',
        component: 'Layout',
        children: []
      },
      {
        label: '教师听课',
        path: '/safetyManagement/listSchoolTeacherClassLook',
        component: 'Layout',
        children: []
      },
      {
        label: '教师代课',
        path: '/safetyManagement/listSchoolTeacherClassReplace',
        component: 'Layout',
        children: []
      },
      {
        label: '教师请假',
        path: '/safetyManagement/listSchoolTeacherLeave',
        component: 'Layout',
        children: []
      },
      {
        label: '教师车辆',
        path: '/safetyManagement/listTeacherCar',
        component: 'Layout',
        children: []
      }
    ]
  },
  {
    label: '问题答疑',
    path: 'questionAnswer',
    component: 'Layout',
    children: [
      {
        label: '问题类型',
        path: '/questionAnswer/listQuestionType',
        component: 'Layout',
        children: []
      },
      {
        label: '问题',
        path: '/questionAnswer/listQuestionInfo',
        component: 'Layout',
        children: []
      },
      {
        label: '学生评论库',
        path: '/questionAnswer/listSchoolStudentCommentLib',
        component: 'Layout',
        children: []
      }
    ]
  },
  {
    label: '文件管理',
    path: '/files/index',
    component: 'Layout',
    children: []
  },

]
