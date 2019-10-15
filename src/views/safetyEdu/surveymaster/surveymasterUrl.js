
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
const routePath = 'sm/user'
const modelName = 'entityOrganization'

export default {

	// 获取列表
	fetchList(params) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}Ad/page?entityType=surveyinfo`,
            method: 'get',
            params: params
        })
	},
  addObj(data) {
    return axios({
      url:  baseUrl + `/${routePath}/${modelName}Ad/add`,
      // url: baseUrl + `/${routePath}/${modelName}/${id}`,
      method: 'post',
      data: data,
    })
  },
	// 删除列表数据
	batchDelObj(params) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}Ad`,
            method: 'delete',
            data: params
        })
	},

	// 查看信息详情
	getObj(id) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}Ad/${id}`,
            method: 'get',
        })
	},
  // 查看问卷资源详情
	getObjSur(id) {
		return axios({
            url: baseUrl + `/om/market/marketSurveyAd/selectOne?surveyId=${id}`,
            method: 'get',
        })
	},
  // 查看问卷资源列表
	getListSur(params) {
		return axios({
            url: baseUrl + `/sm/user/entityRegionAd/page?entityType=surveyinfo`,
            method: 'get',
            params: params,
        })
	},
	// 修改详情
	putObj(params) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}/edit`,
            method: 'put',
            data: params,
        })
	},
  // 修改详情
	getSearchList(params) {
		return axios({
            url: baseUrl + `/sm/market/marketSurveyAd/surveyAnsMaster`,
            method: 'get',
            params: params
        })
	}, // 修改详情
	changeStatus(data) {
		return axios({
            url: baseUrl + `/sm/user/entityOrganizationAd/updateStatus`,
            method: 'put',
            data: data
        })
	},
}
