import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'

const routePath = 'sm/security'
const modelName = 'securityAccidentProcess'

export default {

  // 获取列表
  fetchList (params) {
    return axios({
      url: baseUrl + `/sm/security/securityAccidentProcessAd/page`,
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
    debugger
    return axios({
      url: baseUrl + `/sm/security/securityAccidentProcessAd/add`,
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
  // 修改详情
  putObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/edit`,
      method: 'put',
      data: params,
    })
  },
  // 事故处理完成
  securityAccidentAdFinish (params) {
    return axios({
      url: baseUrl + `/sm/security/securityAccidentAd/finish`,
      method: 'put',
      data: params,
    })
  }
}
