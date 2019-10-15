
import axios from '@/axios/axios';
import { baseUrl, ortherUrl, dicUrl } from '@/config/env';
const  routePath = 'sm/attendance';
const  modelName = 'attendance';
const  applicationCilent = '';
const getDetail = 'studentTimelineCheckAd';

export default {

  // 获取列表
  fetchList(params) {
    return axios({
      url: baseUrl + `/sm/attendance/studentTimelineCheckAd/page`,
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
  // 查看详情
  getObj(id) {
    return axios({
      url: baseUrl + `/sm/attendance/studentTimelineCheckAd/`+id,
      method: 'get',
    })
  },
}
