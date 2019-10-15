import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'

const routePath = 'sm/base'
const modelName = 'orgSchoolCalendar'
export default {
  // 获取列表
  getTerm () {
    return axios({
      url: baseUrl + `/base/codeInt/listCodeInt?codetypeId=schoolTerm`,
      method: 'get',
    })
  },
  // 获取列表
  fetchList (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/page`,
      //url : "/static/mock/orgschoolcalendar/listOrgschoolcalendar.json",
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
  // 增加列表
  addObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}/add`,
      method: 'post',
      data: params
    })
  },
  // 查看详情
  getObj (id) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/` + id,
      //url : "/static/mock/orgschoolcalendar/detailOrgschoolcalendar.json",
      method: `get`,
    })
  },
  // 修改详情
  putObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/edit`,
      method: `put`,
      data: params,
    })
  },
  //shangchuan
  getFileUrl (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/edit`,
      method: `post`,
      data: params,
    })
  }
}
