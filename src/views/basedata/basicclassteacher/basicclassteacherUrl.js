
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
// let baseUrl = '/zHF'
const  routePath = 'user';
const  modelName = 'classTeacher';
const  applicationCilent = '';

export default {
	// 批量创建
addTeacherNew(params) {
	return axios({
		url: baseUrl + "/sm/user/classTeacherAd/addBatch",
		//url : `/static/mock/listClassInfo/listClassInfo.json`,
		method: 'post',
		data : params
	})
},
// 分配创建
addTeacher(params) {
	return axios({
		url: baseUrl + "/user/classTeacherAd/addBatch",
		//url : `/static/mock/listClassInfo/listClassInfo.json`,
		method: 'post',
		data : params
	})
},
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
