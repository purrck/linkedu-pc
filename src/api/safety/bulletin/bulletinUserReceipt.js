import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env'


export function getObj(id) {
  return axios({
    url: baseUrl + '/bulletin/bulletinUserReceipt/' + id,
    method: 'get'
  })
}

export function fetchList(query) {
  return axios({
    url: baseUrl + '/bulletin/bulletinUserReceipt/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return axios({
    url: baseUrl + '/bulletin/bulletinUserReceipt/add',
    method: 'post',
    data: obj
  })
}


export function delObj(id) {
  return axios({
    url: baseUrl + '/bulletin/bulletinUserReceipt/' + id,
    method: 'delete'
  })
}

export function batchDelObj(ids) {
  return axios({
    url: baseUrl + '/bulletin/bulletinUserReceipt',
    method: 'delete',
    data: ids
  })
}

export function putObj(obj) {
  return axios({
    url: baseUrl + '/bulletin/bulletinUserReceipt/edit',
    method: 'put',
    data: obj
  })
}
