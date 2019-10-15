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

const getters = {
  activeTag: state => state.tags.activeTag,
  tagType: state => state.tags.tagType,
  flieUrl: state => state.common.flieUrl,
  tagList: state => state.tags.tagList,
  access_token: state => state.user.access_token,
  refresh_token: state => state.user.refresh_token,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  menu: state => state.user.menu,
  errLog: state => state.errLog.errLog,
  routerOne: state => state.common.routerOne,
  activeOne: state => state.common.activeOne,
  activeRoute: state => state.common.activeRoute,
  routerTwo: state => state.common.routerTwo,
  activeTwo: state => state.common.activeTwo,
  routerThree: state => state.common.routerThree,
  activeThree: state => state.common.activeThree,
  roleType: state => state.user.roleType,
  schoolId: state => state.user.schoolId,
  userId: state => state.user.userId,
  review: state => state.review,
  isLoading : state => state.common.isLoading,
  dialog : state => state.dialog,
  importData : state => state.importFileV2.data,
  schoolInfo : state => state.user.schoolInfo,
  codeTpyeList:state => state.common.codeTpyeList,
}
export default getters
