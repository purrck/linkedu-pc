/*
 *    Copyright (c) 2018-2025, lengleng All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer.
 * Redistributions in binary form must reproduce the above copyright
 * notice, this list of conditions and the following disclaimer in the
 * documentation and/or other materials provided with the distribution.
 * Neither the name of the pig4cloud.com developer nor the names of its
 * contributors may be used to endorse or promote products derived from
 * this software without specific prior written permission.
 * Author: lengleng (wangiegie@gmail.com)
 */

import {validatenull} from './validate'
import {baseUrl} from '@/config/env'
import router from '@/router/_router'

export const initMenu = (router, menu) => {
  if (menu.length === 0) {
    return
  }
  router.addRoutes(formatRoutes(menu, 0))
}

export const formatRoutes = (aMenu, index) => {

  const aRouter = []
  aMenu.forEach(oMenu => {
    const {
      path,
      component,
      name,
      children
    } = oMenu
    if (!validatenull(component)) {
      const oRouter = {
        path: path,
        component(resolve) {
          let componentPath = ''
          if (component == 'Layout') {
            require(['../components/container/index'], resolve)
            return
          } else if (component == 'Layout2') {
            require(['../components/Layouts'], resolve)
            return
          } else {
            componentPath = component
          }
          require([`../${componentPath}.vue`], resolve)
        },
        name: name,
        // icon: icon,
        children: validatenull(children) ? [] : formatRoutes(children)
      }
      aRouter.push(oRouter)
    }
  })
  return aRouter
}


/**
 * 加密处理
 */
export const encryption = (params) => {
  let {
    data, //form
    type,
    param,   //param: ['password']
    key      // key: '1234567887654321',
  } = params
  let result = JSON.parse(JSON.stringify(data))
  if (type === 'Base64') {
    param.forEach(ele => {
      result[ele] = btoa(result[ele])
    })
  } else {
    param.forEach(ele => {
      var data = result[ele]
      key = CryptoJS.enc.Latin1.parse(key)
      var iv = key
      //加密
      var encrypted = CryptoJS.AES.encrypt(
        data,
        key,
        {
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.ZeroPadding
        })
      result[ele] = encrypted.toString()
    })
  }
  return result
}

/**
 * 设置浏览器头部标题
 */
export const setTitle = function (title) {
  title = title ? `${title}——Great Hope 校园安全管理系统` : 'Great Hope 校园安全管理系统'
  window.document.title = title
}
/**
 * 浏览器判断是否全屏
 */
export const fullscreenToggel = () => {
  if (fullscreenEnable()) {
    exitFullScreen()
  } else {
    reqFullScreen()
  }
}
/**
 * esc监听全屏
 */
export const listenfullscreen = (callback) => {
  function listen() {
    callback()
  }

  document.addEventListener('fullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('mozfullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('webkitfullscreenchange', function (e) {
    listen()
  })
  document.addEventListener('msfullscreenchange', function (e) {
    listen()
  })
}

/**
 * 浏览器判断是否全屏
 */
export const fullscreenEnable = () => {
  var isFullscreen = document.fullscreenEnabled ||
    window.fullScreen ||
    document.mozFullscreenEnabled ||
    document.webkitIsFullScreen
  return isFullscreen
}

/**
 * 浏览器全屏
 */
export const reqFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.documentElement.requestFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.documentElement.webkitRequestFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.documentElement.mozRequestFullScreen()
  }
}

/**
 * 浏览器退出全屏
 */
export const exitFullScreen = () => {
  if (document.documentElement.requestFullScreen) {
    document.exitFullScreen()
  } else if (document.documentElement.webkitRequestFullScreen) {
    document.webkitCancelFullScreen()
  } else if (document.documentElement.mozRequestFullScreen) {
    document.mozCancelFullScreen()
  }
}

/**
 * 递归寻找子类的父类
 */
