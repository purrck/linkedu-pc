import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env'
export function getObj(id) {
  return axios({
    url: baseUrl + '/bulletin/bulletinUser/' + id,
    method: 'get'
  })
}

export function fetchList(query) {
  return axios({
    url: baseUrl + '/bulletin/bulletinUser/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return axios({
    url: baseUrl + '/bulletin/bulletinUser/add',
    method: 'post',
    data: obj
  })
}

export function delObj(id) {
  return axios({
    url: baseUrl + '/bulletin/bulletinUser/' + id,
    method: 'delete'
  })
}

export function batchDelObj(ids) {
  return axios({
    url: baseUrl + '/bulletin/bulletinUser',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj) {
  return axios({
    url: baseUrl + '/bulletin/bulletinUser/edit',
    method: 'put',
    data: obj
  })
}
