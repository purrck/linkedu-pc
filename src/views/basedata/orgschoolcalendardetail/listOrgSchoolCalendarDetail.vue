<template>
  <div class="OrgSchoolCalendarDetail">
    <el-container v-loading="isLoaded" element-loading-custom-class="home-loading"
                  style="min-height: 600px"
                  element-loading-spinner="el-icon-loading" element-loading-background="rgba(0, 0, 0, 0.1)">
      <el-header style="height: auto">
        <el-form ref="searchForm" :model="searchForm" :inline="true" size="small" class="select-form">
          <el-form-item label="学段:" prop="segmentId">
            <el-select class="input-v2-rao" v-model="searchForm.segmentId" placeholder="请选择学段" @change="segmentChange">
              <el-option
                v-for="item in optionsList3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="年级:" prop="gradeId">
            <el-select class="select-v2-rao" v-model="searchForm.gradeId" placeholder="请选择年级">
              <el-option
                v-for="item in optionsList4"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="" prop="schoolYearStart">
            <el-date-picker class="date-v2-rao"
              v-model="searchForm.schoolYearStart"
              type="year"
              value-format="yyyy"
              placeholder="选择年">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="至" prop="schoolYearEnd">
            <el-date-picker class="date-v2-rao"
              v-model="searchForm.schoolYearEnd"
              type="year"
              value-format="yyyy"
              placeholder="选择年">
            </el-date-picker>
          </el-form-item>

          <el-form-item label="学期 :" prop="schoolTerm">
            <el-select class="select-v2-rao" v-model="searchForm.schoolTerm" placeholder="请选择学期" @change="changeTerm">
              <el-option
                v-for="item in optionsList2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item label="选择月份:" prop="month">
            <el-select class="select-v2-rao" v-model="searchForm.month" placeholder="请您选择月份">
              <el-option v-for="(it,index) in 12" :key="index" :label="it" :value="it"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" class="button-v2-rao b93BF88" @click="search">查询</el-button>
            <!---->
          </el-form-item>
        </el-form>
      </el-header>

      <div class="bt border-color-e8e8e8 mt10 mb10"></div>
      <el-main class="relative">
          <div class=" flex center">
            <div class="data-header">
              <ul>
                <li v-for="(item,index) in weeks" :key="index">
                  {{item.title}}
                </li>
              </ul>
            </div>
            <div class="data-content">
              <ul>
                <li v-for="(item,index) in dates" :key="index" @click="getItem(item)" class="content-item">
                  <span style="position: absolute;left: 0;right: 0; ">{{item.specialId}}</span>
                  <span class="code-type" v-if="item.content&&item.content.calendarTypeCodeStr">{{item.content.calendarTypeCodeStr.split(';')[0]}}</span>
                  <span class="date-discr"
                        v-if="item.content&&item.content.holidayName">{{item.content.holidayName}}</span>
                </li>
              </ul>
            </div>
          </div>
      </el-main>
    </el-container>
    <el-dialog
      title=""
      :visible.sync="centerDialogVisible" width="370px" center>
      <!--<span>需要注意的是内容是默认不居中的</span>-->
      <div class="date-edit-box bF5F5F5  flex x-center ">
        <div class="date-edit-year pt20 pb20">
          <p class="f25 bold pt40">{{baseDate.year+'-'}}{{baseDate.month}} {{`星期${baseDate.week}`}}</p>
          <p class="f50 bold pt40 text-center"><span>{{baseDate.date}}</span></p>
        </div>
        <div></div>
        <div class="bt border-color-93BF88 pt40">
          <el-form ref="contentForm" :model="formData" :inline="true" size="small" class="select-form ">
            <el-row :span="24">
              <el-form-item label="安排:" prop="calendarTypeCode">
                <span v-if="itemState==='detail'&&formData.calendarTypeCodeStr">{{formData.calendarTypeCodeStr.split(';')[0]}}</span>
                <el-select v-show="itemState==='edit'" class="w140 select-v2-rao" v-model="formData.calendarTypeCode" placeholder="请您选择类型" >
                  <el-option v-for="(it,index) in calendarTypeCodeOptions" :key="index" :label="it.label" :value="it.name"></el-option>
                </el-select>
              </el-form-item>
            </el-row>
            <!--<el-row :span="24">-->
              <!--<el-form-item label="描述:" prop="discripe">-->
                <!--<span     v-show="itemState==='detail'">{{formData.tableName}}</span>-->
                <!--<el-input v-show="itemState==='edit'"  class="w140 input-v2-rao" v-model="formData.discripe" maxlength="30"  ></el-input>-->
              <!--</el-form-item>-->
            <!--</el-row>-->
          </el-form>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary"  class="el-button--small-icon" @click="itemToSubmit" v-show="itemState==='edit'">保存</el-button>
          <el-button type="primary"  class="el-button--small-icon" @click="itemToEdit" v-show="itemState==='detail'">编辑</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import api from "./orgschoolcalendardetailUrl";
  import commonApi from "@/api/common/common";
  import {coverData} from '@/util/util'

  const oriDates = [
    {id: 1, content: null, specialId: '', week: null, date: null, month: null, year: null},
    {id: 2, content: null, specialId: ''},
    {id: 3, content: null, specialId: ''},
    {id: 4, content: null, specialId: ''},
    {id: 5, content: null, specialId: ''},
    {id: 6, content: null, specialId: ''},
    {id: 7, content: null, specialId: ''},
    {id: 8, content: null, specialId: ''},
    {id: 9, content: null, specialId: ''},
    {id: 10, content: null, specialId: ''},
    {id: 11, content: null, specialId: ''},
    {id: 12, content: null, specialId: ''},
    {id: 13, content: null, specialId: ''},
    {id: 14, content: null, specialId: ''},
    {id: 15, content: null, specialId: ''},
    {id: 16, content: null, specialId: ''},
    {id: 17, content: null, specialId: ''},
    {id: 18, content: null, specialId: ''},
    {id: 19, content: null, specialId: ''},
    {id: 20, content: null, specialId: ''},
    {id: 21, content: null, specialId: ''},
    {id: 22, content: null, specialId: ''},
    {id: 23, content: null, specialId: ''},
    {id: 24, content: null, specialId: ''},
    {id: 25, content: null, specialId: ''},
    {id: 26, content: null, specialId: ''},
    {id: 27, content: null, specialId: ''},
    {id: 28, content: null, specialId: ''},
    {id: 29, content: null, specialId: ''},
    {id: 30, content: null, specialId: ''},
    {id: 31, content: null, specialId: ''},
    {id: 32, content: null, specialId: ''},
    {id: 33, content: null, specialId: ''},
    {id: 34, content: null, specialId: ''},
    {id: 35, content: null, specialId: ''},
    {id: 36, content: null, specialId: ''},
    {id: 37, content: null, specialId: ''},
    {id: 38, content: null, specialId: ''},
    {id: 39, content: null, specialId: ''},
    {id: 40, content: null, specialId: ''},
    {id: 41, content: null, specialId: ''},
    {id: 42, content: null, specialId: ''},
  ];
  export default {
    data() {
      return {
        isLoaded: true,

        centerDialogVisible: false,
        itemState:'detail',
        optionsList4: [],
        optionsList3: [],
        optionsSelectData: [],
        optionsList2: [
          {label: '第一学期', value: '1'},
          {label: '第二学期', value: '2'}
        ],
        calendarTypeCodeOptions: [],
        ynOptions: [{"label": "全部", "name": ""}],
        formData: {
          calendarId: null,
          schoolOrgId: null,
          segmentId: null,
          gradeId: null,
          schoolYear: null,
          schoolTerm: null,
          weekSchoolYear: null,
          weekSchoolTerm: null,
          calendarTypeCodeValue: null,
          calendarDt: null,
        },
        searchForm: {
          segmentId: null,
          gradeId: '',
          month: null,
          schoolYear: null,
          schoolYearStart: null,
          schoolYearEnd: null,
          schoolTerm: null,
        },
        params: {
          calendarId: null,
          schoolOrgId: null,
          segmentId: null,
          gradeId: null,
          schoolYear: null,
          schoolTerm: null,
          month: null,
          schoolYearStart: null,
          schoolYearEnd: null,
          weekSchoolYear: null,
          weekSchoolTerm: null,
          calendarTypeCode: null,
          calendarDt: null,
        },
        baseDate: {
          month: '12',
          year: '2019',
          week: '5',
          date: '01',
        },
        dates: [],
        weeks: [
          {id: 0, title: '日', content: ''},
          {id: 1, title: '一', content: ''},
          {id: 2, title: '二', content: ''},
          {id: 3, title: '三', content: ''},
          {id: 4, title: '四', content: ''},
          {id: 5, title: '五', content: ''},
          {id: 6, title: '六', content: ''},
        ],
        data: null,
        type: 'detail',
      }
    },
    watch:{
      centerDialogVisible (val){
        if(!val){
          this.itemState = 'detail'
        }
      }
    },
    computed: {
      indexMethod() {
        return (this.params.limit * (this.params.page - 1)) + 1
      }
    },
    created() {
      this.dates = oriDates;
      let params = JSON.parse(this.$route.query.params);
      for (let it in params) {
        this.params[it] = params[it];
        this.searchForm[it] = params[it];
      }
      this.schoolChange();
      this.getList();
    },
    activated() {
      //只刷新数据，不改变整体的缓存
      // console.log('重新活跃路由');
      let query = this.$route.query;
      for (let item in query) {
        this.params[item] = query[item]
      }
      this.getList()
    },
    mounted() {

      // this.getCurrentPage(this.$route.fullPath, this.params);
      commonApi.getCodeIntType("calendarType").then(res => {
        let viewList = res.data.data || [];
        for (let calendarTypeItem of viewList) {
          this.calendarTypeCodeOptions.push({
            "label": calendarTypeItem.codeDesc,
            "name": calendarTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("boolean_yn").then(res => {
        let viewList = res.data.data || [];
        for (let ynItem of viewList) {
          this.ynOptions.push({
            "label": ynItem.codeDesc,
            "name": ynItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      changeTerm() {

      },
      itemToEdit (){
        this.itemState = 'edit'
        // this.centerDialogVisible = false
      },
      itemToSubmit (){
        // this.itemState = 'edit'
        let obj = {
          calendarId: this.formData.calendarId,
          calendarDetailId: this.formData.calendarDetailId,
          calendarDt:this.formData.calendarDt,
          calendarTypeCode:this.formData.calendarTypeCode
        }
        this.centerDialogVisible = false
        api.putObj(obj).then(res=>{
          if(res.data.resultCode==='000000') {
            this.getList();

            this.$message.success('修改成功！')
          }
        })
        this.itemState = 'detail'
      },
      segmentChange(Id) {
        let segmentId = Id ? Id : this.searchForm.segmentId;
        this.optionsSelectData.children.forEach(item => {
          if (item.id === segmentId) {
            this.optionsList4 = coverData(item.children, 'name', 'id')
          }
        })
      },
      schoolChange() {
        let userInfo = JSON.parse(sessionStorage.getItem('userInfo'));
        let extValues = userInfo.content && userInfo.content.extValues;
        let id = extValues.schoolOrg && extValues.schoolOrg.schoolOrgId
        commonApi.getClassTreeBySchool(id).then(res => {
          this.optionsSelectData = res.data.data;
          this.optionsList3 = coverData(res.data.data.children, 'name', 'id');
          this.segmentChange();
        })
      },


      getList() {
        api.fetchList(this.params).then(res => {
          this.dates = oriDates;
          if(res.data.resultCode==='000000'){
            this.data = res.data.data;
            this.isLoaded = false;

            this.init(this.data);
          }
        }, res => {
          this.$message.error(res.message);
        });
      },

      init(data) {

        let params = this.params;

        let firstDayWeek = this.getWeek(params['schoolYearStart'], params['month']);
        let num = this.getDaysInYearMonth(params['schoolYearStart'], params['month']);
        // // console.log(firstDayWeek)
        // // console.log(num)

        for(let i = 0;i < this.dates.length; i++) {
          if(i<=firstDayWeek) {
            this.dates[i].specialId = '';
            this.dates[i].content = null;
          }else if(firstDayWeek<i&&i<=num+parseInt(firstDayWeek)){
            this.dates[i].specialId = i-firstDayWeek;
            if(!this.dates.length){
              this.dates[i].content = null;
            }else {
              for (let it in data) {
                if (data[it].calendarDt.indexOf(this.dealDt(this.dates[i].specialId)) !== -1) {
                  this.dates[i].content = data[it]
                }
              }
            }
          }else if(i>num+parseInt(firstDayWeek)){
            this.dates[i].specialId = '';
            this.dates[i].content = null;
          }
        }
      },
      getItem(item) {
        if(!item.specialId) return;
        let params = this.params;
        let firstDayWeek = this.getWeek(params['schoolYearStart'], params['month']);
        let res = item.specialId % 7 + (parseInt(firstDayWeek)) ;
        this.baseDate['month'] = params['month'];
        this.baseDate['year'] = params['schoolTerm']===1?params['schoolYearStart']:params['schoolYearEnd'];
        this.baseDate['week'] = res % 7;
        this.baseDate['date'] = item.specialId;
        this.formData = item.content || {};
        this.centerDialogVisible = true;
      },

      getWeek(year, month) {
        var d = new Date();
        d.setYear(year);
        d.setMonth(month - 1);
        d.setDate(1);
        // // console.log(d);
        //获得周几
        // var weeks = ['周天','周1','周2','周3','周4','周5','周6'];
        var weeks = ['0', '1', '2', '3', '4', '5', '6'];
        return weeks[d.getDay()];
      },
      getDaysInYearMonth(year, month){
        // // console.log(year)
        // // console.log(month)
        // month = parseInt(month, 10) + 1;
        var date = new Date(year, month, 0);
        return date.getDate();
      },
      dealDt(day) {
        let reDt = '';
        // let year = this.params.schoolYearStart;
        let month = this.params.month ? this.params.month < 10 ? '0' + this.params.month : this.params.month : '01';
        let resDay = day ? day < 10 ? '0' + day : day : 10;
        reDt = `-${month}-${resDay}`;
        return reDt;
      },

      search() {
        for (let key in this.searchForm) {
          this.params[key] = this.searchForm[key]
        }
        this.isLoaded = true;
        this.getList();
      },

    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

  .data-header {
    width: 988px;

    ul {
      display: flex;
      flex-wrap: wrap;
      border-left: 1px solid #e8e8e8;
      border-bottom: 1px solid #e8e8e8;

      li {
        border-top: 1px solid #e8e8e8;
        border-right: 1px solid #e8e8e8;
        width: 140px;
        height: 90px;
        text-align: center;
        line-height: 90px;
        float: left;
      }
    }
  }

  .date-edit-box {
    flex: 1;
    max-width: 320px;
    max-height: 6400px;
  }

  .data-content {
    width: 988px;

    ul {
      display: flex;
      flex-wrap: wrap;
      border-left: 1px solid #e8e8e8;

      li {
        position: relative;
        border-bottom: 1px solid #e8e8e8;
        border-right: 1px solid #e8e8e8;
        width: 140px;
        height: 90px;
        float: left;
        text-align: center;
        line-height: 90px;

        .code-type {
          position: absolute;
          font-size: 12px;
          bottom: 30px;
          right: 10px;
        }

        .date-discr {
          position: absolute;
          font-size: 12px;
          left: 0;
          right: 0;
          top: 30px;
          color: orange;
        }
      }
    }
  }
</style>
