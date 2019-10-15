
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
// const  baseUrl = '/cHF';    //将环境切换为本地

const  routePath = 'sm/spedu';
const  modelName = 'interestCourseClassStudent';
const  vueFullTypeName = `InterestCourseClassStudent`;

export default {
	// 获取列表
	fetchList(params) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}Ad/page`,
            method: 'get',
      params: params
        })
	},
// 获取兴趣班；列表
fetchClassList(params) {
  return axios({
    url: baseUrl + `/sm/spedu/interestCourseClassAd/page`,
    method: 'get',
    params: params
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
	// 增加列表
	addObj(params) {
		return axios({
                url: baseUrl + `/${routePath}/${modelName}Ad/add`,
                method: 'post',
                data: params
            })
	},
	// 查看详情
	getObj(id) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}Ad/${id}`,
            method: 'get',
        })
	},
	// 修改详情
	putObj(params) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}Ad/edit`,
            method: 'put',
            data: params,
        })
	},
}
