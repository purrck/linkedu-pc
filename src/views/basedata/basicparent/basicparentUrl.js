import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env';
// const baseUrl = '/zHF'

export default {

  downfamily(){
    return axios({
      url: baseUrl + "/sm/user/parent/exportParent",
      method: 'get',
    })
  },

// 获取列表
	fetchList(params) {
		return axios({
            url: baseUrl + "/user/parentAd/page",
            method: 'get',
            params: params
        })
	},
	// 删除列表数据
	batchDelObj(params) {
		return axios({
            url: baseUrl + "/user/parentAd",
            method: 'delete',
            data: params
        })
    },
    // 增加列表
	addNewParent1(params) {
		return axios({
                url: baseUrl + "/sm/user/parent/add",
                method: 'post',
                data: params
            })
	},
    // 增加列表
	addNewParent(params) {
		return axios({
                url: baseUrl + "/user/parentAd/addNew",
                method: 'post',
                data: params
            })
	},
	// 增加列表
	addObj(params) {
		return axios({
                url: baseUrl + "/user/parentAd/add",
                method: 'post',
                data: params
            })
    },
    // 查看详情
	getObjV1(params) {
		return axios({
            url: baseUrl + '/sm/user/parent/id',
            method: 'get',
            params: params
        })
	},
	// 查看详情
	getObj(id) {
		return axios({
            url: baseUrl + '/user/parentAd/'+id,
            method: 'get',
        })
    },
    // 修改详情
    putObjV1(params) {
        return axios({
            url: baseUrl + '/sm/user/parent/edit',
            method: 'put',
            data: params,
        })
    },
	// 修改详情
    putObj(params) {
		return axios({
            url: baseUrl + '/user/parentAd/edit',
            method: 'put',
            data: params,
        })
	},
  exports(){
    return axios({
      url: baseUrl + `/sm/user/parent/exportParent`,
      responseType: 'blob',
      method: 'get',
    })
  }
}
