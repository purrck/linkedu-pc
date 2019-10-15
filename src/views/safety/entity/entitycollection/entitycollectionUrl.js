import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'
// const  baseUrl = '/iHF';
const routePath = 'base'
const modelName = 'entityCollection'

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
      url: baseUrl + `/${routePath}/${modelName}Ad`,
      method: 'delete',
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
}
