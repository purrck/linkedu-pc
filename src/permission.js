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

import router from './router/_router'
import store from './store'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import {
  getToken
} from '@/util/auth'
import {
  setTitle,findParents,findMenuParent
} from '@/util/util'
import {
  validatenull
} from '@/util/validate'

// NProgress Configuration
NProgress.configure({
  showSpinner: false
})

function hasPermission(roles, permissionRoles) {
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}
const whiteList = ['/login', '/404', '/401','/installApp','/bootPage']

router.beforeEach((to, from, next) => {
  // console.log('看看返回了什么！22333')
  // 缓冲设置
  console.log(to);
  if (store.state.tags.tagList.some(ele => {
    return ele.path === to.path
  })) {
    // console.error('看看')
    // console.log(to.name.indexOf('List')===-1||to.name.indexOf('list')===-1)
    // console.log(to.name.indexOf('list'))
    if(to.name.indexOf('List')!==-1||to.name.indexOf('list')!==-1&&to.path.indexOf('List')!==-1||to.path.indexOf('list')!==-1){
      to.meta.$keepAlive = true
    }else{
      to.meta.$keepAlive = false
      }
  }

  NProgress.start()
  if (store.getters.access_token) { // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({
        path: '/'
      })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {

        store.dispatch('GetUserInfo').then(res => {
          const roles = res.roles
          next({ ...to,
            replace: true
          })
        }).catch(() => {
          store.dispatch('FedLogOut').then(() => {
            next({
              path: '/login'
            })
            NProgress.done()
          })
        })
      } else {
        next()
      }
      next()
    }
  } else {
    /* has no token*/
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {

      next('/login')
      NProgress.done()
    }
  }
})


router.afterEach((to, from) => {
  NProgress.done()
  if(to.path !== '/page/wel'&&to.path !== '/login'){
    store.commit('ADD_TAG',to)
  }
  // console.log(to)
 });
