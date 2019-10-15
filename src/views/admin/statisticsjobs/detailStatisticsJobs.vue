<template>
  <div>
    <div class="edit-box">
      <div v-if="pageState === 'add'" class='mh500'>
        <div class="mb-20">{{formData.jobName}}
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="统计分析 *  :" prop="jobKey">
              <el-input v-model="formData.jobKey" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="参数值 :" prop="parameterValues">
              <el-input v-model="formData.parameterValues" maxlength="1000"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="执行频率 :" prop="frequencyCode">
              <el-select v-model="formData.frequencyCode" placeholder="请您选择">
                <el-option v-for="frequencyCodeItem in frequencyCodeOptions"
                           :key="frequencyCodeItem.name"
                           :label="frequencyCodeItem.label" :value="frequencyCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="执行时间 :" prop="performedDt">
              <el-date-picker v-model="formData.performedDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="状态 :" prop="statisticsJobStatusCode">
              <el-select v-model="formData.statisticsJobStatusCode" placeholder="请您选择">
                <el-option v-for="statisticsJobStatusCodeItem in statisticsJobStatusCodeOptions"
                           :key="statisticsJobStatusCodeItem.name"
                           :label="statisticsJobStatusCodeItem.label" :value="statisticsJobStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="x轴 :" prop="xname">
              <el-input v-model="formData.xname" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="y轴 :" prop="yname">
              <el-input v-model="formData.yname" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="统计图形式 :" prop="charTypeCode">
              <el-select v-model="formData.charTypeCode" placeholder="请您选择">
                <el-option v-for="charTypeCodeItem in charTypeCodeOptions"
                           :key="charTypeCodeItem.name"
                           :label="charTypeCodeItem.label" :value="charTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="值名称 :" prop="valuesname">
              <el-input v-model="formData.valuesname" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="统计规则名称 :" prop="jobName">
              <el-input v-model="formData.jobName" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24" class="orgIntroduction ">
            <el-form-item label="sql *  :" prop="jobSql">
              <el-input v-model="formData.jobSql" maxlength="2550"></el-input>
            </el-form-item>
          </el-col>

          <div class="clearfix"></div>

        </el-form>
      </div>

      <div v-if="pageState === 'edit'">
        <div class="mb-20">{{formData.jobName}}
          <span class="cGrey">（注： <span class="cRed">*</span> 为必填信息）</span>
          <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
        </div>
        <el-form :label-position="'right'" class="schoolForm-rao"
                 label-width="200px" ref="formData" :inline="false" :model="formData" :rules="rules" size="small">


          <el-col :span="12">
            <el-form-item label="统计分析 *  :" prop="jobKey">
              <el-input v-model="formData.jobKey" maxlength="32"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="参数值 :" prop="parameterValues">
              <el-input v-model="formData.parameterValues" maxlength="1000"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="执行频率 :" prop="frequencyCode">
              <el-select v-model="formData.frequencyCode" placeholder="请您选择">
                <el-option v-for="frequencyCodeItem in frequencyCodeOptions"
                           :key="frequencyCodeItem.name"
                           :label="frequencyCodeItem.label" :value="frequencyCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="执行时间 :" prop="performedDt">
              <el-date-picker v-model="formData.performedDt" type="datetime" placeholder="选择日期"
                              value-format="yyyy-MM-dd HH:mm"
                              :picker-options="pickTime"></el-date-picker>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="状态 :" prop="statisticsJobStatusCode">
              <el-select v-model="formData.statisticsJobStatusCode" placeholder="请您选择">
                <el-option v-for="statisticsJobStatusCodeItem in statisticsJobStatusCodeOptions"
                           :key="statisticsJobStatusCodeItem.name"
                           :label="statisticsJobStatusCodeItem.label" :value="statisticsJobStatusCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="x轴 :" prop="xname">
              <el-input v-model="formData.xname" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="y轴 :" prop="yname">
              <el-input v-model="formData.yname" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="统计图形式 :" prop="charTypeCode">
              <el-select v-model="formData.charTypeCode" placeholder="请您选择">
                <el-option v-for="charTypeCodeItem in charTypeCodeOptions"
                           :key="charTypeCodeItem.name"
                           :label="charTypeCodeItem.label" :value="charTypeCodeItem.name">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="值名称 :" prop="valuesname">
              <el-input v-model="formData.valuesname" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="12">
            <el-form-item label="统计规则名称 :" prop="jobName">
              <el-input v-model="formData.jobName" maxlength="128"></el-input>
            </el-form-item>
          </el-col>


          <el-col :span="24" class="orgIntroduction ">
            <el-form-item label="sql *  :" prop="jobSql">
              <el-input v-model="formData.jobSql" maxlength="2550"></el-input>
            </el-form-item>
          </el-col>


          <div class="clearfix"></div>

        </el-form>
      </div>


      <div v-if="pageState === 'detail'">
        <el-row>
          <el-col :xs="20" :sm="20" :md="20" :lg="20" :xl="20">
            <!--<h3 class="text-center mb-20">{{formData.schoolOrgName}}</h3>-->
            <div class="mb-20">{{formData.jobName}}
              <div style="border:1px solid #4A9388;width:29px;margin-top:5px"></div>
            </div>
            <!-- 详细查看 -->
            <el-form :label-position="'right'" class="schoolForm-rao schoolForm-detail-rao" label-width="165px"
                     :inline="true" :model="formData" size="small">


              <el-col :span="12" v-if="formData.frequencyCodeStr">
                <el-form-item label="执行频率 :" prop="frequencyCode"
                              v-if="formData.frequencyCodeStr"
                              :style="{'color':formData.frequencyCodeStr.split(';')[1]}">
                  {{formData.frequencyCodeStr.split(';')[0]}}
                </el-form-item>
              </el-col>

              <el-col :span="12" v-if="formData.performedDt">
                <el-form-item label="执行时间 :" prop="performedDt">
                  {{formData.performedDt}}
                </el-form-item>
              </el-col>
              <!--<el-col :span="24" v-if="formData.parameterValues">-->
              <!--<el-form-item label="参数值 :" prop="parameterValues">-->
              <!--{{formData.parameterValues}}-->
              <!--</el-form-item>-->
              <!--</el-col>-->

              <!--<el-col :span="12" v-if="formData.statisticsJobStatusCodeStr">-->
              <!--<el-form-item label="状态 :" prop="statisticsJobStatusCode"-->
              <!--:style="{'color':formData.statisticsJobStatusCodeStr.split(';')[1]}">-->
              <!--{{formData.statisticsJobStatusCodeStr.split(';')[0]}}-->
              <!--</el-form-item>-->
              <!--</el-col>-->

              <!--<el-col :span="12" v-if="formData.xname">-->
              <!--<el-form-item label="x轴 :" prop="xname">-->
              <!--{{formData.xname}}-->
              <!--</el-form-item>-->
              <!--</el-col>-->

              <!--<el-col :span="12" v-if="formData.yname">-->
              <!--<el-form-item label="y轴 :" prop="yname">-->
              <!--{{formData.yname}}-->
              <!--</el-form-item>-->
              <!--</el-col>-->

              <!--<el-col :span="12" v-if="formData.charTypeCodeStr">-->
              <!--<el-form-item label="统计图形式 :" prop="charTypeCode"-->
              <!--:style="{'color':formData.charTypeCodeStr.split(';')[1]}">-->
              <!--{{formData.charTypeCodeStr.split(';')[0]}}-->
              <!--</el-form-item>-->
              <!--</el-col>-->

              <!--<el-col :span="12" v-if="formData.valuesname">-->
              <!--<el-form-item label="值名称 :" prop="valuesname">-->
              <!--{{formData.valuesname}}-->
              <!--</el-form-item>-->
              <!--</el-col>-->

              <!--<el-col :span="12" v-if="formData.jobName">-->
              <!--<el-form-item label="统计规则名称 :" prop="jobName">-->
              <!--{{formData.jobName}}-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <!--<el-col :span="24" v-if="formData.jobSql">-->
              <!--<el-form-item label="sql :" prop="jobSql">-->
              <!--&lt;!&ndash;{{formData.jobSql}}&ndash;&gt;-->
              <!--</el-form-item>-->
              <!--</el-col>-->
              <el-col :span="24" class="center flex">
                <div id="myChart" style="width:560px;height:350px;padding: 30px"></div>
              </el-col>


            </el-form>
          </el-col>
          <el-col :xs="4" :sm="4" :md="4" :lg="4" :xl="4">
            <div class="menu-quickly">
              <ul>
                <li>
                  <a href="javascript:void(0)" class="current">
                    <img src="~@/assets/img/menu_quickly/icon_wteacher.png" width="20"/>统计详情
                  </a>
                </li>
                <!--<div @click="changeObj(formData.jobKey)"><img-->
                <!--src="~@/assets/img/menu_quickly/icon_studentinfo.png" width="20"/>学生信息-->
                <!--</div>-->
                <!--</li>-->
              </ul>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="clearfix"></div>

      <div class="text-center">
        <el-button type="primary" class="mr80" size="small"
                   @click="goBack">返回
        </el-button>
        <el-button v-if="pageState === 'edit'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">更新
        </el-button>
        <el-button v-if="pageState === 'add'" type="primary" class="mr80" :loading="formLoading" size="small"
                   @click="submit('formData')">发布
        </el-button>

      </div>

    </div>
  </div>
