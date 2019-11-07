<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col v-show="false" :span="24">
            <el-form-item label="兴趣班id :" prop="interestCourseClassId">
              <el-input disabled class="input-v2-rao" v-model="formData.interestCourseClassId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="兴趣班 :">
              <el-input disabled class="input-v2-rao" v-model="formData.interestCourseClassName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <el-col v-show="false" :span="24">
            <el-form-item label="学校id :" prop="interestCourseClassId">
              <el-input disabled class="input-v2-rao" v-model="getInterestCourseClassSection.schoolOrgId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学时数 :" prop="classHour">
              <el-input type="number" class="input-v2-rao" v-model="formData.classHour"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期 :" prop="planedDt">
              <el-date-picker :disabled="isChooseWeek" class="date-v2-rao" @change="getDay" v-model="formData.planedDt"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <!--<el-col :span="24">-->
          <!--<el-form-item label="日期 :" prop="planedDt">-->
          <!--<el-date-picker class="date-v2-rao" @change="getDay" v-model="formData.planedDt" type="date"-->
          <!--placeholder="选择日期"-->
          <!--value-format="yyyy-MM-dd HH:mm"-->
          <!--:picker-options="pickTime">-->
          <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="12">
            <el-form-item label="周几 :" prop="weekNum">
              <el-select :disabled="isChooseDay" @change="getWeek" v-model="formData.weekNum" placeholder="请选择">
                <el-option value="">请您选择</el-option>
                <el-option
                  v-for="item in weekOptions"
                  :key="item.weekNum"
                  :label="item.label"
                  :value="item.weekNum">
                </el-option>
              </el-select>
              <!--<el-input type="number" class="input-v2-rao" v-model="formData.weekNum"-->
              <!--maxlength="11"></el-input>-->
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="节数 :" prop="getSetions">
              <el-select style="width: 298px;" @change="getsetion" multiple v-model="formData.getSetions"
                         placeholder="请选择">
                <el-option
                  v-for="item in sections"
                  :key="item.beginTime"
                  :label="item.timelineDetailName"
                  :value="item.beginTime">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <!--<el-col :span="24">-->
          <!--<el-form-item label="开始时间 :" prop="beginTime">-->
          <!--<el-date-picker class="date-v2-rao" v-model="formData.beginTime" type="datetime"-->
          <!--placeholder="选择日期"-->
          <!--value-format="yyyy-MM-dd HH:mm"-->
          <!--:picker-options="pickTime">-->
          <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label="开始时间 :" prop="beginTime">-->
          <!--<el-time-picker-->
          <!--v-model="formData.beginTime"-->
          <!--class="date-box"-->
          <!--format='HH:mm' 设置下拉框时间格式-->
          <!--value-format="HH:mm" 设置返回值时间格式-->
          <!--:picker-options="pickTime">-->
          <!--</el-time-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label="结束时间 :" prop="beginTime">-->
          <!--<el-time-picker v-model="formData.endTime"-->
          <!--format='HH:mm' value-format="HH:mm"-->
          <!--beginTime>-->
          <!--</el-time-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-form-item label="开始时间 :" prop="beginTime">-->
          <!--<el-input class="input-v2-rao" v-model="formData.beginTime"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label="截止时间 :" prop="endTime">-->
          <!--<el-date-picker class="date-v2-rao" v-model="formData.endTime" type="datetime"-->
          <!--placeholder="选择日期"-->
          <!--value-format="yyyy-MM-dd HH:mm"-->
          <!--:picker-options="pickTime">-->
          <!--</el-date-picker>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="截止时间 :" prop="endTime">-->
          <!--<el-input class="input-v2-rao" v-model="formData.endTime"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->

          <!--</el-col>-->

          <!--                  <el-col :span="24">-->
          <!--                    <el-form-item label="教室 :" prop="placeId">-->
          <!--                      <el-input class="input-v2-rao" v-model="formData.placeId"-->
          <!--                                maxlength="32"></el-input>-->
          <!--                    </el-form-item>-->
          <!--                  </el-col>-->


          <!--<el-col :span="24">-->
          <!--<el-form-item label="教室 :" prop="placeName">-->
          <!--<el-input class="input-v2-rao" v-model="formData.placeName"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="24">-->
          <!--<el-form-item label="场所" prop="">-->
          <!--<el-select class="select-v2-rao p100" @change="getClassName()" popper-class="select-popper-v2-rao"-->
          <!--v-model="formData.placeName"-->
          <!--placeholder="请您选择">-->
          <!--<el-option value="">-->
          <!--请您选择-->
          <!--</el-option>-->
          <!--<el-option v-for="(item,index) in palceTableDataList" :key="item.placeId"-->
          <!--:label="item.placeName" :value="item.placeName">-->
          <!--&lt;!&ndash;                    <div>{{item.interestCourseClassName}}</div>&ndash;&gt;-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <el-col :span="12">
            <el-form-item label="场所 :" prop="placeName">
              <el-cascader style="width: 300px"
                           :options="palceTableDataList"
                           v-model="childrenPlaceId"
                           :props="props" @change="getPlaceNames">
              </el-cascader>
            </el-form-item>
          </el-col>


        </el-form>
      </div>

      <div v-if="pageState === 'edit'">

        <el-form :label-position="'right'" class="edit-form"
                 label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">

          <el-col v-show="false" :span="24">
            <el-form-item label="兴趣班id :" prop="interestCourseClassId">
              <el-input disabled class="input-v2-rao" v-model="formData.interestCourseClassId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="兴趣班 :">
              <el-input disabled class="input-v2-rao" v-model="formData.interestCourseClassName"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>

          <el-col v-show="false" :span="24">
            <el-form-item label="学校id :" prop="interestCourseClassId">
              <el-input disabled class="input-v2-rao" v-model="getInterestCourseClassSection.schoolOrgId"
                        maxlength="32"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="学时数 :" prop="classHour">
              <el-input type="number" class="input-v2-rao" v-model="formData.classHour"
                        maxlength="11"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="日期 :" prop="planedDt">
              <el-date-picker :disabled="isChooseWeek" class="date-v2-rao" @change="getDay" v-model="formData.planedDt"
                              type="date"
                              placeholder="选择日期"
                              value-format="yyyy-MM-dd"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>

          <!--<el-col :span="24">-->
          <!--<el-form-item label="日期 :" prop="planedDt">-->
          <!--<el-date-picker class="date-v2-rao" @change="getDay" v-model="formData.planedDt" type="date"-->
          <!--placeholder="选择日期"-->
          <!--value-format="yyyy-MM-dd HH:mm"-->
          <!--:picker-options="pickTime">-->
          <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="12">
            <el-form-item label="周几 :" prop="weekNum">
              <el-select :disabled="isChooseDay" @change="getWeek" v-model="formData.weekNum" placeholder="请选择">
                <el-option value="">请您选择</el-option>
                <el-option
                  v-for="item in weekOptions"
                  :key="item.weekNum"
                  :label="item.label"
                  :value="item.weekNum">
                </el-option>
              </el-select>
              <!--<el-input type="number" class="input-v2-rao" v-model="formData.weekNum"-->
              <!--maxlength="11"></el-input>-->
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <el-form-item label="节数 :" prop="beginTime">
              <el-select style="width: 298px;" @change="getsetions" v-model="formData.beginTime"
                         placeholder="请选择">
                <el-option
                  v-for="item in sections"
                  :key="item.beginTime"
                  :label="item.timelineDetailName"
                  :value="item.beginTime">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col v-show="false" :span="24">
            <el-form-item label="時間 :">
              <span>{{formData.beginTime +'-' +formData.endTime}}</span>
            </el-form-item>
          </el-col>


          <!--<el-col :span="24">-->
          <!--<el-form-item label="开始时间 :" prop="beginTime">-->
          <!--<el-date-picker class="date-v2-rao" v-model="formData.beginTime" type="datetime"-->
          <!--placeholder="选择日期"-->
          <!--value-format="yyyy-MM-dd HH:mm"-->
          <!--:picker-options="pickTime">-->
          <!--</el-date-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label="开始时间 :" prop="beginTime">-->
          <!--<el-time-picker-->
          <!--v-model="formData.beginTime"-->
          <!--class="date-box"-->
          <!--format='HH:mm' 设置下拉框时间格式-->
          <!--value-format="HH:mm" 设置返回值时间格式-->
          <!--:picker-options="pickTime">-->
          <!--</el-time-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label="结束时间 :" prop="beginTime">-->
          <!--<el-time-picker v-model="formData.endTime"-->
          <!--format='HH:mm' value-format="HH:mm"-->
          <!--beginTime>-->
          <!--</el-time-picker>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <!--<el-form-item label="开始时间 :" prop="beginTime">-->
          <!--<el-input class="input-v2-rao" v-model="formData.beginTime"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->

          <!--<el-col :span="24">-->
          <!--<el-form-item label="截止时间 :" prop="endTime">-->
          <!--<el-date-picker class="date-v2-rao" v-model="formData.endTime" type="datetime"-->
          <!--placeholder="选择日期"-->
          <!--value-format="yyyy-MM-dd HH:mm"-->
          <!--:picker-options="pickTime">-->
          <!--</el-date-picker>-->
          <!--</el-form-item>-->

          <!--<el-form-item label="截止时间 :" prop="endTime">-->
          <!--<el-input class="input-v2-rao" v-model="formData.endTime"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->

          <!--</el-col>-->

          <!--                  <el-col :span="24">-->
          <!--                    <el-form-item label="教室 :" prop="placeId">-->
          <!--                      <el-input class="input-v2-rao" v-model="formData.placeId"-->
          <!--                                maxlength="32"></el-input>-->
          <!--                    </el-form-item>-->
          <!--                  </el-col>-->


          <!--<el-col :span="24">-->
          <!--<el-form-item label="教室 :" prop="placeName">-->
          <!--<el-input class="input-v2-rao" v-model="formData.placeName"-->
          <!--maxlength="32"></el-input>-->
          <!--</el-form-item>-->
          <!--</el-col>-->


          <!--<el-col :span="24">-->
          <!--<el-form-item label="场所" prop="placeId">-->
          <!--<el-select class="select-v2-rao p100" @change="getClassName" popper-class="select-popper-v2-rao"-->
          <!--v-model="formData.placeName"-->
          <!--placeholder="请您选择">-->
          <!--<el-option value="">-->
          <!--请您选择-->
          <!--</el-option>-->
          <!--<el-option v-for="(item,index) in palceTableDataList" :key="item.placeId"-->
          <!--:label="item.placeName" :value="item.placeName">-->
          <!--&lt;!&ndash;                    <div>{{item.interestCourseClassName}}</div>&ndash;&gt;-->
          <!--</el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="12">
            <el-form-item label="场所 :" prop="placeName">
              <el-cascader style="width: 300px"
                           :options="palceTableDataList"
                           v-model="childrenPlaceId"
                           :props="props" @change="getPlaceNames">
              </el-cascader>
            </el-form-item>
          </el-col>


        </el-form>
      </div>


      <!--<div v-if="pageState === 'edit'">-->
      <!--<el-form :label-position="'right'" class="edit-form"-->
      <!--label-width="120px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">-->

      <!--<el-col :span="12">-->
      <!--<el-form-item label="日期 :" prop="planedDt">-->
      <!--<el-date-picker :disabled="isChooseWeek" class="date-v2-rao" @change="getDay" v-model="formData.planedDt"-->
      <!--type="date"-->
      <!--placeholder="选择日期"-->
      <!--value-format="yyyy-MM-dd"-->
      <!--:picker-options="pickTime">-->
      <!--</el-date-picker>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="24">-->
      <!--<el-form-item label="开始时间 :" prop="beginTime">-->
      <!--<el-input class="input-v2-rao" v-model="formData.beginTime"-->
      <!--maxlength="32"></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="24">-->
      <!--<el-form-item label="截止时间 :" prop="endTime">-->
      <!--<el-input class="input-v2-rao" v-model="formData.endTime"-->
      <!--maxlength="32"></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="24">-->
      <!--<el-form-item label="学时数 :" prop="classHour">-->
      <!--<el-input type="number" class="input-v2-rao" v-model="formData.classHour"-->
      <!--maxlength="11"></el-input>-->
      <!--</el-form-item>-->
      <!--</el-col>-->
      <!--<el-col :span="24">-->
      <!--<el-form-item label="场所" prop="placeId">-->
      <!--<el-select class="select-v2-rao p100" @change="getClassName()" popper-class="select-popper-v2-rao"-->
      <!--v-model="formData.placeName"-->
      <!--placeholder="请您选择">-->
      <!--<el-option value="">-->
      <!--请您选择-->
      <!--</el-option>-->
      <!--<el-option v-for="(item,index) in palceTableDataList" :key="item.placeId"-->
      <!--:label="item.placeName" :value="item.placeName">-->
      <!--&lt;!&ndash;                    <div>{{item.interestCourseClassName}}</div>&ndash;&gt;-->
      <!--</el-option>-->
      <!--</el-select>-->
      <!--</el-form-item>-->
      <!--</el-col>-->

      <!--&lt;!&ndash;<el-col :span="24">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-form-item label="教室 :" prop="placeId">&ndash;&gt;-->
      <!--&lt;!&ndash;<el-input class="input-v2-rao" v-model="formData.placeName"&ndash;&gt;-->
      <!--&lt;!&ndash;maxlength="32"></el-input>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
      <!--&lt;!&ndash;</el-col>&ndash;&gt;-->

      <!--</el-form>-->
      <!--</div>-->

      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <!-- 详细查看 -->
            <el-form :label-position="'right'" label-width="120px"
                     :inline="false" :model="formData" size="small" class="flex row wrap">
              <div class="p100">
                <!--                <div class="detail-title-v2 ">-->
                <!--                  {{formData.weekNum}}-->
                <!--                </div>-->
                <div class="detail-item-v2">
                  <div class="p50" v-if="formData.weekNum">
                    <el-form-item label="周几 :" prop="weekNum">
                      <span v-if="formData.weekNum">{{formData.weekNum}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50">
                    <el-form-item label="日期 :" prop="planedDt">
                      <span v-if="formData.planedDt"> {{formData.planedDt}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.beginTime">
                    <el-form-item label="开始时间 :" prop="beginTime">
                      <span v-if="formData.beginTime">{{formData.beginTime}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.endTime">
                    <el-form-item label="截止时间 :" prop="endTime">
                      <span v-if="formData.endTime">{{formData.endTime}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.classHour">
                    <el-form-item label="学时数 :" prop="classHour">
                      <span v-if="formData.classHour">{{formData.classHour}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.placeName">
                    <el-form-item label="教室 :" prop="placeName">
                      <span v-if="formData.placeName">{{formData.placeName}}</span>
                    </el-form-item>
                  </div>
                  <div class="p50" v-if="formData.placeName">
                    <el-form-item label="考勤 :" prop="placeName">
                      <el-button size="small" type="primary" @click="addChapter">开始考勤</el-button>
                    </el-form-item>
                  </div>


                </div>

              </div>
            </el-form>
          </el-col>

        </el-row>
      </div>

      <div class="text-center mt-30">
        <el-button v-if="pageState === 'edit'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="medium"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="fush-btn button-v2-rao b93BF88"
                   :loading="formLoading" size="medium"
                   @click="submit('formData')">发布
        </el-button>
        <el-button type="primary" class="fush-btn button-v2-rao border-color-cccccc c707070 bfff" size="medium"
                   @click="goBack">返回
        </el-button>
      </div>
    </div>

    <!--签到-->
    <el-dialog
      title="考勤学生列表"
      :visible.sync="chapterVisible"
      width="80%">

     <span slot="footer" class="dialog-footer">
<!--          <el-button @click="chapterVisible = false">取 消</el-button>-->
          <el-button type="primary" @click="studentArrive">已到</el-button>
          <el-button type="primary" @click="studentNoArrive">未到</el-button>
        </span>

      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="未到学生"
        >
          <template slot-scope="scope">{{ scope.row.studentName }}</template>
        </el-table-column>


      </el-table>


    </el-dialog>
    <!--未到的说明-->
    <el-dialog
      title="考勤学生列表"
      :visible.sync="laterReason"
      width="80%">
      <el-input
        type="textarea"
        :rows="5"
        placeholder="请输入学生未到理由"
        v-model="studentMessage.remarkCheckException">
      </el-input>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="studentNoArriveReason">确定</el-button>
      <el-button type="primary" @click="cancelStudentNoArriveReason">取消</el-button>
        </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from "./interestcourseclassplanUrl";
  import validation from "@/util/validate2";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'
  import uploads from '@/components/upload/uploadFile'
  import {coverData} from '@/util/util'
  //import preview from '@/util/preview';
  import {validatenull} from '@/util/validate'

  export default {
    components: {editor, upload, uploads},
    data() {
      return {
        childrenPlaceId: [],
        palceTableDataList: [],
        props: {
          value: 'placeId',
          label: 'placeName',
          children: 'children'
        },
        weekOptions: [
          {
            weekNum: '1',
            label: '周一'
          }, {
            weekNum: '2',
            label: '周二'
          }, {
            weekNum: '3',
            label: '周三'
          }, {
            weekNum: '4',
            label: '周四'
          }, {
            weekNum: '5',
            label: '周五'
          }, {
            weekNum: '6',
            label: '周六'
          }, {
            weekNum: '7',
            label: '周日'
          }],
        value: '',
        mianpArrlaceId: '',

        isChooseDay: false,
        isChooseWeek: false,
        chapterVisible: false,
        laterReason: false,
        StudentData: null,
        studentMessage: {
          interestCourseClassId: [],
          interestCourseClassName: null,
          planId: null,
          classStudentId: [],
          // arr:[],
          isCheckException: null,
          remarkCheckException: '',
          // studentCheckId:'',
        },
        getstudentMessage: {
          page: 1,
          limit: 9999,
          interestCourseClassId: null,
        },
        noArriveStudentData: null,
        arrive: [],
        noArrive: [],
        tableData: [],

        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),
        setionList: [],
        setion: [],
        formData: {
          getSetions: [],
          // "17:40"
          planId: '',
          placeId: '',
          placeName: '',
          beginTime: "",
          interestCourseClassName: '',
          interestCourseClassId: '',
          endTime: "",
          classHour: "",
          weekNum: '',
          weekLabel: '',
          segmentId: "",
          gradeId: "",
          schoolYear: "",
          schoolTerm: "",
          planedDt: '',
          gradeName: ""
        },
        getInterestCourseClassSection: {
          schoolOrgId: '',
          segmentId: "",
          gradeId: "",
          schoolYear: "",
          schoolTerm: "",
          timelineTypeCode: "J"
        },
        palceTableData: '',
        selectedOptions: [],
        place: {
          page: 1,
          limit: 9999,
          schoolId: null,
          parentPlaceId: -1,
        },
        firstSchoolTerm: null,
        secondSchoolTerm: null,
        optionsList3: [],
        optionsList4: [],
        sections: [],
        options: [{
          value: '1',
          label: '上学期'
        }, {
          value: '2',
          label: '下学期'
        }],
        grades: {
          schoolId: null,
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        aaa: {
          schoolOrgId: "8ee6d402367648ff84726ff712b916da",
          segmentId: "2",
          gradeId: "8",
          schoolYear: "2018-2019",
          schoolTerm: "2",
          timelineTypeCode: "J"
        },
        sss: {
          page: 1,
          limit: 10,
          placeNum: null,
          schoolId: '8ee6d402367648ff84726ff712b916da',
          parentPlaceId: -1,
          placeName: null,
          maxUser: null,
        },
        Drag: false,
        inputTable: true,
        palceTableChildrenData: [],
        allPlace: [],
        allPlaces: [],
        isDetailPage: null,
        rules: {
          interestCourseClassId:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          interestCourseClassName:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],

          getSetions:
            [
              {required: true, message: "请选择节数", trigger: "blur"},
            ],
          schoolYear:
            [
              {required: true, message: "请选择学年", trigger: "blur"},
            ],
          segmentName:
            [
              {required: true, message: "请选择学段", trigger: "blur"},
            ],
          gradeName:
            [
              {required: true, message: "请选择年级", trigger: "blur"},
            ],
          weekNum:
            [],
          planedDt:
            [],
          beginTime:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          endTime:
            [
              {max: 32, message: "最多能输入32个字", trigger: "blur"},

            ],
          classHour:
            [
              // {required: true, message: "请输入学时", trigger: "blur"},
              {validator: validation.number, trigger: "blur"},
            ],
          placeId:
            [
              {required: true, message: "请选择场所", trigger: "blur"},
            ],
          placeName:
            [
              {required: true, message: "请选择场所", trigger: "blur"},

            ],
        }

      }
    },

    computed: {
      pageState() {
        return this.$route.params.type;
      }
    },
    // directives: {preview},
    created() {
      this.getPalce();
      // commonApi.getCodeIntType("classStudentStatus").then(res => {
      //   // console.log(res.data.data)
      //   let viewList = res.data.data || [];
      //   for (let ynItem of viewList) {
      //     this.ynOptions.push({
      //       "label": ynItem.codeDesc,
      //       "name": ynItem.codeId
      //     });
      //   }
      // });
      let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
      this.grades.schoolId = this.getInterestCourseClassSection.schoolOrgId = userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id

      let query = this.$route.query;
      this.getInterestCourseClassSection.segmentId = query.segmentId   //这四条去获取节数的
      this.getInterestCourseClassSection.gradeId = query.gradeId
      this.getInterestCourseClassSection.schoolYear = query.schoolYear
      this.getInterestCourseClassSection.schoolTerm = query.schoolTerm

      this.formData.interestCourseClassId = query.interestCourseClassId
      this.studentMessage.interestCourseClassId = query.interestCourseClassId;//兴趣班id
      this.getstudentMessage.interestCourseClassId = query.interestCourseClassId;//兴趣班id

      this.studentMessage.interestCourseClassName = query.interestCourseClassName;//兴趣班名
      this.formData.interestCourseClassName = query.interestCourseClassName;//兴趣班名
      this.studentMessage.planId = this.$route.params.id;  //计划id
      // // console.log(this.$route)
      this.getInterestCourseClassSections()
      this.getList();

    },
    mounted() {
    },
    methods: {

      getPlaceNames() {
        // // console.log(this.childrenPlaceId)
        if (this.childrenPlaceId.length === 1) {   //选择主场所
          let placeId = this.childrenPlaceId[0]
          for (let i = 0; i < this.palceTableDataList.length; i++) {
            if (placeId === this.palceTableDataList[i].placeId) {
              this.formData.placeName = this.palceTableDataList[i].placeName
              this.formData.placeId = this.palceTableDataList[i].placeId
              break
            }
          }
        } else {                                 //选择子场所
          let placeId = this.childrenPlaceId[1]
          for (let i = 0; i < this.palceTableDataList.length; i++) {
            if (this.palceTableDataList[i].children !== undefined) {
              for (let j = 0; j < this.palceTableDataList[i].children.length; j++) {
                if (placeId === this.palceTableDataList[i].children[j].placeId) {
                  this.formData.placeName = this.palceTableDataList[i].children[j].placeName
                  this.formData.placeId = this.palceTableDataList[i].children[j].placeId
                  break
                }
              }
            }
          }
        }
      },

      getPalce() {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.place.schoolId = userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id
        api.getPlaceList(this.place).then(res => {
          let palceList = res.data.data
          // console.log(palceList)

          for (let i = 0; i < palceList.length; i++) {
            let num = 1
            if (palceList[i].children.length !== 0) {
              this.palceTableDataList.push({
                placeName: palceList[i].placeName,
                placeId: palceList[i].placeId,
                children: []
              });
              for (let j = 0; j < palceList[i].children.length; j++) {
                if (num === 1) {
                  this.palceTableDataList[i].children.push({
                    placeName: palceList[i].placeName,
                    placeId: palceList[i].placeId
                  });
                  num = 2
                }
                this.palceTableDataList[i].children.push({
                  placeName: palceList[i].children[j].placeName,
                  placeId: palceList[i].children[j].placeId
                });
              }
            } else {
              this.palceTableDataList.push({placeName: palceList[i].placeName, placeId: palceList[i].placeId});
              // for (let j = 0; j < palceList[i].children.length; j++) {
              //   this.palceTableDataList[i].children.push({placeName: palceList[i].children[j].placeName,placeId: palceList[i].children[j].placeId});
              // }
            }
          }
          // console.log(this.palceTableDataList)
        })
      },


      getWeekNum() {
        // // console.log(this.isDetailPage)
        for (let i = 0; i < this.weekOptions.length; i++) {
          if (this.formData.weekNum == this.weekOptions[i].weekNum) {
            this.formData.weekNum = this.weekOptions[i].label
          }
        }

        this.getDay()
        this.getWeek()
        // // console.log(typeof this.formData.weekNum)
        // // console.log(typeof this.weekOptions[1].weekNum)
      },
      getsetion(val) {
        // // console.log(val);
        // // console.log(this.formData.getSetions)
        // var beginTimeArr = []
        // var endTimeArr = []
        this.setion = []
        for (let i = 0; i < this.sections.length; i++) {
          for (let j = 0; j < this.formData.getSetions.length; j++) {
            if (this.sections[i].beginTime === this.formData.getSetions[j]) {
              this.setion.push({beginTime: this.sections[i].beginTime, endTime: this.sections[i].endTime})
            }
          }
        }
        // // console.log(this.setion[0].beginTime)
        // // console.log(this.setion[1].beginTime)
        // this.formData.getSetions = [beginTimeArr[0],endTimeArr[endTimeArr.length - 1]];
        // this.formData.beginTime = beginTimeArr[0]
        // this.formData.endTime = endTimeArr[endTimeArr.length - 1]
        // // console.log(this.formData)
      },
      getsetions() {
        // // console.log(this.formData.beginTime)
        // var beginTimeArr = []
        // var endTimeArr = []
        for (let i = 0; i < this.sections.length; i++) {
          if (this.sections[i].beginTime === this.formData.beginTime) {
            // beginTimeArr.push(this.sections[i].beginTime)
            this.formData.endTime = this.sections[i].endTime
          }
          // for (let j = 0; j < this.formData.getSetions.length; j++) {
          //   if (this.sections[i].beginTime === this.setionList[j].beginTime) {
          //     beginTimeArr.push(this.sections[i].beginTime)
          //     endTimeArr.push(this.sections[i].endTime)
          //   }
          // }
        }
        // // console.log(this.formData)
        // this.formData.getSetions = [beginTimeArr[0],endTimeArr[endTimeArr.length - 1]];
      },
      getInterestCourseClassSections() {
        // // console.log(this.getInterestCourseClassSection)
        api.getInterestCourseClassSections(this.getInterestCourseClassSection).then(res => {
          // // console.log(this.formData.endTime)
          if (res.data.resultCode !== "000000") {
            this.$message.error(res.data.message);
          } else {
            // console.log(validatenull(res.data.data))
            this.sections = validatenull(res.data.data) ? [] : res.data.data;
            if (!this.sections.length) {
              this.$message('学校未曾安排兴趣班的作息')
              return
            }
            this.sections.map(item => {
              // // console.log(item)
              if (this.formData.endTime === item.endTime) {
                // this.formData.beginTime=item.beginTime
                this.setionList = [
                  {beginTime: item.beginTime, endTime: item.endTime}
                ]
              }
            })
          }
        })
      },

      getDay() {
        // console.log(typeof this.formData.planedDt)
        // console.log(this.formData.planedDt)
        // // console.log(this.formData.weekNum)

        if (this.formData.planedDt !== undefined) {
          if (this.formData.planedDt !== null) {
            this.isChooseDay = true
            this.formData.weekNum = ''
          } else {
            this.isChooseDay = false
          }
        } else {
          this.isChooseDay = false
        }

      },
      getWeek() {
        let numCount = '周一周二周三周四周五周六周日1234567'
        // let num=parseInt(this.formData.weekNum);  //returns  1234
        if (numCount.indexOf(this.formData.weekNum) !== -1 && this.formData.weekNum !== '') {
          this.isChooseWeek = true
          this.formData.planedDt = ''
        } else {
          this.isChooseWeek = false
        }
        // this.weekOptions.map(item=>{
        //   if (item.weekNum===this.formData.weekNum){
        //     this.formData.weekLabel = item.weekLabel
        //   }
        // })
      },


      studentArrive() {
        // // console.log(this.arr)
        // console.log(this.studentMessage.classStudentId.length)
        if (this.studentMessage.classStudentId.length > 0) {
          this.chapterVisible = false;
          this.studentMessage.isCheckException = 'Y'
          api.studentArrive(this.studentMessage).then(res => {
            // // console.log(this.studentMessage)
            if (res.data.resultCode !== "000000") {
              this.$message.error(res.data.message);
            } else {
              this.$message.success("签到成功");
              this.studentMessage.classStudentId = []
              this.$refs.multipleTable.clearSelection();
            }
            // this.tableData.map(item=>{
            //   item.check=false
            // })
          })
        } else {
          this.$message.error('请选择已到学生');
        }

      },
      studentNoArriveReason() {
        this.laterReason = false;
        this.studentMessage.isCheckException = 'N';
        api.studentArrive(this.studentMessage).then(res => {
          if (res.data.resultCode !== "000000") {
            this.$message.error(res.data.message);
          } else {
            this.$message.success("以完成未签到");
          }
          this.studentMessage.remarkCheckException = null;
          this.studentMessage.classStudentId = []
          this.$refs.multipleTable.clearSelection();
        })
      },

      studentNoArrive() {
        // console.log(this.studentMessage.classStudentId)
        if (this.studentMessage.classStudentId.length > 0) {
          this.chapterVisible = false;
          this.laterReason = true;
        } else {
          this.$message.error('请选择未到学生');
          return;
        }
      },
      cancelStudentNoArriveReason() {
        this.chapterVisible = true;
        this.laterReason = false;
      },
      getList() {
        // this.getInterestCourseClassSections();
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.place.schoolId = userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id
        api.getList(this.getstudentMessage).then(res => {
          this.tableData = res.data.data.records
          // console.log(res.data.data.records)
          if (res.data.resultCode !== "000000") {
            this.$message.error(res.data.message);
          } else {
          }
        })


        this.getDetail(this.$route.params.id);


        // api.getPlaceList(this.place).then(res => {
        //   this.palceTableData = res.data.data
        //   // // console.log(this.palceTableData)
        //   for (let i = 0; i < this.palceTableData.length; i++) {
        //     this.palceTableDataList.push({
        //       index:i,
        //       placeName: this.palceTableData[i].placeName,
        //       placeId: this.palceTableData[i].placeId,
        //       children: [],
        //     });
        //   }
        //   // console.log(this.palceTableData)
        //   if (res.data.resultCode !== "000000") {
        //     this.$message.error(res.data.message);
        //   }
        // })


      },

      handleSelectionChange(item) {
        // console.log(item)
        var fileArray = [];
        this.studentMessage.classStudentId = [];
        for (let i = 0; i < item.length; i++) {
          fileArray.push(item[i].classStudentId);
        }
        this.studentMessage.classStudentId = fileArray;
        // console.log(this.studentMessage.studentIds)
        // console.log(fileArray)
      },

      SelectionChange() {
        this.noArrive = item
        // console.log(this.noArrive)
      },


      addChapter() {
        this.chapterVisible = true
      },
      submit(formName) {
        for (let i = 0; i < this.weekOptions.length; i++) {
          if (this.formData.weekNum == this.weekOptions[i].label) {
            this.formData.weekNum = this.weekOptions[i].weekNum
          }
        }
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          if (this.pageState === 'edit' && valid) {
            this.formLoading = true;
            api.putObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.goBack()
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            })
          } else if (this.pageState === 'add' && valid) {
            this.formLoading = true;
            let formDatas = []
            // this.setion.map(item=>{
            //   this.formData.beginTime=item[i].beginTime
            //   this.formData.endTime=item[i].endTime
            //   formDatas.push(this.formData)
            // })\

            let setionList = this.formData.getSetions;
            ;
            for (let i = 0; i < this.setion.length; i++) {
              if (setionList.indexOf(this.setion[i].beginTime) !== -1) {

                let item = {};
                for (let it in this.formData) {
                  item[it] = this.formData[it];
                }
                item.beginTime = this.setion[i].beginTime
                item.endTime = this.setion[i].endTime
                formDatas.push(item)
              }
            }
            // // console.log(formDatas);

            // this.formData.setions=this.setion
            api.addObj(formDatas).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.goBack()
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            })
          }
        })
        this.isLoaded = false;
      },
      getDetail(paramsId) {
        // this.getInterestCourseClassSections(paramsId);
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data;
              this.setionList = [];
              this.setionList = [{beginTime: this.formData.beginTime, endTime: this.formData.endTime}]
              this.getWeekNum();
              let placeId = this.formData.placeId
              this.childrenPlaceId = []
              for (let i = 0; i < this.palceTableDataList.length; i++) {
                if (this.palceTableDataList[i].children.length > 0) {
                  for (let j = 0; j < this.palceTableDataList[i].children.length; j++) {
                    if (placeId === this.palceTableDataList[i].children[j].placeId) {
                      this.childrenPlaceId.push(this.palceTableDataList[i].placeId)
                      this.childrenPlaceId.push(this.palceTableDataList[i].children[j].placeId)
                      // // console.log(this.childrenPlaceId)
                      break
                    }
                  }
                } else {
                  if (placeId === this.palceTableDataList[i].placeId) {
                    this.childrenPlaceId.push(placeId)
                    break
                  }
                }
              }
            }
            this.isLoaded = false;
          })
        }

        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        this.place.schoolId = userInfo.content.extValues.schoolOrg.schoolOrgId   //学校id
        api.getPlaceList(this.place).then(res => {
          this.allPlace = res.data.data
          // console.log(this.allPlace)
          for (let i = 0; i < this.allPlace.length; i++) {
            this.allPlaces.push({placeName: this.allPlace[i].placeName, placeId: this.allPlace[i].placeId});
          }
          // // console.log(this.palceTableData)
          if (res.data.resultCode !== "000000") {
            this.$message.error(res.data.message);
          }
        })

      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
<style lang="scss" scoped>
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

  .el-form-item--small.el-form-item {
    margin-bottom: 25px;
  }

  .bm-view {
    width: 640px;
    height: 300px;
    margin-top: 10px;
  }

  .fush-btn {
    margin: 0 15px
  }
</style>
