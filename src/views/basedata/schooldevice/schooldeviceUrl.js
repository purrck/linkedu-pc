
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
const  routePath = 'sm/device';
const  modelName = 'schoolDevice';
const  vueFullTypeName = `SchoolDevice`;

export default {

  // // 获取地点列表
  // getPlaceList(params) {
  //   return axios({
  //     url: baseUrl + `/sm/schoolPlace/basicSchoolPlaceAd/list?`,
  //     method: 'get',
  //     params: params
  //   })
  // },
  // 获取地点列表
  getPlaceList(params) {
    return axios({
      url: baseUrl + `/base/basicSchoolPlace/getSchoolPlace`,
      method: 'get',
      params: params
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
