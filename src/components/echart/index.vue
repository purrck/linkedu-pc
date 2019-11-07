<template>
  <div>
    <div class="sub-title" >{{formData.jobName || formData.valuesname}}</div>
    <slot name="header"></slot>
    <div :id="id" style="width: 100%;height:320px"></div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import api from '@/views/admin/statisticsjobs/statisticsjobsUrl'
import {toEcharsCircle, toEcharsOther, toEcharsCircleSomePie,translateNameByResultKey} from '@/util/util'
import common, {getDirTranslateByEntityType, translateByEntityType} from '@/api/common/common'
/**
  * code:关键字
  *id:防止Dom渲染错误
  *typeCode:翻译所用code
  *date：日期参数
  *isNotDictionary:是否走字典翻译
  */
export default {
  name: 'echarIndex',
  props: ['code', 'id', 'typeCode', 'date', 'isNotDictionary','type'],
  data () {
    return {
      optionLine: {
        title: {
          text: '',
          right: '50',
          bottom: '20',
          textStyle: {
            color: '#999999',
            fontSize: 12
          }
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
          text: '',
          right: '50',
          bottom: '20',
          textStyle: {
            color: '#999999',
            fontSize: 12
          }
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
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        color: ['#93BF88', '#FFB54C', '#4ECEFF', '#FA6557', '#717ACB', '#9A9792'],
        series: [
          {
            name: '',
            type: 'pie',
            radius: ['50%', '70%'],
            center: ['50%', '50%'],
            data: [],

          }
        ]
      },
      optionChina: {

        tooltip: {
          trigger: 'item',
          formatter: '{b}<br/>{c} (p / km2)'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          left: 'right',
          top: 'center',
          feature: {
            dataView: {readOnly: false},
            restore: {},
            saveAsImage: {}
          }
        },
        series: [
          {
            type: 'map',
            mapType: 'CHINA', // 自定义扩展图表类型
            itemStyle: {
              normal: {label: {show: true}},
              emphasis: {label: {show: true}}
            },
            color: ['#93BF88', '#FFB54C', '#4ECEFF', '#FA6557', '#717ACB', '#9A9792'],

          }
        ]
      },
      formData: {},
      chinaJosn: {},
      echartData: []
    }
  },
  mounted () {
    this.init()
    // api.getChina().then((res)=>{
    //  let chinaJosn = res.data
    //   this.$echarts.registerMap('CHINA', chinaJosn);
    //   let option = this.optionChina;
    //   let myChart =  this.$echarts.init(document.getElementById(this.id))
    //   myChart.setOption(option)
    // })
  },
  methods: {
    init () {
      this.getHeader(this.code)
    },
    getHeader (code) {
      if (this.pageState !== 'add') {
        api.getObj(code).then(res => {
          if (res.data.resultCode === '000000') {
            if(this.type == "somePie"){
              res.data.data.charTypeCode = this.type;
              res.data.data.nimade = res.data.data.jobName.split(',')
              res.data.data.nimade.unshift("product");

            }
            this.formData = res.data.data
          }
          this.isLoaded = false
        }).then(res => {
          this.getResult(code)
        })
      }
    },
    async getResult (code) {
      // // console.log(this.date)
      api.getResults(code, this.date).then(async res => {

        this.echartData = res.data.data
        //走字典翻译
        if (!this.isNotDictionary) {
          await common.getCodeIntType(this.typeCode).then(result => {
            // // console.log(this.echartData, result.data, code)
            this.echartData = translateNameByResultKey(this.echartData, result.data.data)
          })
        } else {
          await getDirTranslateByEntityType().then(result => {
            for (const resultKey of result.data.data.records) {
              for (const originDatum of this.echartData) {
                if (originDatum.resultKey === resultKey.entityEnName  ) {
                  originDatum.resultKey = resultKey.entityCnName
                }
              }
            }
          })
        }
        // console.log('开始画图')
        if (this.formData.charTypeCode === 'somePie') {
            var _a = {
              legend: {},
              tooltip: {},
              title : [],
              dataset: {
                  source: [
                      //['只读', 41.1],
                      //['已读', 86.5],
                  ]
              },
              series: [/*{
                  type: 'pie',
                  radius: 60,
                  center: ['25%', '30%']
              }, {
                  type: 'pie',
                  radius: 60,
                  center: ['75%', '30%'],

              }*/]
          }
          //let resData = toEcharsCircleSomePie(this.echartData)

          this.formData.nimade.map(item => {
            _a.dataset.source.push([item])
          });
          _a.dataset.source.map(item => {
            if(item == "已读"){
              this.echartData.map((item1,index1) => {
                  item[index1+1] = item1.value1
              })
            }
            if(item == "未读"){
              this.echartData.map((item1,index1) => {
                  item[index1+1] = item1.value2
              })
            }
            if(item == "product"){
              this.echartData.map((item1,index1) => {
                  item[index1+1] = `${index1+1}`
              })
            }
          })

          this.echartData.map((item1,index1) => {
            let _v = {
              color: ['#93BF88', '#FFB54C'],
                type: 'pie',
                radius: 60,
                 center: [`${20*(index1+1)}%`, 180],
                encode: {
                    itemName: 'product',
                    value: index1+1,
                }
              }
              _a.series.push(_v);
              _a.title.push({
                text : item1.resultKey,
                x : `${19*(index1+1)}%`,
                y : 280,
                textAlign: 'center'
              })
          })

          this.drawLine(_a)
        }else if (this.formData.charTypeCode === 'pie') {
          let resData = toEcharsCircle(this.echartData)
          //xun huan
          this.optionCircle.series[0].data = resData
          this.optionCircle.title.text = `数据截止时间 : ${this.formData.performedDt}`

          this.drawLine(this.optionCircle)
        }else if (this.formData.charTypeCode === 'line') {
          let resData = toEcharsOther(this.echartData)
          let eCharts = {
            name: this.formData.valuesname,
            data: resData.yData,
            barWidth: '50',
            type: 'line'
          }
          this.optionLine.xAxis.data = resData.xData
          this.optionLine.xAxis.name = `(${this.formData.xname})`
          this.optionLine.yAxis.name = `(${this.formData.yname})`
          this.optionLine.title.text = `数据截止时间 : ${this.formData.performedDt}`
          this.optionLine.series[0] = eCharts
          this.drawLine(this.optionLine)
        } else if (this.formData.charTypeCode === 'bar') {
          let resData = toEcharsOther(this.echartData)
          let eCharts = {
            name: this.formData.valuesname,
            data: resData.yData,
            barWidth: '50',
            type: 'bar'
          }
          this.optionLine.xAxis.data = resData.xData
          this.optionLine.xAxis.name = `(${this.formData.xname})`
          this.optionLine.yAxis.name = `(${this.formData.yname})`
          this.optionLine.title.text = `数据截止时间 : ${this.formData.performedDt}`
          this.optionLine.series[0] = eCharts
          this.drawLine(this.optionLine)
        } else if (this.formData.charTypeCode === 'scatter') {
          let resData = toEcharsOther(this.echartData)
          let eCharts = {
            name: this.formData.valuesname,
            data: resData.yData,
            barWidth: '100',
            type: 'scatter'
          }
          this.optionLine.xAxis.data = resData.xData
          this.optionLine.xAxis.name = `(${this.formData.xname})`
          this.optionLine.yAxis.name = `(${this.formData.yname})`
          this.optionLine.title.text = `数据截止时间 : ${this.formData.performedDt}`
          this.optionLine.series[0] = eCharts
          this.drawLine(this.optionLine)
        } else {

        }
      }, res => {
        this.$message.error(res.message)
      })
    },
    drawLine (option) {
      let myChart = this.$echarts.init(document.getElementById(this.id))
      myChart.setOption(option)
    },
  }

}
</script>

<style scoped>
  .sub-title {
    padding: 0 16px;
    height: 40px;
    display: flex;
    align-items: center;
    background-color: #F5F5F5;
    color: #707070;
    font-size: 14px;
    -webkit-border-radius: 4px;
    -moz-border-radius: 4px;
    border-radius: 4px;
  }
</style>
