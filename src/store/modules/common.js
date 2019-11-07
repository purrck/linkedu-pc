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

import {
  setStore,
  getStore,
  removeStore
} from '@/util/store'
import routerSchool from '@/const/routerSchool';
import {
  getConfig
} from '@/api/admin/upload'
import {
  baseUrl
} from '@/config/env';

const common = {

  state: {
    lizi : false,
    isLoading : true,
    flieUrl: getStore({
      name: 'flieUrl'
    }) || '',
    activeOne:  getStore({
      name: 'activeOne'
    }) || '首页',
    activeTwo:  getStore({
      name: 'activeTwo'
    }) || '',
    activeThree:  getStore({
      name: 'activeThree'
    }) || '',
    activeRoute: getStore({
      name: 'activeRoute'
    }) || [],
    routerOne:  getStore({
      name: 'routerOne'
    }) || routerSchool,
    routerTwo:  getStore({
      name: 'routerTwo'
    }) || [],
    routerThree:  getStore({
      name: 'routerThree'
    }) || [],
    codeTpyeList:  getStore({
      name: 'codeTpyeList'
    }) || [],

  },
  actions: {

    // 获取文件基础URL
    getFileUrl({
      commit,
      state,
      dispatch
    }, dic) {
      return new Promise((resolve, reject) => {
        getConfig().then(response=>{
          const data = response.data.data
          // console.log(JSON.parse(data))
          commit('SET_FILEURL',data.fileServerUrl)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  },
  mutations: {
    SET_IS_LOADING(state,played){
      state.isLoading = played;
    },
    // 储存params 参数 不一样的时候 在watch里重新加载数据
    SET_PARAMS(state,played){
      state.isLoading = played;
    },
    SET_ACTIVEONE: (state, res) => {
      setStore({
        name: 'activeOne',
        content: res,
        type: ''
      })
      state.activeOne = res
    },
    SET_ACTIVETWO: (state, res) => {
      setStore({
        name: 'activeTwo',
        content: res,
        type: ''
      })
      state.activeTwo = res
    },
    SET_ACTIVETHREE: (state, res) => {
      setStore({
        name: 'activeThree',
        content: res,
        type: ''
      })
      state.activeThree = res
    },

    SET_ROUTHERONE: (state, res) => {
      setStore({
        name: 'routerOne',
        content: res,
        type: ''
      })
      state.routerOne = res
    },

    SET_ROUTHERTWO: (state, res) => {
      setStore({
        name: 'routerTwo',
        content: res,
        type: ''
      })
      state.routerTwo = res
    },
    SET_ROUTHERTHREE: (state, res) => {
      setStore({
        name: 'routerThree',
        content: res,
        type: ''
      })
      state.routerThree = res
    },
    SET_CODETYPELIST: (state, res) => {
      state.codeTpyeList.push(res);
      setStore({
        name: 'codeTpyeList',
        content: state.codeTpyeList,
        type: 'session'
      })
      // state.codeTpyeList = res
    },
  }
};
export default common
