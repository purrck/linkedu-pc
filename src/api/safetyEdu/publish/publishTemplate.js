
import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env'


export function getObj(id) {
    return axios({
        url: baseUrl + 'publish/template/' + id,
        method: 'get'
    })
}

export function fetchList(query) {
    return axios({
        url: baseUrl + 'publish/template/page',
        method: 'get',
        params: query
    })
}

export function addObj(obj) {
    return axios({
        url: baseUrl + 'publish/template/add',
        method: 'post',
        data: obj
    })
}

export function delObj(obj) {
  return axios({
    url: baseUrl + 'publish/template',
    method: 'delete',
    data: obj
  })
}

export function putObj(obj) {
    return axios({
        url: baseUrl + 'publish/template/edit',
        method: 'put',
        data: obj
    })
}

export function articleAddObj(obj) {
  return axios({
    url: baseUrl + 'publish/article/add',
    method: 'post',
    data: obj
  })
}

