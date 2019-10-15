
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
const  routePath = 'base';
const  modelName = 'statisticsResults';
const  applicationCilent = '';

export default {

	// 获取列表
	fetchList(params) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}Ad/page`,
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
	getObj(id,resultKey) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}Ad/${id}?resultKey=${resultKey}`,
            method: 'get',
        })
	},
}
