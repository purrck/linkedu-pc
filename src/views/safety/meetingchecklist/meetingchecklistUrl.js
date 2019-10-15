import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'

/**
 * http://192.168.2.86/base/meetinginfoad/id
 */

export default {

  // 获取列表
  fetchList (params) {
    return axios({
      url: baseUrl + '/base/meetingchecklistad/page',
      method: 'get',
      params: params
    })
  },
  // 删除列表数据
  batchDelObj (params) {
    return axios({
      url: baseUrl + '/base/meetingchecklistad',
      method: 'DELETE',
      data: params
    })
  },
  // 增加列表
  addObj (params) {
    return axios({
      url: baseUrl + '/base/meetingchecklistad/add',
      method: 'post',
      data: params
    })
  },
  // 查看详情
  getObj (id) {
    return axios({
      url: baseUrl + '/base/meetingchecklistad/' + id,
      method: 'get',
    })
  },
  // 修改详情
  putObj (params) {
    return axios({
      url: baseUrl + '/base/meetingchecklistad/edit',
      method: 'put',
      data: params,
    })
  },
  //shangchuan
  getFileUrl (params) {
    return axios({
      url: baseUrl + '/base/meetingchecklistad/edit',
      method: 'post',
      data: params,
    })
  }
}
