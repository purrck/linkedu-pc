import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'
// const baseUrl = '/iHF'
const routePath = 'user'
const modelName = 'entityOrganization'

export default {

  // 获取安全教育列表
  fetchList (params) {
    return axios({
      //url: baseUrl + `/${routePath}/entityOrganizationAd/page`,
      url : baseUrl+ "/news/publishArticlePt/search",
      method: 'get',
      params: params
    })
  },
  // 获取模版
  getHeaderJson(params) {
    return axios({
      // url: baseUrl + `/${routePath}/${modelName}Ad/page`,
      url : "/static/mock/sendObj.json",
      method: 'get',
      params: params
    })
  },
  // 获取安全教育对象列表
  fetchListObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/entityOrganizationUserAd/page`,
      method: 'get',
      params: params
    })
  },
  // 删除列表数据
  batchDelObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/entityOrganizationUserAd`,
      method: 'delete',
      data: params
    })
  },  // 删除列表数据
  batchDelObjRange (params) {
    return axios({
      url: baseUrl + `/${routePath}/entityOrganizationUserRuleAd`,
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
  putStatusObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Ad/updateEntityOrgStatus`,
      method: 'put',
      data: params,
    })
  },
  /**
   * entityEnName
   * @returns {AxiosPromise}
   */
  getOrganizationType () {
    return axios({
      url: '',
      method: 'get',
      params: ''
    })
  },
  /**
   * 通过安全教育组织获取教育内容
   * @param entityType
   * @returns {AxiosPromise}
   */
  getContentByEntityType (entityType) {
    return axios({
      url: baseUrl + '/user/entityOrganizationAd/contentOption',
      method: 'get',
      params: {entityType}
    })
  },
  /**
   * 添加发送到家长的班级信息id
   * @param classList {Array}[classId]
   * @returns {AxiosPromise}
   */
  addClassList (params) {
    return axios({
      url: baseUrl + '/user/entityOrganizationUserRuleAd/add',
      method: 'post',
      data: params
    })
  },
  /**
   * 获取教育组织范围
   * @param entityOrgId
   * @returns {*}
   */
  getRangeList (params) {
    return axios({
      url: baseUrl + '/user/entityOrganizationUserRuleAd/page',
      method: 'get',
      params: params
    })
  }
}
