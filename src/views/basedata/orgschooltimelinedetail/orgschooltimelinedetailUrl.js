import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'

const routePath = 'sm/base'
const modelName = 'orgSchoolTimelineDetail'
//const baseUrl = '/zHF'
const applicationCilent = ''

export default {
  
  // 获取列表
  fetchList (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/page`,
      method: 'get',
      params: params
    })
  },
  // 删除列表数据
  batchDelObj (params) {
    return axios({
      url: baseUrl + `/base/orgSchoolTimelineDetailAd`,
      method: 'delete',
      data: params
    })
  },
  // 增加列表
  addObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/add`,
      method: 'post',
      data: params
    })
  },
  // 查看详情
  getObj (id) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/` + id,
      method: 'get',
    })
  },
  // 修改详情
  putObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/edit`,
      method: 'put',
      data: params,
    })
  },
  //shangchuan
  getFileUrl (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/edit`,
      method: 'post',
      data: params,
    })
  },
  start (data) {
    return axios({
      url: `${baseUrl}/start`,
      method: 'put',
      data
    })
  },
  disabled (data) {
    return axios({
      url: `${baseUrl}/disabled`,
      method: 'put',
      data
    })
  }
}
