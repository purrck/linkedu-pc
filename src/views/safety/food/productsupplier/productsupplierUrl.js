
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
const  routePath = 'sm/foodSecurity';
const  modelName = '';
const  vueFullTypeName = `ProductSupplier`;

export default {

	// 获取列表
	fetchList(params) {
		return axios({
            url: baseUrl + `/sm/foodSecurity/productSupplierAd/page`,
            method: 'get',
            params: params
        })
	},
	// 删除列表数据
	batchDelObj(params) {
		return axios({
            url: baseUrl + `/sm/foodSecurity/productSupplierAd`,
            method: 'delete',
            data: params
        })
	},
	// 增加列表
	addObj(params) {
		return axios({
                url: baseUrl + `/sm/foodSecurity/productSupplierAd/add`,
                method: 'post',
                data: params
            })
	},
	// 查看详情
	getObj(id) {
		return axios({
            url: baseUrl + `/sm/foodSecurity/productSupplierAd/${id}`,
            method: 'get',
        })
	},
	// 修改详情
	putObj(params) {
		return axios({
            url: baseUrl + `/sm/foodSecurity/productSupplierAd/edit`,
            method: 'put',
            data: params,
        })
	},
}
