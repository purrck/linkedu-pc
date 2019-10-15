
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
const routePath = 'sm/user'
const modelName = 'entityRegion'
  // /sm/user/entityRegionAd/page
  // /sm/user/entityRegionAd/page
  // /sm/user/entityOrganizationAd/
//courseInfo surveyinfo
export default {

	// 获取列表
	fetchList(params) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}Ad/page?entityType=surveyinfo`,
            method: 'get',
            params: params
        })
	},

	// 查看信息详情
	getObj(id) {
    return axios({
      url: baseUrl + `/om/market/marketSurveyAd/selectOne?surveyId=${id}`,
      method: 'get',
    })
	}, // 查看信息详情
	addObj(data) {
		return axios({
            url:  baseUrl + `/sm/user/entityOrganizationUserRule/save`,
            // url: baseUrl + `/${routePath}/${modelName}/${id}`,
            method: 'post',
            data: data,
        })
	},

}
