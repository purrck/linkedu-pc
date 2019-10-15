export default {
    state : {
        data : [
            {
                //必须与入口路由roleType字段一致
                name : "student",
                //导入页面tab名称
                label : "导入学生管理",
                //导入上传接口地址
                url : "user/studentAd/import",
                //空模块
                example : "/static/excel/学生数据导入.xls",
                //导入后的表格头部信息
                column : [
                      {
                      prop : "studentNum",
                      label : "学号"
                      },
                      {
                      prop : "studentNationalSetNum",
                      label : "国家统一学籍编码"
                      },
                      {
                      prop : "userName",
                      label : "学生姓名"
                      },
                      {
                      prop : "gradeId",
                      label : "年级编号"
                      },
                      {
                      prop : "gradeName",
                      label : "年级名称"
                      },
                      {
                      prop : "classNum",
                      label : "班级编号"
                      },
                      {
                      prop : "className",
                      label : "班级名称"
                      },
                      {
                      prop : "gender",
                      label : "性别"
                      },
                      {
                      prop : "remark",
                      label : "错误提示"
                      }
                  ]
            },
          {
            //必须与入口路由roleType字段一致
            name : "sensitiveWords",
            //导入页面tab名称
            label : "导入敏感词管理",
            //导入上传接口地址
            url : "sensitive/sensitiveWordsAd/import",
            //空模块
            example : "/static/excel/敏感词导入.xls",
            //导入后的表格头部信息
            // "sensitiveContent": "敏感词",
            // "sensitiveOptionCode": "操作",
            // "sensitiveReplace": "预备替换内容",
            // "sensitiveStatusCode": "状态",
            // "sensitiveTypeCode": "分类"
            column : [
              {
                prop : "sensitiveContent",
                label : "敏感词"
              },
              {
                prop : "sensitiveOptionCode",
                label : "操作"
              },
              {
                prop : "sensitiveReplace",
                label : "预备替换内容"
              },
              {
                prop : "sensitiveStatusCode",
                label : "状态"
              },
              {
                prop : "sensitiveTypeCode",
                label : "分类"
              },
              {
                prop : "remark",
                label : "错误提示"
              }
            ]
          },
            {
                name : "parent",
                label : "导入家长管理",
                url : "user/parentAd/import",
                example : "/static/excel/家长数据导入.xls",
                column : [
                      {
                      prop : "userNamePar",
                      label : "家长姓名"
                      },
                      {
                      prop : "studentNum",
                      label : "学号"
                      },
                      {
                      prop : "userNameStu",
                      label : "学生姓名"
                      },
                      {
                      prop : "gradeId",
                      label : "年级编号"
                      },
                      {
                      prop : "gradeName",
                      label : "年级名称"
                      },
                      {
                      prop : "classNum",
                      label : "班级编号"
                      },
                      {
                      prop : "className",
                      label : "班级名称"
                      },
                      {
                      prop : "studentParentTypeCode",
                      label : "关系"
                      },
                      {
                      prop : "telPhoneNum",
                      label : "联系方式"
                      },
                      {
                      prop : "remark",
                      label : "错误提示"
                      }
                  ]
            },
            {
                name : "teacher",
                label : "导入教师管理",
                url : "user/basicTeacherAd/import",
                example : "/static/excel/教师数据导入.xls",
                column : [
                    {
                    prop : "teacherNum",
                    label : "教师编号"
                    },
                    {
                    prop : "userName",
                    label : "教师姓名"
                    },
                    {
                    prop : "telPhoneNum",
                    label : "手机号"
                    },
                    {
                    prop : "gender",
                    label : "性别"
                    },
                    {
                    prop : "teachSubjectId",
                    label : "学科编号"
                    },
                    {
                    prop : "teachSubjectName",
                    label : "学科名称"
                    },
                    {
                    prop : "teachSegmentId",
                    label : "学段编号"
                    },
                    {
                    prop : "teachSegmentName",
                    label : "学段名称"
                    },
                    {
                    prop : "teachGradeId",
                    label : "年级编号"
                    },
                    {
                    prop : "teachGradeName",
                    label : "年级名称"
                    },
                    {
                    prop : "remark",
                    label : "错误提示"
                    }
                ]
            }
        ]
    }
}
