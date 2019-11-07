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

import Vue from 'vue'
import Router from 'vue-router'
// import {
//   routerMode
// } from '@/config/env'
import store from '@/store'
// import { formatRoutes } from '@/util/util'
import index from './index'
import basedata from './basedata'
import safety from './safety'
import safetyEdu from './safetyEdu'
import homeSchLink from "./homeSchLink";
import SpecialEducation from "./SpecialEducation";
import dormitory from "./dormitory";
import operate from "./operate-client";
import newApplications from "./newApplications";
import studySpace from "./studySpace";
import safetyManagement from "./safetyManagement";
import questionAnswer from "./questionAnswer";
Vue.use(Router)

export default new Router({
  // mode: 'history',
  strict: process.env.NODE_ENV !== 'production',

  // scrollBehavior(to, from, savedPosition) {
  //
  //   if (savedPosition) {
  //     return savedPosition
  //   } else {
  //     if (from.meta.keepAlive) {
  //       from.meta.savedPosition = document.body.scrollTop
  //     }
  //     return {
  //       x: 0,
  //       y: to.meta.savedPosition || 0
  //     }
  //   }
  // },
  // ...formatRoutes(store.state.user.menu),
  routes: [].concat(index,basedata,safety,safetyEdu,homeSchLink,SpecialEducation,dormitory,operate,newApplications,studySpace,safetyManagement,questionAnswer)
})
