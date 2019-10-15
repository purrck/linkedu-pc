import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'

const routePath = `course`
const modelName = `courseChapter`
const applicationCilent = `Ad`

export default {
  // 获取列表
  fetchList (params) {
    return axios({
      url: baseUrl + `/om/course/educationResourceAd/page`,
      method: 'get',
      params: params
    })
  },
  // 删除列表数据
  batchDelObjNew (params) {
    return axios({
      url: baseUrl + `/om/course/educationResourceAd`,
      method: 'delete',
      data: params
    })
  },
  // 增加列表
  addObjNew (params) {
    return axios({
      url: baseUrl + `/om/course/educationResourceAd/add`,
      method: 'post',
      data: params
    })
  },
  // 查看详情
  getObjNew (id) {
    return axios({
      url: baseUrl + `/om/course/educationResourceAd/${id}`,
      method: 'get',
    })
  },
  // 修改详情
  putObjNew (params) {
    return axios({
      url: baseUrl + `/om/course/educationResourceAd/edit`,
      method: 'put',
      data: params,
    })
  }
}