export const findParent = (menu, id) => {
  for (let i = 0; i < menu.length; i++) {
    if (menu[i].children.length !== 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        if (menu[i].children[j].id === id) {
          return menu[i]
        } else {
          if (menu[i].children[j].children.length !== 0) {
            return findParent(menu[i].children[j].children, id)
          }
        }
      }
    }
  }
}

/**
 * 递归寻找子类的父类
 */
export const findParents = (menu, key) => {

  for (let i = 0; i < menu.length; i++) {
    console.log('[' + i + ']');
    if (menu[i].children.length !== 0) {
      for (let j = 0; j < menu[i].children.length; j++) {
        console.log('I=' + i + 'j=' + j);
        console.log(menu[i].children[j].path);
        // if (menu[i].children[j].id === key) {
        //   return menu[i]
        // } else {
        if (menu[i].children[j].children.length !== 0) {
          console.log('儿子还有' + menu[i].children[j].children.length + '个')
          return findParents(menu[i].children[j].children, key)
        }
        // }
      }
      // }else {
      //   console.log('SBSBSB');
    }
  }
}

/**
 * 总体路由处理器
 */
export const resolveUrlPath = (url, name) => {
  let reqUrl = url
  if (url.indexOf('#') !== -1 && url.indexOf('http') === -1) {
    const port = reqUrl.substr(reqUrl.indexOf(':'))
    reqUrl = `/myiframe/urlPath?src=${baseUrl}${port}${reqUrl.replace('#', '').replace(port, '')}}&name=${name}`
  } else if (url.indexOf('http') !== -1) {
    reqUrl = `/myiframe/urlPath?src=${reqUrl}&name=${name}`
  } else {
    reqUrl = `${reqUrl}`
  }
  return reqUrl
}

/**
 * 总体路由设置器
 */
export const setUrlPath = ($route) => {
  let value = ''
  if ($route.query.src) {
    value = $route.query.src
  } else {
    value = $route.path
  }
  return value
}

/**
 * 动态插入css
 */
export const loadStyle = url => {
  const link = document.createElement('link')
  link.type = 'text/css'
  link.rel = 'stylesheet'
  link.href = url
  const head = document.getElementsByTagName('head')[0]
  head.appendChild(link)
}

/**
 * 根据字典的value查找对应的index
 */
export const findArray = (dic, value) => {
  for (let i = 0; i < dic.length; i++) {
    if (dic[i].value === value) {
      return i
    }
  }
  return -1
}

/**
 * 根据字段的value查找数组对应的index
 * 字段名: dic
 * 字段值: value
 * 数据列: data
 */

export const findArrayByValue = (dic, value, data) => {
  if (validatenull(dic)) {
    console.log('查找字段不能为空')
  }
  if (validatenull(data)) {
    console.log('数据列不能为空')
  }
  if (validatenull(value)) {
    console.log('字段值不能为空')
  }

  for (let item in data) {

    if (data[item][dic] === value) {
      return item
    }
  }
  return -1
}

/**
 * 根据字段的value查找数组对应的index的对象Obj
 * 字段名: dic
 * 字段值: value
 * 数据列: data
 */

export const findArrayToObj = (dic, value, data) => {
  if (validatenull(dic)) {
    console.log('查找字段不能为空')
    return -1
  }
  if (validatenull(data)) {
    console.log('数据列不能为空')
    return -1
  }
  if (validatenull(value)) {
    console.log('字段值不能为空')
    return -1
  }

  for (let item in data) {
    console.log(data[item][dic]);
    console.log(value);
    if (data[item][dic] === value) {
      return data[item]
    }
  }
  return -1
}
/**
 * 删除多余的字段
 */

export const fillterArrayNull = (obj) => {
  // arr.map(function (item) {
  //   return item!==''
  // })
  var param = {}
  if (obj === null || obj === undefined || obj === '') {
    return param
  }
  for (let key in obj) {
    if (obj[key] !== null && obj[key] !== undefined && obj[key] !== '') {
      param[key] = obj[key]
    }
  }
  return param
}


