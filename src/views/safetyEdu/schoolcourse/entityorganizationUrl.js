import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'
const routePath = 'user'
const modelName = 'entityOrganization'

export default {
  // 编辑
  entityOrganizationAdEdit (params) {
    return axios({
      url: baseUrl + `/sm/user/entityOrganizationAd/edit`,
      //url:"/static/mock/schoolCourse/tingyong.json",
      method: 'put',
      data: params
    })
  },
  //查看观看情况
  // 获取运营端列表
  getViewGuankan (params) {
    return axios({
      url: baseUrl + `/sm/course/courseAd/PersonDynamicPage`,
      method: 'get',
      params: params
    })
  },
  // 发布
  publish (params) {
    return axios({

      url: baseUrl + `/sm/user/entityOrganizationAd/add`,
      //url:"/static/mock/schoolCourse/publish.json",
      method: 'post',
      data: params
    })
  },

  // 是否启用
  qiyong (params) {
    return axios({
      url: baseUrl + `/sm/course/courseAd/page`,
      //url:"/static/mock/schoolCourse/qiyong.json",
      method: 'get',
      params: params
    })
  },
  // 是否停用
  tingyong (params) {
    return axios({
      url: baseUrl + `/sm/user/entityOrganizationUserRule/updateStatus`,
      //url:"/static/mock/schoolCourse/tingyong.json",
      method: 'put',
      data: params
    })
  },
  // 是否停用
  updateStatus (params) {
    return axios({
      url: baseUrl + `/sm/user/entityOrganizationAd/updateStatus`,
      //url:"/static/mock/schoolCourse/tingyong.json",
      method: 'put',
      data: params
    })
  },
  // 获取运营端列表
  getSystemList (params) {
    return axios({
      url: baseUrl + `/sm/user/entityRegionAd/page`,
      //url: `/static/mock/schoolCourse/resources.json`,
      method: 'get',
      params: params
    })
  },

  // 获取课程分类
  entityType () {
    return axios({
      url: baseUrl + `/base/entityType`,
      method: 'get'
    })
  },

  // 获取安全教育列表
  fetchList (params) {
    return axios({
      url: baseUrl + `/sm/user/entityOrganizationAd/page?entityType=courseinfo`,
      //url: baseUrl + `/sm/user/entityOrganizationUserRule/page`,
      //url:"/static/mock/schoolCourse/list.json",
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
  entityOrganizationAdDelete (params) {
    return axios({
      //url: baseUrl + `/${routePath}/entityOrganizationUserAd`,
      url: baseUrl + `/sm/user/entityOrganizationAd`,
      method: 'delete',
      data: params
    })
  },
  // 删除列表数据
  batchDelObj (params) {
    return axios({
      //url: baseUrl + `/${routePath}/entityOrganizationUserAd`,
      url: baseUrl + `/sm/user/entityOrganizationUserRule`,
      method: 'delete',
      data: params
    })
  },
  // 删除列表数据
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
  entityOrganizationAdAdd(params){
    return axios({
      url: baseUrl + '/sm/user/entityOrganizationAd/add',
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
  // 查看详情v2
  entityOrganizationAdDetail (id) {
    return axios({
      url: baseUrl + `/sm/user/entityOrganizationAd/${id}`,
      method: 'get'
    })
  },
  // 查看详情v1
  getObjDetail (id) {
    return axios({
      url: baseUrl + `/sm/course/courseAd/detaile?entityOrgRuleId=${id}`,
      method: 'get'
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
