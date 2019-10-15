import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'

const routePath = 'sm/security'
const modelName = 'securityAccidentStudent'
const applicationCilent = 'Ad'

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
      url: baseUrl + `/security/${modelName}Ad`,
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
      url: baseUrl + `/${routePath}/${modelName}Ad/${id}`,
      method: 'get',
    })
  },
  getStudentList () {
    return axios({
      url: `${baseUrl}/user/studentAd/page?page=1&limit=10`,
      method: 'get'
    })
  },
  addStudentList (data) {
    return axios({
      url: `${baseUrl}/sm/security/securityAccidentStudentAd/add`,
      method: 'post',
      data: data
    })
  },
  addStudentListAddBatch (data) {
    return axios({
      url: `${baseUrl}/sm/security/securityAccidentStudentAd/addBatch`,
      method: 'post',
      data: data
    })
  }
}
