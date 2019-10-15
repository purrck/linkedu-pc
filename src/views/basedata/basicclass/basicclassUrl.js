import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
// let baseUrl = '/zHF'

export default {
  // 获取地点列表
  getPlaceList(params) {
    return axios({
      url: baseUrl + `/sm/schoolPlace/basicSchoolPlaceAd/list?`,
      method: 'get',
      params: params
    })
  },
	// 分配创建
	addBatchNew(params) {
		return axios({
			url: baseUrl + "/sm/base/classInfoAd/addBatch",
			//url : `/static/mock/listClassInfo/listClassInfo.json`,
			method: 'post',
			data : params
        })
	},

	// 分配创建
	addBatch(params) {
		return axios({
			url: baseUrl + "/base/classInfoAd/addBatch",
			//url : `/static/mock/listClassInfo/listClassInfo.json`,
			method: 'post',
			data : params
        })
	},
	// 获取老师
	getTeacher(params) {
		return axios({
			url: baseUrl + "/user/teacherAd/page?page=1&limit=999",
			//url : `/static/mock/listClassInfo/listClassInfo.json`,
            method: 'get'
        })
	},

	// 获取列表
	fetchList(params) {
		return axios({
			url: baseUrl + "/base/classInfoAd/page",
			//url : `/static/mock/listClassInfo/listClassInfo.json`,
            method: 'get',
            params: params
        })
	},
	// 删除列表数据
	batchDelObj(params) {
		return axios({
            url: baseUrl + "/base/classInfoAd",
            method: 'delete',
            data: params
        })
	},
	// 增加列表
	addObj(params) {
		return axios({
                url: baseUrl + "/base/classInfoAd/add",
                method: 'post',
                data: params
            })
	},
	// 查看详情
	getObj(id) {
		return axios({
            url: baseUrl + '/base/classInfoAd/'+id,
            method: 'get',
        })
	},
	// 修改详情
	putObj(params) {
		return axios({
            url: baseUrl + '/base/classInfoAd/edit',
            method: 'put',
            data: params,
        })
	},
}
