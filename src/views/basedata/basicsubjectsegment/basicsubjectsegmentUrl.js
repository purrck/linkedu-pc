import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env';
// const baseUrl = '/yHF'
export default {

	// 获取列表
	fetchList(params) {
		return axios({
            url: baseUrl + "/base/subjectSegmentAd/page",
            method: 'get',
            params: params
        })
	},
	// 删除列表数据
	batchDelObj(params) {
		return axios({
            url: baseUrl + "/base/subjectSegmentAd",
            method: 'delete',
            data: params
        })
	},

	addObj(params) {
		return axios({
                url: baseUrl + "/base/subjectSegmentAd/add",
                method: 'post',
                data: params
            })
	},
	// 查看详情
	getObj(id) {
		return axios({
            url: baseUrl + '/base/subjectSegmentAd/'+id,
            method: 'get',
        })
	},
	// 修改详情
	putObj(params) {
		return axios({
            url: baseUrl + '/base/subjectSegmentAd/edit',
            method: 'put',
            data: params,
        })
	},
	// 获取状态值的参数
	getCodeIntType(key) {
        return axios({
            url: baseUrl + '/base/subjectSegmentAd/getSelectList/'+ key,
            method: 'get',
        })
    },
}
