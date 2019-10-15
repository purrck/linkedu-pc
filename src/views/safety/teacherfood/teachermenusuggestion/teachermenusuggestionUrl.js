
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
const  routePath = 'sm/foodSecurity';
const  modelName = 'teacherMenuSuggestion';
const  vueFullTypeName = `TeacherMenuSuggestion`;

export default {

	// 获取列表
	fetchList(params) {
		return axios({
            url: baseUrl + `/sm/foodSecurity/teacherMenuSuggestionAd/page`,
            method: 'get',
            params: params
        })
	},
	// 删除列表数据
	batchDelObj(params) {
		return axios({
            url: baseUrl + `/sm/foodSecurity/teacherMenuSuggestionAd`,
            method: 'delete',
            data: params
        })
	},
	// 增加列表
	addObj(params) {
		return axios({
                url: baseUrl + `/sm/foodSecurity/teacherMenuSuggestionAd/add`,
                method: 'post',
                data: params
            })
	},
	// 查看详情
	getObj(id) {
		return axios({
            url: baseUrl + `/sm/foodSecurity/teacherMenuSuggestionAd/${id}`,
            method: 'get',
        })
	},
	// 修改详情
	putObj(params) {
		return axios({
            url: baseUrl + `/sm/foodSecurity/teacherMenuSuggestionAd/edit`,
            method: 'put',
            data: params,
        })
	},
}