/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = ''
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, typeof len === 'number' ? len : 4)
  if (date) {
    random = random + Date.now()
  }
  return random
}

/**
 * 解决返回数据 对 echars  饼图数据的要求
 */
export const toEcharsCircle = (resData) => {
  let arr = []
  for (let item in resData) {
    let obj = {}
    if (resData[item].jobKey !== resData[item].resultKey) {
      if (resData[item].resultKey) {
        obj.name = resData[item].resultKey
        // this.xData.push(resData[item].resultKey);
      }
      if (resData[item].value1) {
        obj.value = resData[item].value1
        // this.yData.push(resData[item].value1);
      }
    }
    arr.push(obj)
  }
  return arr
}

/**
 * 解决返回数据 对 echars  饼图数据的要求
 */
export const toEcharsCircleSomePie = (resData) => {
  let arr = []
  debugger
  for (let item in resData) {
    let obj = {}
    if (resData[item].jobKey !== resData[item].resultKey) {
      if (resData[item].resultKey) {
        obj.name = resData[item].resultKey
        // this.xData.push(resData[item].resultKey);
      }
      if (resData[item].value1) {
        obj.value = resData[item].value1
        // this.yData.push(resData[item].value1);
      }
      if (resData[item].value2) {
        obj.value = resData[item].value2
        // this.yData.push(resData[item].value1);
      }
    }
    arr.push(obj)
  }
  return arr
}

/**
 * 解决返回数据 对 echars  line以及其他图数据的要求
 */
export const toEcharsOther = (resData) => {
  let xData = []
  let yData = []
  let obj = {}
  for (let item in resData) {
    if (resData[item].jobKey !== resData[item].resultKey) {
      if (resData[item].resultKey) {
        xData.push(resData[item].resultKey)
      }
      if (resData[item].value1) {
        yData.push(resData[item].value1)
      }
    }
  }
  obj['xData'] = xData
  obj['yData'] = yData
  return obj
}


export function translateNameByResultKey(originData = [], resultKeys = []) {
  for (const resultKey of resultKeys) {
    for (const originDatum of originData) {
      if (originDatum.resultKey === resultKey.codeId) {
        originDatum.resultKey = resultKey.codeDesc
      }
    }
  }
  return originData
}

export function setCurrentPageInfo(route = '', params = {page: 1, limit: 10}) {
  localStorage.setItem(route, JSON.stringify(params))
}

export function getCurrentPageInfo(route = '', params) {
  let res = JSON.parse(localStorage.getItem(route));
  for (let resKey in res) {
    params[resKey] = res[resKey]
  }
  // console.dir(params);
}

export function coverData(originData, label = 'codeDesc', value = 'codeId') {
  let data = originData || []
  return data.map(item => {
    return {
      label: item[label],
      value: item[value]
    }
  })
}

// 寻找子菜单的父类
export function findMenuParent(to) {
  // console.log('router.options.routes');
  // console.log(router.options.routes);
  let tag1 = to.path.split('/')[2];
  let toName = to.name;
  // console.log('寻找子菜单的父类');
  // console.log(to);
  // console.log(toName);

  let arr = router.options.routes;
  let father = [];
  for (let i = 6; i < arr.length; i++) {
    father = father.concat(arr[i].children);
  }
  for (let item of father) {
    if(item){
      if (item.name === toName) {
        // console.log('找到了路由···········');
        item['fullPath'] = to.fullPath
        return item;
      }
    }
  }
  // return tagCurrent
}

export function downloadFiles(data,name='敏感词'){
    if (!data) {
      return
    }
    let url = window.URL.createObjectURL(new Blob([data]))
    let link = document.createElement('a')
    link.style.display = 'none'
    link.href = url
    link.setAttribute('download', `${name}导出.xlsx`)
    document.body.appendChild(link)
    link.click()
}

export function str2Time (newTime){
  let newstr = newTime.replace(/-/g,'/');
  let date =  new Date(newstr);
  return date.getTime() + 86400 ;
}

