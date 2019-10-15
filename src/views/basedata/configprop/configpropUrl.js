import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';

const  routePath = 'base';
const  modelName = 'configprop';
const  applicationCilent = 'ad';

export default {

	// 获取列表
	fetchList(params) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}${applicationCilent}/page`,
            method: 'get',
            params: params
        })
	},
	// 删除列表数据
	batchDelObj(params) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}${applicationCilent}`,
            method: 'delete',
            data: params
        })
	},
	// 增加列表
	addObj(params) {
		return axios({
                url: baseUrl + `/${routePath}/${modelName}${applicationCilent}/add`,
                method: 'post',
                data: params
            })
	},
	// 查看详情
	getObj(id) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}${applicationCilent}/`+id,
            method: 'get',
        })
	},
	// 修改详情
	putObj(params) {
		return axios({
            url: baseUrl + `/${routePath}/${modelName}${applicationCilent}/edit`,
            method: 'put',
            data: params,
        })
	},
    //shangchuan
    getFileUrl (params) {
        return axios({
            url: baseUrl + '/${routePath}/${modelName}${applicationCilent}/edit',
            method: 'post',
            data: params,
        })
    }
}
