<template>
  <div>
    <div class="edit-box" ref="test">
      <div v-show="$store.state.common.lizi">
        <el-button @click="example">示例</el-button>
      </div>
      <div v-show="(pageState === 'add' || pageState === 'edit')  && index === 0">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules0" size="small">

          <el-col :span="24">
            <el-form-item label="课程名称 :" prop="name">
              <el-input class="input-v2-rao " v-model="formData.name" placeholder="请输入课程名称"
                        maxlength="255"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="课程类型 :" prop="securityEducationTypeCode"
                          class="orgIntroduction">
              <el-select class="select-v2-rao" popper-class="select-popper-v2-rao"
                         v-model="formData.securityEducationTypeCode" placeholder="请选择课程类型">
                <el-option
                  v-for="item in optionsList1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="添加封面 :" prop="imagePath"
                          class="orgIntroduction">
              <uploadImage :many="1" :imagelist="formData.imagePath" @uploadData="uploadData"></uploadImage>
            </el-form-item>
          </el-col>

          <el-col :span="24">
            <el-form-item label="课程介绍 :" prop="content"
                          class="orgIntroduction">
              <editor v-model="formData.content" :true-height="350"/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="教师介绍 :" prop="teacherInfo"
                          class="orgIntroduction">
              <!--<editor v-model="formData.teacherInfo" :true-height="350"/>-->
              <quill-editor
                v-model="formData.teacherInfo"
                :options="editorOption1"
                ref="QuillEditor" style="height:300px;padding-bottom:112px">
              </quill-editor>
              <input type="file" class="fileClick1" @change="changesImg" style="display:none"/>
            </el-form-item>
          </el-col>

        </el-form>
      </div>

      <div class="chapter" v-show="index === 1">
        <el-form class="w520" ref="formData1" :model="formData" label-width="80px" :rules="rules1">
          <el-form-item label="章节信息" prop="">
            <div>
              <el-button class="b93BF88" size="small" type="primary" @click="addChapterV1">添加章节</el-button>
            </div>
            <!--<div v-for="(item, index) of chapterList" class="chapterItem" :key="index" @click="removeChapterItemInChapterList(item, index)">{{item.chapterName}}</div>-->
          </el-form-item>

          <el-form-item label="章节列表" prop="">
            <div v-for="(item, index) of  formData.courseResourceChaptersInfos" :key="index">

              <div>
                <strong class="f16">{{item.chapterName}}</strong>
                <span class="iconfont icon-icon_jianshao f16 c999999" v-show="!item.courseId"
                      @click="delChapter(index)"></span>
              </div>
              <ul class="point-box ml-30">
                <li class="point-box__item" v-for="(item, index) of  item.courseChapterResourceInfoList" :key="index">
                  <span>{{item.chapterChildrenName}}</span>
                </li>
              </ul>

            </div>
          </el-form-item>

          <el-form-item label="附件信息" prop="">
            <duozhang-upload v-model="formData.filePath"></duozhang-upload>
            <!--<upload v-model="formData.annex" @input="fileFinish"></upload>-->
            <!--<uploadImage :imagelist="formData.filePath" @uploadData="uploadDataFJ"></uploadImage>-->
          </el-form-item>

          <el-form-item label="问卷信息" prop="">
            <el-button class="b93BF88" size="small" type="primary" @click="addWenJuan">添加问卷</el-button>
          </el-form-item>

          <el-form-item label="问卷" prop="">
            <div>{{formData.surveyName}}</div>
          </el-form-item>
        </el-form>
      </div>

      <SendObject v-show="index === 2" :header="header2" @finish="sendFinish"></SendObject>

      <div class="addChapter" v-show="index === 3">
        <el-form ref="form" :model="addChapterFormData" label-width="80px" class="w520">
          <el-form-item label="章节名称">
            <el-input v-model="addChapterFormData.name" class="input-v2-rao" size="small"></el-input>
          </el-form-item>

          <el-form-item label="章节列表">
            <el-button size="small" type="primary" @click="addChapter">添加章节</el-button>
            <ul class="point-box">
              <li class="point-box__item" v-for="(item, index) of  chapterList" :key="index">
                <span>{{item.title||item.name}}</span>
                <span class="iconfont icon-icon_tianjia fs-26 c999999" @click="handle('plus', item, index)"></span>
                <span class="iconfont icon-icon_jianshao fs-26 c999999" @click="handle('less', item, index)"></span>
                <span class="iconfont icon-icon_shagnyi fs-26 c999999" v-if="index !== 0"
                      @click="handle('up', item, index)"></span>
                <span class="iconfont icon-icon_xiayi fs-26 c999999" v-if="index !== chapterList.length - 1"
                      @click="handle('down', item, index)"></span>
              </li>
            </ul>
          </el-form-item>


          <el-form-item>
            <el-button size="small" type="primary" @click="addChapterFinish">完成</el-button>
            <el-button size="small" type="primary" @click="index = 1">取消</el-button>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="pageState === 'detail' || pageState === 'shenhe'">
        <el-row>
          <el-col>
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <div class="detail-title-v2 ">
                  {{formData.name}}
                </div>
                <div class="detail-video ">
                  <video style="width: 520px; margin-top: 20px;" controls :src="detail.formData.currentUrl"></video>
                </div>
                <div class="detail-content">
                  <el-radio-group class="btn-group" size="small" v-model="detail.tabPosition"
                                  style="margin-bottom: 30px;">
                    <el-radio-button label="1">目录</el-radio-button>
                    <el-radio-button label="2">介绍</el-radio-button>
                    <el-radio-button label="3">老师</el-radio-button>
                  </el-radio-group>
                  <div v-if="detail.tabPosition === '1'">
                    <el-form ref="form" :model="formData" label-width="80px">
                      <el-form-item label="所属章节: ">
                        <div
                          v-show="!formData.courseResourceChaptersInfos || !formData.courseResourceChaptersInfos.length">
                          无
                        </div>
                        <div v-for="(item,index) in formData.courseResourceChaptersInfos" :key="index">
                          <div><strong class="f16">{{item.chapterName}}</strong></div>
                          <div style="margin-left:18px" v-for="(item,index1) in item.courseChapterResourceInfoList"
                               :key="index1" @click="handleClick(item,index,index1)">
                            <a href="javascript:void(0)" :class="{'c93BF88':currentItemIndex == `${index}${index1}`}">{{item.chapterChildrenName}}</a>
                          </div>
                        </div>
                      </el-form-item>
                      <el-form-item label="封面: ">
                        <img :src="formData.imagePath" style="height: 300px"/>
                      </el-form-item>
                      <el-form-item label="附件: ">
                        <p v-for="(data,index) in filePath" :key="index">
                          <a class="c93BF88" :href="data" :title="data">下载附件{{index+1}}</a>
                        </p>
                      </el-form-item>
                      <el-form-item label="审核结果: " v-show="formData.courseStatusCode">
                        <span class="cFA6557" v-show="formData.courseStatusCode == 'reject'">驳回</span>
                        <span class="cFA6557" v-show="formData.courseStatusCode == 'approving'">审批中</span>
                        <span class="cFA6557" v-show="formData.courseStatusCode == 'editing'">编辑中</span>
                        <span class="cFA6557" v-show="formData.courseStatusCode == 'pass'">审核通过</span>
                      </el-form-item>
                      <el-form-item label="驳回说明: " v-show="formData.auditInfo && formData.courseStatusCode == 'reject'">
                        {{formData.auditInfo}}
                      </el-form-item>
                    </el-form>
                  </div>
                  <div v-if="detail.tabPosition === '2'">
                    <div v-html="formData.content"></div>
                  </div>
                  <div v-if="detail.tabPosition === '3'">
                    <div v-html="formData.teacherInfo"></div>
                  </div>
                </div>
              </div>
            </el-form>
          </el-col>

        </el-row>
      </div>

      <div class="text-center mt-30" v-show="pageState === 'edit' || pageState === 'add'">
        <el-button type="primary" v-if="pageState !== 'detail' && index!==0" class="fush-btn button-v2-rao b93BF88"
                   size="small" @click="back">上一步
        </el-button>
        <el-button type="primary" v-if="pageState !== 'detail' && index!==3 && index != 2"
                   class="fush-btn button-v2-rao b93BF88" size="small" @click="next">下一步
        </el-button>
        <el-button type="primary" :loading="saveLoading" v-if="pageState !== 'detail' && index!==3"
                   class="fush-btn button-v2-rao b93BF88" size="small" @click="save('formData')">保存
        </el-button>
        <el-button type="primary" :loading="saveLoading" v-if="index===maxIndex" class="fush-btn button-v2-rao b93BF88"
                   size="small" @click="checkHandle">提交审核
        </el-button>
        <el-button type="primary" v-show="index!==3" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff"
                   size="small"
                   @click="goBack">返回
        </el-button>
      </div>

      <div class="text-center mt-30" v-show="pageState == 'shenhe'">
        <el-button type="primary" :loading="tongguoLoading" size="small" class="button-v2-rao b93BF88 "
                   @click="tongguo">
          通过
        </el-button>
        <el-button type="primary" :loading="bohuiLoading" @click="bohuiComfire" size="small"
                   class="button-v2-rao border-color-cccccc c000000 bfff">驳回
        </el-button>
      </div>

      <div class="text-center mt-30" v-show="pageState == 'detail'">
        <el-button type="primary" @click="goBack" size="small" class="button-v2-rao border-color-cccccc c000000 bfff">
          返回
        </el-button>
      </div>
    </div>
    <!-- 驳回 -->
    <el-dialog
      title="驳回"
      :visible.sync="bohuiVisible"
      width="30%" :before-close="bohuihandleClose">
      <el-input
        type="textarea"
        :rows="2"
        placeholder="请输入内容"
        v-model="bohuiContent" class="input-v2-rao">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="bohuiCancel">取 消</el-button>
        <el-button type="primary" :loading="bohuiLoading" @click="bohuiComfire">确 定</el-button>
      </span>
    </el-dialog>
    <!--章节-->
    <el-dialog
      title="选择章节"
      :visible.sync="chapterVisible"
      width="50%">
      <el-header>
        <el-form :model="selectData" ref="searchForm" :inline="true" size="small" class="select-form">
          <el-form-item label="标题:" class="w140">
            <el-input v-model="selectData.title" class="input-v2-rao"></el-input>
          </el-form-item>
          <el-form-item label="类型:" class="w140">
            <el-select class="select-v2-rao" popper-class="select-popper-v2-rao"
                       v-model="selectData.securityEducationTypeCode" placeholder="请选择课程类型">
              <el-option
                v-for="item in optionsList1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="search">查询
            </el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-table :data="chapterData.records" v-loading="zjloading"
                @selection-change="handleSelectionChange($event, 'chapter')"
                style="width: 100%">
        <el-table-column width="80" align="center" type="selection"></el-table-column>
        <el-table-column prop="title" align="center" label="课程名称"></el-table-column>
        <el-table-column prop="subjectName" align="center" label="类型"></el-table-column>
        <el-table-column prop="publishedDt" align="center" width="180" label="发布时间">
        </el-table-column>
      </el-table>
      <div class="paging text-right">
        <el-pagination class="pagination-v2-rao" :page-size="chapterData.size" :total="chapterData.total"
                       :current-page="chapterData.current" layout="total, sizes, prev, pager, next, jumper"
                       @current-change="handleCurrentChange">
        </el-pagination>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button @click="chapterVisible = false">取 消</el-button>
          <el-button type="primary" @click="enter('chapter')">确 定</el-button>
        </span>
    </el-dialog>
    <!--问卷-->
    <el-dialog
      title="选择问卷"
      :visible.sync="surveyVisible"
      width="50%" @close="wenjuanClose">
      <el-table
        :data="surveyData"
        @selection-change="handleSelectionChange($event, 'survey')"
        style="width: 100%">
        <el-table-column label="" width="60">
          <template slot-scope="scope">
            <el-radio :label="scope.row.surveyId" v-model="surveyIdradio"><span style="display:none">{{scope.row.surveyId}}</span>
            </el-radio>
            <!--<el-radio :label="scope.$index" v-model="radio" @change="getCurrentRow(scope.$index)"></el-radio>-->
          </template>
        </el-table-column>
        <el-table-column
          prop="surveyName"
          label="问卷标题"
          width="180"
          align="center">
        </el-table-column>
        <el-table-column
          prop="surveyType"
          align="center"
          label="分类">
        </el-table-column>
        <el-table-column
          prop="updatedDt"
          align="center"
          label="发布时间">
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <span :style="{color: scope.row.statusStr &&scope.row.statusStr.split(';')[1]}">{{scope.row.statusStr&&scope.row.statusStr.split(';')[0]}}</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
          <el-button @click="surveyVisible = false">取 消</el-button>
          <el-button type="primary" @click="enter('survey')">确 定</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from './courseUrl'
  import apiChapter from '../coursechapter/coursechapterUrl'
  import commonApi from '@/api/common/common'
  import editor from '@/components/editor/editor'
  import uploadImage from '@/components/upload/uploadFileV1'
  import SendObject from '@/components/sendObject/index'
  import Upload from '@/components/upload/upload'
  import {coverData} from '@/util/util'
  import {quillEditor} from 'vue-quill-editor'
  // 工具栏配置
  const toolbarOptions1 = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
  ]
  export default {
    components: {Upload, SendObject, editor, uploadImage, quillEditor},
    data() {
      return {
        editorOption1: {
          modules: {
            toolbar: {
              container: toolbarOptions1,  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    document.querySelector('.fileClick1').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        },
        currentItemIndex: "",
        saveLoading: false,
        zjloading: true,
        addChapterFormData: {},
        selectData: {
          title: '',
          securityEducationTypeCode: ''
        },
        surveyIdradio: "",
        isSelectObj: false,
        bohuiVisible: false,
        bohuiLoading: false,
        tongguoLoading: false,
        bohuiContent: "",
        detail: {
          tabPosition: '1',
          formData: {
            surveyName: '',
            currentUrl: '',
            chapterName: '测试',
            teacherName: '老刘',
            experience: '200年',
            teacherInfo: '男，40岁，1988年毕业于湖南师范大学中文系，200年参加研究生课程班学习，于2004年结业。 2002年被学校推荐为“湖南省首批骨干教师”，并被评为“优秀学员。”充实中学教育近10年。 2000年被评为中教高级，之后单人备课组长，教研组副组长5年。 男，40岁，1988年毕业于湖南师范大学中文系，200年参加研究生课程班学习，于2004年结业。 2002年被学校推荐为“湖南省首批骨干教师”，并被评为“优秀学员。”充实中学教育近10年。 2000年被评为中教高级，之后单人备课组长，教研组副组长5年。 男，40岁，1988年毕业于湖南师范大学中文系，200年参加研究生课程班学习，于2004年结业。 ',
            chapterList: [
              {
                active: true,
                title: '第一节xxx',
                url: 'http://118.126.94.4:8410/group1/M00/00/13/rBAAAlx0uQCAGW9_ABAb-Na2BfM665.mp4'
              },
              {
                active: false,
                title: '第2节xxx',
                url: 'http://118.126.94.4:8410/group1/M00/00/15/rBAAAlx_gX6AMiWQAFAq-C-E7s0130.mp4'
              }
            ]
          }
        },
        chapterMultiple: [],
        surveyMultiple: [],
        testMultiple: [],
        surveyData: [{date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'}, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }],
        testData: [{date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'}, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }],
        chapterData: [{date: '2016-05-02', name: '王小虎', address: '上海市普陀区金沙江路 1518 弄'}, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }],
        header: [
          {
            title: '1、选择学段',
            isActive: true,
            code: 'stage',
            children: [
              {
                isCheckAll: true,
                checked: [],
                children: [],
                subTitle: '学段',
                isActive: false,
                url: '/userapp/base/segmentGrade?type=1'
              }
            ]
          },
          {
            title: '2、选择年级',
            isActive: false,
            code: 'grade',
            children: [
              {
                checked: [],
                isCheckAll: true,
                children: [],
                subTitle: '年级',
                isActive: false,
                url: '/userapp/base/segmentGrade?type=2'
              },
            ]
          },
          {
            title: '3、选择省份',
            isActive: false,
            code: 'province',
            children: [
              {
                children: [],
                isCheckAll: true,
                checked: [],
                subTitle: '省份',
                isActive: false,
                url: '/userapp/base/getArea?areaType=2&id=china'
              }
            ]
          },
          {
            title: '4、选择市区',
            isActive: false,
            code: 'city',
            children: [
              {
                children: [],
                checked: [],
                isCheckAll: true,
                subTitle: '市区',
                isActive: false,
                url: '/userapp/base/getArea?areaType=3&id='
              }
            ]
          },
          {
            title: '4、选择区域',
            isActive: false,
            code: 'area',
            children: [
              {
                checked: [],
                children: [],
                isCheckAll: true,
                subTitle: '区域',
                isActive: false,
                url: '/userapp/base/getArea?areaType=4'
              }
            ]
          }
        ],
        header2: [
          {
          "title": "1、通知角色/学段",
          "isActive": true,
          "code": "segment",
          "children": [{
            "isCheckAll": true,
            "checked": "C",
            "children": [{"id": "A", "name": "领导"}, {"id": "B", "name": "班主任"}, {"id": "C", "name": "教师"}, {
              "id": "D",
              "name": "家长"
            }, {"id": "E", "name": "安防"}, {"id": "F", "name": "学生"}],
            "subTitle": "角色",
            "subTitleType": "role",
            "nextType": "grade",
            "single": true,
            "isActive": false,
            "url": "/userapp/base/codeInt/list?codetypeId=userType"
          }, {
            "isCheckAll": false,
            "checked": ["1"],
            "children": [{"id": "1", "name": "小学", "type": 1}],
            "subTitle": "学段",
            "subTitleType": "segment",
            "nextType": "grade",
            "isActive": true,
            "url": "/sm/base/schoolSegmentAd/segmentGrade?type=1",
            "single": false,
            "checkAll": true
          }]
        },
          {
            "title":
              "2、选择年级", "isActive":
              true, "code":
              "grade", "children":
              [{
                "isCheckAll": false,
                "checkAll": ["__vue_devtool_undefined__"],
                "checked": ["1", "2", "3", "4", "5", "6"],
                "children": [{"id": "1", "name": "一年级", "type": 2}, {"id": "2", "name": "二年级", "type": 2}, {
                  "id": "3",
                  "name": "三年级",
                  "type": 2
                }, {"id": "4", "name": "四年级", "type": 2}, {"id": "5", "name": "五年级", "type": 2}, {
                  "id": "6",
                  "name": "六年级",
                  "type": 2
                }],
                "subTitle": "小学",
                "subTitleType": "grade",
                "id": "1",
                "isActive": true,
                "url": "/sm/base/schoolSegmentAd/segmentGrade?type=2&id=1",
                "single": false
              }]
          }
          ,
          {
            "title":
              "3、选择班级", "isActive":
              true, "code":
              "class", "children":
              [{
                "isCheckAll": false,
                "checkAll": ["__vue_devtool_undefined__"],
                "checked": ["0dbc76524d954c02b2d5fcc44b7ab90e"],
                "children": [{"id": "0dbc76524d954c02b2d5fcc44b7ab90e", "name": "一年一班"}],
                "subTitle": "一年级",
                "subTitleType": "class",
                "id": "1",
                "isActive": false,
                "url": "/sm/base/classInfoAd/list?gradeId=1",
                "single": false
              }, {
                "isCheckAll": false,
                "checkAll": [],
                "checked": [],
                "children": [],
                "subTitle": "二年级",
                "subTitleType": "class",
                "id": "2",
                "isActive": false,
                "url": "/sm/base/classInfoAd/list?gradeId=2",
                "single": false
              }, {
                "isCheckAll": false,
                "checkAll": ["__vue_devtool_undefined__"],
                "checked": [],
                "children": [],
                "subTitle": "三年级",
                "subTitleType": "class",
                "id": "3",
                "isActive": true,
                "url": "/sm/base/classInfoAd/list?gradeId=3",
                "single": false
              }, {
                "isCheckAll": false,
                "checkAll": [],
                "checked": [],
                "children": [],
                "subTitle": "四年级",
                "subTitleType": "class",
                "id": "4",
                "isActive": false,
                "url": "/sm/base/classInfoAd/list?gradeId=4"
              }, {
                "isCheckAll": false,
                "checkAll": [],
                "checked": [],
                "children": [],
                "subTitle": "五年级",
                "subTitleType": "class",
                "id": "5",
                "isActive": false,
                "url": "/sm/base/classInfoAd/list?gradeId=5"
              }, {
                "isCheckAll": false,
                "checkAll": [],
                "checked": [],
                "children": [],
                "subTitle": "六年级",
                "subTitleType": "class",
                "id": "6",
                "isActive": false,
                "url": "/sm/base/classInfoAd/list?gradeId=6"
              }]
          }
        ],
        surveyVisible: false,
        testVisible:
          false,
        chapterVisible:
          false,
        chapterList:
          [],
        testList:
          [],
        surveyList:
          [{}],
        optionsList1:
          [
            {label: '全部', value: ''}
          ],
        index:
          0,
        maxIndex:
          2,
        params:
          {
            page: 1,
            limit:
              999,
            resourceType:
              '',
            title:
              ''
          }
        ,
        chapterList1: [],
        chapterList2:
          [],
        formLoading:
          false,
        isLoaded:
          true,
        imagePath:
          [], //单独使用一个图片变量
        filePath:
          [], //单独使用一个图片变量
        formData:
          {
            surveyName: '',
            imagePath:
              '',
            securityEducationTypeCode:
              '',
            courseResourceChaptersInfos:
              [],
            courseSurveyInfoVO:
              {
                entityTypeCode: "",
                pdstatusCode:
                  "",
                surveyId:
                  "",
                surveyName:
                  "xxxxxxxxxxxxxxx"
              }
            ,
            filePath: [],
            scope:
              {}
            ,
            clickType: "",
            teacherInfo:
              '',
            name:
              '',
            content:
              '',
            courseSurveyId:
              "",
            courseTestId:
              "",
            courseStatusCode:
              "",
            chapterName:
              ""
          }
        ,
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now()
          }
        }
        ,
        rules0: {
          name: [
            {required: true, message: '请您输入课程名称', trigger: 'blur'},
            {max: 32, message: '最多能输入32个字', trigger: 'blur'},
          ],
          securityEducationTypeCode:
            [
              {required: true, message: '请您输入课程类型'},
            ],
          imagePath:
            [
              {required: true, message: '请您添加课程封面'},
            ],
          content:
            [
              {required: true, message: '请您添加课程介绍', trigger: 'blur'},
            ],
          // teacherInfo: [
          //   {required: true, message: '请您添加课程介绍', trigger: 'blur'},
          // ],
        }
        ,
        rules1: {}
        ,
        rules2: {}
        ,
        SendObjectData: {
          gradeIds: []
        }
      }
    },
    computed: {
      pageState() {
        return this.$route.params.type
      },
      courseId() {
        return this.$route.params.id
      }
    },
    created() {
      let courseType = this.$route.query.courseType
      if (courseType === 'courseType4AQ') {
        this.params.resourceType = 1
      } else {
        this.params.resourceType = 2
      }
      commonApi.getCourseType(courseType).then(res => {
        this.optionsList1 = this.optionsList1.concat(coverData(res.data.data, 'name', 'id'))
      })
    },
    mounted() {
      this.getDetail(this.$route.params.id)

    },
    methods: {
      handleCurrentChange(currentPage) {
        this.params.page = currentPage;
        this.getChapter()
      },
      search(e) {
        let query = this.selectData;
        for (let item in query) {
          this.params[item] = query[item]
        }
        this.addChapter()
      },
      changesImg(event) {
        this.uploadFile(event.target.files[0], res => {
          let quill = this.$refs['QuillEditor'].quill
          let length = quill.getSelection().index
          quill.insertEmbed(length, 'image', res)
          quill.setSelection(length + 1)
        })
        event.target.value = ''
      },
      addChapterV1() {
        this.addChapterFormData.name = "";
        this.chapterList = [];
        this.index = 3;
      },
      delChapter(index) {
        this.formData.courseResourceChaptersInfos.splice(index, 1)
      },
      fileDown(selector, name) {
        // 通过选择器获取img元素
        var img = document.querySelector(selector)
        // 将图片的src属性作为URL地址
        var url = img.src
        var a = document.createElement('a')
        var event = new MouseEvent('click')

        a.download = name || '下载图片名称'
        a.href = url

        a.dispatchEvent(event)
      },
      bohuihandleClose() {
        this.bohuiLoading = false;
      },
      bohuiComfire() {
        let _a = {
          courseId: this.courseId,
          courseStatusCode: "reject",
          auditInfo: this.bohuiContent
        };
        this.bohuiLoading = true;
        api.updateStatus(_a).then(res => {
          if (res.data.resultCode === '000000') {
            this.$message.success("驳回成功");
            this.$router.push({
              path: "/safetyEdu/listCourseOp"
            })
          } else {
            this.$message.error(res.data.message);
          }
          this.bohuiLoading = false;
          this.loadingTingyong = false;
          this.dialogTingyong = false;
        }, res => {
          this.bohuiLoading = false;
          this.$message.error(res.message);
        });
        this.bohuiVisible = false;
      },
      bohuiCancel() {
        this.bohuiLoading = false;
        this.bohuiVisible = false;
      },
      tongguo() {
        let _a = {
          courseId: this.courseId,
          courseStatusCode: "pass"
        };
        this.tongguoLoading = true;
        api.updateStatus(_a).then(res => {
          if (res.data.resultCode === '000000') {
            this.$message.success("通过成功");
            this.$router.push({
              path: "/safetyEdu/listCourseOp"
            })
          } else {
            this.$message.error(res.data.message);
          }
          this.tongguoLoading = false;
        }, res => {
          this.tongguoLoading = false;
          this.$message.error(res.message);
        });
      },
      bohui() {
        this.bohuiVisible = true;
      },
      fileFinish(data) {
        console.log(data)
      },

      sendFinish(data) {
        let {header} = data
        this.isSelectObj = true
        let extendData = JSON.stringify(header)
        let province = []
        let city = []
        let area = []
        for (const headerElement of header) {
          switch (headerElement.code) {
            case 'stage':
              for (const child of headerElement.children) {
                this.SendObjectData.segmentIds = [...child.checked]
              }
              break
            case 'grade':
              for (const child of headerElement.children) {
                this.SendObjectData.gradeIds = this.SendObjectData.gradeIds.concat(child.checked)
              }
              break
            case 'province':
              for (const child of headerElement.children) {
                for (const child1 of child.children) {
                  for (const checkedElement of child.checked) {
                    if (child1.id === checkedElement) {
                      province.push(child1)
                    }
                  }
                }
              }
              break
            case 'city':
              for (const child of headerElement.children) {
                for (const child1 of child.children) {
                  for (const checkedElement of child.checked) {
                    if (child1.id === checkedElement) {
                      city.push(child1)
                    }
                  }
                }
              }
              break
            case 'area':
              for (const child of headerElement.children) {
                for (const child1 of child.children) {
                  for (const checkedElement of child.checked) {
                    if (child1.id === checkedElement) {
                      area.push(child1)
                    }
                  }
                }
              }
              break
          }
        }
        if (area.length) {
          this.SendObjectData.areas = area
        } else if (city.length) {
          this.SendObjectData.areas = city
        } else {
          this.SendObjectData.areas = province
        }
        this.SendObjectData.extendData = extendData
        this.formData.scope = this.SendObjectData
      },

      uploadDataFJ(data) {
        //console.log(data.replace(",",";"))
        this.formData.filePath = data
      },

      wenjuanClose() {
        console.log("232232")
      },

      addWenJuan() {
        this.surveyVisible = true;
        api.wenjuanList({
          page: 1,
          marketStatus: 4,
          limit: 10
        }).then(res => {
          if (res.data.resultCode === '000000') {
            this.surveyData = res.data.data.records
            this.formLoading = false
          } else {
            this.$message.error(res.data.message)
            this.formLoading = false
          }
        })
      },

      submit(formName, type) {
        const set = this.$refs
        this.isLoaded = true
        this.saveLoading = true;
        this.formData.courseStatusCode = type;
        if (!this.isSelectObj) return this.$message.error('未确认选择完成')
        set[formName].validate(valid => {
          if (valid) {
            if (this.pageState === 'add') {
              this.formLoading = true
              api.courseInfoAdd(this.formData).then(res => {
                if (res.data.resultCode === '000000') {
                  this.$message.success('保存成功')
                  this.goBack()
                } else {
                  this.$message.error(res.data.message)
                }
                this.saveLoading = false;
                this.formLoading = false
              })
            } else {
              this.formLoading = true
              api.courseInfEdit(this.formData).then(res => {
                if (res.data.resultCode === '000000') {
                  this.$message.success('修改成功')
                  this.goBack()
                } else {
                  this.$message.error(res.data.message)
                }
                this.saveLoading = false;
                this.formLoading = false
              })
            }
          }
        })
        this.isLoaded = false
      },

      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj({courseId: paramsId}).then(res => {
            if (res.data.resultCode === '000000') {
              let resData = res.data.data
              let surveyName = '';
              if (resData.courseSurveyInfoVO && resData.courseSurveyInfoVO.surveyName) {
                surveyName = resData.courseSurveyInfoVO.surveyName
              }
              if (resData.filePath && resData.filePath) {
                this.filePath = resData.filePath.split(",")
              }
              // if(resData.scope&&resData.scope.extendData){
              //   let extendData = JSON.parse(resData.scope.extendData)
              //   this.header = extendData;
              // }
              this.formData = resData;
              this.formData.surveyName = surveyName;
            }
            this.isLoaded = false
          })
        }
      },

      save(formData) {
        this.formData.clickType = "save"
        this.submit(formData, 'editing')
      },

      checkHandle() {
        this.formData.clickType = "next"
        this.formData.courseStatusCode = "approving"
        console.log(this.formData)
        this.submit('formData', 'approving')
        this.$message.success('提交审核')
      },

      next() {
        // formData
        const set = this.$refs;
        if (this.index === 0) {
          set['formData'].validate(valid => {
            if (valid) {
              this.maxIndex > this.index && this.index++
            }
          })
        } else {
          this.maxIndex > this.index && this.index++
        }
      },
      back() {
        this.index > 0 && this.index--
      },

      goBack() {
        this.$router.go(-1)
      },

      addChapter() {
        this.chapterVisible = true
        this.getChapter()
      },
      getChapter() {
        apiChapter.fetchList(this.params).then(res => {
          if (res.data.resultCode != "000000") {
            this.$message.error(res.data.message);
          } else {
            this.chapterData = res.data.data
          }
          this.zjloading = false;
        })
      },

      addChapterFinish() {

        let _a = JSON.stringify(this.chapterList)
        let _b = this.addChapterFormData.name
        if (!_b) {
          this.$message.error("请输入章节名称");
          return
        }
        if (!this.chapterList.length) {
          this.$message.error("请添加章节");
          return
        }
        let a = [];
        this.formData.chapterName = this.addChapterFormData.name;
        this.chapterList.map(item => {
          a.push({
            resourceId: item.resourceId,
            chapterChildrenName: item.title
          })
        })

        this.formData.courseResourceChaptersInfos.push({
          chapterName: this.formData.chapterName,
          courseChapterResourceInfoList: a
        })
        this.index = 1
        this.$forceUpdate()
      },
      addSurvey() {
        this.surveyVisible = true
      },
      addTest() {
        this.testVisible = true
      },
      enter(dataType) {
        switch (dataType) {
          case 'chapter':
            this.chapterList = this.chapterList.concat(this.chapterMultiple)
            this.chapterVisible = false
            break
          case 'survey':
            this.surveyList = this.surverMultiple
            this.surveyList = this.surveyData.filter(item => {
              return this.surveyIdradio == item.surveyId
            })[0]
            this.surveyVisible = false
            this.formData.surveyId = this.surveyList.surveyId
            this.formData.surveyName = this.surveyList.surveyName

            break
          case 'test':
            this.testList = this.testMultiple
            this.testVisible = false
            break
        }
      },
      handleSelectionChange(data, type) {
        switch (type) {
          case 'chapter':
            this.chapterMultiple = data
            break
          case 'survey':
            console.error(data)
            this.surverMultiple = data
            break
          case 'test':
            this.testMultiple = data
            break
        }
        console.log(this.$data)
      },
      handle(type, item, index) {
        switch (type) {
          case 'plus':
            this.chapterList.splice(index, 0, item)
            break
          case 'less':
            this.chapterList.splice(index, 1)
            break
          case 'up':
            if (index === 0) {
              return
            }
            this.chapterList.splice(index, 1)
            this.chapterList.splice(--index || 0, 0, item)
            break
          case 'down':
            if (index === this.chapterList.length - 1) {
              return
            }
            this.chapterList.splice(index, 1)
            this.chapterList.splice(++index || this.chapterList.length - 1, 0, item)
        }
        this.$forceUpdate()
      },
      handleClick(item, index, index1) {
        this.currentItemIndex = `${index}${index1}`
        console.log(item.accessPath)
        this.detail.formData.currentUrl = item.accessPath
      },

      removeChapterItemInChapterList(item, index) {
        this.chapterList.splice(index, 1)
      },
      uploadData(e) {
        this.formData.imagePath = e
      },

      example() {
        this.formData = {
          "courseResourceChaptersInfos": [{
            "chapterName": "546",
            "courseChapterResourceInfoList": [{
              "resourceId": "13338cee7f00000114f00bf10abd8369",
              "chapterChildrenName": "火灾隐患"
            }, {"resourceId": "132deb0a7f00000114f00bf1ea88352f", "chapterChildrenName": "消防课堂"}]
          }],
          "filePath": "http://118.126.94.4:8410/group1/M00/00/26/rBAAAlyvL2uATRH4AAAGjsQNuxU94.json",
          "scope": {},
          "clickType": "save",
          "securityEducationTypeCode": "C",
          "imagePath": "http://118.126.94.4:8410/group1/M00/00/16/wKgCwVxlBhyADD1cAADo8bMVlHY959.jpg",
          "teacherInfo": "<p>546</p>",
          "name": "34534",
          "content": "<p>543</p>",
          "courseSurveyId": "",
          "courseTestId": "",
          "courseStatusCode": "",
          "chapterName": "546",
          "surveyId": "99996c403de940b68250dabfa46e064f",
          "surveyName": "东方神起"
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  $active: #93BF88;
  .edit-box {
    padding: 40px;
    width: auto;

    .detail-title-v2 {
      background: #f5f5f5;
      border-radius: 4px;
      height: 40px;
      line-height: 40px;
      padding-left: 12px;
      margin-right: 40px;
      color: #707070;
      font-size: 14px;
    }

    .detail-item-v2 {
      display: flex;
      flex-wrap: wrap;
      padding: 25px 25px 0 25px;
    }

  }

  .detail-content {
    .btn-group {
      margin: 30px 0;
    }

    .active {
      color: $active;
    }
  }


  .bm-view {
    width: 640px;
    height: 300px;
    margin-top: 10px;
  }

  .fush-btn {
    margin: 0 15px
  }

  .point-box {
    box-sizing: border-box;

    &__item {
      margin: 10px 0;
      display: flex;
      align-items: center;

      span {
        margin-left: 8px;

        &:not(:first-child) {
          cursor: pointer;
        }

        &:nth-child(1) {
          align-items: center;
          width: 88px;
          height: 30px;
          line-height: 30px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          border: 1px solid #ccc;
          color: #93BF88;
          margin-left: 0;
          -webkit-border-radius: 5px;
          -moz-border-radius: 5px;
          border-radius: 5px;
        }
      }
    }
  }

  .chapterItem {
    &:hover {
      &:after {
        position: relative;
        left: 20px;
        margin-right: 10px;
        content: 'X';
        color: red;
      }
    }
  }
</style>