</template>

<script>
  import api from "./statisticsjobsUrl";
  import {toEcharsOther, toEcharsCircle} from "@/util/util";
  import validation from "@/util/validate2";
  import commonApi from "@/api/common/common";
  import editor from '@/components/editor/editor'
  import upload from '@/components/upload/uploadFileV1'

  export default {
    data() {
      return {
        xuantian: false, //选填信息
        formLoading: false,
        isLoaded: true,
        imagePath: [], //单独使用一个图片变量
        //getFileUrl: commonApi.getFileUrl(),
        //getImageUrl: commonApi.getImageUrl(),

        frequencyCodeOptions: [{"label": "全部", "name": ""}], frequencyCode: null,
        statisticsJobStatusCodeOptions: [{"label": "全部", "name": ""}], statisticsJobStatusCode: null,
        charTypeCodeOptions: [{"label": "全部", "name": ""}], charTypeCode: null,
        formData: {
          jobKey: '',
          jobSql: "",
          parameterValues: "",
          frequencyCode: "",
          performedDt: "",
          statisticsJobStatusCode: "",
          xname: "",
          yname: "",
          charTypeCode: "",
          valuesname: "",
          jobName: "",
        },
        pickTime: {
          disabledDate(time) {
            return time.getTime() < Date.now();
          }
        },
        rules: {
          jobSql: [
            {required: true, message: "请您输入sql", trigger: "blur"},
            {max: 2550, message: "最多能输入2550个字", trigger: "blur"},

          ],
          parameterValues: [
            {max: 1000, message: "最多能输入1000个字", trigger: "blur"},

          ],
          frequencyCode: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          performedDt: [],
          statisticsJobStatusCode: [
            {max: 255, message: "最多能输入255个字", trigger: "blur"},

          ],
          xname: [
            {max: 128, message: "最多能输入128个字", trigger: "blur"},

          ],
          yname: [
            {max: 128, message: "最多能输入128个字", trigger: "blur"},

          ],
          charTypeCode: [
            {max: 128, message: "最多能输入128个字", trigger: "blur"},

          ],
          valuesname: [
            {max: 128, message: "最多能输入128个字", trigger: "blur"},

          ],
          jobName: [
            {max: 128, message: "最多能输入128个字", trigger: "blur"},

          ],
        },
        echartData: [],
        optionLine: {
          title: {
            text: '',
            x: 'center'
          },
          tooltip: {},
          color: ['#93BF88', '#FFB54C', '#4ECEFF', '#FA6557', '#717ACB', '#9A9792'],
          xAxis: {
            type: 'category',
            axisTick: {
              alignWithLabel: true
            },
            data: []
          },
          yAxis: {
            type: 'value'
          },
          series: []
        },
        optionCircle: {
          title: {
            text: null,
            x: 'center'
          },
          legend: {
            data: null,
            orient: 'vertical',
            right: 25,
            itemWidth: 20,
            itemHeight: 10,

            top: 15,
            textStyle: {
              fontSize: 12,
              color: '#707070'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
          },
          color: ['#93BF88', '#FFB54C', '#4ECEFF', '#FA6557', '#717ACB', '#9A9792'],
          series: [
            {
              name: '',
              type: 'pie',
              radius: ['50%', '70%'],
              center: ['30%', '50%'],
              data: [],

            }
          ]
        },
      }
    },
    computed: {

      pageState() {
        return this.$route.params.type;
      }
    },
    components: {editor, upload},
    created() {
      this.getDetail(this.$route.params.id);

      commonApi.getCodeIntType("frequency").then(res => {
        let viewList = res.data.data || [];
        for (let frequencyItem of viewList) {
          this.frequencyCodeOptions.push({
            "label": frequencyItem.codeDesc,
            "name": frequencyItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("statisticsJobStatus").then(res => {
        let viewList = res.data.data || [];
        for (let statisticsJobStatusItem of viewList) {
          this.statisticsJobStatusCodeOptions.push({
            "label": statisticsJobStatusItem.codeDesc,
            "name": statisticsJobStatusItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
      commonApi.getCodeIntType("charType").then(res => {
        let viewList = res.data.data || [];
        for (let charTypeItem of viewList) {
          this.charTypeCodeOptions.push({
            "label": charTypeItem.codeDesc,
            "name": charTypeItem.codeId
          });
        }
      }, res => {
        this.$message.error(res.data.message);
      });
    },
    methods: {
      drawLine(option) {
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        myChart.setOption(option);
      },
      //图片上传
      uploadData(res) {
        this.formData.imagePath = res;
      },
      getResult() {
        api.getResults(this.$route.params.id).then(res => {
          this.echartData = res.data.data;

          if (this.formData.charTypeCode === 'pie') {
            let resData = toEcharsCircle(this.echartData);
            this.optionCircle.series[0].data = resData
            this.drawLine(this.optionCircle)
          } else if (this.formData.charTypeCode === 'line') {
            let resData = toEcharsOther(this.echartData);
            let eCharts = {
              name: this.formData.valuesname,
              data: resData.yData,
              barWidth: '100',
              type: 'line'
            };
            this.optionLine.xAxis.data = resData.xData;
            this.optionLine.xAxis.name = `(${this.formData.xname})`;
            this.optionLine.yAxis.name = `(${this.formData.yname})`;
            // this.optionLine.title.text = this.formData.jobName;
            this.optionLine.series[0] = eCharts;
            this.drawLine(this.optionLine)
          } else if (this.formData.charTypeCode === 'bar') {
            let resData = toEcharsOther(this.echartData);
            let eCharts = {
              name: this.formData.valuesname,
              data: resData.yData,
              barWidth: '100',
              type: 'bar'
            };
            this.optionLine.xAxis.data = resData.xData;
            this.optionLine.xAxis.name = `(${this.formData.xname})`;
            this.optionLine.yAxis.name = `(${this.formData.yname})`;
            // this.optionLine.title.text = this.formData.jobName;
            this.optionLine.series[0] = eCharts;
            this.drawLine(this.optionLine)
          } else if (this.formData.charTypeCode === 'scatter') {
            let resData = toEcharsOther(this.echartData);
            let eCharts = {
              name: this.formData.valuesname,
              data: resData.yData,
              barWidth: '100',
              type: 'scatter'
            };
            this.optionLine.xAxis.data = resData.xData;
            this.optionLine.xAxis.name = `(${this.formData.xname})`;
            this.optionLine.yAxis.name = `(${this.formData.yname})`;
            // this.optionLine.title.text = this.formData.jobName;
            this.optionLine.series[0] = eCharts;
            this.drawLine(this.optionLine)
          }
        }, res => {
          this.$message.error(res.message);
        });
      },
      //编辑器
      getEditorValue(val) {
        this.formData.content = val
      },
      //选填信息
      xuantianHandler() {
        this.xuantian = this.xuantian ? false : true;
      },
      submit(formName) {
        const set = this.$refs;
        this.isLoaded = true;
        set[formName].validate(valid => {
          if (this.pageState === "edit" && valid) {
            this.formLoading = true;
            api.putObj(this.formData).then(res => {

              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
              } else {
                //this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          } else if (this.pageState === "add" && valid) {
            this.formLoading = true;
            api.addObj(this.formData).then(res => {
              if (res.data.resultCode === "000000") {
                this.formLoading = false;
                this.$message.success("修改成功");
                this.$router.go(-1)
              } else {
                this.$message.error(res.data.message);
                this.formLoading = false;
              }
            }, res => {
              this.$message.error("加载失败");
              this.formLoading = false;
            })
          }
        })
        this.isLoaded = false;

      },
      getDetail(paramsId) {
        if (this.pageState !== 'add') {
          api.getObj(paramsId).then(res => {
            if (res.data.resultCode === "000000") {
              this.formData = res.data.data
              if (this.pageState === 'detail') {
                this.getResult(this.$route.params.id);
              }
            }
            this.isLoaded = false;
          }, res => {
            this.$message.error(res.message);
          });
        }
      },
      goBack() {
        this.$router.go(-1);
      }
    }
  }
</script>
<style lang="scss" scoped>
  .menu-quickly {
    width: 166px;
    border: 1px solid #d8d8d8;

    a.current {
      background: #4A9388;
      color: #fff
    }

    a {
      padding: 10px 0 10px 15px;
      font-size: 14px;
      display: block;

      img {
        padding-right: 8px;
        vertical-align: -4px;
      }

    }

    a:hover {
      text-decoration: none;
    }

  }

  .el-form-item--small.el-form-item {
    margin-bottom: 25px;
  }

  .schoolForm-detail-rao {

    .el-form-item {
      margin-bottom: 5px;
    }

  }

  .ml80 {
    margin-left: 80px;
  }

  .width100 {
    width: 100%;
  }

  .form-table {
    margin-top: 20px;
  }

  .bm-view {
    width: 760px;
    height: 300px;
    margin-top: 10px;
  }
</style>
