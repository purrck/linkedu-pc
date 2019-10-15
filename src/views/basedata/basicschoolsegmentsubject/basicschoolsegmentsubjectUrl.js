
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
const  routePath = 'base';
const  modelName = 'schoolSegmentSubject';
const  applicationCilent = '';

export default {
	// 批量新增
	addPiliang(params) {
		return axios({
			url: baseUrl + `/sm/base/schoolSegmentSubjectAd/addBatch`,
			//url : `/static/mock/subject/list.json`,
            method: 'post',
            data: params
        })
	},

	// 批量新增
	addBatch(params) {
		return axios({
			url: baseUrl + `/${routePath}/${modelName}Ad/addBatch`,
			//url : `/static/mock/subject/list.json`,
            method: 'post',
            data: params
        })
	},

	// 获取列表
	fetchList(params) {
		return axios({
			url: baseUrl + `/${routePath}/${modelName}Ad/page`,
			//url : `/static/mock/subject/list.json`,
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
            url: baseUrl + `/sm/base/schoolSegmentSubjectAd/edit`,
            method: 'put',
            data: params,
        })
	},
}
