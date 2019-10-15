import axios from '@/axios/axios'
// import china from '../../../../static/mock/chinaJson/map/china.json'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'

const routePath = 'base'
const modelName = 'statisticsJobs'
let schoolId = localStorage.getItem('schoolId') ? JSON.parse(localStorage.getItem('schoolId')).content : ''
export default {

  // 获取列表
  fetchList (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Pt/page`,
      method: 'get',
      params: params
    })
  },
  // 获取列表
  fetchList2 (params) {
    return axios({
      url: baseUrl + `/${routePath}/statisticsResultsAd/page`,
      method: 'get',
      params: params
    })
  },
  // 获取地图
  // getChina () {
  //   return axios({
  //     url: '/static/mock/chinaJson/map/china.json',
  //     method: 'get',
  //   })
  // },
  // 获取data
  getResults (id, date) {
    let schoolId = localStorage.getItem('schoolId').content;
    return axios({
      url: baseUrl + `/${routePath}/statisticsResultsAd/${id}`,
      method: 'get',
      params: {valueKey: schoolId, date}
    })
  },
  // 删除列表数据
  batchDelObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Pt`,
      method: 'delete',
      data: params
    })
  },
  // 增加列表
  addObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Pt/add`,
      method: 'post',
      data: params
    })
  },
  // 获取头详情
  getObj (id) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Pt/${id}`,
      method: 'get',
    })
  },
  // 修改详情
  putObj (params) {
    return axios({
      url: baseUrl + `/${routePath}/${modelName}Pt/edit`,
      method: 'put',
      data: params,
    })
  },
}
