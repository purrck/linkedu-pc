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

import {getToken, removeToken, setToken} from '@/util/auth'
import {getStore, setStore} from '@/util/store'
import {validatenull} from '@/util/validate'
import {getUserInfo, loginByUsername, logout, mobileLogin} from '@/api/admin/login'
import routerSchool from '@/const/routerSchool';
// import routerLeader from '@/const/routerLeader';
import routerSite from '@/const/routerSite';
import routerSys from '@/const/routerSys';
import {encryption} from '@/util/util'

const user = {
  state: {
    userInfo: getStore({
      name: 'userInfo'
    }) || {},
    permissions: getStore({
      name: 'permissions'
    }) || {},
    roles: getStore({
      name: 'roles'
    }) || [],
    menu: getStore({
      name: 'menu'
    }) || [],
    isInitMenu: getStore({
      name: 'isInitMenu'
    }) || false,
    access_token: getStore({
      name: 'access_token'
    }) || '',

    roleType: getStore({
      name: 'roleType'
    }) || 'school',
    refresh_token: getStore({
      name: 'refresh_token'
    }) || '',
    schoolId: getStore({
      name: 'schoolId'
    }) || [],
    schoolInfo: getStore({
      name: 'schoolInfo'
    }) || {},

  },
  actions: {
    // 根据用户名登录
    LoginByUsername({
                      commit,
                      state,
                      dispatch
                    }, userInfo) {
      return new Promise((resolve, reject) => {
        // const user = userInfo
        const user = encryption({
          data: userInfo,
          key: '1234567887654321',
          param: ['password']
        })
        loginByUsername(user.username,
          user.password, user.code, user.randomStr).then(response => {

            _v = response.data.data
            if(response.data.resultCode === '000000'){
              const data = _v
              setToken(data.access_token)
              commit('SET_ACCESS_TOKEN', data.access_token)
              commit('SET_USRERID', data.userId)
              commit('SET_REFRESH_TOKEN', data.refresh_token)
              resolve()
            }else{
              myVue.$message.error(response.data.message)
            }
          let _v = null;

        }).catch(error => {
          reject(error)
        })
      })
    },
    // 根据手机号登录
    LoginByPhone({
                   commit,
                   state,
                   dispatch
                 }, userInfo) {
      const mobile = userInfo.mobile.trim()
      return new Promise((resolve, reject) => {
        mobileLogin(mobile, userInfo.code).then(response => {
          const data = response.data
          setToken(data.access_token)
          commit('SET_ACCESS_TOKEN', data.access_token)
          commit('SET_REFRESH_TOKEN', data.refresh_token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetTableData({
                   commit,
                   state,
                   dispatch
                 }, page) {
      return new Promise((resolve, reject) => {
        // 未定义
        // getTableData(page).then(res => {
        //   const data = res.data
        //   resolve(data)
        // })
      })
    },
    GetUserInfo({
                  commit,
                  state,
                  dispatch
                }) {
      return new Promise((resolve, reject) => {
        getUserInfo(state.userId).then(response => {
          const data = response.data.data
          commit('SET_ROLES', data.groupIds)
          commit('SET_USER_INFO', data)
          // commit('SET_PERMISSIONS', data.permissions)
          dispatch('GetMenu')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    LogOut({
             commit,
             state
           }) {
      return new Promise((resolve, reject) => {
        // logout(state.access_token, state.refresh_token).then(() => {
        // 清除菜单
        commit('SET_MENU', [])
        commit('SET_ROUTHERONE', [])
        commit('SET_ROUTHERTWO', [])
        commit('SET_ROUTHERTHREE', [])
        commit('SET_ACTIVETHREE', '')
        commit('SET_ACTIVETWO', '')
        commit('SET_ACTIVEONE', '')

        // 清除权限
        commit('SET_PERMISSIONS', [])
        // 清除用户信息
        commit('SET_USER_INFO', {})
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_ROLES', [])
        commit('SET_ROLE', '')
        commit('DEL_ALL_TAG')
        commit('SET_SCHOOLID', '')
        commit('CLEAR_ALL_LOG', null)
        removeToken()
        resolve()
        // }).catch(error => {
        //   // 清除菜单
        //   reject(error)
        // })
      })
    },
    // 注销session
    FedLogOut({
                commit
              }) {
      return new Promise(resolve => {
        // 清除菜单
        commit('SET_MENU', [])
        commit('SET_ROUTHERONE', [])
        commit('SET_ROUTHERTWO', [])
        commit('SET_ROUTHERTHREE', [])
        commit('SET_ACTIVETHREE', '')
        commit('SET_ACTIVETWO', '')
        commit('SET_ACTIVEONE', '')
        commit('SET_SCHOOLID', '')
        // 清除权限
        commit('SET_PERMISSIONS', [])
        // 清除用户信息
        commit('SET_USER_INFO', {})
        commit('SET_ACCESS_TOKEN', '')
        commit('SET_REFRESH_TOKEN', '')
        commit('SET_ROLES', [])
        commit('DEL_ALL_TAG')
        commit('CLEAR_ALL_LOG', null)
        removeToken()
        resolve()
      })
    },
    // 获取系统菜单
    GetMenu({
              commit,
              state
            }) {
      return new Promise(resolve => {

        commit('SET_ROUTHERONE', routerSchool);
        commit('SET_MENU', routerSchool)
        commit('SET_ROLETYPE', 'school')
        //
        if (state.userInfo.groupIds.indexOf("group-school-admin") !== -1) {
          commit('SET_ROLETYPE', 'school')
          commit('SET_SCHOOLID', state.userInfo.extValues.schoolOrg.schoolOrgId)
          commit('SET_SCHOOL_INFO', state.userInfo.extValues.schoolOrg)
        } else if (state.userInfo.groupIds.indexOf('DEF-group-admin') !== -1) {
          commit('SET_ROUTHERONE', routerSys);
          commit('SET_MENU', routerSys)
          commit('SET_SCHOOLID', '')
          commit('SET_ROLETYPE', 'sys')
        } else if (state.userInfo.groupIds.indexOf('REQ-group-intranet') !== -1) {
          commit('SET_ROUTHERONE', routerSite);
          commit('SET_SCHOOLID', '')
          commit('SET_MENU', routerSite)
          commit('SET_ROLETYPE', 'site')
        }
        commit('SET_ROUTHERTWO', []);
        commit('SET_ROUTHERTHREE', []);

        resolve(routerSchool)
      })
    }
  },
  mutations: {
    SET_SCHOOL_INFO(state, played) {
      state.schoolInfo = played;
      setStore({
        name: 'schoolInfo',
        content: state.schoolInfo,
        type: 'session'
      })
    },
    SET_ACCESS_TOKEN: (state, access_token) => {
      state.access_token = access_token
      setStore({
        name: 'access_token',
        content: state.access_token,
        type: 'session'
      })
    },
    SET_MENU: (state, menu) => {
      state.menu = menu
      setStore({
        name: 'menu',
        content: state.menu,
        type: 'session'
      })
    },
    SET_USRERID: (state, data) => {
      state.userId = data
      setStore({
        name: 'userId',
        content: state.userId,
        type: 'session'
      })
    },
    SET_USER_INFO: (state, userInfo) => {
      state.userInfo = userInfo
      setStore({
        name: 'userInfo',
        content: state.userInfo,
        type: 'session'
      })
    },
    SET_REFRESH_TOKEN: (state, rfToken) => {
      state.refresh_token = rfToken
      setStore({
        name: 'refresh_token',
        content: state.refresh_token,
        type: 'session'
      })
    },

    SET_ROLETYPE: (state, roleType) => {
      state.roleType = roleType
      setStore({
        name: 'roleType',
        content: state.roleType,
        type: 'session'
      })
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
      setStore({
        name: 'roles',
        content: state.roles,
        type: 'session'
      })
    },
    SET_PERMISSIONS: (state, permissions) => {
      const list = {}
      for (let i = 0; i < permissions.length; i++) {
        list[permissions[i]] = true
      }
      state.permissions = list
      setStore({
        name: 'permissions',
        content: state.permissions,
        type: 'session'
      })
    },
    SET_SCHOOLID: (state, res) => {
      setStore({
        name: 'schoolId',
        content: res,
        type: ''
      })
      state.schoolId = res
    },
  }
}
export default user
