import axios from '@/axios/axios'
import {baseUrl, ortherUrl, dicUrl} from '@/config/env'


const routePath = 'om/market'
const modelName = 'surveyMaster'

export default {

  // 获取列表
  fetchList (params) {
    return axios({
      url: baseUrl + `/om/market/marketSurveyAd/page`,
      method: 'get',
      params: params
    })
  },
  // 删除列表数据
  batchDelObj (params) {
    return axios({
      url: baseUrl + `/market/${modelName}Ad`,
      method: 'delete',
      data: params
    })
  },
  // 增加列表
  addObj (params) {
    return axios({
      url: baseUrl + `/market/surveyMasterAd/addMarketSurvey`,
      method: 'post',
      data: params
    })
  },
  // 查看详情
  getObj (id) {
    return axios({
      url: baseUrl + `/om/market/marketSurveyAd/selectOne?surveyId=${id}`,
      method: 'get',
    })
  },
  // 修改详情
  putObj (params) {
    return axios({
      url: baseUrl + `/market/surveyMasterAd/addMarketSurvey`,
      method: 'post',
      data: params,
    })
  },
  createTopic (data) {
    return axios({
      url: `${baseUrl}/market/surveyItemAd/addSurveyItemAd`,
      method: 'post',
      data: data
    })
  },
  checkType(data) {
    return axios({
      url: `${baseUrl}/om/market/marketSurveyAd/audit`,
      method: 'post',
      data: data
    })
  },
  disabled(data) {
    return axios({
      url: `${baseUrl}/market/surveyMasterAd/disable`,
      method: 'delete',
      data
    })
  }
}
