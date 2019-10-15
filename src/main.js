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

import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui'
import VueMoment from 'vue-moment'
// import cryptoJs from 'crypto-js'
import router from './router/_router'
import store from './store'
import "babel-polyfill";
import './styles/common.scss'
import './styles/base.scss'
import './permission' // 权限
import './errorLog' // 错误日志
import echarts from 'echarts'
Vue.prototype.$echarts = echarts

import    {loadStyle} from './util/util'
import * as urls from '@/config/env'
import {iconfontUrl,iconfontVersion} from '@/config/env'
import * as filters from './filters' // 全局filter

import VideoPlayer from 'vue-video-player'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'video.js/dist/video-js.css'
import 'vue-video-player/src/custom-theme.css'
import uploadFile from '@/assets/js/uploadFile'
import '../static/ue/ueditor.config.js'
import '../static/ue/ueditor.all.js'
import '../static/ue/lang/zh-cn/zh-cn.js'
import '../static/ue/ueditor.parse.js'
import '../static/ue/button.js'

/* 公共组建 */
import myCommonComponents from './components/index'
import mixins from '@/util/mixin'
Vue.mixin(mixins)
Vue.use(ElementUI)
// Vue.use(cryptoJs)
Vue.use(myCommonComponents)
Vue.use(uploadFile)
Vue.use(VideoPlayer);

Vue.config.productionTip = false
Vue.use(VueMoment)

Object.keys(urls).forEach(key => {
  Vue.prototype[key] = urls[key]
})

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

iconfontVersion.forEach(ele => {
  loadStyle(iconfontUrl.replace('$key', ele))
})

/* eslint-disable no-new */
window.myVue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
window.v = window.myVue.$store.state.common;
