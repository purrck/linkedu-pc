
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
const  routePath = '';
const  modelName = '';
const  vueFullTypeName = `EntityPushRead`;

export default {

	// 获取列表
	fetchList(params) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}Ad/page`,
            method: 'get',
            params: params
        })
	},
	fetchListV1(params) {
		return axios({
            url: baseUrl + `/safetyeducation/entityPushRead/page`,
            method: 'post',
            data: params
        })
	},
	// 删除列表数据
	batchDelObj(params) {
		return axios({
            url: baseUrl + `/safetyeducation/entityPushRead`,
            method: 'delete',
            data: params
        })
	},
	// 查看详情
	getObj(id) {
		return axios({
            url: baseUrl + `/safetyeducation/entityPushRead/${id}`,
            method: 'get',
        })
	},
}
