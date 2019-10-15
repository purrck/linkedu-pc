
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
// let baseUrl = '/yHF'
const  routePath = 'base';
const  modelName = 'orgDepart';
const  applicationCilent = '';

export default {
	//根据模板id，生成后端部门
	addBatchSchoolDepart(params){
		return axios({
			url: baseUrl + `/sm/base/departAggAd/addBatchSchoolDepart?tempDepartId=${params}`,
			method: 'get'
		})
	},
	//批量提交部门
	addPiLiangObj(params) {
		return axios({
                url: baseUrl + `/sm/base/departAggAd/addBatchSchoolPosition`,
                method: 'post',
                data: params
            })
	},

	// 获取部门
	getTeacher(params) {
		return axios({
			url: baseUrl + `/user/teacherAd/page?page=1&limit=100`,
			//url : "/static/mock/listOrgDepart/OrgDepart1.json",
            method: 'get',
            params: params
        })
	},

	// 获取部门
	getOrgDepart(params) {
		return axios({
			//url: baseUrl + `/${routePath}/${modelName}Ad/page`,
			url : "/static/mock/listOrgDepart/OrgDepart1.json",
            method: 'get',
            params: params
        })
	},

	// 获取模版详情
	getOrgDepartDetail(params) {
		return axios({
			url: baseUrl + `/base/departDropDownAd/deparPosiTree?schoolId=${params}`,
			//url : "/static/mock/listOrgDepart/departTempDetail.json",
            method: 'get'
        })
	},

	// 获取模版
	getOrgDepartTemp() {
		return axios({
			url: baseUrl + `/base/departDropDownAd/departTempTree`,
			//url : "/static/mock/listOrgDepart/departTemp.json",
            method: 'get'
        })
	},

	// 获取模版
	orgDepartTemp(params) {
		return axios({
			url: baseUrl + `/${routePath}/${modelName}Ad/page`,
			//url : "/static/mock/listOrgDepart/orgDepartTemp.json",
            method: 'get',
            params: params
        })
	},

	// 获取列表
	fetchList(params) {
		return axios({
			url: baseUrl + `/${routePath}/${modelName}Ad/page`,
			//url : "/static/mock/listOrgDepart/listOrgDepart.json",
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
