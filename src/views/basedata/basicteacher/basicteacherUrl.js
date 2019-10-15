import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env';
// const baseUrl = '/zHF'
export default {

	// 获取列表
	fetchList(params) {
		return axios({
            url: baseUrl + "/user/teacherAd/page",
            method: 'get',
            params: params
        })
	},
	// 删除列表数据
	batchDelObj(params) {
		return axios({
            url: baseUrl + "/user/teacherAd",
            method: 'delete',
            data: params
        })
	},
	// 增加列表
	addObj(params) {
		return axios({
                url: baseUrl + "/sm/user/teacherAd/add",
                method: 'post',
                data: params
            })
	},
	// 查看详情
	getObj(id) {
		return axios({
            url: baseUrl + '/user/teacherAd/'+id,
            method: 'get',
        })
	},
	// 修改详情
	putObj(params) {
		return axios({
            url: baseUrl + '/user/teacherAd/edit',
            method: 'put',
            data: params,
        })
	},
	// 获取状态值的参数
	getCodeIntType(id) {
        return axios({
            url: baseUrl + '/admin/redis/'+ id,
            method: 'get',
        })
    },
}
