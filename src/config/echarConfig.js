const optionCircle = {
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
}
const optionLine = {
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
}
const optionChina = {
  
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
}


export default {optionCircle, optionLine, optionChina}
