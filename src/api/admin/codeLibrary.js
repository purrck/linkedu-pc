
import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env';

export default {

  // 获取列表
  fecthList(params) {
    return axios({
      url: baseUrl+'/admin/codeLibrary/per',
      method: 'get',
      params: params
    })
  },
  // 获取列表
  searchList(params) {
    return axios({
      url: baseUrl+'/admin/codeLibrary/page',
      method: 'get',
      params: params
    })
  },
  getObj(id) {
    return axios({
      url: baseUrl + '/admin/codeLibrary/' + id,
      method: 'get'
    })
  },

  getAll() {
    return axios({
      url: baseUrl + '/admin/codeLibrary/',
      method: 'get'
    })
  },

  fetchList(query) {
    return axios({
      url: baseUrl + '/admin/codeLibrary/page',
      method: 'get',
      params: query
    })
  },

  addObj(obj) {
    return axios({
      url: baseUrl + '/admin/codeLibrary/add/',
      method: 'post',
      data: obj
    })
  },

  batchAddObj(obj) {
    return axios({
      url: baseUrl + '/admin/codeLibrary/codeLibrary/',
      method: 'post',
      data: obj
    })
  },

  delObj(id) {
    return axios({
      url: baseUrl + '/admin/codeLibrary/' + id,
      method: 'delete'
    })
  },

  batchDelObj(ids) {
    return axios({
      url: baseUrl + '/admin/codeLibrary',
      method: 'delete',
      data: ids
    })
  },

  putObj(obj) {
    return axios({
      url: baseUrl + '/admin/codeLibrary/edit',
      method: 'put',
      data: obj
    })
  }
}





