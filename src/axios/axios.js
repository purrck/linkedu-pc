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

/**
 *
 * http配置
 *
 */

import axios from 'axios'
import store from '../store'
// import router from '../router/router'
import { getToken, setToken, removeToken } from '@/util/auth'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'

import  nullData  from './nullData'
// progress bar style
// 超时时间
axios.defaults.timeout = 600000;
// 跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.maxContentLength = 1000000000;

NProgress.configure({ showSpinner: false }); // NProgress Configuration
let msg;
// HTTPrequest拦截
axios.interceptors.request.use(config => {
  if(config.method === 'post' ||'put'|| 'delete'){
    config.headers.post['Content-Type']='application/json;charset=UTF-8'
  }

  if(config['ContentType'] === 'multipart/form-data'){
    config.headers.post['Content-Type']='multipart/form-data'
  }
  config.headers.post['Content-Type']='application/json;charset=UTF-8'

  NProgress.start(); // start progress bar

  if (store.getters.access_token && !config.token) {
     config.headers['Authorization'] = 'Bearer ' + getToken() // 让每个请求携带token--['X-Token']为自定义key 请根据实际情况自行修改
  }else{
    config.headers['Authorization'] = config.token;
  }

  /* 不要动 */
  if(config.url.indexOf(".json") != -1){
    if(config.method == "post"){
      config.method = "get";
      config.params = config.data
    }

  }

  return config
}, error => {
  return Promise.reject(error)
});
// HTTPresponse拦截
axios.interceptors.response.use(data => {
  let _data = data.data.data;

  /* 不要动 对返回的null进行处理,以免页面报错 */
  _data = nullData(_data);

  NProgress.done();
  return data
}, error => {
  NProgress.done();
  let message = error.response.data.message;
  // let status = error.response.data.status;
  let error_description = error.response.data.error_description;
  // let errMsg = error.toString();
  // let code = errMsg.substr(errMsg.indexOf('code') + 5);
  //
  // if(code === '401' || code.indexOf('30000')!==-1){
  //   message = '登录失效，请重新登录'
  // }
  //
  let resMsg =message?message:error_description || "请求失败！";
  return Promise.reject(myVue.$message.error(resMsg))
});

export default axios
