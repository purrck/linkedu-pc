
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
// let baseUrl = '/xHF'
// /sm/user/aaSubjectExtraFieldAd/page

const  routePath = 'user';
const  modelName = 'aaSubjectExtrafield';
const  applicationCilent = '';

export default {

	// 获取列表
	fetchList(params) {
		return axios({
            url: baseUrl + `/sm/user/aaSubjectExtraFieldAd/page`,
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
	// 查看详情
	getObj(id) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}Ad/${id}?subjectId=&fieldName=`,
            method: 'get',
        })
	},
}
