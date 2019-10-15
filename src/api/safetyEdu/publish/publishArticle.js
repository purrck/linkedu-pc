import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env'

export function getObj(id) {
  return axios({
    url: baseUrl+ '/publish/article/' + id,
    method: 'get'
  })
}

export function fetchList(query) {
  return axios({
    url: baseUrl+ '/publish/article/page',
    method: 'get',
    params: query
  })
}

export function addObj(obj) {
  return axios({
    url: baseUrl+ '/publish/article/add',
    method: 'post',
    data: obj
  })
}

export function delObj(obj) {
  return axios({
    url: baseUrl+ '/publish/article/',
    method: 'delete',
    data: obj
  })
}

export function putObj(obj) {
  return axios({
    url: baseUrl+ '/publish/article/edit',
    method: 'put',
    data: obj
  })
}

export function passObj(obj) {
  return axios({
    url: baseUrl+ '/publish/article/pass',
    method: 'put',
    data: obj
  })
}

export function rejectObj(obj) {
  return axios({
    url: baseUrl+ '/publish/article/reject',
    method: 'put',
    data: obj
  })
}

