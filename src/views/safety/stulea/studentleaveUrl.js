import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env';
// let baseUrl = 'xHF'
const routePath = 'sm/attendance'
const modelName = 'studentLeaveAd'


export default {

  toAdd(params) {
    return axios({
      url: baseUrl + `/${routePath}/studentLeaveAd/add`,
      method: `post`,
      data: params
    })
  },
	// 获取列表
  fetchList(params) {
    return axios({
      url: baseUrl + `/${routePath}/studentLeaveAd/page`,
      method: `get`,
      params: params
    })
  },
	// 删除列表数据
  batchDelObj(params) {
    return axios({
      url: baseUrl + `/${routePath}/studentLeaveAd`,
      method: `delete`,
      data: params
    })
  },
	// 查看详情
  getObj(id) {
    return axios({
      url: baseUrl + `/${routePath}/studentLeaveAd/detail?leaveId=` + id,
      method: `get`
    })
  },
	// 修改详情
  putObj(params) {
    return axios({
      url: baseUrl + `/${routePath}/studentLeaveAd/edit`,
      method: `put`
    })
  }
}
