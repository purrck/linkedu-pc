import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
const routePath = 'base';
const modelName = 'basicSchoolOrgQ';
// const baseUrl = 'yHF'
// /sm/base/basicSchoolOrgQ/saveOne
// const vueFullTypeName = `BasicSchoolOrg`;
export default {

  // 获取列表
  fetchList(params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}/page`,
      method: 'get',
      params: params
    })
  },
  // 删除列表数据
  batchDelObj(params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}`,
      method: 'delete',
      data: params
    })
  },
  // 增加列表
  addObj(data) {
    return axios({
      url: baseUrl + `/sm/base/basicSchoolOrgQ/saveOne`,
      method: 'post',
      data: data
    })
  },
   // 增加列表 rao
   basicSchoolOrgAdAdd(data) {
    return axios({
      url: baseUrl + `/om/base/basicSchoolOrgAd/add`,
      method: 'post',
      data: data
    })
  },
  // 查看详情
  getObj(id) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}/${id}`,
      method: 'get',
    })
  },
  // 修改详情
  putObj(params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}/update`,
      method: 'put',
      data: params,
    })
  },
}
