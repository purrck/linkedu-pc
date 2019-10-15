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

import { baseUrl, khglUrl, dicUrl } from '@/config/env'
import axios from '@/axios/axios';
export const loginByUsername = (username, password, code, randomStr) => {
  var grant_type = 'password'
  var scope = 'server'
  return axios({
    url: baseUrl + '/auth/oauth/token',
    token:  'Basic cGlnOnBpZw==',
    method: 'post',
    // header:{
    //   'content-type' : 'application/x-www-form-urlencoded'
    // },
    params: { username, password, randomStr, code, grant_type, scope }
  })
}

export function mobileLogin(mobile, code) {
  var grant_type = 'mobile'
  var scope = 'server'
  return axios({
    url: baseUrl+'/auth/mobile/token',
    token:  'Basic cGlnOnBpZw==',
    method: 'post',
    params: { mobile, code, grant_type, scope }
  })
}

export const getUserInfo = (id) => {
  return axios({
    url: baseUrl + '/user/loginAppUser/' + id,
    method: 'get'
  })
}

export const logout = (accesstoken, refreshToken) => {
  return axios({
    url: baseUrl +'/auth/authentication/removeToken',
    method: 'post',
    params: { accesstoken, refreshToken }
  })
}
