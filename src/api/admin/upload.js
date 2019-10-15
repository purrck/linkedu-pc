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
/*API(参考FastDfsController)
*GET    /fastdfs/config   获取配置
*GET    /fastdfs/find/{md5}  根据文件MD5查询文件库是否存在，存在返回路径
*POST   /fastdfs/upload/{md5}   上传文件并传递该文件md5值
*DELETE  /fastdfs/{md5}         根据MD5删除文件
*/

import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env'
// const baseUrl = '/zHF' ;
export  function getConfig() {
  return axios({

    url: baseUrl + '/base/fastdfs/config',
    method: 'get'
  })
}

export function getFile(md5) {
  return axios({
    url: baseUrl + '/base/fastdfs/find/' + md5,
    method: 'get'
  })
}

export function uploadFile(file,md5) {
  return axios({
    url: baseUrl + '/base/fastdfs/upload/'+md5,
    method: 'post',
    data: file,
  })
}


export function delObj(md5) {
  return axios({
    url: baseUrl + '/admin/fastdfs/' + md5,
    method: 'delete'
  })
}


