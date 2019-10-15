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

import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env'

export function fetchList(query) {
  return axios({
    url: baseUrl+ '/admin/log/logPage',
    method: 'get',
    params: query
  })
}

export function delObj(id) {
  return axios({
    url: baseUrl+ '/admin/log/' + id,
    method: 'delete'
  })
}

export function addObj(obj) {
  return axios({
    url: baseUrl+ '/user/user/',
    method: 'post',
    data: obj
  })
}

export function getObj(id) {
  return axios({
    url: baseUrl+ '/user/user/' + id,
    method: 'get'
  })
}

export function putObj(obj) {
  return axios({
    url: baseUrl+ '/user/user/',
    method: 'put',
    data: obj
  })
}
