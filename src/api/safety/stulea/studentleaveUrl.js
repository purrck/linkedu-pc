import axios from '@/axios/axios';
import { baseUrl, khglUrl, dicUrl } from '@/config/env';


export default {

  toAdd(params) {
    return axios({
      url: baseUrl + '/studentLeavePt/add',
      method: 'post',
      data: params
    })
  },
	// 获取列表
  fetchList(params) {
    return axios({
      url: baseUrl + '/admin/studentLeavePt/parentPage',
      method: 'get',
      params: params
    })
  },
	// 删除列表数据
  batchDelObj(params) {
    return axios({
      url: baseUrl + '/admin/studentLeavePt',
      method: 'delete',
      data: params
    })
  },
	// 查看详情
  getObj(id) {
    return axios({
      url: baseUrl + '/admin/studentLeavePt/detail?leaveID=' + id,
      method: 'get'
    })
  },
	// 修改详情
  putObj(params) {
    return axios({
      url: baseUrl + '/studentLeavePt/edit',
      method: 'put'
    })
  }
}
