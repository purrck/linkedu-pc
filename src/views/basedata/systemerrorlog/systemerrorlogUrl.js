
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
// const  baseUrl = '/zHF';
const  routePath = 'base';
const  modelName = 'systemerrorlog';
const  applicationCilent = '';

export default {

	// 获取列表
	fetchList(params) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}ad/page`,
            method: 'get',
            params: params
        })
	},
	// 删除列表数据
	batchDelObj(params) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}ad`,
            method: 'delete',
            data: params
        })
	},
	// 增加列表
	addObj(params) {
		return axios({
                url: baseUrl + `/${routePath}/${modelName}ad/add`,
                method: 'post',
                data: params
            })
	},
	// 查看详情
	getObj(id) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}ad/${id}`,
            method: 'get',
        })
	},
	// 修改详情
	putObj(params) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}ad/edit`,
            method: 'put',
            data: params,
        })
	},
}
