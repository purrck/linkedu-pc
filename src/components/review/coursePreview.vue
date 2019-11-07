<template>
  <div class="coursePreview-wrap">
    <div class="coursePreview-wrap--content">
      <el-scrollbar style="height: 682px;">
        <div alt="" class="coursePreview-wrap--content--img"></div>
        <div class="coursePreview-wrap--content--courseHead">
          <div class="box-num">
            <p>节数</p>
            <p>1</p>
          </div>
          <div class="course-title">
            <p>消防栓的使用方法</p>
            <p>时长8</p>
          </div>
          <div class="course-status">
            <p>未完成</p>
          </div>
          <div class="open">
            <i class="el-icon-arrow-up"></i>
          </div>
        </div>
        <div class="coursePreview-wrap--content--courseList">
          <div class="chaptersList" v-for="(chapter,index) of courseData.chaptersList" :key="index">
            <div class="chapterName">{{chapter.chapterName}}</div>
            <div class="chapterActivities" v-for="(active, idx) of chapter.activities" :key="idx">
              <div class="el-icon-success"></div>
              <div class="activeItemTitle">{{active.activityTitle}}</div>
              <div class="activeItemStatus"><span>{{active.pdstatusCodeStr.split(';')[0]}}</span></div>
            </div>
          </div>
          
          <!--问卷-->
          <div class="surveyList" v-for="(survey,index) of courseData.surveyMaters" :key="index">
            <div class="el-icon-success"></div>
            <div class="surveyName">{{survey.surveyName}}</div>
            <div class="surveyItemStatus"><span>{{survey.pdstatusCodeStr.split(';')[0]}}</span></div>
          </div>
        </div>
        <div class="coursePreview-wrap--content--download">
          <div class="coursePreview-wrap--content--download--list--head">
            <div class="el-icon-download"></div>
            <div class="downloadFileName">下载资料</div>
            <div class="open el-icon-arrow-up"></div>
          </div>
          <div class="coursePreview-wrap--content--download--list" v-for="(item, index) of courseData.attachments" :key="index">
            <div class="el-icon-check"></div>
            <div class="downloadFileName">{{item.fileName}}</div>
            <div class="open el-icon-download"></div>
          </div>
        </div>
        <div class="coursePreview-wrap--content--courseDetail">
          <div class="coursePreview-wrap--content--courseDetail--head">
            <div>课程详情</div>
            <div class="open el-icon-arrow-up"></div>
          </div>
          <div>{{courseData.content}}</div>
        </div>
        <div class="coursePreview-wrap--content--teacher">
          <div class="coursePreview-wrap--content--teacher--head">
            授课老师
          </div>
          <div class="coursePreview-wrap--content--teacher--content">
            <div class="img"></div>
            <div class="teacher-info">
              <p>刘晓师</p>
              <p>热爱学生热爱学生热爱学生热爱学生热爱学生</p>
            </div>
            <div class="open el-icon-arrow-right"></div>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>
</template>

<script>
/**
 * userName: 'DengShen'
 * createTime: '2019/2/19 11:43'
 */
