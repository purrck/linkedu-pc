
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
const  routePath = 'sm/security';
const  modelName = '';
const  vueFullTypeName = `SchoolMenu`;

export default {

	// 获取列表
	fetchList(params) {
		return axios({
            url: baseUrl + `/sm/foodSecurity/schoolMenuAd/page`,
            method: 'get',
            params: params
        })
	},
	// 删除列表数据
	batchDelObj(params) {
		return axios({
            url: baseUrl + `/sm/foodSecurity/schoolMenuAd`,
            method: 'delete',
            data: params
        })
	},
	// 增加列表
	addObj(params) {
		return axios({
                url: baseUrl + `/sm/foodSecurity/schoolMenuAd/add`,
                method: 'post',
                data: params
            })
	},
	// 查看详情
	getObj(id) {
		return axios({
            url: baseUrl + `/sm/foodSecurity/schoolMenuAd/${id}`,
            method: 'get',
        })
	},
	// 修改详情
	putObj(params) {
		return axios({
            url: baseUrl + `/sm/foodSecurity/schoolMenuAd/edit`,
            method: 'put',
            data: params,
        })
	},
}
