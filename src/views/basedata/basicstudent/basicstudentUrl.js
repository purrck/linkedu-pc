import axios from '@/axios/axios';
import {baseUrl, dicUrl, khglUrl} from '@/config/env';
//const baseUrl = '/zHF'
export default {
  //获取数据
  getClassData(classId) {
    return axios({
      url: baseUrl + "/base/classInfoAd/" + classId,
      method: 'get'
    })
  },
  // 获取列表
  fetchList(params) {
    return axios({
      url: baseUrl + "/sm/user/studentAd/page",
      method: 'get',
      params: params
    })
  },
  // 删除列表数据
  batchDelObj(params) {
    return axios({
      url: baseUrl + "/user/studentAd",
      method: 'delete',
      data: params
    })
  },
  // 增加列表
  addObj(params) {
    return axios({
      url: baseUrl + "/user/studentAd/add",
      method: 'post',
      data: params
    })
  },
  // 查看详情
  getObj(id) {
    return axios({
      url: baseUrl + '/sm/user/studentAd/' + id,
      method: 'get',
    })
  },
  // 修改详情
  putObj(params) {
    return axios({
      url: baseUrl + '/sm/user/studentAd/edit',
      method: 'put',
      data: params,
    })
  },
  // 获取状态值的参数
  getCodeIntType(id) {
    return axios({
      url: baseUrl + '/admin/redis/' + id,
      method: 'get',
    })
  },
  uploadClassStudentHeader(data) {
    return axios({
      url: baseUrl + '/sm/user/studentAd/uploadClassStudentHeaderPic',
      method: 'post',
      data: data,
      ContentType: 'multipart/form-data',
    })
  },
}