export default {
  name: 'coursePreview',
  props: {},
  components: {},
  computed: {},
  data () {
    return {
      courseData: {
        chaptersList: [
          {
            chapterName: '第一章 消防栓的使用方法',
            activities: [
              {
                activityTitle: '课节一 05：30',
                pdstatusCodeStr: '已完成;red;123.gif'
              },
              {
                activityTitle: '课节一 05：30',
                pdstatusCodeStr: '已完成;red;123.gif'
              },
              {
                activityTitle: '课节一 05：30',
                pdstatusCodeStr: '已完成;red;123.gif'
              }
            ]
          },
          {
            chapterName: '第二章 消防栓的使用方法',
            activities: [
              {
                activityTitle: '课节一 05：30',
                pdstatusCodeStr: '已完成;red;123.gif'
              },
              {
                activityTitle: '课节一 05：30',
                pdstatusCodeStr: '已完成;red;123.gif'
              },
              {
                activityTitle: '课节一 05：30',
                pdstatusCodeStr: '已完成;red;123.gif'
              }
            ]
          },
          {
            chapterName: '第三章 消防栓的使用方法',
            activities: [
              {
                activityTitle: '课节一 05：30',
                pdstatusCodeStr: '已完成;red;123.gif'
              },
              {
                activityTitle: '课节一 05：30',
                pdstatusCodeStr: '已完成;red;123.gif'
              },
              {
                activityTitle: '课节一 05：30',
                pdstatusCodeStr: '已完成;red;123.gif'
              }
            ]
          },
          {
            chapterName: '第四章 消防栓的使用方法',
            activities: [
              {
                activityTitle: '课节一 05：30',
                pdstatusCodeStr: '已完成;red;123.gif'
              },
              {
                activityTitle: '课节一 05：30',
                pdstatusCodeStr: '已完成;red;123.gif'
              },
              {
                activityTitle: '课节一 05：30',
                pdstatusCodeStr: '已完成;red;123.gif'
              }
            ]
          }
        ],
        surveyMaters: [
          {
            surveyName: '消防安全知识问卷调查',
            pdstatusCodeStr: '未完成;blue;1.gif'
          }
        ],
        attachments: [
          {fileName: '消防栓的使用方法'},
          {fileName: '消防栓的使用方法'},
          {fileName: '消防栓的使用方法'},
          {fileName: '消防栓的使用方法'}
        ],
        content: '这个是课程详情'
      }
    }
  },
  mounted () {
    this.init()
    this.$nextTick(() => {
    })
  },
  methods: {
    init () {
      // console.log(`coursePreview is running...`)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .coursePreview-wrap {
    width: 350px;
    height: 750px;
    padding: 24px 20px;
    box-sizing: border-box;
    -webkit-border-radius: 50px;
    -moz-border-radius: 50px;
    border-radius: 30px;
    background-color: #ccc;
    overflow: hidden;
    
    &--content {
      width: 100%;
      height: 100%;
      padding: 10px;
      border-radius: 10px;
      box-sizing: border-box;
      background-color: #F2F2F2;
      overflow: hidden;
      
      &--img {
        width: 100%;
        height: 200px;
        background-color: skyblue;
      }
      
      &--courseHead {
        margin-top: 10px;
        display: flex;
        background-color: #fff;
        padding: 10px;
        
        .box-num {
          font-size: 5px;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          border-radius: 4px;
          width: 50px;
          height: 44px;
          line-height: 22px;
          border: 1px solid #93BF88;
          color: #93BF88;
          
          p {
            text-align: center;
            
            &:nth-child(1) {
              color: #fff;
              background-color: #93BF88;
            }
          }
        }
        
        .course-title {
          margin-left: 5px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          
          p {
            &:nth-child(1) {
              color: #353535;
              font-size: 15px;
            }
            
            &:nth-child(2) {
              color: #999;
              font-size: 13px;
            }
          }
        }
        
        .course-status {
          margin-left: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
          
          p {
            padding: 4px;
            font-size: 10px;
            border: 1px solid #FA8C35;
            color: #FA8C35;
          }
        }
        
        .open {
          margin-left: 5px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      
      &--courseList {
        padding: 10px;
        background-color: #fff;
        
        .chaptersList {
          .chapterName {
            font-size: 15px;
            color: #353535;
            margin-bottom: 13px;
          }
          
          .chapterActivities {
            font-size: 13px;
            height: 24px;
            display: flex;
            align-items: center;
            margin-bottom: 10px;
            color: #707070;
            
            .activeItemTitle {
              margin-left: 10px;
            }
            
            .activeItemStatus {
              flex: 1;
              text-align: right;
              
              span {
                border: 1px solid red;
                color: red;
                font-size: 10px;
                padding: 4px;
              }
            }
          }
        }
        
        .surveyList {
          font-size: 13px;
          height: 24px;
          display: flex;
          align-items: center;
          color: #707070;
          
          .surveyName {
            margin-left: 10px;
          }
          
          .surveyItemStatus {
            flex: 1;
            text-align: right;
            
            span {
              border: 1px solid red;
              color: red;
              font-size: 10px;
              padding: 4px;
            }
          }
        }
      }
      
      &--download {
        margin-top: 10px;
        background-color: #fff;
        padding: 10px;
        
        &--list--head {
          display: flex;
          align-items: center;
          
          .downloadFileName {
            margin-left: 5px;
          }
          
          .open {
            flex: 1;
            text-align: right;
            padding-right: 5px;
          }
        }
        
        &--list {
          font-size: 13px;
          color: #707070;
          height: 32px;
          display: flex;
          align-items: center;
          
          .downloadFileName {
            margin-left: 5px;
          }
          
          .open {
            flex: 1;
            text-align: right;
            padding-right: 5px;
          }
        }
      }
      
      &--courseDetail {
        margin-top: 10px;
        padding: 10px;
        background-color: #fff;
        
        &--head {
          display: flex;
          align-items: center;
          
          .open {
            flex: 1;
            text-align: right;
            padding-right: 5px;
          }
        }
      }
      
      &--teacher {
        margin-top: 10px;
        padding: 10px;
        background-color: #fff;
        
        &--head {
          margin-bottom: 10px;
        }
        
        &--content {
          display: flex;
          align-items: center;
          
          .img {
            width: 42px;
            height: 42px;
            border-radius: 4px;
            background-color: deeppink;
          }
          
          .teacher-info {
            margin-left: 10px;
            
            p {
              &:nth-child(1) {
                color: #353535;
                font-size: 14px;
              }
              
              &:nth-child(2) {
                width: 150px;
                color: #707070;
                font-size: 13px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
          }
          
          .open {
            display: inline-block;
            flex: 1;
            text-align: right;
          }
        }
      }
    }
  }
</style>
