import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'

const routePath = 'sm/security'
const modelName = 'schoolSecurityCheckPlan'

export default {
  // 获取保卫科列表
  baoweikeList () {
    return axios({
      url: baseUrl + `/sm/security/schoolSecurityCheckPlanAd/basicSchoolOrgPosition/schoolPositionInfoBySchoolIdAndDepartId`,
      method: 'get'
    })
  },

  // 获取列表
  fetchList (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/page`,
      method: 'get',
      params: params
    })
  },
  // 批量-删除列表数据
  schoolSecurityCheckPlanAd (params) {
    return axios({
      url: baseUrl + `/security/schoolSecurityCheckPlanAd`,
      method: 'delete',
      data: params
    })
  },
  // 删除列表数据
  batchDelObj (params) {
    return axios({
      url: baseUrl + `/security${modelName}Ad`,
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
  // 修改详情
  putObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/edit`,
      method: 'put',
      data: params,
    })
  },
}
