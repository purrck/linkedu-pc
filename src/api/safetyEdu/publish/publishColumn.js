
import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env'

export function getObj(id) {
  return axios({
    url: baseUrl + 'publish/column/' + id,
    method: 'get'
  })
}

export function fetchList(query) {
  return axios({
    url: baseUrl + 'publish/column/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return axios({
    url: baseUrl + 'publish/column/add',
    method: 'post',
    data: obj
  })
}

export function fetchColumnList() {
  return axios({
    url: baseUrl + 'publish/column/top',
    method: 'get'
  })
}

export function fetchTreeColumn() {
  return axios({
    url: baseUrl + 'publish/column/treeList',
    method: 'get'
  })
}

export function delObj(obj) {
  return axios({
    url: baseUrl + 'publish/column/',
    method: 'delete',
    data: obj
  })
}

export function putObj(obj) {
  return axios({
    url: baseUrl + 'publish/column/edit',
    method: 'put',
    data: obj
  })
}

